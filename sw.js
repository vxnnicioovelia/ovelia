/* Ovelia service worker. Only caches same-origin static shell assets; never caches JSON/content feeds. */
'use strict';
var CACHE='ovelia-shell-v14-lit1';
var SHELL=[
  './','./index.html',
  './estilo.css?v=20261021-fix1','./biblia.css?v=20261017',
  './calendario-liturgico.css?v=20261021-fix1','./navegacao-inferior.css?v=20261019-apple1',
  './inicio.css?v=20261021-fix1','./estudos.css?v=20261019-estudos4','./ovelia-pwa.css?v=20261019-1',
  './inicio-dados.js?v=20261018-inicio1','./liturgia.js?v=20261020-liturgia11','./app.js?v=20261021-lit1',
  './navegacao-inferior.js?v=20261019-quality1','./biblia.js?v=20261019-quality1',
  './calendario-liturgico.js?v=20261017-1','./inicio.js?v=20261018-inicio1',
  './regras.js?v=20261019-estudos4','./trilha.js?v=20261019-estudos4',
  './progresso.js?v=20261019-estudos4','./licoes-001-010.js?v=20261020-auditoria13',
  './interface.js?v=20261021-fix2','./ovelia-pwa.js?v=20261019-2','./ovelia-kids.js?v=20261019-quality1',
  './icone-128.png','./favicon-64.png','./apple-touch-icon.png',
  './pwa-192.png','./pwa-512.png','./manifest.webmanifest?v=20261019-quality1'
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