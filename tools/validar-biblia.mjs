#!/usr/bin/env node
// Validador estrutural de uma tradução Ovelia. Não baixa fontes nem publica dados.
import fs from 'node:fs';
import path from 'node:path';

const [id, rootArg] = process.argv.slice(2);
const root = path.resolve(rootArg || '.');
const catalogCandidates = [path.join(root, 'catalogo-biblia.json'), path.join(root, 'dados/biblia/catalogo.json')];
const catalogPath = catalogCandidates.find(p => fs.existsSync(p));
const errors = [], warnings = [];
const fail = m => errors.push(m);
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
if (!id) { console.error('Uso: node validar-biblia.mjs <id> [raiz-do-repositorio]'); process.exit(2); }
if (!catalogPath) { console.error('ERRO: catálogo ausente. Esperado catalogo-biblia.json na raiz ou dados/biblia/catalogo.json.'); process.exit(1); }
let catalog;
try { catalog = readJson(catalogPath); } catch(e) { console.error('ERRO: catálogo JSON inválido: ' + e.message); process.exit(1); }
const tr = (catalog.traducoes || []).find(x => x.id === id);
if (!tr) { console.error('ERRO: tradução não cadastrada: ' + id); process.exit(1); }
if (!['disponivel','em_preparacao','bloqueada'].includes(tr.estado)) fail('Estado de catálogo inválido.');
const lic = tr.licenca || {};
for (const k of ['tipo','titular','comprovacao']) if (!String(lic[k] || '').trim()) fail(`Metadado de licença ausente: licenca.${k}`);
if (!String(tr.origem || '').trim()) fail('Metadado obrigatório ausente: origem.');
if (!String(tr.edicao || '').trim()) fail('Metadado obrigatório ausente: edicao.');
if (!String(tr.idioma || '').trim()) fail('Metadado obrigatório ausente: idioma.');
if (!['grega','hebraica','a_validar','outra'].includes(tr.numeracaoSalmos)) fail('numeracaoSalmos deve ser declarada (grega, hebraica, outra ou a_validar).');
const expected = Array.isArray(tr.livrosEsperados) ? tr.livrosEsperados : [];
if (expected.length !== 73) fail(`Catálogo deve declarar 73 livros; encontrados ${expected.length}.`);
const expectedByCode = new Map();
for (const book of expected) {
  if (!book.code || expectedByCode.has(book.code)) fail('Código de livro ausente ou duplicado no catálogo: ' + (book.code || '(vazio)'));
  else expectedByCode.set(book.code, book);
  if (!Number.isInteger(book.chapters) || book.chapters < 1) fail(`Quantidade de capítulos inválida para ${book.code || book.name}.`);
}
const base = path.join(root, 'dados/biblia', id);
const idxPath = path.join(base, 'indice.json');
let idx = null;
if (!fs.existsSync(idxPath)) fail('Índice da tradução ausente: ' + idxPath);
else try { idx = readJson(idxPath); } catch(e) { fail('Índice JSON inválido: ' + e.message); }
const seenBooks = new Set();
if (idx) {
  if (idx.id !== id) fail(`ID do índice (${idx.id}) não corresponde a ${id}.`);
  if (!Array.isArray(idx.livros)) fail('indice.json deve conter livros[].');
  else {
    for (const item of idx.livros) {
      if (!item || !item.code) { fail('Livro sem código no índice.'); continue; }
      if (seenBooks.has(item.code)) fail('Livro duplicado no índice: ' + item.code);
      seenBooks.add(item.code);
      if (!expectedByCode.has(item.code)) fail('Livro não reconhecido no catálogo: ' + item.code);
      const file = path.join(base, item.code + '.json');
      if (!fs.existsSync(file)) { fail('Arquivo de livro ausente: ' + item.code + '.json'); continue; }
      let data;
      try { data = readJson(file); } catch(e) { fail(`${item.code}.json: JSON inválido: ${e.message}`); continue; }
      if (data.id !== id || data.code !== item.code) fail(`${item.code}.json: id/código não corresponde ao índice.`);
      if (!Array.isArray(data.capitulos)) { fail(`${item.code}.json: capitulos[] ausente.`); continue; }
      const exp = expectedByCode.get(item.code);
      const overrides = (tr.diferencasCapitulos || {})[item.code];
      const expectedChapters = Number.isInteger(overrides) ? overrides : exp?.chapters;
      if (data.capitulos.length !== expectedChapters) fail(`${item.code}: esperados ${expectedChapters} capítulos, encontrados ${data.capitulos.length}.`);
      const chapterNums = new Set();
      for (const chapter of data.capitulos) {
        if (!Number.isInteger(chapter.numero) || chapter.numero < 1) { fail(`${item.code}: número de capítulo inválido.`); continue; }
        if (chapterNums.has(chapter.numero)) fail(`${item.code}: capítulo duplicado ${chapter.numero}.`);
        chapterNums.add(chapter.numero);
        if (!Array.isArray(chapter.versiculos)) { fail(`${item.code} ${chapter.numero}: versiculos[] ausente.`); continue; }
        const verseNums = new Set();
        for (const verse of chapter.versiculos) {
          if (!Number.isInteger(verse.numero) || verse.numero < 1) { fail(`${item.code} ${chapter.numero}: número de versículo inválido.`); continue; }
          if (verseNums.has(verse.numero)) fail(`${item.code} ${chapter.numero}: versículo duplicado ${verse.numero}.`);
          verseNums.add(verse.numero);
          if (typeof verse.texto !== 'string' || !verse.texto.trim()) fail(`${item.code} ${chapter.numero}:${verse.numero}: texto vazio.`);
        }
        const nums = [...verseNums].sort((a,b)=>a-b);
        for (let i=0;i<nums.length;i++) if (nums[i] !== i+1) { fail(`${item.code} ${chapter.numero}: lacuna na numeração dos versículos (esperado ${i+1}, encontrado ${nums[i]}).`); break; }
      }
      const cnums = [...chapterNums].sort((a,b)=>a-b);
      for (let i=0;i<cnums.length;i++) if (cnums[i] !== i+1) { fail(`${item.code}: lacuna na numeração dos capítulos (esperado ${i+1}, encontrado ${cnums[i]}).`); break; }
    }
  }
}
for (const code of expectedByCode.keys()) if (!seenBooks.has(code)) fail('Livro esperado ausente: ' + code);
if (seenBooks.size !== 73) fail(`A base deve conter 73 livros únicos; encontrados ${seenBooks.size}.`);
const confirmed = process.env.OVELIA_CONFIRMAR_LICENCA === 'sim';
if (tr.estado === 'disponivel' && !confirmed) fail('Não é permitido validar como disponivel sem OVELIA_CONFIRMAR_LICENCA=sim.');
if (tr.estado === 'disponivel' && (errors.length || seenBooks.size !== 73)) fail('Base incompleta: estado disponivel recusado.');
console.log(`Relatório de validação — ${tr.nome} (${id})`);
console.log(`Estado declarado: ${tr.estado}; livros únicos: ${seenBooks.size}/73`);
for (const w of warnings) console.log('AVISO: ' + w);
for (const e of errors) console.log('ERRO: ' + e);
if (errors.length) { console.error(`RESULTADO: REPROVADO (${errors.length} erro(s)).`); process.exit(1); }
console.log('RESULTADO: APROVADO estruturalmente. Isso não confirma por si só direitos/licença.');
