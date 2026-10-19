/* Ovelia — leitor bíblico integrado.
   O texto fica DENTRO do site (pasta dados/biblia, gerada pelo workflow "Atualizar Bíblia").
   Nenhum quadro externo e nenhum redirecionamento: o capítulo é lido e exibido na própria página.
   A lista abaixo segue a ordem católica de 73 livros. Ester e Daniel usam páginas que incluem
   as porções gregas, conforme descrito pela fonte. */
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
  var status = $('bibliaStatus'), bookList = $('livros');
  if (!texto || !chapterSelect) return;
  var selected = null, chapter = 1, cache = {}, pedido = 0;

  function normalize(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g,' ').trim();
  }
  function findBook(name) {
    var n = normalize(name);
    return books.find(function(b){return normalize(b.name)===n;}) || null;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }
  function carregarLivro(book) {
    if (cache[book.code]) return Promise.resolve(cache[book.code]);
    return fetch(BASE + book.code + '.json').then(function(r){
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function(d){
      if (!d || !Array.isArray(d.chapters)) throw new Error('formato');
      cache[book.code] = d; return d;
    });
  }
  function desenhar(book, data, ch) {
    var cap = data.chapters[ch - 1];
    if (!cap || !cap.v || !cap.v.length) {
      texto.innerHTML = '<p class="biblia-vazio">Este capítulo ainda não está disponível.</p>';
      return;
    }
    var html = '', aberto = false;
    if (cap.d) html += '<p class="biblia-titulo-salmo">' + esc(cap.d) + '</p>';
    cap.v.forEach(function(v, i){
      if (v.s) { if (aberto) { html += '</p>'; aberto = false; } html += '<h4 class="biblia-secao">' + esc(v.s) + '</h4>'; }
      if (!aberto || v.p || v.s) { if (aberto) html += '</p>'; html += '<p class="biblia-par">'; aberto = true; }
      html += '<span class="biblia-v"><sup class="biblia-n">' + esc(v.n) + '</sup>' + esc(v.t).replace(/\n/g, '<br>') + '</span> ';
    });
    if (aberto) html += '</p>';
    texto.innerHTML = html;
  }
  function updateControls() {
    var off = !selected;
    chapterSelect.disabled = off;
    var antes = off || (chapter===1 && books.indexOf(selected)===0);
    var depois = off || (chapter===selected.chapters && books.indexOf(selected)===books.length-1);
    [prev, prev2].forEach(function(b){ if (b) b.disabled = antes; });
    [next, next2].forEach(function(b){ if (b) b.disabled = depois; });
    if (nav2) nav2.hidden = off;
    chapterSelect.value = selected ? String(chapter) : '';
  }
  function fillChapters(book) {
    chapterSelect.innerHTML = '';
    for (var i=1; i<=book.chapters; i++) {
      var opt = document.createElement('option');
      opt.value = String(i); opt.textContent = 'Capítulo ' + i;
      chapterSelect.appendChild(opt);
    }
  }
  function loadChapter(nextChapter) {
    if (!selected) return;
    chapter = Math.max(1, Math.min(selected.chapters, Number(nextChapter)||1));
    var book = selected, ch = chapter, meu = ++pedido;
    title.textContent = book.name + ' ' + ch;
    subtitle.textContent = book.testament + (book.note ? ' · ' + book.note : '');
    chapterSelect.value = String(ch);
    updateControls();
    status.textContent = 'Carregando ' + book.name + ' ' + ch + '…';
    status.hidden = false;
    carregarLivro(book).then(function(data){
      if (meu !== pedido) return;
      desenhar(book, data, ch);
      status.hidden = true;
    }).catch(function(){
      if (meu !== pedido) return;
      texto.innerHTML = '';
      status.textContent = 'O texto deste livro ainda não está disponível neste site. Tente novamente mais tarde.';
      status.hidden = false;
    });
    var panel = $('bibliaLeitor');
    if (panel && panel.scrollIntoView) panel.scrollIntoView({behavior:'smooth', block:'start'});
  }
  function selectBook(book) {
    selected = book; chapter = 1;
    fillChapters(book);
    loadChapter(1);
  }
  function move(delta) {
    if (!selected) return;
    var idx = books.indexOf(selected);
    var target = chapter + delta;
    if (target < 1 && idx > 0) {
      selected = books[idx-1]; fillChapters(selected); loadChapter(selected.chapters);
    } else if (target > selected.chapters && idx < books.length-1) {
      selected = books[idx+1]; fillChapters(selected); loadChapter(1);
    } else {
      loadChapter(target);
    }
  }
  chapterSelect.addEventListener('change', function(){loadChapter(chapterSelect.value);});
  [prev, prev2].forEach(function(b){ if (b) b.addEventListener('click', function(){move(-1);}); });
  [next, next2].forEach(function(b){ if (b) b.addEventListener('click', function(){move(1);}); });
  var escolher = $('bibliaEscolherLivro');
  if (escolher) escolher.addEventListener('click', function(){
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
  function textoReferencia(ref) {
    var original=String(ref||'').trim(), raw=original.replace(/^Salmo\s+/i,'Salmos '), norm=normalize(raw), book=null, resto='';
    var ordenados=books.slice().sort(function(a,b){return normalize(b.name).length-normalize(a.name).length;});
    for(var i=0;i<ordenados.length;i++){
      var nome=normalize(ordenados[i].name);
      if(norm.indexOf(nome)===0 && (norm.length===nome.length || /\s/.test(norm.charAt(nome.length)))){
        book=ordenados[i];resto=raw.slice(ordenados[i].name.length).trim();break;
      }
    }
    if(!book) return Promise.reject(new Error('Livro não reconhecido na referência: '+raw));
    var m=/^(\d+)\s*,\s*(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(resto);
    if(!m) return Promise.reject(new Error('Formato de referência não reconhecido: '+raw));
    var capNum=+m[1], de=+m[2], ate=+(m[3]||m[2]);
    return carregarLivro(book).then(function(data){
      var cap=data.chapters[capNum-1]; if(!cap) throw new Error('Capítulo ausente');
      var vs=cap.v.filter(function(v){var n=parseInt(v.n,10);return n>=de&&n<=ate;});
      if(!vs.length) throw new Error('Versículos ausentes');
      return {livro:book,capitulo:capNum,referencia:original,versiculos:vs.map(function(v){return {numero:v.n,texto:v.t};})};
    });
  }
  window.OVELIA_BIBLIA = { abrir: function(code, cap){ var b = books.filter(function(x){return x.code===code;})[0]; if (b) { selected = b; fillChapters(b); loadChapter(cap||1); } }, textoReferencia:textoReferencia, books: books.map(function(b){return {name:b.name,code:b.code,chapters:b.chapters,testament:b.testament};}) };
})();
