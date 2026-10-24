/* Ovelia — leitor bíblico em estilo de livro digital. Camada visual, reaproveita biblia.js. */
(function () {
  'use strict';
  var root = document.getElementById('bibliaLeitorUX');
  if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var view = $('blRolagem'), content = $('blConteudo'), title = $('blLivroCapitulo');
  var locationLabel = $('blLocalizacao'), footerLabel = $('blCapituloRodape');
  var progress = $('blProgresso'), sheet = $('blSeletor'), settings = $('blAjustes');
  var selectorList = $('blResultadosBusca'), chapterList = $('blListaCapitulos');
  var current = { code: 'GEN', chapter: 1, verse: null };
  var lastRenderedSignature = '';
  var touch = null, immersive = false, previousHash = '#home';
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
  function applyWarmLight(syncOnly) {
    var globalToggle = $('filtroQuente');
    var globalRange = $('filtroIntensidade');
    if (syncOnly) {
      try {
        var saved = JSON.parse(localStorage.getItem('ovelia-filtro-quente') || 'null');
        $('blLuzAzul').checked = globalToggle ? !!globalToggle.checked : !!(saved && saved.ativo);
        $('blLuzAzulNivel').value = String(Math.max(0, Math.min(45, globalRange ? Number(globalRange.value) : (saved && Number(saved.intensidade) || 20))));
      } catch (e) {}
      return;
    }
    var on = $('blLuzAzul').checked;
    var level = Math.max(0, Math.min(45, Number($('blLuzAzulNivel').value) || 0));
    if (globalToggle && globalRange) {
      globalToggle.checked = on;
      globalRange.value = String(level);
      globalToggle.dispatchEvent(new Event('change', { bubbles: true }));
      globalRange.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      document.documentElement.classList.toggle('filtro-quente-global', on);
      document.body.classList.toggle('filtro-quente-ativo', on);
      document.documentElement.style.setProperty('--ovelia-filtro-quente-opacidade', String(on ? (level / 45) * 0.42 : 0));
      try { localStorage.setItem('ovelia-filtro-quente', JSON.stringify({ ativo: on, intensidade: level })); } catch (e) {}
    }
  }
  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        font: $('blFonte').value,
        spacing: $('blEspaco').value,
        theme: $('blTema').value,
        warm: $('blLuzAzul').checked,
        warmLevel: $('blLuzAzulNivel').value,
        immersive: immersive
      }));
    } catch (e) {}
  }
  function restoreSettings() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (data) {
        if (['1.05rem', '1.2rem', '1.4rem', '1.65rem'].indexOf(data.font) >= 0) $('blFonte').value = data.font;
        if (['1.65', '1.92', '2.15', '2.4'].indexOf(String(data.spacing)) >= 0) $('blEspaco').value = String(data.spacing);
        if (['claro', 'escuro', 'quente'].indexOf(data.theme) >= 0) $('blTema').value = data.theme;
        if (typeof data.warm === 'boolean') $('blLuzAzul').checked = data.warm;
        if (data.warmLevel != null && Number.isFinite(Number(data.warmLevel))) $('blLuzAzulNivel').value = String(Math.max(0, Math.min(45, Number(data.warmLevel))));
        immersive = !!data.immersive;
      }
    } catch (e) {}
    applyType();
    setTheme($('blTema').value);
    applyWarmLight(true);
    root.classList.remove('bl-controles-ocultos');
  }
  function applyType() {
    content.style.setProperty('--bl-font', $('blFonte').value);
    content.style.setProperty('--bl-line-height', $('blEspaco').value);
    saveSettings();
  }
  function setImmersive(on, persist) {
    immersive = !!on;
    root.classList.toggle('bl-controles-ocultos', immersive);
    var immersiveButton = $('blImersivoBtn');
    if (immersiveButton) {
      immersiveButton.setAttribute('aria-pressed', String(immersive));
      immersiveButton.setAttribute('aria-label', immersive ? 'Mostrar controles de leitura' : 'Ocultar controles de leitura');
    }
    if (persist !== false) saveSettings();
  }
  function enterReader() {
    document.documentElement.classList.add('biblia-leitor-ativo');
    document.body.classList.add('biblia-leitor-ativo');
    root.hidden = false;
    setImmersive(immersive, false);
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
    root.classList.remove('bl-controles-ocultos');
    if ($('blImersivoBtn')) $('blImersivoBtn').setAttribute('aria-pressed', 'false');
    var target = previousHash && previousHash !== '#biblia' ? previousHash : '#home';
    if (location.hash === target) {
      var section = document.querySelector(target);
      if (section) section.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    } else {
      location.hash = target;
    }
  }
  function syncFromLegacy() {
    books = apiBooks();
    var info = titleFromLegacy(), api = getAPI();
    if (!info.book) return;
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
    if (!books.length || !selectorList) return;
    var searchInput = $('blBuscaLivro');
    var search = filter == null ? searchInput.value : filter;
    var normalized = String(search || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    var testaments = ['Antigo Testamento', 'Novo Testamento'];
    selectorList.innerHTML = '';
    testaments.forEach(function (testament) {
      var group = books.filter(function (book) {
        var hay = (book.name + ' ' + book.testament).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return book.testament === testament && hay.indexOf(normalized) >= 0;
      });
      if (!group.length) return;
      var details = document.createElement('details');
      details.className = 'bl-testamento-grupo';
      details.open = !!normalized;
      var summary = document.createElement('summary');
      summary.innerHTML = '<span>' + esc(testament) + '</span><span class="bl-testamento-count">' + group.length + ' livros</span>';
      details.appendChild(summary);
      var grid = document.createElement('div');
      grid.className = 'bl-book-grid';
      group.forEach(function (book) {
        var button = document.createElement('button');
        button.type = 'button'; button.textContent = book.name;
        button.setAttribute('aria-current', String(book.code === current.code));
        button.addEventListener('click', function () {
          current.code = book.code; current.chapter = 1; current.verse = null;
          $('blSeletorCapitulos').hidden = false;
          $('blTituloSeletor').textContent = book.name + ' — escolher capítulo';
          renderChapterButtons(book);
          details.open = true;
          Array.prototype.forEach.call(selectorList.querySelectorAll('button[aria-current]'), function (b) {
            b.setAttribute('aria-current', String(b === button));
          });
        });
        grid.appendChild(button);
      });
      details.appendChild(grid);
      selectorList.appendChild(details);
    });
    // The first stage is testamento; show chapters only after a book is picked.
  }
  function renderChapterButtons(book) {
    chapterList.innerHTML = '';
    for (var i = 1; i <= book.chapters; i++) {
      (function (chapter) {
        var button = document.createElement('button'); button.type = 'button'; button.textContent = chapter;
        button.setAttribute('aria-label', book.name + ', capítulo ' + chapter);
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
    window.setTimeout(function () { $('blBuscaLivro').focus(); }, 30);
  }
  function closeSelector() { sheet.hidden = true; $('blAbrirLivros').focus(); }
  function toggleSettings(force) {
    var open = force == null ? settings.hidden : !!force;
    settings.hidden = !open;
    $('blAjustesBtn').setAttribute('aria-expanded', String(open));
    if (open) {
      applyWarmLight(true);
      $('blFonte').focus();
    }
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
    books = apiBooks();
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
    var legacy = $('bibliaTexto'), legacyStatus = $('bibliaStatus');
    if (legacy) new MutationObserver(function () {
      if (root.hidden) return;
      var info = titleFromLegacy();
      if (!info.book || !legacy.innerHTML.trim()) return;
      var signature = info.book.code + ':' + info.chapter;
      content.classList.remove('bl-loading');
      content.innerHTML = legacy.innerHTML;
      content.classList.remove('bl-page-enter'); void content.offsetWidth; content.classList.add('bl-page-enter');
      lastRenderedSignature = signature;
      trackLegacyState();
    }).observe(legacy, { childList: true, subtree: true, characterData: true });
    if (legacyStatus) new MutationObserver(function () {
      if (root.hidden || legacyStatus.hidden || !legacyStatus.textContent.trim()) return;
      if (legacy && legacy.innerHTML.trim()) return;
      var message = legacyStatus.textContent.trim();
      content.classList.remove('bl-loading');
      content.innerHTML = '<p class="bl-reader-empty">' + esc(message) + '</p>';
      if (/não foi possível|falha|conexão|erro/i.test(message)) {
        var retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'bl-settings-done';
        retry.textContent = 'Tentar novamente';
        retry.addEventListener('click', function () {
          var info = titleFromLegacy();
          if (info.book) { var api = getAPI(); if (api) api.abrir(info.book.code, info.chapter); }
        });
        content.appendChild(retry);
      }
    }).observe(legacyStatus, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden'] });
  }
  function bind() {
    $('blAbrirLivros').addEventListener('click', openSelector);
    $('blSair').addEventListener('click', exitReader);
    $('blAjustesBtn').addEventListener('click', function () { toggleSettings(); });
    $('blFecharAjustes').addEventListener('click', function () { toggleSettings(false); });
    $('blFecharSeletor').addEventListener('click', closeSelector);
    sheet.addEventListener('click', function (event) { if (event.target === sheet) closeSelector(); });
    $('blBuscaLivro').addEventListener('input', function () {
      $('blSeletorCapitulos').hidden = true;
      renderBookList(this.value);
    });
    $('blAnterior').addEventListener('click', function () { navigate(-1); });
    $('blProximo').addEventListener('click', function () { navigate(1); });
    if ($('blImersivoBtn')) $('blImersivoBtn').addEventListener('click', function () { setImmersive(!immersive, true); });
    $('blLuzAzul').addEventListener('change', applyWarmLight);
    $('blLuzAzulNivel').addEventListener('input', applyWarmLight);
    var globalWarmToggle = $('filtroQuente'), globalWarmRange = $('filtroIntensidade');
    if (globalWarmToggle) globalWarmToggle.addEventListener('change', function () { applyWarmLight(true); });
    if (globalWarmRange) globalWarmRange.addEventListener('input', function () { applyWarmLight(true); });

    $('blFonte').addEventListener('change', applyType);
    $('blEspaco').addEventListener('change', applyType);
    $('blTema').addEventListener('change', function () {
      setTheme(this.value);
      applyType();
    });
    content.addEventListener('click', function (event) {
      var copiedButton = event.target.closest('.biblia-favoritar');
      if (copiedButton) {
        event.preventDefault();
        event.stopPropagation();
        var copiedVerse = copiedButton.closest('[data-versiculo]');
        var verseNo = copiedVerse && copiedVerse.getAttribute('data-versiculo');
        var originalVerse = verseNo && $('bibliaTexto').querySelector('[data-versiculo="' + verseNo.replace(/[^0-9]/g, '') + '"]');
        var originalButton = originalVerse && originalVerse.querySelector('.biblia-favoritar');
        if (originalButton) originalButton.click();
      }
    });
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
      if (location.hash && location.hash !== '#biblia') previousHash = location.hash;
      window.setTimeout(enterReader, 80);
    });
    document.addEventListener('click', function (event) {
      if (root.hidden) return;
      if (event.target.closest('.bl-reading-content')) {
        if (immersive) setImmersive(false, true);
      }
    });
    window.addEventListener('hashchange', function () {
      if (location.hash === '#biblia') window.setTimeout(enterReader, 80);
      else if (!root.hidden) {
        document.documentElement.classList.remove('biblia-leitor-ativo');
        document.body.classList.remove('biblia-leitor-ativo');
        root.hidden = true;
        settings.hidden = true;
        sheet.hidden = true;
        immersive = false;
        root.classList.remove('bl-controles-ocultos');
      }
    });
    observeLegacyContent();
    window.setTimeout(function () {
      if (location.hash === '#biblia') enterReader();
    }, 200);
  }
  restoreSettings();
  bind();
})();
