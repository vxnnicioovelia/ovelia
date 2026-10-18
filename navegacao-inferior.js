/* Ovelia — Etapa 2: navegação inferior isolada. Não altera rotas nem conteúdo. */
(function(){
  'use strict';
  var menu=document.getElementById('menu');
  var menuBtn=document.getElementById('menuBtn');
  if(!menu||document.getElementById('ovelia-nav-inferior'))return;
  var nav=document.createElement('nav');
  nav.id='ovelia-nav-inferior';
  nav.className='ovelia-bottom-nav';
  nav.setAttribute('aria-label','Navegação rápida');
  nav.innerHTML='<div class="ovelia-bottom-nav__inner" role="group" aria-label="Destinos principais"></div>';
  document.body.appendChild(nav);
  var inner=nav.querySelector('.ovelia-bottom-nav__inner');
  var icons={
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    liturgia:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    biblia:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 4.5v17M9 7h7M9 11h7"/>',
    oracoes:'<path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>',
    estudos:'<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H12v17H4.5A2.5 2.5 0 0 0 2 22zM22 5.5A2.5 2.5 0 0 0 19.5 3H12v17h7.5A2.5 2.5 0 0 1 22 22z"/>',
    terco:'<circle cx="12" cy="5" r="2"/><circle cx="7" cy="9" r="1.5"/><circle cx="17" cy="9" r="1.5"/><circle cx="6" cy="14" r="1.5"/><circle cx="18" cy="14" r="1.5"/><path d="M12 8v5m0 0-2 2m2-2 2 2m-2 0v5m-2-2h4"/>',
    infantil:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="M8 12h.01M16 12h.01M9 15c1.5 1.5 4.5 1.5 6 0"/>',
    mais:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  function profile(){try{return localStorage.getItem('ovelia-perfil')||'adult'}catch(e){return 'adult'}}
  function item(id,label,icon){return {id:id,label:label,icon:icon}}
  function destinations(){
    var p=profile();
    if(p==='kids')return [item('home','Início','home'),item('infantil','Histórias','infantil'),item('oracoes','Orações','oracoes'),item('mais','Mais','mais')];
    if(p==='senior')return [item('home','Início','home'),item('liturgia','Liturgia','liturgia'),item('biblia','Bíblia','biblia'),item('oracoes','Orações','oracoes'),item('terco','Terço','terco'),item('mais','Mais','mais')];
    return [item('home','Início','home'),item('liturgia','Liturgia','liturgia'),item('biblia','Bíblia','biblia'),item('oracoes','Oração','oracoes'),item('estudos','Estudos','estudos'),item('mais','Mais','mais')];
  }
  function currentId(){var id=(location.hash||'#home').slice(1);return id||'home'}
  function render(){
    var id=currentId(),items=destinations();
    // No perfil 60+, em telas estreitas, organize os seis destinos em duas linhas
    // para manter os nomes inteiros e os alvos de toque confortáveis.
    var senior=profile()==='senior';
    var compactSenior=senior && window.matchMedia('(max-width: 899px)').matches;
    inner.style.gridTemplateColumns='repeat('+(compactSenior?3:items.length)+', minmax(0, 1fr))';
    nav.classList.toggle('ovelia-bottom-nav--senior',senior);
    nav.classList.toggle('ovelia-bottom-nav--senior-mobile',compactSenior);
    inner.innerHTML=items.map(function(d){
      if(d.id==='mais')return '<button type="button" class="ovelia-bottom-nav__item ovelia-bottom-nav__more" aria-label="Mais opções de navegação" aria-controls="menu"><svg viewBox="0 0 24 24" aria-hidden="true">'+icons.mais+'</svg><span>Mais</span></button>';
      return '<a class="ovelia-bottom-nav__item" href="#'+d.id+'"'+(id===d.id?' aria-current="page"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+icons[d.icon]+'</svg><span>'+d.label+'</span></a>';
    }).join('');
    var more=inner.querySelector('.ovelia-bottom-nav__more');
    if(more)more.addEventListener('click',function(){
      if(window.OveliaMainMenu){
        var opened=window.OveliaMainMenu.toggle();
        if(opened){var first=menu.querySelector('a');if(first)first.focus();}
      }else{menu.classList.toggle('open');var firstFallback=menu.querySelector('a');if(firstFallback)firstFallback.focus();}
    });
  }
  window.addEventListener('hashchange',render);
  window.addEventListener('resize',render);
  window.addEventListener('storage',function(e){if(e.key==='ovelia-perfil')render()});
  document.querySelectorAll('[data-profile]').forEach(function(b){b.addEventListener('click',function(){window.setTimeout(render,0)})});
  if(menu&&window.MutationObserver)new MutationObserver(render).observe(menu,{childList:true});
  render();
})();
