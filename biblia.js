/* Ovelia — leitor bíblico integrado.
   O texto é carregado da página pública do eBible.org; requer internet e não funciona offline.
   A lista abaixo segue a ordem católica de 73 livros. Ester e Daniel usam páginas que incluem
   as porções gregas, conforme descrito pela fonte. */
(function () {
  'use strict';
  var BASE = 'https://ebible.org/porbrbsl/';
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
  var frame = $('bibliaFrame'), frameWrap = $('bibliaFrameWrap');
  var title = $('bibliaTituloLivro'), subtitle = $('bibliaSubtitulo');
  var chapterSelect = $('bibliaCapitulo'), prev = $('bibliaAnterior'), next = $('bibliaProximo');
  var status = $('bibliaStatus'), openSource = $('bibliaAbrirFonte'), bookList = $('livros');
  var selected = null, chapter = 1, lastUrl = BASE;

  function normalize(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g,' ').trim();
  }
  function findBook(name) {
    var n = normalize(name);
    var aliases = {'eclesiastico (siracida)':'eclesiastico (siracida)','filêmon':'filemon','cântico dos cânticos':'cantico dos canticos'};
    n = aliases[n] || n;
    return books.find(function(b){return normalize(b.name)===n;}) || null;
  }
  function urlFor(book, ch) {
    var digits = book.code === 'PSA' ? 3 : 2;
    return BASE + book.code + String(ch).padStart(digits, '0') + '.htm';
  }
  function updateControls() {
    chapterSelect.disabled = !selected;
    prev.disabled = !selected || (chapter===1 && books.indexOf(selected)===0);
    next.disabled = !selected || (chapter===selected.chapters && books.indexOf(selected)===books.length-1);
    chapterSelect.value = selected ? String(chapter) : '';
  }
  function loadChapter(nextChapter) {
    if (!selected) return;
    chapter = Math.max(1, Math.min(selected.chapters, Number(nextChapter)||1));
    var url = urlFor(selected, chapter);
    lastUrl = url;
    title.textContent = selected.name + ' ' + chapter;
    subtitle.textContent = selected.testament + (selected.note ? ' · ' + selected.note : '');
    status.textContent = 'Carregando o capítulo ' + chapter + ' de ' + selected.name + ' da fonte oficial…';
    status.hidden = false;
    frameWrap.hidden = false;
    frame.onload = function(){ status.hidden = true; };
    frame.onerror = function(){
      status.textContent = 'Não foi possível carregar este capítulo dentro da Ovelia. Use “Abrir texto na fonte” para continuar.';
      status.hidden = false;
    };
    frame.src = url;
    openSource.href = url;
    chapterSelect.value = String(chapter);
    updateControls();
    var panel = $('bibliaLeitor');
    if (panel && window.matchMedia && window.matchMedia('(max-width: 620px)').matches) {
      panel.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }
  function selectBook(book) {
    selected = book; chapter = 1;
    chapterSelect.innerHTML = '';
    for (var i=1; i<=book.chapters; i++) {
      var opt = document.createElement('option');
      opt.value = String(i); opt.textContent = 'Capítulo ' + i;
      chapterSelect.appendChild(opt);
    }
    loadChapter(1);
  }
  function move(delta) {
    if (!selected) return;
    var idx = books.indexOf(selected);
    var target = chapter + delta;
    if (target < 1 && idx > 0) {
      selected = books[idx-1]; chapter = selected.chapters;
      chapterSelect.innerHTML = '';
      for (var i=1; i<=selected.chapters; i++) {
        var o=document.createElement('option');o.value=String(i);o.textContent='Capítulo '+i;chapterSelect.appendChild(o);
      }
      loadChapter(chapter);
    } else if (target > selected.chapters && idx < books.length-1) {
      selected = books[idx+1]; chapter = 1;
      chapterSelect.innerHTML = '';
      for (var j=1; j<=selected.chapters; j++) {
        var p=document.createElement('option');p.value=String(j);p.textContent='Capítulo '+j;chapterSelect.appendChild(p);
      }
      loadChapter(1);
    } else {
      loadChapter(target);
    }
  }
  chapterSelect.addEventListener('change', function(){loadChapter(chapterSelect.value);});
  prev.addEventListener('click', function(){move(-1);});
  next.addEventListener('click', function(){move(1);});
  $('bibliaEscolherLivro').addEventListener('click', function(){
    var search = $('buscaLivro');
    if (search) search.focus();
    if (bookList) bookList.scrollIntoView({behavior:'smooth',block:'start'});
  });

  if (bookList) {
    bookList.addEventListener('click', function(e){
      var li = e.target.closest('li');
      if (!li) return;
      var book = findBook(li.textContent);
      if (!book) return;
      e.preventDefault();
      selectBook(book);
    });
    bookList.addEventListener('keydown', function(e){
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var li = e.target.closest('li');
      if (!li) return;
      var book = findBook(li.textContent);
      if (!book) return;
      e.preventDefault(); selectBook(book);
    });
    var observer = new MutationObserver(function(){
      Array.prototype.forEach.call(bookList.querySelectorAll('li'), function(li){
        if (!findBook(li.textContent)) return;
        li.tabIndex = 0;
        li.setAttribute('role','button');
        li.setAttribute('aria-label','Ler '+li.textContent.trim());
        li.classList.add('biblia-livro-clicavel');
      });
    });
    observer.observe(bookList, {childList:true,subtree:true});
    Array.prototype.forEach.call(bookList.querySelectorAll('li'), function(li){
      if (findBook(li.textContent)) {li.tabIndex=0;li.setAttribute('role','button');li.classList.add('biblia-livro-clicavel');}
    });
  }
  if (books.length !== 73) {
    status.textContent = 'Aviso de integridade: a lista de livros precisa de revisão.';
    status.hidden = false;
  }
  window.OVELIA_BIBLIA = { books: books.map(function(b){return {name:b.name,chapters:b.chapters,testament:b.testament};}) };
})();
