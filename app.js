/* Ovelia — site estático. Sem cadastro e sem coleta de dados pessoais.
   Perfil, preferências de leitura e progresso de estudo ficam somente no armazenamento local deste aparelho. */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML}

/* ---------- Perfis e navegação ---------- */
var PROFILE_NAMES={kids:'Modo infantil',adult:'Modo normal',senior:'Ovelia 60+'};
var profile='';
try{profile=localStorage.getItem('ovelia-perfil')||''}catch(e){}
/* Migra a escolha antiga sem obrigar a pessoa a selecionar o perfil novamente. */
if(profile==='easy')profile='senior';
/* Evita que um valor antigo/inválido deixe a tela inicial sem escolha de perfil. */
if(['kids','adult','senior'].indexOf(profile)<0)profile='';
var perfilInicio=$('#perfilInicio'),perfilBtn=$('#perfilBtn'),perfilAtual=$('#perfilAtual');
var kidsHome=$('#kidsHome'),seniorHome=$('#seniorHome');
function pagesForProfile(){
  if(profile==='kids')return [['home','Início'],['infantil','Histórias e quiz'],['criatividade','Criatividade'],['oracoes','Orações infantis'],['instalarOvelia','Instalar Ovelia']];
  if(profile==='senior')return [['home','Início'],['liturgia','Liturgia diária'],['oracoes','Orações'],['terco','Rezar o terço'],['biblia','Bíblia'],['instalarOvelia','Instalar Ovelia'],['sobre','Sobre']];
  return [['home','Início'],['liturgia','Liturgia'],['biblia','Bíblia'],['oracoes','Orações'],['terco','Terço'],['estudos','Estudos bíblicos'],['infantil','Área infantil'],['instalarOvelia','Instalar Ovelia'],['sobre','Sobre']];
}
var PAGES=pagesForProfile(),menu=$('#menu'),menuBtn=$('#menuBtn');
function renderMenu(){PAGES=pagesForProfile();menu.innerHTML=PAGES.map(function(p){return '<li><a href="#'+p[0]+'">'+p[1]+'</a></li>'}).join('')}
function setProfileControls(){
  var senior=profile==='senior',kids=profile==='kids';
  $('#aMenos').textContent=senior?'Diminuir texto':'A−';
  $('#aMais').textContent=senior?'Aumentar texto':'A+';
  $('#aCont').textContent=senior?'Alto contraste':'Contraste';
  $('#aMenos').setAttribute('aria-label','Diminuir tamanho do texto');
  $('#aMais').setAttribute('aria-label','Aumentar tamanho do texto');
  $('#aCont').setAttribute('aria-label','Ativar ou desativar alto contraste');
  var compact=profile==='adult';
  var voicePanel=$('#vozControles'),voiceToggle=$('#vozToggle');
  if(voicePanel&&voiceToggle){voicePanel.hidden=profile!=='senior';voicePanel.classList.remove('voz-aberto');voiceToggle.setAttribute('aria-expanded','false')}
  $('#textoBtn').hidden=!compact;$('#temaBtn').hidden=kids;
  $('#aMenos').hidden=kids||compact;$('#aMais').hidden=kids||compact;$('#aCont').hidden=kids||compact;
  $('#perfilBtn').hidden=false; /* Kids precisa sempre ter caminho de volta. */
  if(compact){$('#aCont').hidden=true;$('#aMenos').hidden=true;$('#aMais').hidden=true}
}
function applyProfile(){
  document.body.classList.remove('perfil-kids','perfil-senior','perfil-easy','perfil-adult');
  if(profile==='adult')document.body.classList.add('perfil-adult');
  if(profile==='kids')document.body.classList.add('perfil-kids');
  if(profile==='senior')document.body.classList.add('perfil-senior');
  perfilAtual.textContent=profile?'Experiência ativa: '+PROFILE_NAMES[profile]+'. Para mudar, toque em “Trocar perfil”.':'';
  renderMenu();setProfileControls();
  if(kidsHome)kidsHome.hidden=profile!=='kids';
  if(seniorHome)seniorHome.hidden=profile!=='senior';
  var prayerTitle=$('#oracoes h2');if(prayerTitle)prayerTitle.textContent=profile==='kids'?'Orações para crianças':'Orações';
  try{if(profile)localStorage.setItem('ovelia-perfil',profile)}catch(e){}
  if(perfilInicio)perfilInicio.hidden=!!profile;
  if(profile==='senior'){
    try{if(localStorage.getItem('ovelia-letra-normal')===null)localStorage.setItem('ovelia-letra-normal',String(tam))}catch(e){}
    tam=Math.max(1,tam);applyPrefs();
  }
  if(profile==='kids')applyPrefs();
  if(profile==='adult'){
    try{if(localStorage.getItem('ovelia-letra-normal')!==null)tam=+(localStorage.getItem('ovelia-letra-normal')||0)}catch(e){}
    applyPrefs();
  }
}
function chooseProfile(p){
  if(['kids','adult','senior'].indexOf(p)<0)return;
  var old=profile;
  if(p==='senior'&&old!=='senior'){try{localStorage.setItem('ovelia-letra-normal',String(tam))}catch(e){}}
  if(p==='adult'&&old==='senior'){try{tam=+(localStorage.getItem('ovelia-letra-normal')||0)}catch(e){tam=0}}
  profile=p;applyProfile();if(location.hash!=='#home')location.hash='home';else show(false);
}
$$('[data-profile]').forEach(function(b){b.addEventListener('click',function(){chooseProfile(b.getAttribute('data-profile'))})});
function openProfileChooser(){
  if(profile==='kids'&&!window.confirm('Sair do modo infantil? Peça ajuda a um adulto.'))return;
  perfilInicio.hidden=false;
  var first=$('[data-profile]',perfilInicio);if(first)first.focus();
}
perfilBtn.addEventListener('click',openProfileChooser);
/* Mantém o foco dentro do seletor enquanto ele estiver aberto. */
perfilInicio.addEventListener('keydown',function(e){
  if(perfilInicio.hidden)return;
  if(e.key==='Escape'){
    if(profile){e.preventDefault();perfilInicio.hidden=true;perfilBtn.focus()}
    else e.preventDefault();
    return;
  }
  if(e.key!=='Tab')return;
  var itens=$$('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',perfilInicio).filter(function(el){return !el.hidden});
  if(!itens.length)return;
  var first=itens[0],last=itens[itens.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
});
function toggleMainMenu(force){var o=typeof force==='boolean'?force:!menu.classList.contains('open');menu.classList.toggle('open',o);if(menuBtn)menuBtn.setAttribute('aria-expanded',String(o));return o;}
if(menuBtn)menuBtn.addEventListener('click',function(){toggleMainMenu()});
window.OveliaMainMenu={toggle:toggleMainMenu,close:function(){toggleMainMenu(false)}};
renderMenu();
if(!profile){perfilInicio.hidden=false;var firstProfile=$('[data-profile]',perfilInicio);if(firstProfile)firstProfile.focus()}
function show(first){
  var id=location.hash.slice(1);if(!$('section.pg[id="'+id+'"]'))id='home';
  if(profile==='kids'&&['liturgia','terco','estudos','biblia','sobre'].indexOf(id)>=0){id='home';if(location.hash!=='#home')history.replaceState(null,'',location.pathname+location.search+'#home');}
  $$('section.pg').forEach(function(s){s.classList.toggle('on',s.id===id)});
  $$('#menu a').forEach(function(a){if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  menu.classList.remove('open');if(menuBtn)menuBtn.setAttribute('aria-expanded','false');
  if(typeof Voz!=='undefined')Voz.parar();
  window.scrollTo(0,0);
  var t=PAGES.filter(function(p){return p[0]===id})[0];document.title=(id==='home'?(profile==='kids'?'Ovelia Kids — histórias e orações':profile==='senior'?'Ovelia 60+ — fé e oração':'Ovelia — Bíblia, Liturgia Diária e orações católicas'):(t?t[1]:id)+' — Ovelia');
  if(!first){var h=$('#'+id+' h1,#'+id+' h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}
}
window.addEventListener('hashchange',function(){show(false)});
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-scroll]');if(g){var el=document.getElementById(g.getAttribute('data-scroll'));if(el){el.scrollIntoView();el.setAttribute('tabindex','-1');el.focus({preventScroll:true})}}
});

/* ---------- Tema claro/escuro e controle único de texto ---------- */
var temaBtn=$('#temaBtn'),temaIcone=$('#temaIcone'),textoBtn=$('#textoBtn'),painelTexto=$('#painelTexto'),textoRange=$('#textoRange'),textoPreview=$('#textoPreview'),altoContrasteBtn=$('#altoContrasteBtn');
function temaAtual(){return document.body.classList.contains('tema-escuro')?'dark':'light'}
function aplicarTema(tema,guardar){document.body.classList.toggle('tema-escuro',tema==='dark');document.body.classList.toggle('tema-claro',tema==='light');temaIcone.textContent=tema==='dark'?'☀':'☾';temaBtn.setAttribute('aria-label',tema==='dark'?'Ativar tema claro':'Ativar tema escuro');temaBtn.setAttribute('aria-pressed',String(tema==='dark'));if(guardar){try{localStorage.setItem('ovelia-tema',tema)}catch(e){}}}
var temaGuardado=null;try{temaGuardado=localStorage.getItem('ovelia-tema')}catch(e){};aplicarTema(temaGuardado==='dark'?'dark':temaGuardado==='light'?'light':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),false);
temaBtn.addEventListener('click',function(){aplicarTema(temaAtual()==='dark'?'light':'dark',true)});
textoBtn.addEventListener('click',function(){var abrir=painelTexto.hidden; painelTexto.hidden=!abrir;textoBtn.setAttribute('aria-expanded',String(abrir));if(abrir)textoRange.focus()});
textoRange.addEventListener('input',function(){tam=+textoRange.value;applyPrefs();textoPreview.className='';textoPreview.style.fontSize=['1rem','1.18rem','1.4rem'][tam]});
$('#textoPadrao').addEventListener('click',function(){tam=0;textoRange.value='0';applyPrefs();textoPreview.style.fontSize='1rem'});
altoContrasteBtn.addEventListener('click',function(){var on=body.classList.toggle('contraste');altoContrasteBtn.setAttribute('aria-pressed',String(on));$('#aCont').setAttribute('aria-pressed',String(on));applyPrefs()});
/* ---------- Acessibilidade: letra e contraste (só preferências locais) ---------- */
var tam=0,body=document.body;
function applyPrefs(){body.classList.remove('t1','t2');if(tam)body.classList.add('t'+tam);$('#aMais').disabled=tam>=2;$('#aMenos').disabled=tam<=0;if(textoRange)textoRange.value=String(tam);if(textoPreview)textoPreview.style.fontSize=['1rem','1.18rem','1.4rem'][tam];if(altoContrasteBtn)altoContrasteBtn.setAttribute('aria-pressed',String(body.classList.contains('contraste')));
  try{localStorage.setItem('ovelia-letra',tam);localStorage.setItem('ovelia-contraste',body.classList.contains('contraste')?'1':'0')}catch(e){}}
try{tam=+localStorage.getItem('ovelia-letra')||0;if(localStorage.getItem('ovelia-contraste')==='1'){body.classList.add('contraste')}}catch(e){}
if(window.matchMedia&&window.matchMedia('(prefers-contrast: more)').matches&&!body.classList.contains('contraste')){try{if(localStorage.getItem('ovelia-contraste')===null)body.classList.add('contraste')}catch(e){}}
$('#aMais').addEventListener('click',function(){tam=Math.min(2,tam+1);applyPrefs()});
$('#aMenos').addEventListener('click',function(){tam=Math.max(0,tam-1);applyPrefs()});
var cb=$('#aCont');cb.setAttribute('aria-pressed',body.classList.contains('contraste'));
cb.addEventListener('click',function(){var on=body.classList.toggle('contraste');cb.setAttribute('aria-pressed',on);applyPrefs()});
applyPrefs();


/* ---------- Leitura em voz alta: compatibilidade reforçada com Safari/iPhone ---------- */
var Voz=(function(){
  var ok=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window),voices=[],sel=$('#vozSel'),vel=$('#vozVel'),st=$('#vozStatus'),pz=$('#vozPausa'),prefV=null,queue=[],active=false,runId=0,current=null,startTimer=null,watchdog=null;
  try{prefV=localStorage.getItem('ovelia-voz');vel.value=localStorage.getItem('ovelia-vel')||'0.85'}catch(e){}
  if(!ok){document.body.classList.add('sem-voz');st.textContent='A leitura por voz não é compatível com este navegador. Atualize o Safari ou tente outro navegador.';return {disponivel:function(){return false},falar:function(){st.textContent='A leitura por voz não está disponível neste navegador.'},parar:function(){},texto:function(){return ''}}}
  function carregar(){
    try{voices=window.speechSynthesis.getVoices()||[]}catch(e){voices=[]}
    function rank(v){
      var lang=(v.lang||'').replace('_','-').toLowerCase(),name=(v.name||'').toLowerCase(),score=0;
      if(lang==='pt-br')score+=300;
      else if(lang.indexOf('pt-')===0||lang==='pt')score+=200;
      if(/natural|enhanced|premium|neural/i.test(name))score+=20;
      if(/compact|basic/i.test(name))score-=10;
      return score;
    }
    voices.sort(function(a,b){return rank(b)-rank(a)});
    var old=sel.value,html='';
    voices.forEach(function(v,i){html+='<option value="'+i+'">'+esc((v.name||'Voz')+' ('+(v.lang||'idioma não informado')+')')+'</option>'});
    sel.innerHTML=html;
    var chosen=-1;
    voices.forEach(function(v,i){if(prefV&&(v.name+'|'+v.lang)===prefV)chosen=i});
    if(chosen<0)voices.forEach(function(v,i){if(chosen<0&&prefV&&v.name===prefV)chosen=i});
    if(chosen>=0)sel.value=String(chosen);
    else if(voices.length){sel.value='0';try{prefV=voices[0].name+'|'+voices[0].lang}catch(e){}}
    sel.disabled=!voices.length;
    var hasPt=voices.some(function(v){return /^pt([_-]|$)/i.test(v.lang||'')});
    if(!voices.length){
      st.textContent='O navegador ainda não disponibilizou vozes. Aguarde um instante ou confira as vozes instaladas nas configurações do aparelho.';
    } else if(!hasPt){
      st.textContent='Não há voz em português disponível neste aparelho. Você pode escolher uma voz listada, mas a pronúncia em português pode não ser correta.';
    } else {
      st.textContent='Vozes disponíveis no aparelho; português brasileiro aparece primeiro. A Ovelia só lista vozes reais fornecidas pelo dispositivo. Se a página estiver traduzida pelo navegador, escolha uma voz do idioma traduzido.';
    }
  }
  carregar();
  if(window.speechSynthesis.addEventListener)window.speechSynthesis.addEventListener('voiceschanged',carregar);
  window.speechSynthesis.onvoiceschanged=carregar;
  sel.addEventListener('change',function(){try{var v=voices[+sel.value];if(v){prefV=v.name+'|'+v.lang;localStorage.setItem('ovelia-voz',prefV)}}catch(e){}});
  vel.addEventListener('input',function(){try{localStorage.setItem('ovelia-vel',vel.value)}catch(e){}});
  function parar(silent){var was=active||window.speechSynthesis.speaking||window.speechSynthesis.paused;runId++;queue=[];active=false;current=null;if(startTimer){clearTimeout(startTimer);startTimer=null}if(watchdog){clearTimeout(watchdog);watchdog=null}try{window.speechSynthesis.cancel()}catch(e){}pz.textContent='Pausar';if(!silent)st.textContent=was?'Leitura interrompida.':''}
  function next(id){
    if(id!==runId)return;
    if(!queue.length){active=false;current=null;if(watchdog){clearTimeout(watchdog);watchdog=null}pz.textContent='Pausar';st.textContent='Leitura concluída.';return}
    var part=queue.shift(),u=new SpeechSynthesisUtterance(part),v=voices[+sel.value];current=u;
    /* A língua da fala deve acompanhar a voz escolhida. Isso permite que vozes inglesas/espanholas leiam páginas traduzidas pelo navegador; para texto em português, prefira uma voz pt-BR. */u.lang=(v&&v.lang)||document.documentElement.lang||'pt-BR';if(v)u.voice=v;u.rate=+vel.value||0.85;u.pitch=1;u.volume=1;
    u.onstart=function(){if(id!==runId)return;if(watchdog){clearTimeout(watchdog);watchdog=null}st.textContent='Reproduzindo áudio…';};
    u.onend=function(){if(id===runId){current=null;if(watchdog){clearTimeout(watchdog);watchdog=null}var fim=(part.slice(-1)==='?'||part.slice(-1)==='!')?380:(part.slice(-1)==='.'?300:180);startTimer=setTimeout(function(){next(id)},fim)}};
    u.onerror=function(e){if(id!==runId)return;if(e.error==='canceled'||e.error==='interrupted')return;if(watchdog){clearTimeout(watchdog);watchdog=null}active=false;current=null;st.textContent='O navegador informou que não conseguiu reproduzir a voz ('+(e.error||'erro')+'). Verifique o volume e as vozes do iPhone.'};
    try{
      window.speechSynthesis.speak(u);
      if(watchdog)clearTimeout(watchdog);
      watchdog=setTimeout(function(){if(id===runId&&active&&current===u&&!window.speechSynthesis.speaking){st.textContent='O iPhone não iniciou o áudio. Verifique o volume, o modo silencioso e Ajustes > Acessibilidade > Conteúdo Falado.'}},3500);
    }catch(e){active=false;current=null;st.textContent='Não foi possível iniciar o áudio: '+(e&&e.message?e.message:'erro do navegador')+'.'}
  }
  function partir(t){var r=t.match(/[^.!?;:\n]+[.!?;:]?\s*/g)||[t],o=[],c='';r.forEach(function(x){if((c+x).length>160&&c){o.push(c);c=x}else c+=x});if(c)o.push(c);return o}
  function falar(txt,tit){
    txt=(txt||'').replace(/\s+/g,' ').trim();if(!txt){st.textContent='Não há texto para ler nesta seção.';return}
    carregar();if(!voices.length){st.textContent='Nenhuma voz foi disponibilizada pelo navegador. Abra as configurações de voz do aparelho ou tente novamente quando as vozes terminarem de carregar.';return}var precisaCancelar=active||window.speechSynthesis.speaking||window.speechSynthesis.pending||window.speechSynthesis.paused;runId++;var id=runId;queue=partir(txt);active=true;st.textContent='Toque recebido. Preparando áudio: '+(tit||'texto')+'.';
    if(startTimer){clearTimeout(startTimer);startTimer=null}if(precisaCancelar){try{window.speechSynthesis.cancel()}catch(e){}}pz.textContent='Pausar';
    /* Inicia a primeira fala dentro do toque do usuário; no Safari móvel, adiar speak() pode bloquear o áudio. */
    try{next(id)}catch(e){active=false;current=null;st.textContent='Não foi possível iniciar a leitura neste aparelho: '+(e&&e.message?e.message:'erro do navegador')+'.'}
  }
  $('#vozPag').addEventListener('click',function(){var s=$('section.pg.on');if(!s){st.textContent='Abra uma seção para ouvir o conteúdo.';return}var h=s.querySelector('h1,h2');falar(texto(s),h?h.textContent:'página')});
  var vozToggle=$('#vozToggle'),vozControles=$('#vozControles');if(vozToggle&&vozControles){vozToggle.addEventListener('click',function(){var abrir=vozControles.hidden;vozControles.hidden=!abrir;vozToggle.setAttribute('aria-expanded',String(abrir));vozControles.classList.toggle('voz-aberto',abrir);if(abrir)$('#vozPag').focus()})}
  var testar=$('#vozTestar');if(testar)testar.addEventListener('click',function(){falar('Olá! Esta é a voz da Ovelia. Se você está ouvindo esta mensagem, a leitura por áudio está funcionando.','teste de áudio')});
  var diagnostico=$('#vozDiagnostico');if(diagnostico)diagnostico.addEventListener('click',function(){diagnosticar()});
  pz.addEventListener('click',function(){if(window.speechSynthesis.paused){window.speechSynthesis.resume();pz.textContent='Pausar';st.textContent='Leitura retomada.'}else if(window.speechSynthesis.speaking){window.speechSynthesis.pause();pz.textContent='Continuar';st.textContent='Leitura pausada.'}});
  $('#vozParar').addEventListener('click',function(){parar(false)});
  $('#vozCfg').addEventListener('click',function(){var o=$('#vozOpc');o.hidden=!o.hidden;this.setAttribute('aria-expanded',!o.hidden);if(!o.hidden)carregar()});
  window.addEventListener('pagehide',function(){parar(true)});
  function texto(no,tudo){var c=no.cloneNode(true);$$('button,select,input,label,script,.beads,.prog,.vozbar,[aria-hidden="true"],[hidden],.perfil-overlay',c).forEach(function(x){x.parentNode&&x.parentNode.removeChild(x)});
    if(!tudo)$$('details',c).forEach(function(d){if(!d.open)[].slice.call(d.children).forEach(function(x){if(x.tagName!=='SUMMARY')d.removeChild(x)})});
    $$('h1,h2,h3,p,li,summary,div,td,th,caption,small,a.btn,.tag',c).forEach(function(x){x.appendChild(document.createTextNode('. '))});
    return c.textContent.replace(/\.\s*\.(\s*\.)*/g,'.').replace(/([!?:;])\s*\./g,'$1')}
  function diagnosticar(){
    st.textContent='Botão acionado. Verificando se o navegador inicia a voz…';
    if(!ok){st.textContent='Este navegador não oferece a função de leitura por voz. Abra o site no Safari atualizado.';return}
    var was=active||window.speechSynthesis.speaking||window.speechSynthesis.pending||window.speechSynthesis.paused;
    if(was){try{window.speechSynthesis.cancel()}catch(e){}}
    active=false;queue=[];current=null;runId++;var id=runId,started=false,ended=false,u;
    try{u=new SpeechSynthesisUtterance('Olá. Este é o teste de áudio da Ovelia.');u.lang='pt-BR';u.volume=1;u.rate=1;
      u.onstart=function(){if(id!==runId)return;started=true;st.textContent='A voz começou a tocar. Se não estiver ouvindo, confira o volume de mídia do iPhone.'};
      u.onend=function(){if(id!==runId)return;ended=true;st.textContent='Teste concluído. Se não ouviu a voz, o problema está na reprodução do navegador ou nas configurações de áudio do aparelho.'};
      u.onerror=function(e){if(id!==runId)return;st.textContent='O navegador retornou erro de áudio ('+(e&&e.error?e.error:'sem detalhe')+'). Tente abrir a Ovelia no Safari e confira Ajustes > Acessibilidade > Conteúdo Falado.'};
      window.speechSynthesis.speak(u);
      setTimeout(function(){if(id!==runId||started||ended)return;if(!window.speechSynthesis.speaking){st.textContent='O botão foi acionado, mas o Safari não iniciou a voz. Recarregue a página e teste novamente; se persistir, será preciso usar áudio pré-gravado em vez da voz do navegador.'}},3000);
    }catch(e){st.textContent='Falha ao iniciar o teste: '+(e&&e.message?e.message:'erro do navegador')+'.'}
  }
  return {disponivel:function(){return voices.length>0},falar:falar,parar:function(){parar(false)},pausar:function(){if(window.speechSynthesis.speaking&&!window.speechSynthesis.paused){window.speechSynthesis.pause();pz.textContent='Continuar';st.textContent='Leitura pausada.'}},continuar:function(){if(window.speechSynthesis.paused){window.speechSynthesis.resume();pz.textContent='Pausar';st.textContent='Leitura retomada.'}},texto:texto,diagnosticar:diagnosticar};
})();

