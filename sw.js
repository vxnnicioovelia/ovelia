/* Ovelia service worker. Only caches same-origin static shell assets; never caches JSON/content feeds. */
'use strict';
var CACHE='ovelia-shell-v12-20261021-org1';
var SHELL=[
  './','./index.html',
  './css/estilo.css?v=20261021-org1','./css/biblia.css?v=20261021-org1',
  './css/calendario-liturgico.css?v=20261021-org1','./css/navegacao-inferior.css?v=20261021-org1',
  './css/inicio.css?v=20261021-org1','./css/estudos.css?v=20261021-org1','./css/ovelia-pwa.css?v=20261021-org1',
  './js/inicio-dados.js?v=20261021-org1','./js/liturgia.js?v=20261021-org1','./js/app.js?v=20261021-org1',
  './js/navegacao-inferior.js?v=20261021-org1','./js/biblia.js?v=20261021-org1',
  './js/calendario-liturgico.js?v=20261021-org1','./js/inicio.js?v=20261021-org1',
  './js/regras.js?v=20261021-org1','./js/trilha.js?v=20261021-org1',
  './js/progresso.js?v=20261021-org1','./estudos/dados/licoes-001-010.js?v=20261021-org1',
  './js/interface.js?v=20261021-org1','./js/ovelia-pwa.js?v=20261021-org1','./js/ovelia-kids.js?v=20261021-org1',
  './img/icone-128.png','./img/favicon-64.png','./img/apple-touch-icon.png',
  './img/pwa-192.png','./img/pwa-512.png','./manifest.webmanifest?v=20261021-org1'
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