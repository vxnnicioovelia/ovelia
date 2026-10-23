/* Ovelia — transparência das traduções e diagnóstico local (Parte 9). */
(function(){
  'use strict';
  var $=function(s){return document.querySelector(s);};
  var lista=$('#transparenciaTraducoesLista');
  var diag=$('#diagnosticoOveliaLista');
  var status=$('#diagnosticoOveliaStatus');
  var atualizar=$('#atualizarOveliaBtn');
  var VERSION='2026.10.23-parte9';
  function txt(v, fallback){return (typeof v==='string'&&v.trim())?v.trim():(fallback||'Não informado no catálogo');}
  function estadoLabel(v){if(v==='disponivel')return 'Disponível';if(v==='bloqueada')return 'Bloqueada';return 'Em preparação';}
  function renderCatalogo(data){
    if(!lista)return;
    var trs=Array.isArray(data&&data.traducoes)?data.traducoes:[];
    var expected=[['bpm','Bíblia Portuguesa Mundial (BPM)'],['matos-soares','Manuel de Matos Soares'],['figueiredo','Antônio Pereira de Figueiredo']];
    var byId={};trs.forEach(function(t){if(t&&t.id)byId[t.id]=t;});
    lista.innerHTML='';
    expected.forEach(function(item){
      var t=byId[item[0]]||{};var lic=t.licenca||{};
      var article=document.createElement('article');article.className='traducao-transparencia';
      var h=document.createElement('h4');h.textContent=txt(t.nome,item[1]);article.appendChild(h);
      var fields=[['Origem',t.origem],['Edição',t.edicao],['Licença',lic.tipo],['Estado',estadoLabel(t.estado)]];
      fields.forEach(function(f){var p=document.createElement('p');var b=document.createElement('strong');b.textContent=f[0]+': ';p.appendChild(b);p.appendChild(document.createTextNode(f[0]==='Estado'?f[1]:txt(f[1]||(f[0]==='Licença'?lic.url:''),'Não confirmado')));article.appendChild(p);});
      if(lic.url){var p2=document.createElement('p');var a=document.createElement('a');a.href=lic.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Consultar fonte da licença';p2.appendChild(a);article.appendChild(p2);}
      lista.appendChild(article);
    });
    if(!trs.length){var p=document.createElement('p');p.textContent='O catálogo não trouxe traduções. Nenhuma tradução será considerada disponível sem dados válidos.';lista.appendChild(p);}
  }
  function loadCatalog(){
    var urls=['catalogo-biblia.json','dados/biblia/catalogo.json'];
    function next(i){if(i>=urls.length){renderCatalogo(null);return Promise.resolve();}
      return fetch(urls[i],{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}).then(renderCatalogo).catch(function(){return next(i+1);});}
    return next(0);
  }
  function addRow(dl,label,value){var dt=document.createElement('dt');dt.textContent=label;var dd=document.createElement('dd');dd.textContent=value;dl.appendChild(dt);dl.appendChild(dd);}
  function refreshDiag(){
    if(!diag)return;
    diag.innerHTML='';addRow(diag,'Versão do site',VERSION);
    addRow(diag,'Conexão',navigator.onLine?'Online':'Offline — recursos externos podem não carregar');
    addRow(diag,'Service worker',('serviceWorker' in navigator)?(navigator.serviceWorker.controller?'Ativo':'Registrado, aguardando controle ou indisponível'):'Não suportado neste navegador');
    var cachePromise=('caches' in window)?caches.keys().then(function(keys){var shell=keys.filter(function(k){return k.indexOf('ovelia-shell-')===0;});return shell.length?shell.sort().join(', '):'Nenhum cache Ovelia encontrado';}).catch(function(){return 'Não foi possível consultar os caches';}):Promise.resolve('API de Cache indisponível');
    var persistPromise=(navigator.storage&&navigator.storage.persisted)?navigator.storage.persisted().then(function(v){return v?'Sim (armazenamento persistente concedido)':'Não confirmado / não concedido';}).catch(function(){return 'Não foi possível verificar';}):Promise.resolve('Não suportado pelo navegador');
    return Promise.all([cachePromise,persistPromise]).then(function(vals){addRow(diag,'Cache do service worker',vals[0]);addRow(diag,'Armazenamento persistente',vals[1]);});
  }
  function say(message){if(status)status.textContent=message;}
  if(atualizar)atualizar.addEventListener('click',function(){
    if(!window.confirm('Atualizar a Ovelia e remover caches antigos? O progresso guardado no site não será apagado.'))return;
    say('Solicitando atualização…');
    var sw=navigator.serviceWorker;
    if(!sw){say('Este navegador não oferece atualização por service worker. Recarregue a página manualmente.');return;}
    sw.getRegistration().then(function(reg){
      if(!reg){say('Nenhum service worker foi encontrado. Recarregue a página com internet para instalar a versão atual.');return;}
      return reg.update().catch(function(){}).then(function(){
        var worker=sw.controller||reg.active;
        if(worker)worker.postMessage({type:'CLEAR_OLD_CACHES'});
        if(reg.waiting){reg.waiting.postMessage({type:'SKIP_WAITING'});}
        say('Atualização solicitada. Feche e reabra a Ovelia se a nova versão não aparecer imediatamente.');
        setTimeout(function(){refreshDiag();},800);
      });
    }).catch(function(){say('Não foi possível atualizar agora. Verifique a conexão e tente novamente.');});
  });
  window.addEventListener('online',refreshDiag);window.addEventListener('offline',refreshDiag);
  loadCatalog();refreshDiag();
})();