/* ---------- Orações (textos tradicionais em uso no Brasil — ver LEIA-ME, pendência de revisão) ---------- */
var P={
 sinal:{n:'Sinal da Cruz',t:'Em nome do Pai, e do Filho, e do Espírito Santo. Amém.'},
 sinalLongo:{n:'Sinal da Cruz (forma longa)',t:'Pelo sinal da Santa Cruz, livrai-nos Deus, Nosso Senhor, dos nossos inimigos.\nEm nome do Pai, e do Filho, e do Espírito Santo. Amém.'},
 pai:{n:'Pai-Nosso',t:'Pai nosso, que estais nos céus,\nsantificado seja o vosso nome,\nvenha a nós o vosso reino,\nseja feita a vossa vontade\nassim na terra como no céu.\nO pão nosso de cada dia nos dai hoje,\nperdoai-nos as nossas ofensas\nassim como nós perdoamos a quem nos tem ofendido,\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal. Amém.'},
 ave:{n:'Ave-Maria',t:'Ave Maria, cheia de graça,\no Senhor é convosco,\nbendita sois vós entre as mulheres\ne bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nrogai por nós, pecadores,\nagora e na hora da nossa morte. Amém.'},
 gloria:{n:'Glória ao Pai',t:'Glória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.'},
 credo:{n:'Credo (Símbolo dos Apóstolos)',t:'Creio em Deus Pai todo-poderoso, Criador do céu e da terra;\ne em Jesus Cristo, seu único Filho, nosso Senhor,\nque foi concebido pelo poder do Espírito Santo,\nnasceu da Virgem Maria,\npadeceu sob Pôncio Pilatos,\nfoi crucificado, morto e sepultado;\ndesceu à mansão dos mortos;\nressuscitou ao terceiro dia;\nsubiu aos céus,\nestá sentado à direita de Deus Pai todo-poderoso,\ndonde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo,\nna santa Igreja Católica,\nna comunhão dos santos,\nna remissão dos pecados,\nna ressurreição da carne,\nna vida eterna. Amém.'},
 salve:{n:'Salve-Rainha',t:'Salve, Rainha, Mãe de misericórdia,\nvida, doçura e esperança nossa, salve!\nA vós bradamos, os degredados filhos de Eva;\na vós suspiramos, gemendo e chorando neste vale de lágrimas.\nEia, pois, advogada nossa,\nesses vossos olhos misericordiosos a nós volvei;\ne depois deste desterro mostrai-nos Jesus,\nbendito fruto do vosso ventre,\nó clemente, ó piedosa, ó doce sempre Virgem Maria.\nRogai por nós, Santa Mãe de Deus,\npara que sejamos dignos das promessas de Cristo. Amém.'},
 anjo:{n:'Santo Anjo',t:'Santo Anjo do Senhor,\nmeu zeloso guardador,\nse a ti me confiou a piedade divina,\nsempre me rege, guarda, governa e ilumina. Amém.'},
 espirito:{n:'Oração ao Espírito Santo',t:'Vinde, Espírito Santo, enchei os corações dos vossos fiéis\ne acendei neles o fogo do vosso amor.\nEnviai o vosso Espírito e tudo será criado,\ne renovareis a face da terra.\n\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, concedei-nos que, no mesmo Espírito, saibamos o que é reto e gozemos sempre da sua consolação. Por Cristo, Senhor nosso. Amém.'},
 miguel:{n:'Oração a São Miguel Arcanjo',t:'São Miguel Arcanjo, defendei-nos no combate,\nsede o nosso refúgio contra as maldades e ciladas do demônio.\nOrdene-lhe Deus, instantemente o pedimos,\ne vós, príncipe da milícia celeste,\npelo poder divino, precipitai no inferno a satanás\ne a todos os espíritos malignos\nque andam pelo mundo para perdição das almas. Amém.'},
 fatima:{n:'Jaculatória de Fátima (opcional)',t:'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno,\nlevai as almas todas para o céu,\nprincipalmente as que mais precisarem.'}
};
var CATS=[
 {t:'Orações básicas',o:'tradicional',ids:['sinal','sinalLongo','pai','ave','gloria','credo']},
 {t:'Orações a Maria, ao Anjo e ao Espírito Santo',o:'tradicional',ids:['salve','anjo','espirito','miguel']},
 {t:'Orações da Ovelia para o dia a dia',o:'original',ids:['manha','noite','agradecimento','familias','dificeis']},
 {t:'Ao acordar',o:'kids',ids:['criancaManha']},
 {t:'Antes das refeições',o:'kids',ids:['criancaRefeicao']},
 {t:'Antes de estudar',o:'kids',ids:['criancaEstudo']},
 {t:'Quando sentir medo ou tristeza',o:'kids',ids:['criancaMedo']},
 {t:'Antes de dormir',o:'kids',ids:['criancaNoite']}
];
var ORIG={
 manha:{n:'Para a manhã',t:'Senhor, obrigado por este novo dia.\nGuia os meus passos, os meus pensamentos e as minhas palavras.\nQue eu viva hoje com amor e com coragem. Amém.'},
 noite:{n:'Para a noite',t:'Senhor, ao fim deste dia, agradeço o que recebi\ne peço perdão pelo que deixei de fazer.\nGuarda o meu descanso e o de quem amo. Amém.'},
 agradecimento:{n:'De agradecimento',t:'Obrigado, Senhor, pela vida, pelas pessoas ao meu lado\ne por tantas coisas que recebo sem perceber.\nAjuda-me a reconhecer os teus dons e a partilhá-los. Amém.'},
 familias:{n:'Pelas famílias',t:'Senhor, abençoa a nossa família.\nDá-nos paciência, respeito e perdão uns com os outros.\nQue a nossa casa seja lugar de paz e de oração. Amém.'},
 dificeis:{n:'Para momentos difíceis',t:'Senhor, estou cansado e preciso da tua ajuda.\nSegura-me quando eu não tiver forças\ne coloca no meu caminho pessoas que me apoiem.\nEu confio em ti. Amém.'},
 criancaManha:{n:'Oração da criança pela manhã',t:'Bom dia, meu Deus!\nObrigado por este novo dia.\nAjuda-me a aprender, brincar e tratar todos com carinho.\nAbençoa minha família e meus amigos. Amém.'},
 criancaNoite:{n:'Oração da criança antes de dormir',t:'Meu Deus, obrigado por este dia.\nCuida da minha família e de todas as crianças.\nPerdoa quando eu erro e ajuda-me a fazer o bem amanhã.\nSanto Anjo, fica comigo. Amém.'},
 criancaRefeicao:{n:'Oração da criança antes do almoço',t:'Papai do Céu, obrigado por este alimento,\npelas pessoas que o prepararam\ne por todos que vão partilhar esta refeição.\nAbençoa quem tem fome e ensina-nos a repartir.\nAmém.'},
  criancaEstudo:{n:'Oração da criança antes de estudar',t:'Jesus, ajuda-me a prestar atenção, ter paciência e aprender com alegria.\nAbençoa meus professores e colegas.\nAjuda-me a usar o que aprendo para fazer o bem. Amém.'},
  criancaMedo:{n:'Oração da criança quando sentir medo ou tristeza',t:'Jesus, estou com medo ou com o coração triste.\nFica perto de mim e ajuda-me a conversar com um adulto em quem confio.\nDá-me coragem, consolo e esperança. Amém.'}
};
for(var k in ORIG)P[k]=ORIG[k];
var lo=$('#listaOracoes');
lo.innerHTML=CATS.map(function(c){return '<div class="categoria-oracao '+(c.o==='kids'?'kids-cat':c.o==='original'?'original-cat':'trad-cat')+'"><h3>'+esc(c.t)+'</h3>'+(c.o==='original'||c.o==='kids'?'<p class="aviso"><b>'+(c.o==='kids'?'Orações infantis originais da Ovelia.':'Composições originais da Ovelia.')+'</b> Não são textos oficiais da Igreja.</p>':'')+c.ids.map(function(id){var p=P[id];
  return '<details id="or-'+id+'"><summary>'+esc(p.n)+'</summary><div class="oracao" id="t-'+id+'">'+esc(p.t)+'</div><button class="btn g" type="button" data-copiar="'+id+'">Copiar texto</button> <span class="tag '+(c.o==='original'||c.o==='kids'?'pd':'ok')+'">'+(c.o==='original'||c.o==='kids'?'Original da Ovelia':'Oração tradicional')+'</span><span class="sr" role="status" aria-live="polite" style="margin-left:8px"></span></details>'}).join('')+'</div>'}).join('');
