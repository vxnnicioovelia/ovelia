#!/usr/bin/env node
// Importa um único JSON fornecido pelo proprietário. Não baixa fontes nem inventa textos.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const [inputArg, idArg, confirmArg, rootArg] = process.argv.slice(2);
const root = path.resolve(rootArg || '.');
const input = path.resolve(root, inputArg || '');
const id = idArg || '';
const confirm = confirmArg === 'sim';
const die = m => { console.error('ERRO: ' + m); process.exit(1); };
if (!inputArg || !id || !['bpm','matos-soares','figueiredo'].includes(id)) die('Uso: node importar-biblia.mjs <arquivo.json> <id> <sim|nao> [raiz]; id inválido ou arquivo ausente.');
if (!fs.existsSync(input)) die('Arquivo de entrada não encontrado na raiz: ' + inputArg);
if (path.extname(input).toLowerCase() !== '.json') die('Formato aceito nesta versão: JSON Ovelia normalizado. USFM ainda não é suportado.');
let source;
try { source = JSON.parse(fs.readFileSync(input,'utf8')); } catch(e) { die('JSON de entrada inválido: ' + e.message); }
const m = source.metadata || {};
const license = m.licenca || m.license || {};
for (const [label, value] of [['origem',m.origem || m.source],['edição',m.edicao || m.edition],['licença/tipo',license.tipo || license.type],['titular',license.titular || license.rightsHolder],['comprovação da licença',license.comprovacao || license.evidence]]) {
 if (!String(value || '').trim()) die(`Metadado obrigatório ausente: ${label}. Nenhum dado foi gravado.`);
}
if (m.id && m.id !== id) die('metadata.id não corresponde ao id selecionado.');
if (!Array.isArray(source.livros)) die('Entrada deve conter livros[].');
const catalogPath = path.join(root,'dados/biblia/catalogo.json');
if (!fs.existsSync(catalogPath)) die('Catálogo ausente em dados/biblia/catalogo.json.');
const catalog = JSON.parse(fs.readFileSync(catalogPath,'utf8'));
const tr = (catalog.traducoes || []).find(x=>x.id===id);
if (!tr) die('Tradução não cadastrada no catálogo: '+id);
const outDir = path.join(root,'dados/biblia',id);
fs.mkdirSync(outDir,{recursive:true});
const seen = new Set(), indexBooks = [];
for (const book of source.livros) {
 if (!book || !/^[A-Z0-9]{3}$/.test(book.code || '')) die('Livro com código inválido.');
 if (seen.has(book.code)) die('Livro duplicado na entrada: '+book.code);
 seen.add(book.code);
 if (!Array.isArray(book.capitulos)) die(`${book.code}: capitulos[] ausente.`);
 const chapters = book.capitulos.map(ch=>({
   numero: Number(ch.numero),
   versiculos: (ch.versiculos || []).map(v=>({
     numero:Number(v.numero), texto:typeof v.texto==='string'?v.texto:'',
     ...(v.idOriginal != null ? {idOriginal:String(v.idOriginal)} : {})
   }))
 }));
 const data = {schemaVersion:1,id,code:book.code,nome:book.nome || '',idOriginal:book.idOriginal ?? null,particularidades:book.particularidades || {},capitulos:chapters};
 fs.writeFileSync(path.join(outDir,book.code+'.json'),JSON.stringify(data,null,2)+'\n');
 indexBooks.push({code:book.code,nome:book.nome || '',idOriginal:book.idOriginal ?? null,capitulos:chapters.length});
}
const sourceMeta = {
 id, nome:tr.nome, idioma:m.idioma || m.language || tr.idioma,
 origem:m.origem || m.source, edicao:m.edicao || m.edition,
 licenca:{tipo:license.tipo || license.type,titular:license.titular || license.rightsHolder,url:license.url || '',comprovacao:license.comprovacao || license.evidence},
 fonteArquivo:path.basename(input),importadoEm:new Date().toISOString(),
 confirmacaoProprietario:confirm,estado:confirm?'em_preparacao':'em_preparacao'
};
fs.writeFileSync(path.join(outDir,'metadados.json'),JSON.stringify(sourceMeta,null,2)+'\n');
fs.writeFileSync(path.join(outDir,'indice.json'),JSON.stringify({schemaVersion:1,id,nome:tr.nome,livros:indexBooks},null,2)+'\n');
tr.origem=sourceMeta.origem; tr.edicao=sourceMeta.edicao; tr.idioma=sourceMeta.idioma; tr.licenca=sourceMeta.licenca; tr.estado='em_preparacao'; tr.dataValidacao=null;
fs.writeFileSync(catalogPath,JSON.stringify(catalog,null,2)+'\n');
const env={...process.env,OVELIA_CONFIRMAR_LICENCA:confirm?'sim':'nao'};
const result=spawnSync(process.execPath,[path.join(root,'tools/validar-biblia.mjs'),id,root],{stdio:'inherit',env});
if (result.status !== 0) die('Validação reprovada. Os arquivos importados ficam em preparação e não podem ser publicados como tradução disponível.');
if (confirm) {
 // O workflow executa novamente o validador após definir disponível. Só promover após validação completa.
 tr.estado='disponivel'; tr.dataValidacao=new Date().toISOString().slice(0,10);
 fs.writeFileSync(catalogPath,JSON.stringify(catalog,null,2)+'\n');
 const final=spawnSync(process.execPath,[path.join(root,'tools/validar-biblia.mjs'),id,root],{stdio:'inherit',env});
 if(final.status!==0){tr.estado='em_preparacao';tr.dataValidacao=null;fs.writeFileSync(catalogPath,JSON.stringify(catalog,null,2)+'\n');die('Validação final falhou; tradução mantida em_preparacao.');}
}
console.log(confirm?'Importação validada com confirmação do proprietário.':'Importação estrutural; tradução permanece em_preparacao.');
