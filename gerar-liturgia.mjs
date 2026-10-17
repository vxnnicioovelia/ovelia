#!/usr/bin/env node
/* Ovelia — grava a liturgia diária em dados/liturgia/AAAA-MM-DD.json.
   Roda todo dia no GitHub Actions (workflow "Liturgia diária"). Busca hoje e os próximos dias,
   e guarda os arquivos dentro do site para que a página leia tudo localmente.

   Variáveis (opcionais):
     LITURGIA_API            endereço da API (padrão: https://liturgia.up.railway.app/v2/)
     LITURGIA_DIAS_ADIANTE   quantos dias à frente buscar (padrão 7)
     LITURGIA_DIAS_ATRAS     quantos dias para trás buscar (padrão 2)
     LITURGIA_INCLUIR_TEXTO  "sim" (padrão) grava o texto das leituras; "nao" grava só as referências
     LITURGIA_GUARDAR_DIAS   por quantos dias manter arquivos antigos (padrão 90)
     SAIDA_LITURGIA          pasta de saída (padrão dados/liturgia) */
import fs from 'node:fs';
import path from 'node:path';

const API = process.env.LITURGIA_API || 'https://liturgia.up.railway.app/v2/';
const ADIANTE = Number(process.env.LITURGIA_DIAS_ADIANTE ?? 7);
const ATRAS = Number(process.env.LITURGIA_DIAS_ATRAS ?? 2);
const INCLUIR_TEXTO = !/^(nao|não|false|0)$/i.test(process.env.LITURGIA_INCLUIR_TEXTO || 'sim');
const GUARDAR = Number(process.env.LITURGIA_GUARDAR_DIAS ?? 90);
const SAIDA = process.env.SAIDA_LITURGIA || path.join('dados', 'liturgia');

const pad = n => String(n).padStart(2, '0');
function hojeBrasilia() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const [a, m, d] = p.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d));
}
const isoDe = dt => `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
function somaDias(dt, n) { const r = new Date(dt.getTime()); r.setUTCDate(r.getUTCDate() + n); return r; }

function mesmaData(txt, dt) {
  const t = String(txt || '');
  let m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(t);
  let a, mo, d;
  if (m) { d = +m[1]; mo = +m[2]; a = +m[3]; }
  else if ((m = /(\d{4})-(\d{2})-(\d{2})/.exec(t))) { a = +m[1]; mo = +m[2]; d = +m[3]; }
  else return null; // sem data reconhecível
  return a === dt.getUTCFullYear() && mo === dt.getUTCMonth() + 1 && d === dt.getUTCDate();
}

async function buscar(url) {
  let ultimo;
  for (let i = 1; i <= 3; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 45000);
      const r = await fetch(url, { headers: { Accept: 'application/json' }, signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) { ultimo = e; await new Promise(r => setTimeout(r, 3000 * i)); }
  }
  throw ultimo;
}

const ENT = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" };
// remove marcação HTML eventual da fonte, preservando quebras de parágrafo
const s = v => (typeof v === 'string'
  ? v.replace(/<\s*br\s*\/?>/gi, '\n').replace(/<\/\s*(p|div|li)\s*>/gi, '\n').replace(/<[^>]+>/g, '')
      .replace(/&(nbsp|amp|lt|gt|quot|apos|#39);/g, m => ENT[m]).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
  : '');
function normalizaItens(v) {
  const arr = Array.isArray(v) ? v : (v ? [v] : []);
  return arr.map(o => {
    if (typeof o === 'string') o = { texto: o };
    const item = {};
    const ref = s(o.referencia || o.ref || o.referenciaBiblica);
    if (ref) item.referencia = ref;
    if (s(o.titulo)) item.titulo = s(o.titulo);
    if (s(o.refrao)) item.refrao = s(o.refrao);
    if (INCLUIR_TEXTO && s(o.texto)) item.texto = s(o.texto);
    return item;
  }).filter(i => Object.keys(i).length);
}
function normaliza(d, dt) {
  const L = d.leituras || {};
  const leituras = {
    primeiraLeitura: normalizaItens(L.primeiraLeitura),
    salmo: normalizaItens(L.salmo),
    segundaLeitura: normalizaItens(L.segundaLeitura),
    aclamacao: normalizaItens(L.aclamacao || L.aleluia),
    evangelho: normalizaItens(L.evangelho)
  };
  return {
    data: isoDe(dt),
    liturgia: s(d.liturgia || d.celebracao),
    cor: s(d.cor || d.corLiturgica),
    leituras,
    atualizadoEm: new Date().toISOString()
  };
}
const temLeituras = o => ['primeiraLeitura', 'salmo', 'evangelho'].some(k => o.leituras[k].length);

async function main() {
  fs.mkdirSync(SAIDA, { recursive: true });
  const hoje = hojeBrasilia();
  const hojeIso = isoDe(hoje);
  let gravados = 0, falhas = 0;
  for (let n = -ATRAS; n <= ADIANTE; n++) {
    const dt = somaDias(hoje, n), iso = isoDe(dt);
    const arquivo = path.join(SAIDA, iso + '.json');
    // dias passados que já temos não precisam ser refeitos
    if (n < 0 && fs.existsSync(arquivo)) continue;
    const url = `${API}?dia=${dt.getUTCDate()}&mes=${dt.getUTCMonth() + 1}&ano=${dt.getUTCFullYear()}`;
    try {
      let d = await buscar(url);
      if (Array.isArray(d)) d = d[0];
      if (!d || !d.leituras) throw new Error('resposta sem leituras');
      const ok = mesmaData(d.data, dt);
      if (ok === false) throw new Error(`a API devolveu outra data (${d.data})`);
      if (ok === null && iso !== hojeIso) throw new Error('resposta sem data reconhecível');
      const o = normaliza(d, dt);
      if (!o.liturgia || !temLeituras(o)) throw new Error('resposta incompleta');
      fs.writeFileSync(arquivo, JSON.stringify(o));
      gravados++;
      console.log('gravado', iso, '-', o.liturgia);
    } catch (e) {
      falhas++;
      console.warn('FALHOU', iso, '-', e.message);
    }
  }
  // remove arquivos antigos e atualiza o índice
  const limite = isoDe(somaDias(hoje, -GUARDAR));
  const datas = [];
  for (const f of fs.readdirSync(SAIDA)) {
    const m = /^(\d{4}-\d{2}-\d{2})\.json$/.exec(f);
    if (!m) continue;
    if (m[1] < limite) fs.unlinkSync(path.join(SAIDA, f)); else datas.push(m[1]);
  }
  datas.sort();
  fs.writeFileSync(path.join(SAIDA, 'index.json'), JSON.stringify({ atualizadoEm: new Date().toISOString(), datas }));
  console.log(`Resumo: ${gravados} gravados, ${falhas} falhas, ${datas.length} datas no índice.`);
  if (!fs.existsSync(path.join(SAIDA, hojeIso + '.json'))) {
    console.error('ERRO: não há liturgia de hoje (' + hojeIso + ').');
    process.exit(1);
  }
}
main();
