/* Ovelia — leitor bíblico em estilo de livro digital. Camada visual, reaproveita biblia.js. */
(function () {
  'use strict';
  var root = document.getElementById('bibliaLeitorUX');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var view = $('blRolagem'), content = $('blConteudo'), title = $('blLivroCapitulo');
  var locationLabel = $('blLocalizacao'), footerLabel = $('blCapituloRodape');
  var progress = $('blProgresso'), sheet = $('blSeletor'), settings = $('blAjustes');
  var selectorList = $('blListaLivros'), chapterList = $('blListaCapitulos');
  var current = { code: 'GEN', chapter: 1, verse: null };
  var lastRenderedSignature = '';
  var touch = null, immersive = false;
  var books = [];
  var STORAGE_KEY = 'ovelia-biblia-leitor-ui-v1';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getAPI() { return window.OVELIA_BIBLIA || null; }
  function apiBooks() {
    var api = getAPI();
    if (api && Array.isArray(api.books) && api.books.length) return api.books;
    return [];
  }
  function titleFromLegacy() {
    var h = $('bibliaTituloLivro'), c = $('bibliaCapitulo');
    var match = h ? h.textContent.trim().match(/^(.*?)\s+(\d+)$/) : null;
    if (match) {
      var b = books.find(function (x) { return x.name === match[1]; });
      if (b) return { book: b, chapter: Number(match[2]) };
    }
    return { book: books.find(function (x) { return x.code === current.code; }) || books[0], chapter: Number(c && c.value) || current.chapter };
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function setTheme(theme) {
    root.classList.remove('bl-escuro', 'bl-quente');
    if (theme === 'escuro') root.classList.add('bl-escuro');
    if (theme === 'quente') root.classList.add('bl-quente');
    saveSettings();
  }
  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        font: $('blFonte').value,
        spacing: $('blEspaco').value,
        theme: $('blTema').value,
        immersive: immersive
      }));
    } catch (e) {}
  }
  function restoreSettings() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!data) return;
      if (['1.05rem', '1.2rem', '1.4rem', '1.65rem'].indexOf(data.font) >= 0) $('blFonte').value = data.font;
      if (['1.65', '1.92', '2.15', '2.4'].indexOf(String(data.spacing)) >= 0) $('blEspaco').value = String(data.spacing);
      if (['claro', 'escuro', 'quente'].indexOf(data.theme) >= 0) $('blTema').value = data.theme;
      immersive = !!data.immersive;
    } catch (e) {}
    applyType();
    setTheme($('blTema').value);
    setImmersive(immersive, false);
  }
  function applyType() {
    content.style.setProperty('--bl-font', $('blFonte').value);
    content.style.setProperty('--bl-line-height', $('blEspaco').value);
    saveSettings();
  }
  function setImmersive(on, persist) {
    immersive = !!on;
    document.documentElement.classList.toggle('biblia-leitor-ativo', true);
    document.body.classList.toggle('biblia-leitor-ativo', true);
    root.classList.toggle('bl-controles-ocultos', immersive);
    $('blImersivoBtn').setAttribute('aria-pressed', String(immersive));
    $('blImersivoBtn').setAttribute('aria-label', immersive ? 'Mostrar controles de leitura' : 'Ocultar controles de leitura');
    if (persist !== false) saveSettings();
  }
  function enterReader() {
    document.documentElement.classList.add('biblia-leitor-ativo');
    document.body.classList.add('biblia-leitor-ativo');
    root.hidden = false;
    syncFromLegacy();
    renderBookList();
    if (current.verse) {
      window.setTimeout(function () {
        var v = content.querySelector('[data-versiculo="' + String(current.verse).replace(/\D/g, '') + '"]');
        if (v) v.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }, 100);
    }
  }
  function exitReader() {
    document.documentElement.classList.remove('biblia-leitor-ativo');
    document.body.classList.remove('biblia-leitor-ativo');
    root.hidden = true;
    settings.hidden = true;
    sheet.hidden = true;
    immersive = false;
    $('blImersivoBtn').setAttribute('aria-pressed', 'false');
    var section = $('biblia');
    if (section) section.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  }
  function syncFromLegacy() {
    var info = titleFromLegacy(), api = getAPI();
    if (!info.book) return;
    books = apiBooks();
    current.code = info.book.code;
    current.chapter = info.chapter;
    if (!api || !content) return;
    var legacyText = $('bibliaTexto');
    var signature = current.code + ':' + current.chapter;
    if (legacyText && legacyText.innerHTML && signature !== lastRenderedSignature) {
      content.classList.remove('bl-loading'); content.innerHTML = legacyText.innerHTML;
      lastRenderedSignature = signature;
    }
    title.textContent = info.book.name + ' ' + info.chapter;
    locationLabel.textContent = 'Bíblia Portuguesa Mundial · ' + info.book.testament;
    footerLabel.textContent = 'Capítulo ' + info.chapter;
    var chapterSelect = $('bibliaCapitulo');
    var atEnd = chapterSelect && info.chapter >= Number(chapterSelect.options.length || 1);
    $('blAnterior').disabled = !api || (info.chapter === 1 && books[0] && info.book.code === books[0].code);
    $('blProximo').disabled = atEnd && (!books[books.indexOf(info.book) + 1]);
    updateProgress();
  }
  function updateProgress() {
    var h = view.scrollHeight - view.clientHeight;
    var ratio = h > 0 ? view.scrollTop / h : 0;
    progress.style.width = Math.max(0, Math.min(100, ratio * 100)) + '%';
  }
  function navigate(delta) {
    var api = getAPI();
    if (!api) return;
    var before = titleFromLegacy();
    var book = before.book;
    if (!book) return;
    var chapter = before.chapter + delta;
    var target = book;
    if (chapter < 1) {
      var i = books.findIndex(function (b) { return b.code === book.code; });
      if (i <= 0) return;
      target = books[i - 1]; chapter = target.chapters;
    } else if (chapter > book.chapters) {
      var j = books.findIndex(function (b) { return b.code === book.code; });
      if (j < 0 || j >= books.length - 1) return;
      target = books[j + 1]; chapter = 1;
    }
    current.code = target.code; current.chapter = chapter; current.verse = null;
    api.abrir(target.code, chapter);
    title.textContent = target.name + ' ' + chapter;
    locationLabel.textContent = 'Bíblia Portuguesa Mundial · ' + target.testament;
    footerLabel.textContent = 'Capítulo ' + chapter;
    content.classList.add('bl-loading'); content.innerHTML = '<p class="bl-reader-empty">Carregando capítulo…</p>';
    lastRenderedSignature = target.code + ':' + chapter;
    view.scrollTop = 0;
    // The core script updates asynchronously; observe the original text node for the completed result.
    waitForLegacyText(target.code, chapter);
    renderChapterButtons(target);
  }
  function waitForLegacyText(code, chapter) {
    var legacy = $('bibliaTexto'), tries = 0;
    var observer = new MutationObserver(function () { copyWhenReady(); });
    function copyWhenReady() {
      var info = titleFromLegacy();
      if (info.book && info.book.code === code && info.chapter === chapter && legacy && legacy.innerHTML.trim()) {
        observer.disconnect();
        content.classList.remove('bl-loading'); content.innerHTML = legacy.innerHTML;
        content.classList.remove('bl-page-enter'); void content.offsetWidth; content.classList.add('bl-page-enter');
        lastRenderedSignature = code + ':' + chapter;
        syncFromLegacy();
        if (current.verse) {
          var verse = content.querySelector('[data-versiculo="' + String(current.verse).replace(/\D/g, '') + '"]');
          if (verse) verse.classList.add('biblia-versiculo-destacado');
        }
        renderBookList(); renderChapterButtons(info.book);
        return;
      }
      if (++tries > 60) { observer.disconnect(); content.classList.remove('bl-loading'); content.innerHTML = '<p class="bl-reader-empty">Não foi possível carregar este capítulo. Verifique a conexão e tente novamente.</p>'; }
    }
    if (legacy) observer.observe(legacy, { childList: true, subtree: true, characterData: true });
    window.setTimeout(copyWhenReady, 250);
  }
  function renderBookList(filter) {
    books = apiBooks();
    if (!books.length) return;
    var search = filter == null ? $('blBuscaLivro').value : filter;
    var normalized = String(search || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    var testaments = ['Antigo Testamento', 'Novo Testamento'];
    selectorList.innerHTML = '';
    testaments.forEach(function (testament) {
      var group = books.filter(function (book) {
        var hay = (book.name + ' ' + book.testament).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return book.testament === testament && hay.indexOf(normalized) >= 0;
      });
      if (!group.length) return;
      var heading = document.createElement('p'); heading.className = 'bl-testament-label'; heading.textContent = testament;
      selectorList.appendChild(heading);
      var grid = document.createElement('div'); grid.className = 'bl-book-grid';
      group.forEach(function (book) {
        var button = document.createElement('button'); button.type = 'button'; button.textContent = book.name;
        button.setAttribute('aria-current', String(book.code === current.code));
        button.addEventListener('click', function () {
          current.code = book.code; current.chapter = 1; current.verse = null;
          $('blSeletorCapitulos').hidden = false;
          $('blTituloSeletor').textContent = book.name + ' — escolher capítulo';
          renderChapterButtons(book);
        });
        grid.appendChild(button);
      });
      selectorList.appendChild(grid);
    });
  }
  function renderChapterButtons(book) {
    chapterList.innerHTML = '';
    for (var i = 1; i <= book.chapters; i++) {
      (function (chapter) {
        var button = document.createElement('button'); button.type = 'button'; button.textContent = chapter;
        button.setAttribute('aria-current', String(book.code === current.code && chapter === current.chapter));
        button.addEventListener('click', function () {
          var api = getAPI();
          current.code = book.code; current.chapter = chapter; current.verse = null;
          if (api) api.abrir(book.code, chapter);
          $('blTituloSeletor').textContent = book.name + ' — capítulo ' + chapter;
          sheet.hidden = true;
          waitForLegacyText(book.code, chapter);
          content.classList.add('bl-loading'); content.innerHTML = '<p class="bl-reader-empty">Carregando capítulo…</p>';
          lastRenderedSignature = book.code + ':' + chapter;
          title.textContent = book.name + ' ' + chapter;
          locationLabel.textContent = 'Bíblia Portuguesa Mundial · ' + book.testament;
          footerLabel.textContent = 'Capítulo ' + chapter;
          view.scrollTop = 0;
        });
        chapterList.appendChild(button);
      })(i);
    }
    $('blSeletorCapitulos').hidden = false;
  }
  function openSelector() {
    books = apiBooks();
    $('blBuscaLivro').value = '';
    $('blSeletorCapitulos').hidden = true;
    $('blTituloSeletor').textContent = 'Escolher livro';
    renderBookList('');
    sheet.hidden = false;
    $('blBuscaLivro').focus();
  }
  function closeSelector() { sheet.hidden = true; $('blAbrirLivros').focus(); }
  function toggleSettings(force) {
    var open = force == null ? settings.hidden : !!force;
    settings.hidden = !open;
    $('blAjustesBtn').setAttribute('aria-expanded', String(open));
    if (open) $('blFonte').focus();
  }
  function onTouchStart(event) {
    if (event.touches.length !== 1 || sheet.hidden === false) { touch = null; return; }
    var t = event.touches[0]; touch = { x: t.clientX, y: t.clientY, time: Date.now(), target: event.target };
  }
  function onTouchEnd(event) {
    if (!touch || event.changedTouches.length !== 1 || immersive && event.target.closest('button,input,select,a')) { touch = null; return; }
    var t = event.changedTouches[0], dx = t.clientX - touch.x, dy = t.clientY - touch.y;
    var start = touch; touch = null;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.35 || Date.now() - start.time > 850) return;
    if (start.target.closest('button,input,select,a') || start.target.closest('.biblia-favoritar')) return;
    navigate(dx < 0 ? 1 : -1);
  }
  function trackLegacyState() {
    var info = titleFromLegacy();
    if (!info.book) return;
    current.code = info.book.code;
    current.chapter = info.chapter;
    title.textContent = info.book.name + ' ' + info.chapter;
    locationLabel.textContent = 'Bíblia Portuguesa Mundial · ' + info.book.testament;
    footerLabel.textContent = 'Capítulo ' + info.chapter;
    renderBookList();
    renderChapterButtons(info.book);
  }
  function observeLegacyContent() {
    var legacy = $('bibliaTexto');
    if (!legacy) return;
    new MutationObserver(function () {
      if (root.hidden) return;
      var info = titleFromLegacy();
      if (!info.book) return;
      var signature = info.book.code + ':' + info.chapter;
      if (legacy.innerHTML.trim()) {
        content.classList.remove('bl-loading');
        content.innerHTML = legacy.innerHTML;
        content.classList.remove('bl-page-enter'); void content.offsetWidth; content.classList.add('bl-page-enter');
        lastRenderedSignature = signature;
        trackLegacyState();
      }
    }).observe(legacy, { childList: true, subtree: true, characterData: true });
  }
  function bind() {
    $('blAbrirLivros').addEventListener('click', openSelector);
    $('blSair').addEventListener('click', exitReader);
    $('blAjustesBtn').addEventListener('click', function () { toggleSettings(); });
    $('blFecharAjustes').addEventListener('click', function () { toggleSettings(false); });
    $('blFecharSeletor').addEventListener('click', closeSelector);
    sheet.addEventListener('click', function (event) { if (event.target === sheet) closeSelector(); });
    $('blBuscaLivro').addEventListener('input', function () { renderBookList(this.value); });
    $('blAnterior').addEventListener('click', function () { navigate(-1); });
    $('blProximo').addEventListener('click', function () { navigate(1); });
    $('blImersivoBtn').addEventListener('click', function () { setImmersive(!immersive, true); });
    $('blFonte').addEventListener('change', applyType);
    $('blEspaco').addEventListener('change', applyType);
    $('blTema').addEventListener('change', function () { setTheme(this.value); });
    view.addEventListener('scroll', updateProgress, { passive: true });
    view.addEventListener('click', function (event) {
      if (!immersive || event.target.closest('button,a,input,select')) return;
      setImmersive(false, true);
    });
    view.addEventListener('touchstart', onTouchStart, { passive: true });
    view.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('keydown', function (event) {
      if (root.hidden) return;
      if (event.key === 'Escape') {
        if (!sheet.hidden) closeSelector();
        else if (!settings.hidden) toggleSettings(false);
        else exitReader();
      }
      if (event.key === 'ArrowLeft' && !sheet.hidden && !settings.hidden) return;
      if (event.key === 'ArrowLeft' && event.altKey) navigate(-1);
      if (event.key === 'ArrowRight' && event.altKey) navigate(1);
    });
    document.addEventListener('click', function (event) {
      var bibleTab = event.target.closest('[href="#biblia"],[data-section="biblia"],[data-target="#biblia"]');
      if (!bibleTab) return;
      window.setTimeout(enterReader, 80);
    });
    document.addEventListener('click', function (event) {
      if (root.hidden) return;
      if (event.target.closest('.bl-reading-content')) {
        if (immersive) setImmersive(false, true);
      }
    });
    window.addEventListener('hashchange', function () {
      if (location.hash === '#biblia') window.setTimeout(enterReader, 60);
      else if (!root.hidden) exitReader();
    });
    observeLegacyContent();
    window.setTimeout(function () {
      if (location.hash === '#biblia') enterReader();
    }, 200);
  }
  restoreSettings();
  bind();
})();
