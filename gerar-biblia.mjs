#!/usr/bin/env node
/* Ovelia — gera os arquivos da Bíblia (dados/biblia/*.json) a partir dos arquivos USFM
   de uma edição fornecida manualmente, com autorização editorial confirmada.

   Uso:  node tools/gerar-biblia.mjs <pasta-com-os-arquivos-usfm> [--parcial]

   Sem --parcial, o script só grava os dados se os 73 livros e todos os capítulos esperados
   estiverem presentes e com versículos. Se algo faltar, ele termina com erro e
   não altera nada no site (assim nunca publicamos uma Bíblia incompleta sem aviso).
   O workflow automático está desativado; este gerador exige confirmação explícita de autorização editorial. */
import fs from 'node:fs';
import path from 'node:path';

const AUTORIZADO = process.env.OVELIA_TEXTO_AUTORIZADO === 'sim';
const TRADUCAO = (process.env.BIBLIA_TRADUCAO || '').trim();
const FONTE = (process.env.BIBLIA_FONTE || '').trim();
const LICENCA = (process.env.BIBLIA_LICENCA || '').trim();

const LIVROS = [
  ['GEN','Gênesis',50],['EXO','Êxodo',40],['LEV','Levítico',27],['NUM','Números',36],['DEU','Deuteronômio',34],
  ['JOS','Josué',24],['JDG','Juízes',21],['RUT','Rute',4],['1SA','1 Samuel',31],['2SA','2 Samuel',24],
  ['1KI','1 Reis',22],['2KI','2 Reis',25],['1CH','1 Crônicas',29],['2CH','2 Crônicas',36],['EZR','Esdras',10],
  ['NEH','Neemias',13],['TOB','Tobias',14],['JDT','Judite',16],['ESG','Ester',10],['JOB','Jó',42],
  ['PSA','Salmos',150],['PRO','Provérbios',31],['ECC','Eclesiastes',12],['SNG','Cântico dos Cânticos',8],
  ['WIS','Sabedoria',19],['SIR','Eclesiástico (Sirácida)',51],['ISA','Isaías',66],['JER','Jeremias',52],
  ['LAM','Lamentações',5],['BAR','Baruc',6],['EZK','Ezequiel',48],['DAG','Daniel',14],['HOS','Oseias',14],
  ['JOL','Joel',3],['AMO','Amós',9],['OBA','Abdias',1],['JON','Jonas',4],['MIC','Miqueias',7],['NAM','Naum',3],
  ['HAB','Habacuc',3],['ZEP','Sofonias',3],['HAG','Ageu',2],['ZEC','Zacarias',14],['MAL','Malaquias',4],
  ['1MA','1 Macabeus',16],['2MA','2 Macabeus',15],
  ['MAT','Mateus',28],['MRK','Marcos',16],['LUK','Lucas',24],['JHN','João',21],['ACT','Atos dos Apóstolos',28],
  ['ROM','Romanos',16],['1CO','1 Coríntios',16],['2CO','2 Coríntios',13],['GAL','Gálatas',6],['EPH','Efésios',6],
  ['PHP','Filipenses',4],['COL','Colossenses',4],['1TH','1 Tessalonicenses',5],['2TH','2 Tessalonicenses',3],
  ['1TI','1 Timóteo',6],['2TI','2 Timóteo',4],['TIT','Tito',3],['PHM','Filêmon',1],['HEB','Hebreus',13],
  ['JAS','Tiago',5],['1PE','1 Pedro',5],['2PE','2 Pedro',3],['1JN','1 João',5],['2JN','2 João',1],
  ['3JN','3 João',1],['JUD','Judas',1],['REV','Apocalipse',22]
];
const POR_CODIGO = new Map(LIVROS.map(l => [l[0], l]));