lo.addEventListener('click',function(e){var b=e.target.closest('[data-copiar]');if(!b)return;var t=P[b.getAttribute('data-copiar')].t,st=b.parentNode.querySelector('.sr');
  function ok(){st.textContent='Texto copiado.'}function fail(){st.textContent='Não foi possível copiar. Selecione o texto e copie manualmente.'}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fail)}else fail()});

/* ---------- Terço: contador passo a passo (o progresso NÃO é salvo) ---------- */
var MIST={
 Gozosos:['A Anunciação do Anjo a Maria','A Visitação de Maria a Isabel','O Nascimento de Jesus em Belém','A Apresentação de Jesus no Templo','A Perda e o Encontro de Jesus no Templo'],
 Luminosos:['O Batismo de Jesus no Jordão','A auto-revelação de Jesus nas Bodas de Caná','O anúncio do Reino de Deus e o convite à conversão','A Transfiguração de Jesus','A instituição da Eucaristia'],
 Dolorosos:['A Agonia de Jesus no Horto','A Flagelação de Jesus','A Coroação de espinhos','Jesus carrega a cruz até o Calvário','A Crucificação e Morte de Jesus'],
 Gloriosos:['A Ressurreição de Jesus','A Ascensão de Jesus ao Céu','A vinda do Espírito Santo sobre os Apóstolos','A Assunção de Maria ao Céu','A Coroação de Maria no Céu']
};
var DIAS={0:'Gloriosos',1:'Gozosos',2:'Dolorosos',3:'Gloriosos',4:'Luminosos',5:'Dolorosos',6:'Gozosos'};
var grp=DIAS[new Date().getDay()],steps=[],n=0;
function buildSteps(){
  steps=[{p:'sinal',x:'Sinal da Cruz. Segurando o crucifixo.',b:0},{p:'credo',x:'Reze o Credo, ainda no crucifixo.',b:0},{p:'pai',x:'Primeira conta grande.',b:1}];
  for(var i=1;i<=3;i++)steps.push({p:'ave',x:'Ave-Maria '+i+' de 3, nas três contas pequenas seguintes.',b:1});
  steps.push({p:'gloria',x:'Glória ao Pai, antes de iniciar a primeira dezena.',b:0});
  for(var d=1;d<=5;d++){var m=MIST[grp][d-1];
    steps.push({p:null,x:d+'º mistério: '+m+'. Medite um instante.',b:0,m:1});
    steps.push({p:'pai',x:d+'ª dezena · conta grande.',b:1});
    for(var k=1;k<=10;k++)steps.push({p:'ave',x:d+'ª dezena · Ave-Maria '+k+' de 10.',b:1});
    steps.push({p:'gloria',x:'Ao fim da dezena, reze o Glória. Se quiser, acrescente a jaculatória de Fátima.',b:0})}
  steps.push({p:'salve',x:'Ao terminar as cinco dezenas, reze a Salve-Rainha.',b:0});
  steps.push({p:'sinal',x:'Conclua com o Sinal da Cruz. Terço concluído.',b:0});
}
function drawTerco(){
  var beadIdx=-1,h='';steps.forEach(function(s,i){if(s.b){beadIdx++;var st=i<n?' f':'';var cur=(i===n-1)?' cur':'';h+='<span class="bead'+((s.p==='pai')?' big':'')+st+cur+'"></span>'}});
  $('#contas').innerHTML=h;
  $('#progFill').style.width=Math.round(n/steps.length*100)+'%';$('#progTxt').textContent='Passo '+n+' de '+steps.length;
  var box=$('#passo');
  if(n===0){box.innerHTML='<p><b>Escolha os mistérios e toque em “Começar / Próximo passo”.</b></p>'}
  else{var s=steps[n-1];box.innerHTML='<h3>'+(s.p?esc(P[s.p].n):'Anúncio do mistério')+'</h3><p>'+esc(s.x)+'</p>'+(s.p?'<div class="oracao">'+esc(P[s.p].t)+'</div>':'')}
  if(n>0&&$('#vozPasso').checked)lerPasso();
  $('#tAnt').disabled=n===0;$('#tProx').disabled=n>=steps.length;$('#tProx').textContent=n===0?'Começar':'Próximo passo';
}
var sel=$('#selMist');sel.innerHTML=Object.keys(MIST).map(function(g){return '<option value="'+g+'"'+(g===grp?' selected':'')+'>Mistérios '+g+(g===DIAS[new Date().getDay()]?' (de hoje)':'')+'</option>'}).join('');
sel.addEventListener('change',function(){grp=sel.value;n=0;buildSteps();listMist();drawTerco()});
function listMist(){$('#listaMist').innerHTML=MIST[grp].map(function(m){return '<li>'+esc(m)+'</li>'}).join('')}
function lerPasso(){if(n<1)return;var s=steps[n-1];Voz.falar(s.x+' '+(s.p?P[s.p].t:''),'passo '+n+' do terço')}
$('#vozPassoBtn').addEventListener('click',lerPasso);
$('#tProx').addEventListener('click',function(){if(n<steps.length){n++;drawTerco()}});
$('#tAnt').addEventListener('click',function(){if(n>0){n--;drawTerco()}});
$('#tZero').addEventListener('click',function(){n=0;drawTerco()});
buildSteps();listMist();drawTerco();

