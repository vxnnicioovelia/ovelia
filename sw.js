/* Ovelia service worker. Only caches same-origin static shell assets; never caches JSON/content feeds. */
'use strict';
var CACHE='ovelia-shell-v50-20261102-pastas'
var SHELL=[
  './','./index.html',
  './assets/css/estilo.css?v=20261025-auditoria1','./assets/css/favoritos.css?v=20261023-parte10','./assets/css/biblia.css?v=20261024-versiculos-bpm1','./assets/css/biblia-leitor.css?v=20261024-leitor-tema-global4',
  './assets/css/calendario-liturgico.css?v=20261022-hotfix2','./assets/css/navegacao-inferior.css?v=20261022-hotfix2',
  './assets/css/inicio.css?v=20261023-parte8','./assets/css/estudos.css?v=20261024-versiculos-legiveis1','./assets/css/ovelia-pwa.css?v=20261019-1','./assets/css/ovelia-interface.css?v=20261025-auditoria1',
  './assets/js/inicio-dados.js?v=20261018-inicio1','./assets/js/liturgia.js?v=20261020-liturgia11','./assets/js/app.js?v=20261102-evangelho1',
  './assets/js/navegacao-inferior.js?v=20261023-parte8','./assets/js/favoritos.js?v=20261023-parte10','./assets/js/biblia.js?v=20261024-versiculos-bpm1','./assets/js/biblia-leitor.js?v=20261025-kindle-selector-fix1',
  './assets/js/calendario-liturgico.js?v=20261017-1','./assets/js/inicio.js?v=20261024-versiculos-bpm1',
  './assets/js/regras.js?v=20261019-estudos4','./assets/js/trilha.js?v=20261023-modulos1',
  './assets/js/progresso.js?v=20261023-modulos1','./estudos/dados/licoes-001-010.js?v=20261023-modulos1',
  './assets/js/interface.js?v=20261024-versiculos-bpm1','./estudos/dados/licoes-011-020.js?v=20261023-modulos1','./assets/js/ovelia-pwa.js?v=20261019-2','./assets/js/ovelia-kids.js?v=20261022-usabilidade2',
  './assets/images/icone-128.png','./assets/images/favicon-64.png','./assets/images/apple-touch-icon.png',
  './assets/images/pwa-192.png','./assets/images/pwa-512.png','./manifest.webmanifest?v=20261019-quality1'
]
self.addEventListener('install',function(event){
  event.waitUntil(caches.open(CACHE).then(function(cache){return Promise.all(SHELL.map(function(url){return cache.add(url).catch(function(){/* Um recurso opcional ausente não deve cancelar o cache dos demais. */});}));}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(event){
  event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(key){return key.indexOf('ovelia-shell-')===0&&key!==CACHE;}).map(function(key){return caches.delete(key);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener('message',function(event){if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',function(event){
  var req=event.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('.json'))return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(function(response){
      if(response&&response.ok){var copy=response.clone();caches.open(CACHE).then(function(cache){cache.put('./index.html',copy);});}
      return response;
    }).catch(function(){return caches.match(req).then(function(hit){return hit||caches.match('./index.html')||caches.match('./');});}));
    return;
  }
  if(/\.(?:css|js|png|webmanifest|svg|woff2?)$/i.test(url.pathname)){
    event.respondWith(fetch(req).then(function(response){
      if(response&&response.ok){var copy=response.clone();caches.open(CACHE).then(function(cache){cache.put(req,copy);});}
      return response;
    }).catch(function(){return caches.match(req);}));
  }
});
