/* Ovelia PWA — instalação progressiva; caminhos relativos compatíveis com GitHub Pages. */
(function(){
  'use strict';
  var deferredPrompt=null;
  var installBtn=document.getElementById('instalarOveliaBtn');
  var promptBtn=document.getElementById('pwaPromptBtn');
  var status=document.getElementById('instalarOveliaStatus');
  var instrucao=document.getElementById('pwaInstrucaoStatus');
  var guide=document.getElementById('instalarOvelia');
  function goGuide(){
    if(location.hash!=='#instalarOvelia') location.hash='instalarOvelia';
    if(guide) guide.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function say(el,msg){if(el)el.textContent=msg;}
  if(installBtn) installBtn.addEventListener('click',function(){
    if(deferredPrompt){
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choice){
        deferredPrompt=null;
        if(promptBtn)promptBtn.hidden=true;
        say(status,choice&&choice.outcome==='accepted'?'Instalação aceita pelo navegador. Siga as instruções exibidas pelo sistema.':'A instalação não foi confirmada. Você ainda pode seguir o guia manual.');
        goGuide();
      }).catch(function(){goGuide();});
    }else goGuide();
  });
  window.addEventListener('beforeinstallprompt',function(event){
    event.preventDefault(); deferredPrompt=event;
    if(promptBtn)promptBtn.hidden=false;
    say(status,'Este navegador oferece instalação direta. Toque em “Instalar Ovelia” para ver a opção.');
    say(instrucao,'A instalação direta está disponível neste navegador.');
  });
  if(promptBtn) promptBtn.addEventListener('click',function(){
    if(!deferredPrompt){say(instrucao,'A instalação direta não está disponível agora. Use as instruções do seu dispositivo.');return;}
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choice){
      deferredPrompt=null;promptBtn.hidden=true;
      say(instrucao,choice&&choice.outcome==='accepted'?'Pedido de instalação aceito pelo navegador.':'Instalação não confirmada; você pode usar o guia manual.');
    }).catch(function(){say(instrucao,'Não foi possível abrir a instalação direta. Use as instruções manuais.');});
  });
  window.addEventListener('appinstalled',function(){
    say(status,'A Ovelia foi instalada neste dispositivo.');
    say(instrucao,'A Ovelia foi instalada neste dispositivo.');
    if(promptBtn)promptBtn.hidden=true;
  });
  if(!('onbeforeinstallprompt' in window)){
    say(instrucao,'Este navegador não oferece um botão de instalação direta nesta página. Siga as instruções do seu dispositivo.');
    say(status,'A instalação direta varia por navegador. Abra o guia para ver as instruções.');
  }
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
    window.addEventListener('load',function(){
      navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(function(reg){
        if(reg.waiting){reg.waiting.postMessage({type:'SKIP_WAITING'});}
      }).catch(function(err){
        console.warn('Ovelia: service worker não foi registrado; o site continua disponível online.',err);
      });
    });
  }
})();