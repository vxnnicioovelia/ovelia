#!/usr/bin/env node
// Converte os arquivos USFM oficiais da Bíblia Portuguesa Mundial (eBible.org)
// para o esquema de leitura Ovelia. Não ativa a tradução: estado permanece em_preparacao.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const [sourceArg, rootArg] = process.argv.slice(2);
const root = path.resolve(rootArg || process.cwd());
const sourceDir = sourceArg ? path.resolve(sourceArg) : '';
const sayError = message => { console.error('ERRO: ' + message); process.exit(1); };

function collectFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full));
    else if (/\.(?:usfm|sfm|txt)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function stripNotesAndMarkup(value) {
  return String(value || '')
    .replace(/\\f\b[\s\S]*?\\f\*/g, ' ')
    .replace(/\\x\b[\s\S]*?\\x\*/g, ' ')
    .replace(/\\fig\b[\s\S]*?\\fig\*/g, ' ')
    .replace(/\\w\s+([^|\\]+)\|[\s\S]*?\\w\*/g, '$1')
    .replace(/\\ca\b[\s\S]*?\\ca\*/g, ' ')
    .replace(/\\va\b[\s\S]*?\\va\*/g, ' ')
    .replace(/\\vp\b[\s\S]*?\\vp\*/g, ' ')
    .replace(/\\[A-Za-z][A-Za-z0-9-]*\*?/g, ' ')
    .replace(/\|[A-Za-z0-9_-]+="[^"]*"/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[\t\r\n]+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([“‘])\s+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseUsfm(raw, expectedCode) {
  const text = String(raw || '').replace(/^\uFEFF/, '').replace(/\r/g, '');
  const idMatch = text.match(/^\s*\\id\s+([A-Z0-9]{3})(?:\s|$)/m);
  if (!idMatch || idMatch[1] !== expectedCode) throw new Error(`${expectedCode}: marcador \\id ausente ou divergente.`);
  const chapters = [];
  const chapterMatches = [...text.matchAll(/\\c\s+(\d+)\b/g)];
  if (!chapterMatches.length) throw new Error(`${expectedCode}: nenhum marcador de capítulo \\c foi encontrado.`);
  if (chapterMatches.some((m, i) => Number(m[1]) !== i + 1)) throw new Error(`${expectedCode}: numeração de capítulos não sequencial.`);

  for (let ci = 0; ci < chapterMatches.length; ci++) {
    const m = chapterMatches[ci];
    const start = m.index + m[0].length;
    const end = ci + 1 < chapterMatches.length ? chapterMatches[ci + 1].index : text.length;
    // Remove notas primeiro para que referências de rodapé nunca sejam confundidas com texto bíblico.
    const body = text.slice(start, end)
      .replace(/\\f\b[\s\S]*?\\f\*/g, ' ')
      .replace(/\\x\b[\s\S]*?\\x\*/g, ' ');
    const events = /\\v\s+([^\s]+)\s*|\\s([1-3])?\s*|\\d\s*/g;
    const verses = [];
    let cursor = 0, current = null, mode = 'pre', chapterTitle = '', pendingSection = '';
    const addSegment = segment => {
      if (mode === 'verse' && current) current.texto += (current.texto ? ' ' : '') + stripNotesAndMarkup(segment);
      else if (mode === 'section') pendingSection += (pendingSection ? ' ' : '') + stripNotesAndMarkup(segment);
      else if (mode === 'title') chapterTitle += (chapterTitle ? ' ' : '') + stripNotesAndMarkup(segment);
    };
    let event;
    while ((event = events.exec(body)) !== null) {
      addSegment(body.slice(cursor, event.index));
      cursor = events.lastIndex;
      if (event[1] !== undefined) {
        if (current) verses.push(current);
        const original = event[1];
        if (!/^\d+$/.test(original)) {
          throw new Error(`${expectedCode} capítulo ${m[1]}: identificador de versículo fora do padrão inteiro ("${original}"). Importação interrompida para não alterar referências bíblicas.`);
        }
        const n = Number(original);
        if (!Number.isInteger(n) || n < 1 || (verses.length && n <= verses[verses.length - 1].numero)) {
          throw new Error(`${expectedCode} capítulo ${m[1]}: numeração de versículos duplicada ou inválida (${original}).`);
        }
        current = { numero: n, texto: '', ...(pendingSection ? { secao: pendingSection } : {}) };
        pendingSection = '';
        mode = 'verse';
      } else if (event[2] !== undefined) {
        mode = 'section';
      } else {
        mode = 'title';
      }
    }
    addSegment(body.slice(cursor));
    if (current) verses.push(current);

    if (!verses.length) throw new Error(`${expectedCode} capítulo ${m[1]}: nenhum versículo reconhecido.`);
    if (verses.some(v => !v.texto.trim())) throw new Error(`${expectedCode} capítulo ${m[1]}: existe versículo sem texto após remover notas e marcações.`);
    for (let vi = 0; vi < verses.length; vi++) {
      if (verses[vi].numero !== vi + 1) throw new Error(`${expectedCode} capítulo ${m[1]}: falta o versículo ${vi + 1} (encontrado ${verses[vi].numero}). Importação interrompida para evitar referências incorretas.`);
    }
    chapters.push({
      numero: Number(m[1]),
      ...(chapterTitle.trim() ? { titulo: chapterTitle.trim() } : {}),
      versiculos: verses.map(v => ({ numero: v.numero, texto: v.texto.trim(), ...(v.secao ? { secao: v.secao } : {}) }))
    });
  }
  return chapters;
}

function selfTest() {
  const fixture = '\\id GEN Test\n\\h Genesis\n\\c 1\n\\s1 Creation\n\\p\n\\v 1 In the beginning\n\\v 2 God made the sky.\n\\f + \\ft note ignored\\f*';
  const parsed = parseUsfm(fixture, 'GEN');
  if (parsed.length !== 1 || parsed[0].versiculos.length !== 2 || parsed[0].versiculos[0].texto !== 'In the beginning' || parsed[0].versiculos[1].texto !== 'God made the sky.' || parsed[0].versiculos[0].secao !== 'Creation') {
    throw new Error('Auto-teste USFM falhou: resultado inesperado.');
  }
  console.log('AUTO-TESTE APROVADO: capítulo, versículos, cabeçalho e remoção de nota USFM. Nenhum arquivo foi gravado.');
}

if (process.argv.includes('--self-test')) {
  try { selfTest(); } catch (e) { console.error('AUTO-TESTE REPROVADO: ' + e.message); process.exit(1); }
  process.exit(0);
}
if (!sourceDir || !fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
  sayError('Uso: node tools/gerar-biblia.mjs <pasta-com-USFM> [raiz-do-repositorio]. Use --self-test para testar o parser sem gravar dados.');
}
const catalogCandidates = [path.join(root, 'catalogo-biblia.json'), path.join(root, 'dados/biblia/catalogo.json')];
const catalogPath = catalogCandidates.find(p => fs.existsSync(p));
if (!catalogPath) sayError('Catálogo não encontrado (catalogo-biblia.json ou dados/biblia/catalogo.json).');
let catalog;
try { catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8')); } catch (e) { sayError('Catálogo inválido: ' + e.message); }
const translation = (catalog.traducoes || []).find(t => t.id === 'bpm');
if (!translation) sayError('BPM não cadastrada no catálogo.');
const expected = Array.isArray(translation.livrosEsperados) ? translation.livrosEsperados : [];
if (expected.length !== 73) sayError(`O catálogo da BPM deve declarar 73 livros; encontrados ${expected.length}.`);
const expectedMap = new Map(expected.map(b => [b.code, b]));
if (expectedMap.size !== 73 || expected.some(b => !b.code || !Number.isInteger(b.chapters) || b.chapters < 1)) sayError('Catálogo de livros esperado contém códigos duplicados ou metadados inválidos.');

let files;
try { files = collectFiles(sourceDir); } catch (e) { sayError('Não foi possível ler a pasta USFM: ' + e.message); }
if (!files.length) sayError('Nenhum arquivo .usfm, .sfm ou .txt encontrado na pasta de origem.');
const sourceBooks = new Map();
for (const file of files) {
  let content;
  try { content = fs.readFileSync(file, 'utf8'); } catch (e) { sayError(`Não foi possível ler ${file}: ${e.message}`); }
  const m = content.replace(/^\uFEFF/, '').match(/^\s*\\id\s+([A-Z0-9]{3})(?:\s|$)/m);
  if (!m || !expectedMap.has(m[1])) continue; // ignora livros extras fora do cânon de 73 livros da Ovelia.
  if (sourceBooks.has(m[1])) sayError(`Livro ${m[1]} aparece em mais de um arquivo: ${sourceBooks.get(m[1])} e ${file}.`);
  sourceBooks.set(m[1], file);
}
const missing = expected.filter(b => !sourceBooks.has(b.code)).map(b => `${b.code} (${b.name})`);
if (missing.length) sayError('A origem não contém todos os livros canônicos esperados. Ausentes: ' + missing.join(', '));

// Valida e prepara tudo em memória primeiro; em caso de erro nenhum arquivo de Bíblia é sobrescrito.
const parsedBooks = [];
for (const book of expected) {
  const file = sourceBooks.get(book.code);
  let raw, chapters;
  try { raw = fs.readFileSync(file, 'utf8'); chapters = parseUsfm(raw, book.code); }
  catch (e) { sayError(`${book.code} (${book.name}), arquivo ${path.basename(file)}: ${e.message}`); }
  if (chapters.length !== book.chapters) sayError(`${book.code}: catálogo espera ${book.chapters} capítulos, mas USFM contém ${chapters.length}. Nenhum arquivo foi gravado.`);
  parsedBooks.push({ code: book.code, name: book.name, sourceFile: path.basename(file), chapters });
}

const outputDir = path.join(root, 'dados/biblia/bpm');
fs.mkdirSync(outputDir, { recursive: true });
for (const book of parsedBooks) {
  const record = { schemaVersion: 1, id: 'bpm', code: book.code, nome: book.name, idOriginal: book.code, fonteArquivo: book.sourceFile, capitulos: book.chapters };
  fs.writeFileSync(path.join(outputDir, book.code + '.json'), JSON.stringify(record, null, 2) + '\n');
}
const index = {
  schemaVersion: 1,
  id: 'bpm',
  nome: translation.nome,
  origem: translation.origem || 'https://ebible.org/find/details.php?id=porbrbsl',
  livros: parsedBooks.map(b => ({ code: b.code, nome: b.name, idOriginal: b.code, capitulos: b.chapters.length, fonteArquivo: b.sourceFile }))
};
fs.writeFileSync(path.join(outputDir, 'indice.json'), JSON.stringify(index, null, 2) + '\n');
fs.writeFileSync(path.join(outputDir, 'metadados.json'), JSON.stringify({
  id: 'bpm', nome: translation.nome, idioma: translation.idioma || 'pt',
  origem: translation.origem || 'https://ebible.org/find/details.php?id=porbrbsl',
  edicao: translation.edicao || 'Bíblia Portuguesa Mundial — eBible.org; rascunho em revisão',
  licenca: translation.licenca || {}, fonte: 'Arquivos USFM oficiais eBible.org',
  livrosImportados: parsedBooks.length, importadoEm: new Date().toISOString(),
  estado: 'em_preparacao', observacao: 'O gerador nunca promove automaticamente a tradução a disponivel.'
}, null, 2) + '\n');

translation.estado = 'em_preparacao';
translation.dataValidacao = null;
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
const validator = path.join(root, 'validar-biblia.mjs');
if (!fs.existsSync(validator)) sayError('Dados gerados, mas validador principal não encontrado em validar-biblia.mjs.');
const check = spawnSync(process.execPath, [validator, 'bpm', root], { stdio: 'inherit', env: { ...process.env, OVELIA_CONFIRMAR_LICENCA: 'nao' } });
if (check.status !== 0) sayError('Validação final reprovada. A tradução permanece em_preparacao e não será habilitada no leitor. Revise o relatório acima.');
console.log('GERAÇÃO APROVADA ESTRUTURALMENTE: base BPM gravada em dados/biblia/bpm. Estado mantido em_preparacao; não ativado no leitor.');
