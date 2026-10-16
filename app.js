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
var perfilInicio=$('#perfilInicio'),perfilBtn=$('#perfilBtn'),perfilAtual=$('#perfilAtual');
var kidsHome=$('#kidsHome'),seniorHome=$('#seniorHome');
function pagesForProfile(){
  if(profile==='kids')return [['home','Início'],['infantil','Histórias e quiz'],['oracoes','Orações infantis']];
  if(profile==='senior')return [['home','Início'],['liturgia','Liturgia diária'],['oracoes','Orações'],['terco','Rezar o terço'],['biblia','Bíblia'],['sobre','Sobre']];
  return [['home','Início'],['liturgia','Liturgia'],['biblia','Bíblia'],['oracoes','Orações'],['terco','Terço'],['estudos','Estudos bíblicos'],['infantil','Área infantil'],['sobre','Sobre']];
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
  if(kids){$('#aMenos').hidden=true;$('#aMais').hidden=true;$('#aCont').hidden=true}
  else{$('#aMenos').hidden=false;$('#aMais').hidden=false;$('#aCont').hidden=false}
}
function applyProfile(){
  document.body.classList.remove('perfil-kids','perfil-senior','perfil-easy');
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
  var old=profile;
  if(p==='senior'&&old!=='senior'){try{localStorage.setItem('ovelia-letra-normal',String(tam))}catch(e){}}
  if(p==='adult'&&old==='senior'){try{tam=+(localStorage.getItem('ovelia-letra-normal')||0)}catch(e){tam=0}}
  profile=p;applyProfile();if(location.hash!=='#home')location.hash='home';else show(false);
}
$$('[data-profile]').forEach(function(b){b.addEventListener('click',function(){chooseProfile(b.getAttribute('data-profile'))})});
perfilBtn.addEventListener('click',function(){perfilInicio.hidden=false;var first=$('[data-profile]',perfilInicio);if(first)first.focus()});
menuBtn.addEventListener('click',function(){var o=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
renderMenu();
if(!profile)perfilInicio.hidden=false;
function show(first){
  var id=location.hash.slice(1);if(!$('section.pg[id="'+id+'"]'))id='home';
  if(profile==='kids'&&['liturgia','terco','estudos','biblia','sobre'].indexOf(id)>=0){id='home';if(location.hash!=='#home')history.replaceState(null,'',location.pathname+location.search+'#home');}
  $$('section.pg').forEach(function(s){s.classList.toggle('on',s.id===id)});
  $$('#menu a').forEach(function(a){if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');
  if(typeof Voz!=='undefined')Voz.parar();
  window.scrollTo(0,0);
  var t=PAGES.filter(function(p){return p[0]===id})[0];document.title=(id==='home'?(profile==='kids'?'Ovelia Kids — histórias e orações':profile==='senior'?'Ovelia 60+ — fé e oração':'Ovelia — Bíblia, Liturgia Diária e orações católicas'):(t?t[1]:id)+' — Ovelia');
  if(!first){var h=$('#'+id+' h1,#'+id+' h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}
}
window.addEventListener('hashchange',function(){show(false)});
document.addEventListener('click',function(e){
  var g=e.target.closest('[data-scroll]');if(g){var el=document.getElementById(g.getAttribute('data-scroll'));if(el){el.scrollIntoView();el.setAttribute('tabindex','-1');el.focus({preventScroll:true})}}
});

/* ---------- Acessibilidade: letra e contraste (só preferências locais) ---------- */
var tam=0,body=document.body;
function applyPrefs(){body.classList.remove('t1','t2');if(tam)body.classList.add('t'+tam);$('#aMais').disabled=tam>=2;$('#aMenos').disabled=tam<=0;
  try{localStorage.setItem('ovelia-letra',tam);localStorage.setItem('ovelia-contraste',body.classList.contains('contraste')?'1':'0')}catch(e){}}
try{tam=+localStorage.getItem('ovelia-letra')||0;if(localStorage.getItem('ovelia-contraste')==='1'){body.classList.add('contraste')}}catch(e){}
if(window.matchMedia&&window.matchMedia('(prefers-contrast: more)').matches&&!body.classList.contains('contraste')){try{if(localStorage.getItem('ovelia-contraste')===null)body.classList.add('contraste')}catch(e){}}
$('#aMais').addEventListener('click',function(){tam=Math.min(2,tam+1);applyPrefs()});
$('#aMenos').addEventListener('click',function(){tam=Math.max(0,tam-1);applyPrefs()});
var cb=$('#aCont');cb.setAttribute('aria-pressed',body.classList.contains('contraste'));
cb.addEventListener('click',function(){var on=body.classList.toggle('contraste');cb.setAttribute('aria-pressed',on);applyPrefs()});
applyPrefs();


/* ---------- Leitura em voz alta: fila sequencial mais estável em navegadores móveis ---------- */
var Voz=(function(){
  var ok='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window,voices=[],sel=$('#vozSel'),vel=$('#vozVel'),st=$('#vozStatus'),pz=$('#vozPausa'),prefV=null,queue=[],active=false,runId=0;
  try{prefV=localStorage.getItem('ovelia-voz');vel.value=localStorage.getItem('ovelia-vel')||'1'}catch(e){}
  if(!ok){document.body.classList.add('sem-voz');st.textContent='Este navegador não oferece leitura por voz. Atualize o Safari ou tente outro navegador compatível.';return {falar:function(){st.textContent='A leitura por voz não está disponível neste navegador.'},parar:function(){},texto:function(){return ''}}}
  function carregar(){
    var all=speechSynthesis.getVoices()||[];
    voices=all.filter(function(v){return /^pt([_-]|$)/i.test(v.lang)});
    if(!voices.length)voices=all;
    voices.sort(function(a,b){return (/pt[-_]BR/i.test(b.lang)?1:0)-(/pt[-_]BR/i.test(a.lang)?1:0)});
    var old=sel.value;
    sel.innerHTML=voices.map(function(v,i){return '<option value="'+i+'">Voz '+(i+1)+' — '+esc(v.name+' ('+v.lang+')')+'</option>'}).join('');
    var chosen=-1;voices.forEach(function(v,i){if(prefV&&v.name===prefV)chosen=i});
    if(chosen>=0)sel.value=String(chosen);else if(old&&+old<voices.length)sel.value=old;
    if(!voices.length)st.textContent='Carregando as vozes do aparelho…';
    else if(!voices.some(function(v){return /^pt([_-]|$)/i.test(v.lang)}))st.textContent='Não encontrei voz em português. As vozes disponíveis foram listadas; instale uma voz em português nas configurações do aparelho para melhor resultado.';
  }
  carregar();
  if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',carregar);
  speechSynthesis.onvoiceschanged=carregar;
  setTimeout(carregar,500);setTimeout(carregar,1500);
  sel.addEventListener('change',function(){try{var v=voices[+sel.value];if(v)localStorage.setItem('ovelia-voz',v.name)}catch(e){}});
  vel.addEventListener('input',function(){try{localStorage.setItem('ovelia-vel',vel.value)}catch(e){}});
  function parar(){var was=active||speechSynthesis.speaking||speechSynthesis.paused;runId++;queue=[];active=false;try{speechSynthesis.cancel()}catch(e){}pz.textContent='Pausar';st.textContent=was?'Leitura interrompida.':''}
  function next(id){
    if(id!==runId)return;
    if(!queue.length){active=false;pz.textContent='Pausar';st.textContent='Leitura concluída.';return}
    var text=queue.shift(),u=new SpeechSynthesisUtterance(text),v=voices[+sel.value||0];
    if(v){u.voice=v;u.lang=v.lang}else u.lang='pt-BR';
    u.rate=+vel.value||1;u.pitch=1;
    u.onend=function(){if(id===runId)next(id)};
    u.onerror=function(e){if(id!==runId)return;if(e.error==='canceled'||e.error==='interrupted')return;active=false;st.textContent='A voz parou. Tente iniciar a leitura novamente ou escolha outra voz.'};
    try{speechSynthesis.speak(u)}catch(e){active=false;st.textContent='Não foi possível iniciar a voz neste aparelho.'}
  }
  function partir(t){var r=t.match(/[^.!?;:\n]+[.!?;:]?\s*/g)||[t],o=[],c='';r.forEach(function(x){if((c+x).length>180&&c){o.push(c);c=x}else c+=x});if(c)o.push(c);return o}
  function falar(txt,tit){
    txt=(txt||'').replace(/\s+/g,' ').trim();
    if(!txt){st.textContent='Não há texto para ler nesta seção.';return}
    if(!voices.length){carregar()}
    if(!voices.length){st.textContent='O aparelho ainda não disponibilizou vozes. Aguarde alguns segundos ou verifique Ajustes > Acessibilidade > Conteúdo Falado no iPhone.';return}
    runId++;var id=runId;queue=partir(txt);active=true;st.textContent='Preparando leitura: '+(tit||'texto')+'.';
    try{speechSynthesis.cancel()}catch(e){}
    pz.textContent='Pausar';
    /* Uma fala por vez evita que alguns navegadores móveis descartem partes da fila. */
    next(id);
  }
  function texto(no,tudo){var c=no.cloneNode(true);$$('button,select,input,label,script,.beads,.prog,.vozbar,[aria-hidden="true"],[hidden],.perfil-overlay',c).forEach(function(x){x.parentNode&&x.parentNode.removeChild(x)});
    if(!tudo)$$('details',c).forEach(function(d){if(!d.open)[].slice.call(d.children).forEach(function(x){if(x.tagName!=='SUMMARY')d.removeChild(x)})});
    $$('h1,h2,h3,p,li,summary,div,td,th,caption,small,a.btn,.tag',c).forEach(function(x){x.appendChild(document.createTextNode('. '))});
    return c.textContent.replace(/\.\s*\.(\s*\.)*/g,'.').replace(/([!?:;])\s*\./g,'$1')}
  $('#vozPag').addEventListener('click',function(){var s=$('section.pg.on');var h=s.querySelector('h1,h2');falar(texto(s),h?h.textContent:'página')});
  pz.addEventListener('click',function(){if(speechSynthesis.paused){speechSynthesis.resume();pz.textContent='Pausar';st.textContent='Leitura retomada.'}else if(speechSynthesis.speaking){speechSynthesis.pause();pz.textContent='Continuar';st.textContent='Leitura pausada.'}});
  $('#vozParar').addEventListener('click',parar);
  $('#vozCfg').addEventListener('click',function(){var o=$('#vozOpc');o.hidden=!o.hidden;this.setAttribute('aria-expanded',!o.hidden);if(!o.hidden)carregar()});
  window.addEventListener('pagehide',function(){try{speechSynthesis.cancel()}catch(e){}});
  return {falar:falar,parar:parar,texto:texto};
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
 {t:'Orações para crianças',o:'kids',ids:['criancaManha','criancaNoite']}
];
var ORIG={
 manha:{n:'Para a manhã',t:'Senhor, obrigado por este novo dia.\nGuia os meus passos, os meus pensamentos e as minhas palavras.\nQue eu viva hoje com amor e com coragem. Amém.'},
 noite:{n:'Para a noite',t:'Senhor, ao fim deste dia, agradeço o que recebi\ne peço perdão pelo que deixei de fazer.\nGuarda o meu descanso e o de quem amo. Amém.'},
 agradecimento:{n:'De agradecimento',t:'Obrigado, Senhor, pela vida, pelas pessoas ao meu lado\ne por tantas coisas que recebo sem perceber.\nAjuda-me a reconhecer os teus dons e a partilhá-los. Amém.'},
 familias:{n:'Pelas famílias',t:'Senhor, abençoa a nossa família.\nDá-nos paciência, respeito e perdão uns com os outros.\nQue a nossa casa seja lugar de paz e de oração. Amém.'},
 dificeis:{n:'Para momentos difíceis',t:'Senhor, estou cansado e preciso da tua ajuda.\nSegura-me quando eu não tiver forças\ne coloca no meu caminho pessoas que me apoiem.\nEu confio em ti. Amém.'},
 criancaManha:{n:'Oração da criança pela manhã',t:'Bom dia, meu Deus!\nObrigado por este novo dia.\nAjuda-me a aprender, brincar e tratar todos com carinho.\nAbençoa minha família e meus amigos. Amém.'},
 criancaNoite:{n:'Oração da criança antes de dormir',t:'Meu Deus, obrigado por este dia.\nCuida da minha família e de todas as crianças.\nPerdoa quando eu erro e ajuda-me a fazer o bem amanhã.\nSanto Anjo, fica comigo. Amém.'}
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

/* ---------- Liturgia: mostra apenas dados revisados manualmente ---------- */
var hoje=new Date(),iso=hoje.getFullYear()+'-'+('0'+(hoje.getMonth()+1)).slice(-2)+'-'+('0'+hoje.getDate()).slice(-2);
var dataBR=hoje.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
var L=window.LITURGIA||{dias:[]},dia=(L.dias||[]).filter(function(d){return d.data===iso})[0];
$('#litData').textContent=dataBR;
$('#litAtual').textContent=L.ultimaAtualizacao?('Última atualização do conteúdo: '+L.ultimaAtualizacao.split('-').reverse().join('/')):'As leituras completas são consultadas na fonte católica externa indicada abaixo; ainda não são reproduzidas automaticamente dentro da Ovelia.';
function parte(id,titulo,o){if(!o)return '';return '<section class="card" id="'+id+'"><h3>'+titulo+'</h3><p><b>'+esc(o.ref||'')+'</b></p>'+(o.refrao?'<p><i>Refrão: '+esc(o.refrao)+'</i></p>':'')+'<div class="oracao">'+esc(o.texto||'')+'</div></section>'}
if(dia){
  var partes=[['l1','Primeira leitura',dia.primeiraLeitura],['sal','Salmo responsorial',dia.salmo],['l2','Segunda leitura',dia.segundaLeitura],['acl','Aclamação ao Evangelho',dia.aclamacao],['ev','Evangelho',dia.evangelho]].filter(function(x){return x[2]});
  $('#litDia').innerHTML='<div class="card"><span class="tag ok">Conteúdo revisado</span><h3 style="margin-top:8px">'+esc(dia.celebracao||'')+'</h3>'+(dia.fonte?'<p style="color:var(--mut)">Fonte: '+esc(dia.fonte)+'</p>':'')+'<div class="row">'+partes.map(function(x){return '<button class="btn g" type="button" data-scroll="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'+
   partes.map(function(x){return parte(x[0],x[1],x[2])}).join('')+(dia.reflexao?'<div class="card"><span class="tag pd">Reflexão da Ovelia · conteúdo editorial</span><p>'+esc(dia.reflexao)+'</p></div>':'');
  var s=$('#litSem');if(s)s.hidden=true;
}
$('#homeLit').textContent=dia?('Hoje: '+(dia.celebracao||'liturgia do dia')+'.'):'Consulte as leituras atualizadas na fonte católica indicada na página Liturgia Diária.';
/* Reflexão diária original da Ovelia. Não é apresentada como comentário oficial nem como resumo das leituras litúrgicas. */
var reflexoesOvelia=[
 {ref:'João 15,4-5',titulo:'Permaneça perto de Jesus',texto:'Reserve alguns minutos para estar em silêncio, rezar e lembrar que a fé também cresce nos pequenos gestos de cada dia.',acao:'Escolha hoje uma atitude concreta de amor e pratique-a com alguém próximo.'},
 {ref:'Salmo 23',titulo:'Confie no cuidado de Deus',texto:'Nem todos os caminhos são fáceis, mas você pode levar suas preocupações à oração e buscar ajuda quando precisar.',acao:'Apresente a Deus uma preocupação e converse com alguém de confiança, se precisar.'},
 {ref:'Lucas 10,25-37',titulo:'Aproxime-se de quem precisa',texto:'A caridade começa quando percebemos a necessidade do outro e escolhemos não passar adiante indiferentes.',acao:'Faça hoje um gesto simples de cuidado, sem esperar recompensa.'},
 {ref:'Mateus 6,9-13',titulo:'Reze com simplicidade',texto:'A oração não precisa de palavras difíceis. Fale com Deus com sinceridade e reserve um momento para escutar.',acao:'Reze devagar o Pai-Nosso, prestando atenção no significado das palavras.'},
 {ref:'Filipenses 4,6-7',titulo:'Leve suas preocupações à oração',texto:'A fé não significa ignorar os problemas. Significa atravessá-los buscando sabedoria, apoio e paz em Deus.',acao:'Escreva uma preocupação e um pequeno passo que você pode dar para enfrentá-la.'},
 {ref:'1 Coríntios 13,4-7',titulo:'Pratique o amor no cotidiano',texto:'O amor se revela na paciência, na gentileza, no respeito e na disposição de reparar os próprios erros.',acao:'Escolha uma conversa em que você possa ouvir com mais paciência.'},
 {ref:'Marcos 10,13-16',titulo:'Acolha com ternura',texto:'Jesus nos ensina a acolher com dignidade e cuidado. Cada pessoa merece ser tratada com respeito.',acao:'Dê atenção verdadeira a alguém que costuma ficar de lado.'}
];
var diaAno=Math.floor((new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate())-new Date(hoje.getFullYear(),0,0))/86400000),reflexao=reflexoesOvelia[diaAno%reflexoesOvelia.length];
$('#litReflexao').innerHTML='<span class="tag pd">Pausa de oração da Ovelia · conteúdo original</span><h3>'+esc(reflexao.titulo)+'</h3><p>'+esc(reflexao.texto)+'</p><p><b>Para colocar em prática:</b> '+esc(reflexao.acao)+'</p><p class="muted-note">Referência para leitura na sua Bíblia: '+esc(reflexao.ref)+'. Esta pausa não substitui a reflexão específica sobre as leituras litúrgicas do dia.</p>';

/* ---------- Infantil: histórias em detalhes + quiz sem coleta de dados ---------- */
var Q=[
 ['Quem construiu a arca, seguindo o pedido de Deus?',['Noé','Moisés','Davi'],0,'Isso mesmo! Noé confiou em Deus e construiu a arca.'],
 ['Que sinal bonito Deus colocou no céu depois do dilúvio?',['Uma estrela','O arco-íris','Uma nuvem dourada'],1,'Muito bem! O arco-íris lembra a promessa de Deus.'],
 ['De qual animal Davi cuidava quando era jovem?',['Ovelhas','Camelos','Cavalos'],0,'Certo! Davi era pastor de ovelhas, como a nossa Ovelinha.'],
 ['Quem Davi enfrentou com a ajuda de Deus?',['Golias','Faraó','Herodes'],0,'Acertou! Davi enfrentou Golias.'],
 ['Nas duas histórias, em quem as pessoas confiaram?',['Só em si mesmas','Em Deus','Na sorte'],1,'Isso! Confiar em Deus é a grande lição.']
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
$$('[data-progress]').forEach(function(c){var key='ovelia-progresso-'+c.getAttribute('data-progress');try{c.checked=localStorage.getItem(key)==='1'}catch(e){}c.addEventListener('change',function(){try{localStorage.setItem(key,c.checked?'1':'0')}catch(e){}})});
/* Ajustes finais de cada perfil: telas, navegação e acessibilidade próprias. */
applyProfile();
$('#ano').textContent=new Date().getFullYear();
show(true);
})();