/* ---------- leitura de USFM ---------- */
function limparTexto(s) {
  return s
    .replace(/\\f\s[\s\S]*?\\f\*/g, '')            // notas de rodapé
    .replace(/\\fe\s[\s\S]*?\\fe\*/g, '')
    .replace(/\\x\s[\s\S]*?\\x\*/g, '')            // referências cruzadas
    .replace(/\\fig\s[\s\S]*?\\fig\*/g, '')
    .replace(/\\w\s+([^|\\]*?)(\|[^\\]*)?\\w\*/g, '$1') // \w palavra|atributos\w*
    .replace(/\\\+?[a-z]+\d*\*?/gi, '')            // demais marcadores de caractere (\nd, \add, \wj ...)
    .replace(/ /g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function lerUsfm(texto) {
  const m = /\\id\s+([A-Z0-9]{3})/.exec(texto);
  if (!m) return null;
  const codigo = m[1];
  // remove notas antes de dividir em linhas (elas podem ocupar várias linhas)
  const corpo = texto
    .replace(/\\f\s[\s\S]*?\\f\*/g, '')
    .replace(/\\fe\s[\s\S]*?\\fe\*/g, '')
    .replace(/\\x\s[\s\S]*?\\x\*/g, '');
  const capitulos = [];
  let cap = null, verso = null, paragrafoNovo = false, titulo = '';
  const fecha = () => { if (verso && cap) { verso.t = limparTexto(verso.t).replace(/ ?\n ?/g, '\n').trim(); if (verso.t) cap.v.push(verso); } verso = null; };
  const abreVerso = (num, txt) => {
    fecha();
    if (!cap) { cap = { n: 1, v: [] }; capitulos.push(cap); }
    verso = { n: num, t: txt };
    if (paragrafoNovo) verso.p = 1;
    if (titulo) verso.s = titulo;
    paragrafoNovo = false; titulo = '';
  };
  const RE_V = /^(\d+[a-z]?(?:[-–,]\d+[a-z]?)*)\s*([\s\S]*)$/i;
  const PARAGRAFOS = ['p', 'm', 'pi', 'mi', 'nb', 'pc', 'pr', 'cls', 'b', 'li', 'ip'];
  const POESIA = ['q', 'qr', 'qc', 'qm'];
  const IGNORAR = ['r', 'h', 'toc', 'mt', 'id', 'ide', 'rem', 'cl', 'cp', 'ca', 'cd', 'sp', 'imt', 'is', 'ie', 'sts', 'usfm', 'mt1', 'mt2'];
  for (const bruta of corpo.split(/\r?\n/)) {
    const linha = bruta.trim();
    if (!linha) continue;
    const mm = /^\\([a-z]+)(\d*)\*?(?:\s+(.*))?$/i.exec(linha);
    if (!mm) { if (verso) verso.t += ' ' + linha; continue; }
    const marc = mm[1].toLowerCase();
    let resto = mm[3] || '';
    // versículos que começam na mesma linha de um marcador de parágrafo/poesia
    let versosNaLinha = [];
    if (marc !== 'v' && /\\v\s/.test(resto)) {
      const partes = resto.split(/\\v\s+/);
      resto = partes[0];
      versosNaLinha = partes.slice(1);
    }
    if (marc === 'c') {
      fecha();
      cap = { n: parseInt(resto, 10), v: [] };
      capitulos.push(cap);
      paragrafoNovo = true; titulo = '';
    } else if (marc === 'v') {
      const vm = RE_V.exec(resto);
      if (vm) abreVerso(vm[1], vm[2]);
    } else if (['s', 'ms', 'mr', 'sr'].includes(marc)) {
      fecha();
      titulo = (titulo ? titulo + ' ' : '') + limparTexto(resto);
      paragrafoNovo = true;
    } else if (marc === 'd') {
      if (cap) cap.d = (cap.d ? cap.d + ' ' : '') + limparTexto(resto);
    } else if (PARAGRAFOS.includes(marc)) {
      paragrafoNovo = true;
      if (verso && resto) verso.t += '\n' + resto;
    } else if (POESIA.includes(marc)) {
      if (verso) verso.t += '\n' + resto; else paragrafoNovo = true;
      resto = '';
    } else if (IGNORAR.includes(marc)) {
      continue;
    } else if (verso && resto) {
      verso.t += ' ' + resto;
    }
    for (const parte of versosNaLinha) { const vm = RE_V.exec(parte); if (vm) abreVerso(vm[1], vm[2]); }
  }
  fecha();
  return { codigo, capitulos: capitulos.filter(c => Number.isFinite(c.n)) };
}

function listarUsfm(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listarUsfm(p));
    else if (/\.(usfm|sfm|usx)$/i.test(e.name) && !/\.usx$/i.test(e.name)) out.push(p);
  }
  return out;
}

