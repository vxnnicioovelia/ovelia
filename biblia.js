/* Ovelia — leitor bíblico integrado.
   Mantém a navegação pelos 73 livros. Os textos integrais só podem ser publicados após
   confirmação da autorização editorial e validação dos arquivos da tradução licenciada. */
(function () {
  'use strict';
  var BASE = 'dados/biblia/';
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
  var bookCache = Object.create(null), indexCache = Object.create(null), requestId = 0;
  var FONT_KEY = 'ovelia-biblia-leitura-v1';
  var ESTUDOS_RETORNO_KEY = 'ovelia-estudos-retorno-biblia-v1';
  var pendingVerse = null;
  var defaultTranslations = [
    {id:'bpm',nome:'Bíblia Portuguesa Mundial (BPM)',estado:'em_preparacao',origem:'',edicao:'',licenca:{}},
    {id:'matos-soares',nome:'Manuel de Matos Soares',estado:'em_preparacao',origem:'',edicao:'',licenca:{}},
    {id:'figueiredo',nome:'Antônio Pereira de Figueiredo',estado:'em_preparacao',origem:'',edicao:'',licenca:{}}
  ];
  function normalize(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g,' ').trim(); }
  function findBook(name) { var n=normalize(name); return books.find(function(b){return normalize(b.name)===n;}) || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function isKids() { return document.body.classList.contains('perfil-kids'); }
  function isAvailable(t) { return !!t && t.estado === 'disponivel'; }
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
      '<button type="button" class="btn g biblia-tema-botao" id="bibliaAlternarTema" aria-pressed="false">Ativar tema escuro da leitura</button>';
    var top = panel.querySelector('.biblia-leitor-topo');
    if (top && top.parentNode) top.parentNode.insertBefore(controls, top.nextSibling); else panel.insertBefore(controls, panel.firstChild);
    return controls;
  }
  var controls = ensureControls(), translationSelect = $('bibliaTraducao'), fontSelect = $('bibliaFonteTamanho'), spacingSelect = $('bibliaEspacamento'), themeButton = $('bibliaAlternarTema');
  var returnStudyButton=document.getElementById('bibliaVoltarEstudo');
  if(!returnStudyButton&&panel){returnStudyButton=document.createElement('button');returnStudyButton.type='button';returnStudyButton.id='bibliaVoltarEstudo';returnStudyButton.className='btn g';returnStudyButton.textContent='← Voltar ao estudo';returnStudyButton.hidden=true;var panelTop=panel.querySelector('.biblia-leitor-topo');if(panelTop)panelTop.appendChild(returnStudyButton);returnStudyButton.addEventListener('click',function(){if(window.OveliaJornada&&window.OveliaJornada.retornarDaBiblia())returnStudyButton.hidden=true;});}
  function atualizarVoltaEstudo(){try{returnStudyButton.hidden=!sessionStorage.getItem(ESTUDOS_RETORNO_KEY);}catch(e){returnStudyButton.hidden=true;}}
  atualizarVoltaEstudo();
  function renderTranslationOptions() {
    var current = translation ? translation.id : '';
    translationSelect.innerHTML='';
    translations.forEach(function(t){
      var opt=document.createElement('option'); opt.value=t.id;
      opt.textContent=t.nome + (isAvailable(t) ? '' : ' — Em preparação');
      opt.disabled=!isAvailable(t); translationSelect.appendChild(opt);
    });
    var firstAvailable=translations.find(isAvailable);
    translation=translations.find(function(t){return t.id===current && isAvailable(t);}) || firstAvailable || translations[0] || null;
    if (translation) translationSelect.value=translation.id;
    translationSelect.disabled=isKids() || !firstAvailable;
    if (isKids()) translationSelect.setAttribute('aria-label','Bíblia adulta indisponível no perfil Pequenas Ovelias');
    else translationSelect.setAttribute('aria-label','Escolher tradução; as traduções em preparação não exibem texto');
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
  function drawChapter(book,data,ch) {
    var cap=data.chapters[ch-1];
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
    if(!isAvailable(t)){setStatus((t?t.nome:'Esta tradução')+' está em preparação. Nenhum texto bíblico será exibido até a validação técnica e a confirmação do responsável.');return;}
    setStatus('Carregando '+book.name+' '+ch+'…');
    loadBook(book).then(function(data){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}drawChapter(book,data,ch);if(pendingVerse){var alvo=texto.querySelector('[data-versiculo="'+String(pendingVerse).replace(/[^0-9]/g,'')+'"]');if(alvo){alvo.classList.add('biblia-versiculo-destacado');alvo.scrollIntoView({behavior:'smooth',block:'center'});}pendingVerse=null;}}).catch(function(err){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}clearText();setStatus(err&&err.message?err.message:'Não foi possível carregar este capítulo.',true);});
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
    else if(target>=1&&target<=selected.chapters)loadChapter(target);
    else setStatus('Você chegou ao início ou ao fim do catálogo de livros.');
  }
  function applyReadingSettings() {
    panel.classList.remove('biblia-fonte-1','biblia-fonte-2','biblia-espaco-amplo','biblia-espaco-extra','biblia-tema-escuro');
    if(fontSelect.value==='1')panel.classList.add('biblia-fonte-1');
    if(fontSelect.value==='2')panel.classList.add('biblia-fonte-2');
    if(spacingSelect.value==='amplo')panel.classList.add('biblia-espaco-amplo');
    if(spacingSelect.value==='extra')panel.classList.add('biblia-espaco-extra');
    var dark=themeButton.getAttribute('aria-pressed')==='true';
    if(dark)panel.classList.add('biblia-tema-escuro');
    themeButton.textContent=dark?'Desativar tema escuro da leitura':'Ativar tema escuro da leitura';
  }
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
    if(!isAvailable(chosen)){translationSelect.value=translation?translation.id:'';setStatus((chosen?chosen.nome:'Esta tradução')+' está em preparação. Nenhum texto bíblico será exibido.');return;}
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
  var escolher=$('bibliaEscolherLivro');
  if(escolher)escolher.addEventListener('click',function(){var search=$('buscaLivro');if(search)search.focus();if(bookList)bookList.scrollIntoView({behavior:'smooth',block:'start'});});
  if(bookList){
    bookList.addEventListener('click',function(e){var li=e.target.closest('li');if(!li)return;var book=findBook(li.textContent);if(!book)return;e.preventDefault();selectBook(book,false);});
    bookList.addEventListener('keydown',function(e){if(e.key!=='Enter'&&e.key!==' ')return;var li=e.target.closest('li');if(!li)return;var book=findBook(li.textContent);if(!book)return;e.preventDefault();selectBook(book,false);});
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
    return loadBook(book).then(function(data){var cap=data.chapters[capNum-1];if(!cap)throw new Error('Capítulo inexistente');var verses=cap.v.filter(function(v){var n=parseInt(v.n,10);return n>=from&&n<=to;});if(!verses.length)throw new Error('Versículos inexistentes');return {livro:book,capitulo:capNum,referencia:original,versiculos:verses.map(function(v){return {numero:v.n,texto:v.t};})};});
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
    traducoes:function(){return translations.map(function(t){return {id:t.id,nome:t.nome,estado:t.estado};});}
  };
})();