/* ---------- Bíblia: lista dos 73 livros com busca ---------- */
var B=[
 ['Antigo Testamento · Pentateuco',['Gênesis','Êxodo','Levítico','Números','Deuteronômio']],
 ['Antigo Testamento · Livros históricos',['Josué','Juízes','Rute','1 Samuel','2 Samuel','1 Reis','2 Reis','1 Crônicas','2 Crônicas','Esdras','Neemias','Tobias','Judite','Ester','1 Macabeus','2 Macabeus']],
 ['Antigo Testamento · Livros sapienciais e poéticos',['Jó','Salmos','Provérbios','Eclesiastes','Cântico dos Cânticos','Sabedoria','Eclesiástico (Sirácida)']],
 ['Antigo Testamento · Profetas',['Isaías','Jeremias','Lamentações','Baruc','Ezequiel','Daniel','Oseias','Joel','Amós','Abdias','Jonas','Miqueias','Naum','Habacuc','Sofonias','Ageu','Zacarias','Malaquias']],
 ['Novo Testamento · Evangelhos e Atos',['Mateus','Marcos','Lucas','João','Atos dos Apóstolos']],
 ['Novo Testamento · Cartas de São Paulo',['Romanos','1 Coríntios','2 Coríntios','Gálatas','Efésios','Filipenses','Colossenses','1 Tessalonicenses','2 Tessalonicenses','1 Timóteo','2 Timóteo','Tito','Filêmon','Hebreus']],
 ['Novo Testamento · Cartas católicas e Apocalipse',['Tiago','1 Pedro','2 Pedro','1 João','2 João','3 João','Judas','Apocalipse']]
];
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function drawLivros(q){q=norm(q||'');var total=0;
  var h=B.map(function(g){var l=g[1].filter(function(x){return norm(x).indexOf(q)>-1});total+=l.length;return l.length?'<h3>'+esc(g[0])+'</h3><ul class="livros">'+l.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':''}).join('');
  $('#livros').innerHTML=h||'<p>Nenhum livro encontrado com esse nome.</p>';$('#livrosN').textContent=total+' livro'+(total===1?'':'s')+' exibido'+(total===1?'':'s')+' (de 73)'}
$('#buscaLivro').addEventListener('input',function(e){drawLivros(e.target.value)});drawLivros('');

/* ---------- Liturgia diária automática, dentro da Ovelia ----------
   Fonte principal: dados/liturgia/AAAA-MM-DD.json (gravado todo dia pelo workflow "Liturgia diária").
   Se o arquivo do dia não existir, tenta a API comunitária ao vivo; por último, o arquivo manual liturgia.js.
   Referências e metadados podem aparecer sem o texto integral. Sem autorização editorial confirmada, a interface oferece consulta externa identificada. */
/* CHAVE DO DONO DO SITE: true = mostra o texto das leituras vindo da fonte ao vivo (como antes); false = só referências e link externo. */
var LIT_MOSTRAR_TEXTO=true;
function dataHojeSaoPaulo(){var p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(p);if(m)return new Date(+m[1],+m[2]-1,+m[3],12);var parts=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()),o={};parts.forEach(function(x){o[x.type]=x.value});return new Date(+o.year,+o.month-1,+o.day,12)}
var hoje=dataHojeSaoPaulo();
function pad2(n){return ('0'+n).slice(-2)}
function isoDe(dt){return dt.getFullYear()+'-'+pad2(dt.getMonth()+1)+'-'+pad2(dt.getDate())}
function dataDeIso(t){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t||'');if(!m)return null;var d=new Date(+m[1],+m[2]-1,+m[3]);return(d.getFullYear()===+m[1]&&d.getMonth()===+m[2]-1&&d.getDate()===+m[3])?d:null}
function dataLonga(dt){return dt.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
var iso=isoDe(hoje),dataBR=dataLonga(hoje),litSeq=0;
var litStatus=$('#litStatus'),litDia=$('#litDia'),litSem=$('#litSem'),litReflexao=$('#litReflexao'),litEstudoDia=$('#litEstudoDia'),estudoLiturgia=$('#estudoLiturgia');
$('#litData').textContent=dataBR;
$('#litAtual').textContent='';
var LIT_API='https://liturgia.up.railway.app/v2/';
var temasEstudo=[
 {id:'misericordia',palavras:['misericórdia','misericordia','perdo','compaix','perdão'],titulo:'Misericórdia e perdão',versos:['Lucas 15,11-32','Efésios 4,32','Salmo 103,8-13'],reflexao:'A misericórdia de Deus nos convida a recomeçar e a tratar os outros com compaixão.',pergunta:'A quem posso oferecer perdão, escuta ou uma nova oportunidade?',acao:'Faça um gesto concreto de reconciliação, respeitando também os limites necessários.'},
 {id:'amor',palavras:['amor','amar','caridade','próximo','proximo'],titulo:'Amar a Deus e ao próximo',versos:['Lucas 10,25-37','João 13,34-35','1 Coríntios 13,4-7'],reflexao:'O amor cristão aparece em escolhas concretas: cuidar, escutar, servir e respeitar.',pergunta:'Quem precisa que eu pare e lhe dê atenção hoje?',acao:'Pratique um ato de caridade discreto, sem esperar recompensa.'},
 {id:'fe',palavras:['fé','fe ','crer','acredit','confiança','confiar'],titulo:'Fé e confiança em Deus',versos:['Hebreus 11,1-6','Marcos 4,35-41','Salmo 23'],reflexao:'A fé não elimina todas as dificuldades, mas nos ajuda a atravessá-las buscando a presença e a sabedoria de Deus.',pergunta:'Qual preocupação posso apresentar a Deus e qual passo responsável posso dar?',acao:'Faça uma oração breve e identifique uma atitude possível para enfrentar uma preocupação.'},
 {id:'oracao',palavras:['orar','oração','oracao','rez','pai-nosso'],titulo:'Aprender a rezar',versos:['Mateus 6,5-13','Filipenses 4,6-7','Salmo 141,1-2'],reflexao:'A oração é encontro com Deus. Podemos falar com sinceridade, agradecer, pedir ajuda e também permanecer em silêncio.',pergunta:'Minha oração tem espaço para agradecer e escutar, além de pedir?',acao:'Reze o Pai-Nosso devagar, prestando atenção em cada frase.'},
 {id:'esperanca',palavras:['esperança','esperanca','vida eterna','ressusc','alegria'],titulo:'Esperança em Deus',versos:['Romanos 15,13','João 11,25-26','Salmo 27,1'],reflexao:'A esperança cristã nos ajuda a caminhar sem negar a dor, confiando que Deus permanece conosco.',pergunta:'Que palavra de esperança posso partilhar com alguém?',acao:'Envie uma mensagem de ânimo ou visite alguém que precise de companhia.'},
 {id:'servico',palavras:['servi','serviço','servico','humild','pobres','pequenos'],titulo:'Servir com humildade',versos:['Marcos 10,42-45','João 13,12-15','Filipenses 2,3-5'],reflexao:'Jesus ensina que a grandeza passa pelo serviço e pelo cuidado com a dignidade de cada pessoa.',pergunta:'Como posso ajudar sem querer aparecer ou controlar o outro?',acao:'Ofereça ajuda prática a alguém da família ou da comunidade.'},
 {id:'palavra',palavras:['palavra do senhor','escutai','escuta','lei do senhor','escritura'],titulo:'Escutar e viver a Palavra',versos:['Tiago 1,22-25','Salmo 119,105','2 Timóteo 3,16-17'],reflexao:'Ler a Bíblia é um começo; a Palavra amadurece em nós quando a acolhemos e procuramos colocá-la em prática.',pergunta:'O que o texto me revela sobre Deus e que atitude me convida a mudar?',acao:'Anote uma frase da leitura e transforme-a numa ação simples para hoje.'}
];
function primeira(arr){return Array.isArray(arr)?(arr[0]||null):arr||null}
function refLeitura(obj){if(!obj)return '';return obj.referencia||obj.ref||obj.referenciaBiblica||obj.titulo||''}
function textoDados(d){try{return JSON.stringify({liturgia:d.liturgia,leituras:d.leituras}).toLowerCase()}catch(e){return ''}}
function escolherTema(d){var texto=textoDados(d),melhor=null,pontos=0;temasEstudo.forEach(function(t){var n=t.palavras.reduce(function(s,p){return s+(texto.indexOf(p)>=0?1:0)},0);if(n>pontos){pontos=n;melhor=t}});if(melhor)return melhor;var n=Math.floor((new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate())-new Date(hoje.getFullYear(),0,0))/86400000);return temasEstudo[n%temasEstudo.length]}
function renderEstudo(tema,leituras,origem){var refs=leituras.map(function(x){return x.titulo+': '+x.ref}).filter(function(x){return x.indexOf(': ')>0});var html='<span class="tag pd">Trilha de estudo da Ovelia</span><h3>'+esc(tema.titulo)+'</h3><p>'+esc(tema.reflexao)+'</p>';
 if(refs.length)html+='<h4>Leituras litúrgicas de hoje</h4><ul>'+refs.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
 html+='<h4>Outros versículos para estudar o mesmo tema</h4><p class="versos">'+tema.versos.map(esc).join(' · ')+'</p><p><b>Pergunta para meditar:</b> '+esc(tema.pergunta)+'</p><p><b>Prática de hoje:</b> '+esc(tema.acao)+'</p><p class="muted-note">Leia as referências na sua Bíblia católica. A seleção é uma sugestão de estudo editorial da Ovelia, não uma nota oficial da liturgia.</p>';
 if(origem)html+='<p class="muted-note">Referências obtidas automaticamente; confirme a celebração com a sua paróquia.</p>';else if(!refs.length)html+='<p class="muted-note">A conexão automática não está disponível neste momento. Este é um tema geral de estudo e não está confirmado como relacionado à liturgia de hoje.</p>';
 if(estudoLiturgia)estudoLiturgia.innerHTML=html;if(litEstudoDia)litEstudoDia.innerHTML='<div class="card estudo-do-dia"><span class="tag">Estudo relacionado</span><h3>'+esc(tema.titulo)+'</h3><p>'+esc(tema.reflexao)+'</p><p class="versos">'+tema.versos.map(esc).join(' · ')+'</p><a class="btn g" href="#estudos">Abrir estudo guiado</a></div>';
 litReflexao.innerHTML='<span class="tag pd">Reflexão da Ovelia · conteúdo original</span><h3>'+esc(tema.titulo)+'</h3><p>'+esc(tema.reflexao)+'</p><p><b>Para refletir:</b> '+esc(tema.pergunta)+'</p><p><b>Para colocar em prática:</b> '+esc(tema.acao)+'</p>';
}
function textoHtml(t){return String(t||'').split(/\n+/).map(function(p){return p.trim()}).filter(Boolean).map(function(p){return '<p>'+esc(p)+'</p>'}).join('')}
function renderLiturgy(d,origem,dt){var leituraObj=d.leituras||{},defs=[['Primeira leitura',leituraObj.primeiraLeitura],['Salmo responsorial',leituraObj.salmo],['Segunda leitura',leituraObj.segundaLeitura],['Aclamação ao Evangelho',leituraObj.aclamacao||leituraObj.aleluia],['Evangelho',leituraObj.evangelho]];var refs=[],blocos='';
 /* Texto integral só é renderizado se o próprio registro declarar autorização e identificar a licença. */
 var textoPorLicenca=d.textoIntegralAutorizado===true&&typeof d.licencaTexto==='string'&&d.licencaTexto.trim().length>=8;
 var textoAoVivo=LIT_MOSTRAR_TEXTO&&origem==='api';
 var textoIntegralLiberado=textoPorLicenca||textoAoVivo;
 defs.forEach(function(def){var arr=Array.isArray(def[1])?def[1]:(def[1]?[def[1]]:[]);if(!arr.length)return;var unique=[];
  arr.forEach(function(o){var r=refLeitura(o);if(r&&unique.indexOf(r)<0)unique.push(r);
    var texto=textoIntegralLiberado&&o&&typeof o.texto==='string'?o.texto.trim():'';
    var refrao=textoIntegralLiberado&&o&&typeof o.refrao==='string'?o.refrao.trim():'';
    blocos+='<section class="lit-bloco"><h4>'+esc(def[0])+'</h4>'+(o&&o.titulo&&o.titulo!==r?'<p class="lit-titulo">'+esc(o.titulo)+'</p>':'')+(r?'<p class="lit-ref">'+esc(r)+'</p>':'')+(refrao?'<p class="lit-refrao"><strong>Refrão:</strong> '+esc(refrao)+'</p>':'')+(texto?'<div class="lit-texto">'+textoHtml(texto)+'</div>':'')+'</section>'});
  if(unique.length)refs.push({titulo:def[0],ref:unique.join(' / ')})});
 var celebracao=d.liturgia||d.celebracao||'Liturgia do dia';var cor=d.cor||d.corLiturgica||'';
 $('#litData').textContent=dataLonga(dt);
 $('#litAtual').textContent=origem==='arquivo'?'Dados litúrgicos carregados do arquivo local; a atualização depende da rotina de dados.':(origem==='api'?'Dados consultados agora na fonte externa; a disponibilidade depende do serviço.':'Dados litúrgicos cadastrados manualmente pela equipe da Ovelia.');
 var html='<div class="card"><div class="liturgia-meta"><span class="tag ok">Liturgia do dia</span>'+(cor?'<span class="tag">Cor litúrgica: '+esc(cor)+'</span>':'')+'</div><h3 style="margin-top:10px">'+esc(celebracao)+'</h3>';
 if(blocos)html+='<div class="liturgia-leituras">'+blocos+'</div>';
 else html+='<p>Não foi possível identificar as leituras desta data.</p>';
 if(blocos&&!textoIntegralLiberado)html+='<p class="muted-note">O texto integral destas leituras ainda não está disponível nesta versão porque a autorização editorial para sua reprodução não foi confirmada. As referências são mantidas para consulta; a Ovelia não substitui a tradução pretendida por outra.</p><p><a class="btn g" href="https://liturgia.cancaonova.com/pb/" target="_blank" rel="noopener noreferrer">Consultar a Liturgia no site da Canção Nova ↗</a></p>';
 if(blocos&&textoPorLicenca)html+='<p class="muted-note">Texto exibido conforme a licença identificada: '+esc(d.licencaTexto)+'.</p>';
 if(blocos&&textoAoVivo&&!textoPorLicenca)html+='<p class="muted-note">Texto obtido agora de um serviço externo de liturgia. Os textos litúrgicos pertencem aos seus detentores de direitos. Em caso de dúvida sobre a celebração, confirme com a sua paróquia.</p>';
 if(!textoAoVivo)html+='<p class="muted-note">As referências vêm de um serviço automático. A permissão de acesso à API não comprova, por si só, permissão para redistribuir os textos das leituras. Em caso de dúvida sobre a celebração, confirme com a sua paróquia.</p></div>';
 litDia.innerHTML=html;litStatus.style.display='none';
 if(isoDe(dt)===iso)$('#homeLit').textContent=celebracao+(cor?' · '+cor:'')+'. Toque para consultar os dados e referências da liturgia de hoje.';
 var tema=escolherTema(d);renderEstudo(tema,refs,origem==='arquivo'||origem==='api');
}
function fallbackLiturgy(dt){var dtIso=isoDe(dt),L=window.LITURGIA||{dias:[]},manual=(L.dias||[]).filter(function(x){return x.data===dtIso})[0];
 if(manual){var conv=function(x){return x?[{referencia:x.ref||x.referencia||'',texto:x.texto||'',refrao:x.refrao||''}]:[]};renderLiturgy({data:dtIso,liturgia:manual.celebracao,leituras:{primeiraLeitura:conv(manual.primeiraLeitura),salmo:conv(manual.salmo),segundaLeitura:conv(manual.segundaLeitura),aclamacao:conv(manual.aclamacao),evangelho:conv(manual.evangelho)},cor:''},'manual',dt);return}
 litStatus.style.display='';litStatus.textContent='A liturgia desta data ainda não está disponível.';
  litDia.innerHTML='<div class="card"><span class="tag">Sem dados</span><h3>Liturgia indisponível agora</h3><p>Não há dados confirmados para esta data. Não vamos inventar nem mostrar leituras de outro dia.</p><button class="btn g" type="button" id="litTentarNovamente">Tentar novamente</button><p><a class="btn g" href="https://liturgia.cancaonova.com/pb/" target="_blank" rel="noopener noreferrer">Consultar a Liturgia no site da Canção Nova ↗</a></p></div>';
  var retry=$('#litTentarNovamente');if(retry)retry.addEventListener('click',function(){carregarLiturgia(dtIso)});
 var n=Math.floor((new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())-new Date(dt.getFullYear(),0,0))/86400000);renderEstudo(temasEstudo[n%temasEstudo.length],[],false);
}
function comTimeout(p,ms){return Promise.race([p,new Promise(function(_,rej){setTimeout(function(){rej(new Error('tempo esgotado'))},ms)})])}
function buscaJson(url){return comTimeout(fetch(url,{cache:'no-cache',headers:{'Accept':'application/json'}}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}),9000)}
function mesmaData(txt,dt){var t=String(txt||''),m=/(\d{2})\/(\d{2})\/(\d{4})/.exec(t),ano,mes,dia;if(m){dia=+m[1];mes=+m[2];ano=+m[3]}else{m=/(\d{4})-(\d{2})-(\d{2})/.exec(t);if(!m)return isoDe(dt)===iso;ano=+m[1];mes=+m[2];dia=+m[3]}return ano===dt.getFullYear()&&mes===dt.getMonth()+1&&dia===dt.getDate()}
function leiturasOk(d){return d&&d.leituras&&(d.liturgia||d.celebracao)}
function apiAoVivo(dt){var hojeSim=isoDe(dt)===iso,url=hojeSim?LIT_API:LIT_API+'?dia='+dt.getDate()+'&mes='+(dt.getMonth()+1)+'&ano='+dt.getFullYear();
 return buscaJson(url).then(function(d){if(Array.isArray(d))d=d[0];if(!leiturasOk(d)||!mesmaData(d.data,dt))throw new Error('resposta inesperada');return d})}