/* ---------- principal ---------- */
function main() {
  const args = process.argv.slice(2);
  const parcial = args.includes('--parcial');
  const entrada = args.find(a => !a.startsWith('--'));
  const saida = process.env.SAIDA_BIBLIA || path.join('dados', 'biblia');
  if (!entrada || !fs.existsSync(entrada)) { console.error('Informe a pasta com os arquivos USFM.'); process.exit(2); }
  if (!AUTORIZADO || !TRADUCAO || !FONTE || !LICENCA) {
    console.error('Geração bloqueada por segurança editorial. Só prossiga com autorização documentada e informe OVELIA_TEXTO_AUTORIZADO=sim, BIBLIA_TRADUCAO, BIBLIA_FONTE e BIBLIA_LICENCA.');
    process.exit(2);
  }
  if (parcial) {
    console.error('O modo parcial está desativado para evitar a publicação acidental de uma Bíblia incompleta.');
    process.exit(2);
  }

  const arquivos = listarUsfm(entrada);
  console.log('Arquivos USFM encontrados:', arquivos.length);
  const livros = new Map();
  const lerUsfmCache = new Map();
  for (const f of arquivos) {
    const r = lerUsfm(fs.readFileSync(f, 'utf8'));
    if (r && (r.codigo === 'DAN' || r.codigo === 'EST')) lerUsfmCache.set(r.codigo, r);
    if (!r || !POR_CODIGO.has(r.codigo)) continue;
    if (livros.has(r.codigo) && livros.get(r.codigo).capitulos.length >= r.capitulos.length) continue;
    livros.set(r.codigo, r);
  }

  const problemas = [];
  for (const [cod, nome, esperado] of LIVROS) {
    const l = livros.get(cod);
    if (!l) { problemas.push(`Faltou o livro ${nome} (${cod}).`); continue; }
    const numeros = l.capitulos.map(c => c.n);
    const faltando = [], vazios = [];
    for (let i = 1; i <= esperado; i++) {
      const c = l.capitulos.find(x => x.n === i);
      if (!c) faltando.push(i); else if (c.v.length === 0) vazios.push(i);
    }
    if (faltando.length) problemas.push(`${nome}: faltam ${faltando.length} capítulo(s), ex.: ${faltando.slice(0, 6).join(', ')}.`);
    if (vazios.length) problemas.push(`${nome}: capítulo(s) sem versículos: ${vazios.slice(0, 6).join(', ')}.`);
    const extras = numeros.filter(n => n > esperado);
    if (extras.length) problemas.push(`${nome}: capítulos além do esperado (${extras.join(', ')}).`);
  }
  const sujeira = [];
  for (const l of livros.values()) for (const c of l.capitulos) for (const v of c.v) if (/\\[a-z]|<\/?[a-z]/i.test(v.t)) sujeira.push(`${l.codigo} ${c.n}:${v.n}`);
  if (sujeira.length) problemas.push(`Marcação sobrando no texto (${sujeira.length}), ex.: ${sujeira.slice(0, 5).join(', ')}.`);

  if (problemas.length && !parcial) {
    console.error('\nA Bíblia NÃO foi gerada. Problemas encontrados:');
    problemas.slice(0, 60).forEach(p => console.error(' - ' + p));
    if (problemas.length > 60) console.error(` … e mais ${problemas.length - 60}.`);
    process.exit(1);
  }

  fs.mkdirSync(saida, { recursive: true });
  const indice = [];
  let totalVersiculos = 0;
  for (const [cod, nome, esperado] of LIVROS) {
    const l = livros.get(cod);
    if (!l) continue;
    const caps = [];
    for (let i = 1; i <= esperado; i++) {
      const c = l.capitulos.find(x => x.n === i);
      const o = { v: c ? c.v : [] };
      if (c && c.d) o.d = c.d;
      caps.push(o);
      totalVersiculos += o.v.length;
    }
    fs.writeFileSync(path.join(saida, cod + '.json'), JSON.stringify({ code: cod, name: nome, chapters: caps }));
    indice.push({ code: cod, name: nome, chapters: esperado });
  }
  fs.writeFileSync(path.join(saida, 'index.json'), JSON.stringify({
    traducao: TRADUCAO,
    fonte: FONTE,
    licenca: LICENCA,
    geradoEm: new Date().toISOString(),
    livros: indice
  }));
  console.log(`OK: ${indice.length} livros, ${totalVersiculos} versículos gravados em ${saida}.`);
  if (problemas.length) console.log(`(modo --parcial: ${problemas.length} avisos ignorados)`);
}
main();
