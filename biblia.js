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
  var CATALOG_URL = BASE + 'catalogo.json';
  var selected = null, chapter = 1, translation = null, translations = [], catalogReady = false;
  var bookCache = Object.create(null), indexCache = Object.create(null), requestId = 0;
  var FONT_KEY = 'ovelia-biblia-leitura-v1';
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
  var studyPanel = document.createElement('section'); studyPanel.id='bibliaEstudoFerramentas'; studyPanel.className='biblia-estudo-ferramentas';
  studyPanel.innerHTML='<details class="biblia-ferramenta"><summary>Buscar passagem ou palavra</summary><label for="bibliaBuscaPassagem">Buscar livro, capítulo ou versículo</label><div class="biblia-busca-linha"><input id="bibliaBuscaPassagem" type="search" placeholder="Jo 3,16 · João 3:16 · Salmo 23" autocomplete="off"><button type="button" class="btn g" id="bibliaExecutarBusca">Buscar</button></div><p id="bibliaAlcanceBusca" class="biblia-alcance">Busca por palavra: apenas no capítulo atual. Você poderá ampliar a busca quando houver texto disponível.</p><div id="bibliaResultadosBusca" role="status" aria-live="polite"></div></details><details class="biblia-ferramenta"><summary>Comparar traduções</summary><p>Compara somente traduções disponíveis e passagens com alinhamento confirmado.</p><button type="button" class="btn g" id="bibliaComparar">Comparar esta passagem</button><div id="bibliaResultadoComparacao" aria-live="polite"></div></details><div class="biblia-ferramenta-acoes"><button type="button" class="btn g" id="bibliaCopiarReferencia">Copiar referência</button><button type="button" class="btn g" id="bibliaAlternarMarcador">☆ Marcar versículos selecionados</button></div><details class="biblia-ferramenta"><summary>Meus marcadores e favoritos</summary><div id="bibliaMeusMarcadores"></div></details>';
  var controlsParent=controls.parentNode; controlsParent.insertBefore(studyPanel,controls.nextSibling);
  var bookPicker=document.createElement('section');bookPicker.id='bibliaSeletorLivro';bookPicker.className='biblia-seletor-livro';bookPicker.innerHTML='<label for="bibliaBuscaLivroCapVers">Buscar livro, capítulo ou versículo</label><input id="bibliaBuscaLivroCapVers" type="search" placeholder="Ex.: João 3:16 ou Salmo 23" autocomplete="off"><div class="biblia-testamento-abas" role="group" aria-label="Testamento"><button type="button" class="btn g ativo" data-testamento="Antigo Testamento">Antigo Testamento</button><button type="button" class="btn g" data-testamento="Novo Testamento">Novo Testamento</button></div><div id="bibliaListaLivros" class="biblia-lista-livros"></div>';
  controlsParent.insertBefore(bookPicker,studyPanel.nextSibling);
  var activeTestament='Antigo Testamento';
  function renderBookPicker(filter){var list=$('bibliaListaLivros');if(!list)return;list.innerHTML='';var q=normalize(filter||'');books.filter(function(b){return b.testament===activeTestament&&(!q||normalize(b.name).indexOf(q)>=0);}).forEach(function(b){var button=document.createElement('button');button.type='button';button.className='biblia-livro-opcao';button.textContent=b.name;button.addEventListener('click',function(){selectBook(b,false);var input=$('bibliaBuscaLivroCapVers');if(input)input.value='';});list.appendChild(button);});if(!list.children.length)list.textContent='Nenhum livro encontrado neste testamento.';}
  Array.prototype.forEach.call(bookPicker.querySelectorAll('[data-testamento]'),function(button){button.addEventListener('click',function(){activeTestament=button.getAttribute('data-testamento');Array.prototype.forEach.call(bookPicker.querySelectorAll('[data-testamento]'),function(b){b.classList.toggle('ativo',b===button);});renderBookPicker($('bibliaBuscaLivroCapVers').value);});});
  $('bibliaBuscaLivroCapVers').addEventListener('input',function(){var ref=resolveReference(this.value);if(ref){activeTestament=ref.book.testament;renderBookPicker('');return;}renderBookPicker(this.value);});$('bibliaBuscaLivroCapVers').addEventListener('keydown',function(e){if(e.key!=='Enter')return;var ref=resolveReference(this.value);if(!ref)return;e.preventDefault();selected=ref.book;fillChapters(selected);loadChapter(ref.chapter,{noScroll:true});if(ref.from>1){window.setTimeout(function(){var v=texto.querySelector('[data-verse=\"'+ref.from+'\"]');if(v)v.scrollIntoView({block:'center'});},200);}});
  renderBookPicker('');

  var bookmarksKey='ovelia-biblia-marcadores-v1', historyKey='ovelia-biblia-historico-v1';
  function readStore(key){try{return JSON.parse(localStorage.getItem(key)||'[]');}catch(e){return [];}}
  function writeStore(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
  function currentRef(){return selected?selected.name+' '+chapter:'';}
  function recordHistory(){if(!translation||!selected)return;var a=readStore(historyKey);a.unshift({translationId:translation.id,translationName:translation.nome,code:selected.code,book:selected.name,chapter:chapter,at:Date.now()});a=a.filter(function(x,i){return a.findIndex(function(y){return y.translationId===x.translationId&&y.code===x.code&&y.chapter===x.chapter;})===i;}).slice(0,40);writeStore(historyKey,a);}
  function renderBookmarks(){var target=$('bibliaMeusMarcadores');if(!target)return;var a=readStore(bookmarksKey);target.innerHTML='';if(!a.length){target.textContent='Você ainda não salvou marcadores.';return;}a.forEach(function(x){var row=document.createElement('div');row.className='biblia-marcador-item';var label=document.createElement('span');label.textContent=x.book+' '+x.chapter+':'+x.verse+' · '+x.translationName+(x.note?' — '+x.note:'');var del=document.createElement('button');del.type='button';del.className='btn g';del.textContent='Remover';del.addEventListener('click',function(){writeStore(bookmarksKey,readStore(bookmarksKey).filter(function(y){return y.key!==x.key;}));renderBookmarks();});row.appendChild(label);row.appendChild(del);target.appendChild(row);});}
  function verseKey(v){return (translation?translation.id:'')+'|'+(selected?selected.code:'')+'|'+chapter+'|'+String(v);}
  function decorateVerses(){Array.prototype.forEach.call(texto.querySelectorAll('.biblia-v'),function(span){var sup=span.querySelector('.biblia-n');if(!sup)return;var n=sup.textContent;span.setAttribute('data-verse',n);span.setAttribute('tabindex','0');span.setAttribute('role','button');span.setAttribute('aria-label','Selecionar versículo '+n);span.classList.toggle('biblia-versiculo-marcado',readStore(bookmarksKey).some(function(x){return x.key===verseKey(n);}));});}
  function renderSearchResults(items){var out=$('bibliaResultadosBusca');out.innerHTML='';if(!items.length){out.textContent='Nenhum resultado encontrado no alcance informado.';return;}items.slice(0,50).forEach(function(x){var b=document.createElement('button');b.type='button';b.className='biblia-resultado';b.textContent=x.ref+(x.text?' — '+x.text:'');b.addEventListener('click',function(){if(x.code){var book=books.find(function(y){return y.code===x.code;});if(book){selected=book;fillChapters(book);loadChapter(x.chapter,{noScroll:true}).then;}}});out.appendChild(b);});}
  function resolveReference(raw){var text=String(raw||'').trim().replace(/[：]/g,':');var aliases={'gn':'Gênesis','gen':'Gênesis','ex':'Êxodo','sl':'Salmos','salmo':'Salmos','salmos':'Salmos','jo':'João','joao':'João','mt':'Mateus','mc':'Marcos','lc':'Lucas','l c':'Lucas','at':'Atos dos Apóstolos','rm':'Romanos','ap':'Apocalipse'};var m=/^(.+?)\s+(\d+)(?:\s*[:,]\s*(\d+)(?:\s*[-–]\s*(\d+))?)?$/.exec(text);if(!m)return null;var name=normalize(m[1]), alias=aliases[name]||m[1],book=findBook(alias);if(!book)return null;return {book:book,chapter:+m[2],from:m[3]?+m[3]:1,to:m[4]?+m[4]:(m[3]?+m[3]:999),original:text};}
  function runSearch(){var q=$('bibliaBuscaPassagem').value.trim(),out=$('bibliaResultadosBusca');if(!q)return;var ref=resolveReference(q);if(ref){if(ref.chapter<1||ref.chapter>chapterCount(ref.book)){out.textContent='Capítulo inexistente para '+ref.book.name+'.';return;}selected=ref.book;fillChapters(selected);chapter=ref.chapter;loadChapter(chapter,{noScroll:true});out.textContent='Referência aberta: '+ref.book.name+' '+ref.chapter+(ref.from>1?':'+ref.from:'')+'.';return;}var term=normalize(q);if(term.length<2){out.textContent='Digite uma palavra com pelo menos 2 caracteres ou uma referência.';return;}var hits=[];Array.prototype.forEach.call(texto.querySelectorAll('.biblia-v'),function(v){if(normalize(v.textContent).indexOf(term)>=0)hits.push({ref:currentRef()+':'+v.getAttribute('data-verse'),text:v.textContent.trim()});});$('bibliaAlcanceBusca').textContent='Alcance atual: somente o capítulo exibido; nenhum outro livro foi baixado.';renderSearchResults(hits);}
  function loadBookForTranslation(t,book){var k=t.id+':'+book.code;if(bookCache[k])return Promise.resolve(bookCache[k]);return fetch(BASE+t.id+'/indice.json').then(function(r){if(!r.ok)throw new Error('Índice indisponível');return r.json();}).then(function(idx){var entries=Array.isArray(idx.livros)?idx.livros:[];if(!entries.some(function(e){return (typeof e==='string'?e:(e.code||e.codigo||e.id))===book.code;}))throw new Error('Livro ausente');return fetch(BASE+t.id+'/'+book.code+'.json').then(function(r){if(!r.ok)throw new Error('Livro indisponível');return r.json();});}).then(function(raw){var data=normalizeBookData(raw,book,t);bookCache[k]=data;return data;});}
  function compareCurrent(){var out=$('bibliaResultadoComparacao');out.innerHTML='';var available=translations.filter(function(t){return isAvailable(t);});if(available.length<2){out.textContent='A comparação exige pelo menos duas traduções disponíveis. Atualmente: '+available.length+'.';return;}var mapPromise=fetch('mapa-passagens.json').then(function(r){return r.ok?r.json():null;}).catch(function(){return null;});mapPromise.then(function(map){var ps=map&&Array.isArray(map.passagens)?map.passagens:[];var ref=currentRef();var mapped=ps.find(function(x){return x.referencia===ref||x.code===selected.code&&+x.capitulo===chapter;});if(selected.code==='PSA'&&(!map||!map.numeracaoSalmos||map.numeracaoSalmos.default==='sem_mapeamento')){out.textContent='Não é possível alinhar com segurança esta passagem: a numeração dos Salmos ainda não foi mapeada.';return;}if(!mapped){out.textContent='Não há alinhamento confirmado no mapa de passagens para '+ref+'. Para evitar mostrar textos de referências diferentes, a comparação foi interrompida.';return;}var mapping=mapped.traducoes||mapped.equivalencias||{};available.slice(0,3).forEach(function(t){var targetRef=mapping[t.id]||mapped.referencia||ref;var parsed=resolveReference(targetRef);var card=document.createElement('article');card.className='biblia-comparacao-card';var h=document.createElement('h4');h.textContent=t.nome;card.appendChild(h);var body=document.createElement('p');body.textContent='Carregando passagem alinhada…';card.appendChild(body);out.appendChild(card);if(!parsed){body.textContent='O mapa não contém uma referência utilizável para esta tradução.';return;}loadBookForTranslation(t,parsed.book).then(function(data){var cap=data.chapters[parsed.chapter-1];if(!cap){body.textContent='Capítulo não encontrado nesta tradução.';return;}var verses=cap.v.filter(function(v){return +v.n>=parsed.from&&+v.n<=parsed.to;});if(!verses.length){body.textContent='Versículos não encontrados nesta tradução.';return;}body.textContent=parsed.book.name+' '+parsed.chapter+': '+verses.map(function(v){return v.n+'. '+v.t;}).join(' ');}).catch(function(){body.textContent='Dados desta tradução ainda não estão disponíveis ou não passaram na validação.';});});});}
  $('bibliaExecutarBusca').addEventListener('click',runSearch);$('bibliaBuscaPassagem').addEventListener('keydown',function(e){if(e.key==='Enter')runSearch();});
  $('bibliaComparar').addEventListener('click',compareCurrent);
  $('bibliaCopiarReferencia').addEventListener('click',function(){if(!translation||!selected)return;var value=currentRef()+' — '+translation.nome;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(value).then(function(){setStatus('Referência copiada: '+value);}).catch(function(){setStatus(value);});else setStatus(value);});
  $('bibliaAlternarMarcador').addEventListener('click',function(){var spans=Array.prototype.slice.call(texto.querySelectorAll('.biblia-v.biblia-versiculo-selecionado'));if(!spans.length){setStatus('Toque em um versículo para selecioná-lo antes de salvar.');return;}var note=window.prompt('Nota curta opcional para estes versículos (deixe vazio para não adicionar):','')||'';note=note.slice(0,240);var a=readStore(bookmarksKey);spans.forEach(function(span){var n=span.getAttribute('data-verse'),key=verseKey(n);if(!a.some(function(x){return x.key===key;}))a.push({key:key,translationId:translation.id,translationName:translation.nome,code:selected.code,book:selected.name,chapter:chapter,verse:n,note:note});span.classList.remove('biblia-versiculo-selecionado');});writeStore(bookmarksKey,a);renderBookmarks();decorateVerses();});
  texto.addEventListener('click',function(e){var span=e.target.closest('.biblia-v');if(!span)return;span.classList.toggle('biblia-versiculo-selecionado');});

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
      html+='<span class="biblia-v"><sup class="biblia-n">'+esc(v.n)+'</sup>'+esc(v.t).replace(/\n/g,'<br>')+'</span> ';
    });
    if(open)html+='</p>';
    texto.innerHTML=html;
    if(!html){setStatus('Este capítulo não contém texto validado.');return;}
    status.hidden=true;decorateVerses();recordHistory();renderBookmarks();
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
    loadBook(book).then(function(data){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}drawChapter(book,data,ch);}).catch(function(err){if(token!==requestId||t!==translation)return;if(isKids()){clearText();setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}clearText();setStatus(err&&err.message?err.message:'Não foi possível carregar este capítulo.',true);});
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
    var original=String(ref||'').trim(),raw=original.replace(/^Salmo\s+/i,'Salmos ').replace(/^Jo\s+/i,'João ').replace(/^Sl\s+/i,'Salmos '),norm=normalize(raw),book=null,resto='';
    var ordered=books.slice().sort(function(a,b){return normalize(b.name).length-normalize(a.name).length;});
    for(var i=0;i<ordered.length;i++){var nome=normalize(ordered[i].name);if(norm.indexOf(nome)===0&&(norm.length===nome.length||/\s/.test(norm.charAt(nome.length)))){book=ordered[i];resto=raw.slice(ordered[i].name.length).trim();break;}}
    if(!book)return Promise.reject(new Error('Livro não reconhecido na referência: '+raw));
    var m=/^(\d+)(?:\s*[:,]\s*(\d+)(?:\s*[-–]\s*(\d+))?)?$/.exec(resto);
    if(!m)return Promise.reject(new Error('Formato de referência não reconhecido: '+raw));
    var capNum=+m[1],from=m[2]?+m[2]:1,to=m[3]?+m[3]:(m[2]?+m[2]:999);
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
    abrir:function(code,cap,translationId){
      if(isKids()){setStatus('A Bíblia adulta não está disponível no perfil Pequenas Ovelias.');return;}
      if(translationId){var t=translations.find(function(x){return x.id===translationId&&isAvailable(x);});if(!t)return;translation=t;translationSelect.value=t.id;}
      var b=books.find(function(x){return x.code===code;});if(!b){setStatus('Livro inexistente no catálogo: '+code+'.');return;}
      selected=b;fillChapters(b);loadChapter(cap||1);
    },
    textoReferencia:textoReferencia, buscarReferencia:resolveReference, historico:function(){return readStore(historyKey);}, marcadores:function(){return readStore(bookmarksKey);},
    books:books.map(function(b){return {name:b.name,code:b.code,chapters:b.chapters,testament:b.testament};}),
    traducoes:function(){return translations.map(function(t){return {id:t.id,nome:t.nome,estado:t.estado};});}
  };
})();