function carregarLiturgia(isoSel){var dt=dataDeIso(isoSel)||new Date(),seq=++litSeq;isoSel=isoDe(dt);
 litStatus.style.display='';litStatus.textContent='Buscando a liturgia de '+dt.toLocaleDateString('pt-BR')+'…';
 $('#litData').textContent=dataLonga(dt);
 var fArq=function(){return buscaJson('dados/liturgia/'+isoSel+'.json').then(function(d){if(!leiturasOk(d)||!mesmaData(d.data||isoSel,dt))throw new Error('arquivo inválido');return{d:d,o:'arquivo'}})};
 var fApi=function(){return apiAoVivo(dt).then(function(d){return{d:d,o:'api'}})};
 (LIT_MOSTRAR_TEXTO?fApi():fArq())
  .catch(function(){return LIT_MOSTRAR_TEXTO?fArq():fApi()})
  .then(function(r){if(seq!==litSeq)return;renderLiturgy(r.d,r.o,dt)})
  .catch(function(){if(seq!==litSeq)return;fallbackLiturgy(dt)});
}
(function(){var input=$('#litDataEscolhida');if(!input)return;input.value=iso;
 function ir(t){if(!dataDeIso(t))return;input.value=t;carregarLiturgia(t)}
 function deslocar(n){var dt=dataDeIso(input.value)||new Date();dt.setDate(dt.getDate()+n);ir(isoDe(dt))}
 input.addEventListener('change',function(){ir(input.value)});
 var h=$('#litHoje'),a=$('#litAnterior'),p=$('#litProximo');
 if(h)h.addEventListener('click',function(){ir(iso)});if(a)a.addEventListener('click',function(){deslocar(-1)});if(p)p.addEventListener('click',function(){deslocar(1)});
})();
$('#homeLit').textContent='Consulte a liturgia de hoje e o estudo relacionado na Ovelia.';
carregarLiturgia(iso);

