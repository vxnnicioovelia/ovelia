/* Ovelia — leitor bíblico integrado.
   A BPM é carregada por capítulo a partir da edição pública identificada nos créditos;
   outras traduções permanecem bloqueadas enquanto não houver conteúdo e licença validados. */
(function () {
  'use strict';
  var BASE = 'dados/biblia/';
  var BPM_REMOTE_BASE = 'https://raw.githubusercontent.com/GuilhermeGms3/scriptorium-os/ff8c1b95abd6a70c3bf83ca3467b22fe660fe745/generated/corpora/biblia-portuguesa-mundial/2026-08-19/books/';
  var BPM_EDITION_KEY = 'biblia-portuguesa-mundial-2026-08-19';
  var BPM_CACHE_NAME = 'ovelia-biblia-bpm-20261023-v2';
  var BPM_BOOK_SLUGS = {
    'GEN':'genesis','EXO':'exodus','LEV':'leviticus','NUM':'numbers','DEU':'deuteronomy',
    'JOS':'joshua','JDG':'judges','RUT':'ruth','1SA':'1-samuel','2SA':'2-samuel',
    '1KI':'1-kings','2KI':'2-kings','1CH':'1-chronicles','2CH':'2-chronicles','EZR':'ezra','NEH':'nehemiah',
    'TOB':'tobit','JDT':'judith','ESG':'greek-esther','JOB':'job','PSA':'psalms','PRO':'proverbs',
    'ECC':'ecclesiastes','SNG':'song-of-songs','WIS':'wisdom','SIR':'sirach','ISA':'isaiah','JER':'jeremiah',
    'LAM':'lamentations','BAR':'baruch','EZK':'ezekiel','DAG':'greek-daniel','HOS':'hosea','JOL':'joel',
    'AMO':'amos','OBA':'obadiah','JON':'jonah','MIC':'micah','NAM':'nahum','HAB':'habakkuk','ZEP':'zephaniah',
    'HAG':'haggai','ZEC':'zechariah','MAL':'malachi','1MA':'1-maccabees','2MA':'2-maccabees',
    'MAT':'matthew','MRK':'mark','LUK':'luke','JHN':'john','ACT':'acts','ROM':'romans',
    '1CO':'1-corinthians','2CO':'2-corinthians','GAL':'galatians','EPH':'ephesians','PHP':'philippians',
    'COL':'colossians','1TH':'1-thessalonians','2TH':'2-thessalonians','1TI':'1-timothy','2TI':'2-timothy',
    'TIT':'titus','PHM':'philemon','HEB':'hebrews','JAS':'james','1PE':'1-peter','2PE':'2-peter',
    '1JN':'1-john','2JN':'2-john','3JN':'3-john','JUD':'jude','REV':'revelation'
  };
  var books = [
    {name:'Gênesis',code:'GEN',chapters:50,testament:'Antigo Testamento'},
    {name:'Êxodo',code:'EXO',chapters:40,testament:'Antigo Testamento'},
    {name:'Levítico',code:'LEV',chapters:27,testament:'Antigo Testamento'},
    {name:'Números',code:'NUM',chapters:36,testament:'Antigo Testamento'},
    {name:'Deuteronômio',code:'DEU',chapters:34,testament:'Antigo Testamento'},
    {name:'Josué',code:'JOS',chapters:24,testament:'Antigo Testamento'},
    {name:'Juízes',code:'JDG',chapters:21,testament:'Antigo Testamento'},
    {name:'Rute',code:'RUT',chapters:4,testament:'Antigo Testamento'},
    {name:'1 Samuel',code:'1SA',chapters:31,testament:'Antigo Testamento'},
    {name:'2 Samuel',code:'2SA',chapters:24,testament:'Antigo Testamento'},
    {name:'1 Reis',code:'1KI',chapters:22,testament:'Antigo Testamento'},
    {name:'2 Reis',code:'2KI',chapters:25,testament:'Antigo Testamento'},
    {name:'1 Crônicas',code:'1CH',chapters:29,testament:'Antigo Testamento'},
    {name:'2 Crônicas',code:'2CH',chapters:36,testament:'Antigo Testamento'},
    {name:'Esdras',code:'EZR',chapters:10,testament:'Antigo Testamento'},
    {name:'Neemias',code:'NEH',chapters:13,testament:'Antigo Testamento'},
    {name:'Tobias',code:'TOB',chapters:14,testament:'Antigo Testamento'},
    {name:'Judite',code:'JDT',chapters:16,testament:'Antigo Testamento'},
    {name:'Ester',code:'ESG',chapters:10,testament:'Antigo Testamento',note:'Versão grega com os acréscimos deuterocanônicos.'},
    {name:'Jó',code:'JOB',chapters:42,testament:'Antigo Testamento'},
    {name:'Salmos',code:'PSA',chapters:150,testament:'Antigo Testamento'},
    {name:'Provérbios',code:'PRO',chapters:31,testament:'Antigo Testamento'},
    {name:'Eclesiastes',code:'ECC',chapters:12,testament:'Antigo Testamento'},
    {name:'Cântico dos Cânticos',code:'SNG',chapters:8,testament:'Antigo Testamento'},
    {name:'Sabedoria',code:'WIS',chapters:19,testament:'Antigo Testamento'},
    {name:'Eclesiástico (Sirácida)',code:'SIR',chapters:51,testament:'Antigo Testamento'},
    {name:'Isaías',code:'ISA',chapters:66,testament:'Antigo Testamento'},
    {name:'Jeremias',code:'JER',chapters:52,testament:'Antigo Testamento'},
    {name:'Lamentações',code:'LAM',chapters:5,testament:'Antigo Testamento'},
    {name:'Baruc',code:'BAR',chapters:6,testament:'Antigo Testamento'},
    {name:'Ezequiel',code:'EZK',chapters:48,testament:'Antigo Testamento'},
    {name:'Daniel',code:'DAG',chapters:14,testament:'Antigo Testamento',note:'Versão com porções gregas.'},
    {name:'Oseias',code:'HOS',chapters:14,testament:'Antigo Testamento'},
    {name:'Joel',code:'JOL',chapters:3,testament:'Antigo Testamento'},
    {name:'Amós',code:'AMO',chapters:9,testament:'Antigo Testamento'},
    {name:'Abdias',code:'OBA',chapters:1,testament:'Antigo Testamento'},
    {name:'Jonas',code:'JON',chapters:4,testament:'Antigo Testamento'},
    {name:'Miqueias',code:'MIC',chapters:7,testament:'Antigo Testamento'},
    {name:'Naum',code:'NAM',chapters:3,testament:'Antigo Testamento'},
    {name:'Habacuc',code:'HAB',chapters:3,testament:'Antigo Testamento'},
    {name:'Sofonias',code:'ZEP',chapters:3,testament:'Antigo Testamento'},
    {name:'Ageu',code:'HAG',chapters:2,testament:'Antigo Testamento'},
    {name:'Zacarias',code:'ZEC',chapters:14,testament:'Antigo Testamento'},
    {name:'Malaquias',code:'MAL',chapters:4,testament:'Antigo Testamento'},
    {name:'1 Macabeus',code:'1MA',chapters:16,testament:'Antigo Testamento'},
    {name:'2 Macabeus',code:'2MA',chapters:15,testament:'Antigo Testamento'},
    {name:'Mateus',code:'MAT',chapters:28,testament:'Novo Testamento'},
    {name:'Marcos',code:'MRK',chapters:16,testament:'Novo Testamento'},
    {name:'Lucas',code:'LUK',chapters:24,testament:'Novo Testamento'},
    {name:'João',code:'JHN',chapters:21,testament:'Novo Testamento'},
    {name:'Atos dos Apóstolos',code:'ACT',chapters:28,testament:'Novo Testamento'},
    {name:'Romanos',code:'ROM',chapters:16,testament:'Novo Testamento'},
    {name:'1 Coríntios',code:'1CO',chapters:16,testament:'Novo Testamento'},
    {name:'2 Coríntios',code:'2CO',chapters:13,testament:'Novo Testamento'},
    {name:'Gálatas',code:'GAL',chapters:6,testament:'Novo Testamento'},
    {name:'Efésios',code:'EPH',chapters:6,testament:'Novo Testamento'},
    {name:'Filipenses',code:'PHP',chapters:4,testament:'Novo Testamento'},
    {name:'Colossenses',code:'COL',chapters:4,testament:'Novo Testamento'},
    {name:'1 Tessalonicenses',code:'1TH',chapters:5,testament:'Novo Testamento'},
    {name:'2 Tessalonicenses',code:'2TH',chapters:3,testament:'Novo Testamento'},
    {name:'1 Timóteo',code:'1TI',chapters:6,testament:'Novo Testamento'},
    {name:'2 Timóteo',code:'2TI',chapters:4,testament:'Novo Testamento'},
    {name:'Tito',code:'TIT',chapters:3,testament:'Novo Testamento'},
    {name:'Filêmon',code:'PHM',chapters:1,testament:'Novo Testamento'},
    {name:'Hebreus',code:'HEB',chapters:13,testament:'Novo Testamento'},
    {name:'Tiago',code:'JAS',chapters:5,testament:'Novo Testamento'},
    {name:'1 Pedro',code:'1PE',chapters:5,testament:'Novo Testamento'},
    {name:'2 Pedro',code:'2PE',chapters:3,testament:'Novo Testamento'},
    {name:'1 João',code:'1JN',chapters:5,testament:'Novo Testamento'},
    {name:'2 João',code:'2JN',chapters:1,testament:'Novo Testamento'},
    {name:'3 João',code:'3JN',chapters:1,testament:'Novo Testamento'},
    {name:'Judas',code:'JUD',chapters:1,testament:'Novo Testamento'},
    {name:'Apocalipse',code:'REV',chapters:22,testament:'Novo Testamento'}
  ];

  var $ = function(id){ return document.getElementById(id); };
  var texto = $('bibliaTexto');
  var title = $('bibliaTituloLivro'), subtitle = $('bibliaSubtitulo');
  var chapterSelect = $('bibliaCapitulo'), prev = $('bibliaAnterior'), next = $('bibliaProximo');
  var prev2 = $('bibliaAnterior2'), next2 = $('bibliaProximo2'), nav2 = $('bibliaNavBaixo');
  var status = $('bibliaStatus'), bookList = $('livros'), panel = $('bibliaLeitor');
  if (!texto || !chapterSelect || !panel) return;
  // O catálogo editorial canônico fica na raiz do site; os textos seguem em dados/biblia/<id>/.
  var CATALOG_URL = 'catalogo-biblia.json';
  var selected = null, chapter = 1, translation = null, translations = [], catalogReady = false;
  var bookCache = Object.create(null), indexCache = Object.create(null), chapterCache = Object.create(null), requestId = 0;
  var FONT_KEY = 'ovelia-biblia-leitura-v1';
  var ESTUDOS_RETORNO_KEY = 'ovelia-estudos-retorno-biblia-v1';
  var pendingVerse = null;
  var defaultTranslations = [
    {id:'bpm',nome:'Bíblia Portuguesa Mundial (BPM)',estado:'em_preparacao',estadoLeitura:'disponivel_online',fonteRemota:true,origem:'https://ebible.org/find/details.php?id=porbrbsl',edicao:'Bíblia Portuguesa Mundial, pacote eBible.org de 19/08/2026; rascunho em revisão. Conteúdo consultado por capítulo em espelho técnico fixado.',licenca:{tipo:'Domínio público (declarado pelo eBible.org)',titular:'Bíblia Portuguesa Mundial / eBible.org',url:'https://ebible.org/porbrbsl/copyright.htm'}},
    {id:'matos-soares',nome:'Manuel de Matos Soares',estado:'em_preparacao',origem:'',edicao:'',licenca:{}},
    {id:'figueiredo',nome:'Antônio Pereira de Figueiredo',estado:'em_preparacao',origem:'',edicao:'',licenca:{}}
  ];
  function normalize(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g,' ').trim(); }
  function findBook(name) { var n=normalize(name); return books.find(function(b){return normalize(b.name)===n;}) || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function isKids() { return document.body.classList.contains('perfil-kids'); }
  function isAvailable(t) { return !!t && (t.estado === 'disponivel' || (t.id === 'bpm' && t.fonteRemota === true && t.estadoLeitura === 'disponivel_online')); }
  function chapterCount(book, t) {
    t=t||translation; if(!t)return book.chapters;
    var item=Array.isArray(t.livrosEsperados)?t.livrosEsperados.find(function(x){return x.code===book.code;}):null;
    var override=t.diferencasCapitulos&&t.diferencasCapitulos[book.code];
    if(override&&Number(override)>0)return Number(override);
    if(item&&Number(item.chapters)>0)return Number(item.chapters);
    return book.chapters;
  }
  function keyFor(t) { return 'ovelia-biblia-posicao-v1-' + t.id; }
  function readPosition(t) {
    try { var p=JSON.parse(localStorage.getItem(keyFor(t))||'null'); if(p&&typeof p.code==='string'&&Number.isFinite(+p.chapter)) return p; } catch(e) {}
    return null;
  }
  function savePosition() {
    if (!translation || !selected) return;
    try { localStorage.setItem(keyFor(translation), JSON.stringify({code:selected.code,chapter:chapter})); } catch(e) {}
  }
  function ensureControls() {
    var controls = $('bibliaModoLivro'); if (controls) return controls;
    controls = document.createElement('div'); controls.id='bibliaModoLivro'; controls.className='biblia-modo-livro';
    controls.innerHTML = '<div class="biblia-config-linha"><label for="bibliaTraducao">Tradução</label><select id="bibliaTraducao" aria-label="Escolher tradução bíblica"></select></div>'+
      '<div class="biblia-config-linha biblia-ajustes-linha"><label for="bibliaFonteTamanho">Tamanho da letra</label><select id="bibliaFonteTamanho"><option value="0">Normal</option><option value="1">Grande</option><option value="2">Muito grande</option></select></div>'+
      '<div class="biblia-config-linha biblia-ajustes-linha"><label for="bibliaEspacamento">Espaçamento</label><select id="bibliaEspacamento"><option value="normal">Normal</option><option value="amplo">Amplo</option><option value="extra">Extra</option></select></div>'+
      '<button type="button" class="btn g biblia-tema-botao" id="bibliaAlternarTema" aria-pressed="false">Tema da leitura: claro</button>'+
      '<div class="biblia-config-linha biblia-ajustes-linha biblia-luz-azul-controle"><label for="bibliaLuzAzul">Diminuir luz azul (tela inteira)</label><input type="checkbox" id="bibliaLuzAzul" aria-describedby="bibliaLuzAzulAjuda"><span id="bibliaLuzAzulAjuda" class="biblia-controle-ajuda">Aplica um tom quente uniforme à tela inteira.</span></div>'+
      '<div class="biblia-config-linha biblia-ajustes-linha"><label for="bibliaLuzAzulIntensidade">Intensidade do filtro</label><input type="range" id="bibliaLuzAzulIntensidade" min="0" max="45" step="5" value="20"><output id="bibliaLuzAzulValor" for="bibliaLuzAzulIntensidade">20%</output></div>';
    var top = panel.querySelector('.biblia-leitor-topo');
    if (top && top.parentNode) top.parentNode.insertBefore(controls, top.nextSibling); else panel.insertBefore(controls, panel.firstChild);
    return controls;
  }
  var controls = ensureControls(), translationSelect = $('bibliaTraducao'), fontSelect = $('bibliaFonteTamanho'), spacingSelect = $('bibliaEspacamento'), themeButton = $('bibliaAlternarTema');
  // Parte 16: configurações recolhíveis no celular para priorizar a leitura.
  function setupCompactSettings(){
    if(!controls || controls.querySelector('.biblia-ajustes-resumo'))return;
    var summary=document.createElement('button');
    summary.type='button'; summary.className='biblia-ajustes-resumo';
    summary.setAttribute('aria-controls','bibliaConfiguracoes');
    var expanded=!(window.matchMedia && window.matchMedia('(max-width: 620px)').matches);
    summary.setAttribute('aria-expanded',String(expanded));
    summary.innerHTML='<strong>Ajustes de leitura</strong><span>Tradução, letra, tema e luz azul</span>';
    var wrapper=document.createElement('div'); wrapper.id='bibliaConfiguracoes'; wrapper.className='biblia-configuracoes';
    while(controls.firstChild){wrapper.appendChild(controls.firstChild);}
    wrapper.hidden=!expanded; controls.appendChild(summary); controls.appendChild(wrapper);
    summary.addEventListener('click',function(){
      var open=summary.getAttribute('aria-expanded')!=='true';
      summary.setAttribute('aria-expanded',String(open)); wrapper.hidden=!open;
    });
  }
  setupCompactSettings();
  var returnStudyButton=document.getElementById('bibliaVoltarEstudo');
  if(!returnStudyButton&&panel){returnStudyButton=document.createElement('button');returnStudyButton.type='button';returnStudyButton.id='bibliaVoltarEstudo';returnStudyButton.className='btn g';returnStudyButton.textContent='← Voltar ao estudo';returnStudyButton.hidden=true;var panelTop=panel.querySelector('.biblia-leitor-topo');if(panelTop)panelTop.appendChild(returnStudyButton);returnStudyButton.addEventListener('click',function(){if(window.OveliaJornada&&window.OveliaJornada.retornarDaBiblia())returnStudyButton.hidden=true;});}
  function atualizarVoltaEstudo(){try{returnStudyButton.hidden=!sessionStorage.getItem(ESTUDOS_RETORNO_KEY);}catch(e){returnStudyButton.hidden=true;}}
  atualizarVoltaEstudo();
  function renderTranslationOptions() {
    var current = translation ? translation.id : '';
    translationSelect.innerHTML='';
    translations.forEach(function(t){
      var opt=document.createElement('option'); opt.value=t.id;
      opt.textContent=t.nome + (t.id==='bpm' && isAvailable(t) ? ' — online (rascunho em revisão)' : (isAvailable(t) ? '' : ' — Em preparação'));
      opt.disabled=!isAvailable(t); translationSelect.appendChild(opt);
    });
    var firstAvailable=translations.find(isAvailable);
    translation=translations.find(function(t){return t.id===current && isAvailable(t);}) || firstAvailable || translations[0] || null;
    if (translation) translationSelect.value=translation.id;
    translationSelect.disabled=isKids() || !firstAvailable;
    if (isKids()) translationSelect.setAttribute('aria-label','Bíblia adulta indisponível no perfil Pequenas Ovelias');
    else translationSelect.setAttribute('aria-label','Escolher tradução; BPM disponível online, edição em revisão');
  }
  function setStatus(message, retry) {
    status.textContent='';
    var p=document.createElement('p'); p.textContent=message; status.appendChild(p);
    if (retry) { var b=document.createElement('button'); b.type='button'; b.className='btn g'; b.textContent='Tentar novamente'; b.addEventListener('click',function(){loadChapter(chapter);}); status.appendChild(b); }
    status.hidden=false;
  }
  function metadataCredits(t) {
    var license=t&&t.licenca||{};
    var parts=[];
    if(t&&t.origem) parts.push('Fonte: '+t.origem);
    if(t&&t.edicao) parts.push('Edição: '+t.edicao);
    if(license.tipo) parts.push('Licença declarada: '+license.tipo);
    if(license.url) parts.push('Licença: '+license.url);
    var credit=$('bibliaCreditosFonte');
    if(!credit){credit=document.createElement('p');credit.id='bibliaCreditosFonte';credit.className='biblia-creditos';panel.appendChild(credit);}
    credit.textContent=parts.length?parts.join(' · '):'Créditos e licença da tradução ainda não confirmados. Texto integral indisponível.';
  }
  function clearText() { texto.textContent=''; }
  function fillChapters(book) {
    chapterSelect.innerHTML='';
    for(var i=1;i<=chapterCount(book);i++){var opt=document.createElement('option');opt.value=String(i);opt.textContent='Capítulo '+i;chapterSelect.appendChild(opt);}
  }
  function updateControls() {
    var off=!selected || isKids(); chapterSelect.disabled=off || !translation || !isAvailable(translation);
    var idx=selected?books.indexOf(selected):-1;
    var before=off || (chapter===1&&idx===0), after=off || (selected&&chapter===chapterCount(selected)&&idx===books.length-1);
    [prev,prev2].forEach(function(b){if(b)b.disabled=before;});
    [next,next2].forEach(function(b){if(b)b.disabled=after;});
    if(nav2)nav2.hidden=off;
    chapterSelect.value=selected?String(chapter):'';
  }
  function normalizeBookData(raw, book, tForData) {
    if(!raw || typeof raw!=='object') throw new Error('Arquivo de livro inválido.');
    var source=Array.isArray(raw.capitulos)?raw.capitulos:raw.chapters;
    if(!Array.isArray(source)) throw new Error('O arquivo não contém capítulos.');
    var normalized=source.map(function(c,ci){
      var verses=Array.isArray(c.versiculos)?c.versiculos:c.v;
      if(!Array.isArray(verses)) throw new Error('Capítulo '+(ci+1)+' sem lista de versículos.');
      return {n:Number(c.numero||c.number||c.n||ci+1),d:c.titulo||c.title||c.d||'',v:verses.map(function(v,vi){return {n:v.numero!=null?v.numero:(v.numeroVersiculo!=null?v.numeroVersiculo:(v.n!=null?v.n:vi+1)),t:v.texto!=null?v.texto:(v.text!=null?v.text:v.t),s:v.secao||v.section||v.s||'',p:!!(v.paragrafo||v.paragraph||v.p)};})};
    });
    if(normalized.length!==chapterCount(book,tForData)) throw new Error('Quantidade de capítulos inválida para '+book.name+' nesta tradução.');
    return {chapters:normalized};
  }
  function loadIndex(t) {
    if(indexCache[t.id]) return Promise.resolve(indexCache[t.id]);
    return fetch(BASE+t.id+'/indice.json').then(function(r){if(!r.ok)throw new Error('Índice não encontrado ('+r.status+').');return r.json();}).then(function(d){
      var entries=Array.isArray(d.livros)?d.livros:[];
      indexCache[t.id]=entries; return entries;
    });
  }
  function loadBook(book) {
    if(!translation || !isAvailable(translation)) return Promise.reject(new Error('Esta tradução está em preparação.'));
    var t=translation, cacheKey=t.id+':'+book.code;
    if(bookCache[cacheKey]) return Promise.resolve(bookCache[cacheKey]);
    return loadIndex(t).then(function(entries){
      var exists=entries.some(function(e){return (typeof e==='string'?e:(e.code||e.codigo||e.id))===book.code;});
      if(!exists) throw new Error('O livro '+book.name+' não existe no índice desta tradução.');
      return fetch(BASE+t.id+'/'+book.code+'.json').then(function(r){if(!r.ok)throw new Error('Arquivo do livro não encontrado ('+r.status+').');return r.json();});
    }).then(function(raw){var data=normalizeBookData(raw,book,t);bookCache[cacheKey]=data;return data;});
  }
  function openBpmCache() {
    try { return window.caches && window.caches.open ? window.caches.open(BPM_CACHE_NAME).catch(function(){return null;}) : Promise.resolve(null); }
    catch(e) { return Promise.resolve(null); }
  }
  function fetchJsonCached(url, backupUrl) {
    var candidates=[url];
    if(backupUrl && backupUrl!==url) candidates.push(backupUrl);
    function tryNetwork(index) {
      if(index>=candidates.length) return Promise.reject(new Error('Não foi possível acessar a fonte online.'));
      var candidate=candidates[index], controller=typeof AbortController!=='undefined'?new AbortController():null;
      var timer=controller?setTimeout(function(){controller.abort();},8000):null;
      return fetch(candidate, { method:'GET', mode:'cors', credentials:'omit', cache:'no-cache', signal:controller?controller.signal:undefined }).then(function(response){
        if(!response.ok) throw new Error('A fonte da Bíblia respondeu HTTP '+response.status+'.');
        var copy=response.clone();
        return response.json().then(function(data){
          return openBpmCache().then(function(cache){
            if(!cache) return data;
            return cache.put(candidate,copy).catch(function(){return null;}).then(function(){return data;});
          });
        });
      }).then(function(data){if(timer)clearTimeout(timer);return data;}).catch(function(){if(timer)clearTimeout(timer);return tryNetwork(index+1);});
    }
    return tryNetwork(0).catch(function(){
      return openBpmCache().then(function(cache){
        if(!cache) throw new Error('Não foi possível acessar a Bíblia online. Confira sua conexão e tente novamente.');
        return candidates.reduce(function(chain,candidate){
          return chain.then(function(found){return found || cache.match(candidate);});
        },Promise.resolve(null)).then(function(saved){
          if(saved) return saved.json();
          throw new Error('Este capítulo ainda não está salvo no aparelho e não foi possível acessar a Bíblia online. Confira sua conexão e tente novamente.');
        });
      });
    });
  }
  function loadBpmChapter(book, chapterNumber) {
    var slug=BPM_BOOK_SLUGS[book.code];
    if(!slug) return Promise.reject(new Error('Este livro ainda não está mapeado na edição BPM.'));
    var n=Number(chapterNumber);
    if(!Number.isInteger(n)||n<1||n>chapterCount(book)) return Promise.reject(new Error('O capítulo solicitado não existe no catálogo.'));
    var file=(n<10?'0':'')+String(n)+'.json';
    var path=slug+'/'+file;
    var url=BPM_REMOTE_BASE+path;
    var backupUrl='https://cdn.jsdelivr.net/gh/GuilhermeGms3/scriptorium-os@ff8c1b95abd6a70c3bf83ca3467b22fe660fe745/generated/corpora/biblia-portuguesa-mundial/2026-08-19/books/'+path;
    var key='bpm:'+book.code+':'+n;
    if(chapterCache[key]) return Promise.resolve(chapterCache[key]);
    return fetchJsonCached(url,backupUrl).then(function(raw){
      if(!raw||raw.chapter!==n||!Array.isArray(raw.verses)) throw new Error('O arquivo recebido não tem o formato esperado para '+book.name+' '+n+'.');
      var verses=raw.verses.map(function(v){
        var text=v&&v.translations&&v.translations[BPM_EDITION_KEY];
        var number=Number(v&&v.verse);
        if(!Number.isInteger(number)||number<1||typeof text!=='string'||!text.trim()) return null;
        return {n:number,t:text.trim(),s:'',p:false};
      }).filter(Boolean);
      if(!verses.length) throw new Error('O arquivo de '+book.name+' '+n+' não contém versículos utilizáveis.');
      var result={chapter:{n:n,d:'',v:verses},chapters:null};
      chapterCache[key]=result;
      return result;
    });
  }
  function loadChapterData(book, chapterNumber, t) {
    t=t||translation;
    if(!t||!isAvailable(t)) return Promise.reject(new Error('Esta tradução ainda não está disponível para leitura.'));
    if(t.id==='bpm' && t.fonteRemota) return loadBpmChapter(book,chapterNumber);
    return loadBook(book);
  }
  function drawChapter(book,data,ch) {
    var cap=data.chapter || (data.chapters && data.chapters[ch-1]);
    if(!cap || !Array.isArray(cap.v) || !cap.v.length){clearText();setStatus('Este capítulo não existe ou ainda não foi validado nesta tradução.');return;}
    var html='',open=false;
    if(cap.d) html+='<p class="biblia-titulo-salmo">'+esc(cap.d)+'</p>';
    cap.v.forEach(function(v){
      if(v.t==null || String(v.t).trim()==='') return;
      if(v.s){if(open){html+='</p>';open=false;}html+='<h4 class="biblia-secao">'+esc(v.s)+'</h4>';}
      if(!open || v.p || v.s){if(open)html+='</p>';html+='<p class="biblia-par">';open=true;}
      html+='<span class="biblia-v" data-versiculo="'+esc(v.n)+'"><sup class="biblia-n">'+esc(v.n)+'</sup>'+esc(v.t).replace(/\n/g,'<br>')+'</span> ';
    });
    if(open)html+='</p>';
    texto.innerHTML=html;
    if(!html){setStatus('Este capítulo não contém texto validado.');return;}
    status.hidden=true;
  }
  function loadChapter(nextChapter, options) {
    options=options||{};
    if(!selected)return;
    if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');updateControls();return;}
    var requestedChapter=Number(nextChapter)||1;
    if(requestedChapter<1||requestedChapter>chapterCount(selected)){clearText();setStatus('O capítulo '+requestedChapter+' não existe em '+selected.name+' nesta tradução.');return;}
    chapter=requestedChapter;
    var book=selected,ch=chapter,t=translation,token=++requestId;
    title.textContent=book.name+' '+ch;
    subtitle.textContent=book.testament+(book.note?' · '+book.note:'');
    chapterSelect.value=String(ch);updateControls();savePosition();metadataCredits(t);clearText();
    if(!isAvailable(t)){setStatus((t?t.nome:'Esta tradução')+' ainda não está disponível para leitura. A navegação por livro e capítulo permanece disponível.');return;}
    setStatus('Carregando '+book.name+' '+ch+'…');
    loadChapterData(book,ch,t).then(function(data){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}drawChapter(book,data,ch);if(pendingVerse){var alvo=texto.querySelector('[data-versiculo="'+String(pendingVerse).replace(/[^0-9]/g,'')+'"]');if(alvo){alvo.classList.add('biblia-versiculo-destacado');alvo.scrollIntoView({behavior:'smooth',block:'center'});}pendingVerse=null;}}).catch(function(err){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}clearText();setStatus(err&&err.message?err.message:'Não foi possível carregar este capítulo.',true);});
    if(!options.noScroll && panel.scrollIntoView) panel.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function selectBook(book, restore) {
    if(isKids()){setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}
    selected=book;chapter=1;fillChapters(book);
    if(restore&&translation){var pos=readPosition(translation);if(pos){var restored=books.find(function(b){return b.code===pos.code;});if(restored){selected=restored;chapter=Math.max(1,Math.min(chapterCount(restored),+pos.chapter||1));fillChapters(restored);}}}
    loadChapter(chapter);
  }
  function move(delta) {
    if(!selected||isKids())return;
    var idx=books.indexOf(selected), target=chapter+delta;
    if(target<1&&idx>0){selected=books[idx-1];fillChapters(selected);loadChapter(chapterCount(selected));}
    else if(target>chapterCount(selected)&&idx<books.length-1){selected=books[idx+1];fillChapters(selected);loadChapter(1);}
    else if(target>=1&&target<=chapterCount(selected))loadChapter(target);
    else setStatus('Você chegou ao início ou ao fim do catálogo de livros.');
  }
  function applyReadingSettings() {
    panel.classList.remove('biblia-fonte-1','biblia-fonte-2','biblia-espaco-amplo','biblia-espaco-extra','biblia-tema-escuro','biblia-tema-claro');
    if(fontSelect.value==='1')panel.classList.add('biblia-fonte-1');
    if(fontSelect.value==='2')panel.classList.add('biblia-fonte-2');
    if(spacingSelect.value==='amplo')panel.classList.add('biblia-espaco-amplo');
    if(spacingSelect.value==='extra')panel.classList.add('biblia-espaco-extra');
    var dark=themeButton.getAttribute('aria-pressed')==='true';
    panel.classList.add(dark?'biblia-tema-escuro':'biblia-tema-claro');
    themeButton.textContent=dark?'Tema da leitura: escuro':'Tema da leitura: claro';
    themeButton.setAttribute('aria-label',dark?'Tema escuro ativo. Toque para usar o tema claro':'Tema claro ativo. Toque para usar o tema escuro');
  }
  var blueLightToggle=$('bibliaLuzAzul'), blueLightRange=$('bibliaLuzAzulIntensidade'), blueLightOutput=$('bibliaLuzAzulValor');
  function syncBlueLightFromGlobal(){
    var globalToggle=$('filtroQuente'), globalRange=$('filtroIntensidade'), saved=null;
    try{saved=JSON.parse(localStorage.getItem('ovelia-filtro-quente')||'null');}catch(e){}
    if(globalToggle) blueLightToggle.checked=!!globalToggle.checked;
    else blueLightToggle.checked=!!(saved&&saved.ativo);
    var level=globalRange?Number(globalRange.value):(saved&&Number.isFinite(+saved.intensidade)?+saved.intensidade:20);
    level=Math.max(0,Math.min(45,Number.isFinite(level)?level:20));
    blueLightRange.value=String(level); if(blueLightOutput)blueLightOutput.value=level+'%';
  }
  function applyBlueLightToGlobal(){
    var globalToggle=$('filtroQuente'), globalRange=$('filtroIntensidade');
    if(globalToggle){
      globalToggle.checked=!!blueLightToggle.checked;
      globalToggle.dispatchEvent(new Event('change',{bubbles:true}));
    }else{
      document.body.classList.toggle('filtro-quente-ativo',!!blueLightToggle.checked);
      document.documentElement.classList.toggle('filtro-quente-global',!!blueLightToggle.checked);
    }
    if(globalRange){
      globalRange.value=String(Math.max(0,Math.min(45,+blueLightRange.value||0)));
      globalRange.dispatchEvent(new Event('input',{bubbles:true}));
    }else{
      document.documentElement.style.setProperty('--ovelia-filtro-quente-opacidade',String(blueLightToggle.checked?(Math.max(0,Math.min(45,+blueLightRange.value||0))/45)*0.42:0));
    }
    if(blueLightOutput)blueLightOutput.value=blueLightRange.value+'%';
  }
  blueLightToggle.addEventListener('change',applyBlueLightToGlobal);
  blueLightRange.addEventListener('input',applyBlueLightToGlobal);
  var globalBlueToggle=$('filtroQuente'), globalBlueRange=$('filtroIntensidade');
  if(globalBlueToggle)globalBlueToggle.addEventListener('change',syncBlueLightFromGlobal);
  if(globalBlueRange)globalBlueRange.addEventListener('input',syncBlueLightFromGlobal);
  syncBlueLightFromGlobal();
    function saveReadingSettings(){try{localStorage.setItem(FONT_KEY,JSON.stringify({font:fontSelect.value,space:spacingSelect.value,dark:themeButton.getAttribute('aria-pressed')==='true'}));}catch(e){}}
  function restoreReadingSettings(){try{var s=JSON.parse(localStorage.getItem(FONT_KEY)||'null');if(s){fontSelect.value=['0','1','2'].indexOf(String(s.font))>=0?String(s.font):'0';spacingSelect.value=['normal','amplo','extra'].indexOf(s.space)>=0?s.space:'normal';themeButton.setAttribute('aria-pressed',String(!!s.dark));}}catch(e){}applyReadingSettings();}
  function initCatalog() {
    return fetch(CATALOG_URL).then(function(r){if(!r.ok)throw new Error('Catálogo ausente');return r.json();}).then(function(data){
      if(!data||!Array.isArray(data.traducoes))throw new Error('Catálogo inválido');
      translations=defaultTranslations.map(function(def){var t=data.traducoes.find(function(x){return x.id===def.id;});return t?Object.assign({},def,t):def;});
      catalogReady=true;
    }).catch(function(){translations=defaultTranslations.slice();catalogReady=false;}).then(function(){
      renderTranslationOptions();metadataCredits(translation);
      if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}
      var pos=readPosition(translation), b=pos&&books.find(function(x){return x.code===pos.code;});
      selected=b||books[0];chapter=pos&&b?Math.max(1,Math.min(chapterCount(b),+pos.chapter||1)):1;fillChapters(selected);loadChapter(chapter,{noScroll:true});
    });
  }
  translationSelect.addEventListener('change',function(){
    var chosen=translations.find(function(t){return t.id===translationSelect.value;});
    if(!isAvailable(chosen)){translationSelect.value=translation?translation.id:'';setStatus((chosen?chosen.nome:'Esta tradução')+' ainda não tem texto integrado e validado. Escolha uma tradução disponível para ler versículos.');return;}
    translation=chosen;bookCache=Object.create(null);indexCache=Object.create(null);
    var pos=readPosition(translation), b=pos&&books.find(function(x){return x.code===pos.code;});
    selected=b||selected||books[0];chapter=pos&&b?Math.max(1,Math.min(chapterCount(b),+pos.chapter||1)):1;fillChapters(selected);loadChapter(chapter);
  });
  chapterSelect.addEventListener('change',function(){loadChapter(chapterSelect.value);});
  [prev,prev2].forEach(function(b){if(b)b.addEventListener('click',function(){move(-1);});});
  [next,next2].forEach(function(b){if(b)b.addEventListener('click',function(){move(1);});});
  var sharedFontRange=$('textoRange');
  if(sharedFontRange){sharedFontRange.addEventListener('input',function(){fontSelect.value=String(Math.max(0,Math.min(2,+sharedFontRange.value||0)));applyReadingSettings();saveReadingSettings();});}
  fontSelect.addEventListener('change',function(){if(sharedFontRange)sharedFontRange.value=fontSelect.value;applyReadingSettings();saveReadingSettings();});
  spacingSelect.addEventListener('change',function(){applyReadingSettings();saveReadingSettings();});
  themeButton.addEventListener('click',function(){themeButton.setAttribute('aria-pressed',String(themeButton.getAttribute('aria-pressed')!=='true'));applyReadingSettings();saveReadingSettings();});
  restoreReadingSettings();
  var escolher=$('bibliaEscolherLivro'), menuLivros=$('bibliaMenuLivros'), fecharMenu=$('bibliaFecharMenuLivros');
  function setBookMenu(open){
    if(!menuLivros||!escolher)return;
    menuLivros.hidden=!open; escolher.setAttribute('aria-expanded',String(!!open));
    if(open){var search=$('buscaLivro');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));window.setTimeout(function(){search.focus();},20);}if(menuLivros.scrollIntoView)menuLivros.scrollIntoView({behavior:'smooth',block:'nearest'});}
    else if(escolher.focus)escolher.focus({preventScroll:true});
  }
  if(escolher)escolher.addEventListener('click',function(){setBookMenu(!!(menuLivros&&menuLivros.hidden));});
  if(fecharMenu)fecharMenu.addEventListener('click',function(){setBookMenu(false);});
  if(bookList){
    bookList.addEventListener('click',function(e){var li=e.target.closest('li');if(!li)return;var book=findBook(li.textContent);if(!book)return;e.preventDefault();selectBook(book,false);setBookMenu(false);});
    bookList.addEventListener('keydown',function(e){if(e.key!=='Enter'&&e.key!==' ')return;var li=e.target.closest('li');if(!li)return;var book=findBook(li.textContent);if(!book)return;e.preventDefault();selectBook(book,false);setBookMenu(false);});
    var observer=new MutationObserver(function(){Array.prototype.forEach.call(bookList.querySelectorAll('li'),function(li){if(!findBook(li.textContent))return;li.tabIndex=0;li.setAttribute('role','button');li.setAttribute('aria-label','Ler '+li.textContent.trim());li.classList.add('biblia-livro-clicavel');});});
    observer.observe(bookList,{childList:true,subtree:true});
    Array.prototype.forEach.call(bookList.querySelectorAll('li'),function(li){if(findBook(li.textContent)){li.tabIndex=0;li.setAttribute('role','button');li.classList.add('biblia-livro-clicavel');}});
  }
  function textoReferencia(ref) {
    if(isKids())return Promise.reject(new Error('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.'));
    var original=String(ref||'').trim(),raw=original.replace(/^Salmo\s+/i,'Salmos '),norm=normalize(raw),book=null,resto='';
    var ordered=books.slice().sort(function(a,b){return normalize(b.name).length-normalize(a.name).length;});
    for(var i=0;i<ordered.length;i++){var nome=normalize(ordered[i].name);if(norm.indexOf(nome)===0&&(norm.length===nome.length||/\s/.test(norm.charAt(nome.length)))){book=ordered[i];resto=raw.slice(ordered[i].name.length).trim();break;}}
    if(!book)return Promise.reject(new Error('Livro não reconhecido na referência: '+raw));
    var m=/^(\d+)\s*,\s*(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(resto);
    if(!m)return Promise.reject(new Error('Formato de referência não reconhecido: '+raw));
    var capNum=+m[1],from=+m[2],to=+(m[3]||m[2]);
    return loadChapterData(book,capNum,translation).then(function(data){var cap=data.chapter || (data.chapters && data.chapters[capNum-1]);if(!cap)throw new Error('Capítulo inexistente');var verses=cap.v.filter(function(v){var n=parseInt(v.n,10);return n>=from&&n<=to;});if(!verses.length)throw new Error('Versículos inexistentes');return {livro:book,capitulo:capNum,referencia:original,versiculos:verses.map(function(v){return {numero:v.n,texto:v.t};})};});
  }
  var profileObserver=new MutationObserver(function(records){
    if(!records.some(function(r){return r.attributeName==='class';}))return;
    if(isKids()){requestId++;clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');translationSelect.disabled=true;updateControls();}
    else if(catalogReady&&translation){renderTranslationOptions();if(selected)loadChapter(chapter,{noScroll:true});}
  });
  profileObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
  initCatalog();
  window.OVELIA_BIBLIA = {
    abrir:function(code,cap,translationId,verse){
      if(isKids()){setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}
      if(translationId){var t=translations.find(function(x){return x.id===translationId&&isAvailable(x);});if(!t)return;translation=t;translationSelect.value=t.id;}
      var b=books.find(function(x){return x.code===code;});if(!b){setStatus('Livro inexistente no catálogo: '+code+'.');return;}
      selected=b;fillChapters(b);pendingVerse=verse||null;loadChapter(cap||1);atualizarVoltaEstudo();
    },
    traducaoSelecionada:function(){return isAvailable(translation)?translation.id:null;},
    textoReferencia:textoReferencia,
    books:books.map(function(b){return {name:b.name,code:b.code,chapters:b.chapters,testament:b.testament};}),
    traducoes:function(){return translations.map(function(t){return {id:t.id,nome:t.nome,estado:t.estado,disponibilidade:isAvailable(t)?(t.fonteRemota?'online':'local'):'em_preparacao'};});}
  };
})();
