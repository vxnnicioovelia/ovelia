/* Ovelia — patch incremental do Nível 1. Inclua este arquivo depois de app.js. */
(function () {
  'use strict';
  var whatsapp = 'https://whatsapp.com/channel/0029VbDFfTh3gvWcWSGo1v3P';
  var instagram = 'https://www.instagram.com/oveliaoficial/';
  var labels = {
    '#home': 'Início', '#liturgia': 'Liturgia do dia', '#biblia': 'Bíblia Sagrada',
    '#oracoes': 'Orações', '#terco': 'Santo Terço', '#estudos': 'Estudos bíblicos',
    '#infantil': 'Área infantil', '#sobre': 'Sobre a Ovelia'
  };
  var current = location.hash || '#home';
  var previous = '';

  function fixMenu() {
    document.querySelectorAll('#menu a[href]').forEach(function (a) {
      var label = labels[a.getAttribute('href')];
      if (label) a.textContent = label;
    });
  }
  function addSectionNavigation() {
    document.querySelectorAll('section.pg:not(#home)').forEach(function (section) {
      if (section.querySelector('.nivel1-section-nav')) return;
      var nav = document.createElement('div');
      nav.className = 'nivel1-section-nav';
      nav.setAttribute('aria-label', 'Navegação da página');
      var back = document.createElement('button');
      back.type = 'button'; back.className = 'btn g'; back.textContent = '← Voltar';
      back.addEventListener('click', function () {
        var target = previous && previous !== current ? previous : '#home';
        if (!document.querySelector('section.pg' + target)) target = '#home';
        location.hash = target;
      });
      var home = document.createElement('a');
      home.className = 'btn g'; home.href = '#home'; home.textContent = '⌂ Início';
      nav.appendChild(back); nav.appendChild(home); section.insertBefore(nav, section.firstChild);
    });
  }
  function socialLink(url, text, className) {
    var a = document.createElement('a'); a.href = url; a.textContent = text;
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    if (className) a.className = className;
    return a;
  }
  function addSocialLinks() {
    var footer = document.querySelector('footer');
    if (footer && !footer.querySelector('[data-nivel1-social]')) {
      var links = document.createElement('div'); links.className = 'nivel1-social nivel1-footer-social';
      links.setAttribute('data-nivel1-social', 'footer');
      links.appendChild(socialLink(instagram, '📸 Instagram oficial ↗'));
      links.appendChild(socialLink(whatsapp, '💬 Canal oficial no WhatsApp ↗'));
      footer.appendChild(links);
    }
    var about = document.getElementById('sobre');
    if (about && !about.querySelector('[data-nivel1-social="sobre"]')) {
      var card = about.querySelector('.card.side') || about;
      var links2 = document.createElement('div'); links2.className = 'nivel1-social';
      links2.setAttribute('data-nivel1-social', 'sobre');
      links2.appendChild(socialLink(instagram, '📸 Instagram oficial ↗', 'btn g'));
      links2.appendChild(socialLink(whatsapp, '💬 Canal da Ovelia no WhatsApp ↗', 'btn'));
      card.appendChild(links2);
    }
  }
  function run() { fixMenu(); addSectionNavigation(); addSocialLinks(); }
  window.addEventListener('hashchange', function () {
    var next = location.hash || '#home';
    if (next !== current) { previous = current; current = next; }
    run();
  });
  var menu = document.getElementById('menu');
  if (menu && window.MutationObserver) new MutationObserver(fixMenu).observe(menu, { childList: true, subtree: true, characterData: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