/* ---------- Infantil: histórias em detalhes + quiz sem coleta de dados ---------- */
var Q=[
 ['Quem construiu a arca, seguindo o pedido de Deus?',['Noé','Moisés','Davi'],0,'Isso mesmo! Noé confiou em Deus e construiu a arca.'],
 ['Que sinal bonito Deus colocou no céu depois do dilúvio?',['Uma estrela','O arco-íris','Uma nuvem dourada'],1,'Muito bem! O arco-íris lembra a promessa de Deus.'],
 ['De qual animal Davi cuidava quando era jovem?',['Ovelhas','Camelos','Cavalos'],0,'Certo! Davi era pastor de ovelhas, como a nossa Ovelinha.'],
 ['Quem Davi enfrentou com a ajuda de Deus?',['Golias','Faraó','Herodes'],0,'Acertou! Davi enfrentou Golias.'],
 ['Qual é uma lição que aparece em várias histórias bíblicas?',['Nunca ajudar ninguém','Confiar em Deus e fazer o bem','Pensar apenas em si mesmo'],1,'Muito bem! Muitas histórias ensinam a confiar em Deus e amar o próximo.'],
 ['Onde Jesus foi colocado quando nasceu?',['Numa manjedoura','Num palácio','Num barco'],0,'Muito bem! Jesus nasceu com humildade e foi colocado numa manjedoura.'],
 ['O que Jesus fez durante a tempestade?',['Escondeu-se','Acalmou o vento e o mar','Abandonou o barco'],1,'Isso mesmo! A história nos lembra de confiar e pedir ajuda quando sentimos medo.'],
 ['Quem parou para ajudar o homem ferido?',['O samaritano','Um soldado romano','Ninguém'],0,'Certo! O samaritano mostrou amor com uma atitude concreta.'],
 ['O que o pastor fez quando uma ovelha se perdeu?',['Esqueceu dela','Foi procurá-la','Vendeu as outras'],1,'Muito bem! Jesus ensina que cada pessoa é preciosa para Deus.'],
 ['O que o menino ofereceu a Jesus para partilhar com a multidão?',['Cinco pães e dois peixes','Uma cesta de frutas','Água e mel'],0,'Isso! Partilhar o que temos pode ajudar muitas pessoas.']
];
var qi=0,acertos=0,qb=$('#quiz');
function drawQ(){
  if(qi>=Q.length){qb.innerHTML='<h3>Você terminou!</h3><p>Você acertou '+acertos+' de '+Q.length+'. Parabéns por aprender com a Ovelinha!</p><button class="btn lg" type="button" id="qRef">Jogar de novo</button>';$('#qRef').addEventListener('click',function(){qi=0;acertos=0;drawQ()});return}
  var q=Q[qi];qb.innerHTML='<p><b>Pergunta '+(qi+1)+' de '+Q.length+'</b></p><h3>'+esc(q[0])+'</h3><button class="btn g voz-btn" type="button" id="qOuvir">🔊 Ouvir a pergunta</button><div class="opcoes">'+q[1].map(function(o,i){return '<button class="btn lg" type="button" data-o="'+i+'">'+esc(o)+'</button>'}).join('')+'</div><p id="qMsg" role="status" aria-live="polite"></p>';
  $('#qOuvir').addEventListener('click',function(){Voz.falar(q[0]+' Opções: '+q[1].join(', ')+'.','pergunta')});
  $$('[data-o]',qb).forEach(function(b){b.addEventListener('click',function(){
    var i=+b.getAttribute('data-o'),ok=i===q[2];if(ok)acertos++;
    $$('[data-o]',qb).forEach(function(x){x.disabled=true;if(+x.getAttribute('data-o')===q[2])x.classList.add('certo')});if(!ok)b.classList.add('errado');
    $('#qMsg').innerHTML=(ok?'✔ ':'✖ Quase! A resposta certa está marcada em verde. ')+esc(q[3])+'<br><button class="btn" type="button" id="qNext">'+(qi+1<Q.length?'Próxima pergunta':'Ver resultado')+'</button>';
    $('#qNext').focus();$('#qNext').addEventListener('click',function(){qi++;drawQ();var f=$('[data-o],#qRef',qb);if(f)f.focus()})})})
}
drawQ();
var seniorVoiceHelp=$('#seniorVoiceHelp');
if(seniorVoiceHelp)seniorVoiceHelp.addEventListener('click',function(){Voz.falar('Bem-vindo à Ovelia. Escolha uma opção: liturgia diária, orações, rezar o terço ou Bíblia. Para ouvir o conteúdo, use o botão Ouvir esta página. Para aumentar as letras, toque em Aumentar texto.','orientações da Ovelia 60+')});

$$('details').forEach(function(d){var s=d.querySelector('summary'),b=document.createElement('button');b.type='button';b.className='btn g voz-btn';b.textContent='🔊 Ouvir';b.setAttribute('aria-label','Ouvir: '+s.textContent.trim());b.addEventListener('click',function(){Voz.falar(Voz.texto(d,true),s.textContent.trim())});s.insertAdjacentElement('afterend',b)});
/* ---------- Progresso local das trilhas (somente neste aparelho) ---------- */
$$('[data-progress]:not([data-progress^="kids-"])').forEach(function(c){var key='ovelia-progresso-'+c.getAttribute('data-progress');try{c.checked=localStorage.getItem(key)==='1'}catch(e){}c.addEventListener('change',function(){try{localStorage.setItem(key,c.checked?'1':'0')}catch(e){}})});
/* Ajustes finais de cada perfil: telas, navegação e acessibilidade próprias. */
applyProfile();
$('#ano').textContent=new Date().getFullYear();
show(true);
})();
