/* Ovelia — site estático. Sem cadastro, sem servidor, sem coleta de dados.
   Único armazenamento local: preferências de leitura (tamanho da letra e contraste), guardadas só neste aparelho. */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function esc(t){var d=document.createElement('div');d.textContent=t==null?'':t;return d.innerHTML}

/* ---------- Navegação por seções (#home, #liturgia ...) ---------- */
var PAGES=[['home','Início'],['liturgia','Liturgia'],['biblia','Bíblia'],['oracoes','Orações'],['terco','Terço'],['estudos','Estudos'],['infantil','Infantil'],['sobre','Sobre']];
var menu=$('#menu'),menuBtn=$('#menuBtn');
menu.innerHTML=PAGES.map(function(p){return '<li><a href="#'+p[0]+'">'+p[1]+'</a></li>'}).join('');
menuBtn.addEventListener('click',function(){var o=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
function show(first){
  var id=location.hash.slice(1);if(!$('section.pg[id="'+id+'"]'))id='home';
  $$('section.pg').forEach(function(s){s.classList.toggle('on',s.id===id)});
  $$('#menu a').forEach(function(a){if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');
  if(typeof Voz!=='undefined')Voz.parar();
  window.scrollTo(0,0);
  var t=PAGES.filter(function(p){return p[0]===id})[0];document.title=(id==='home'?'Ovelia — Bíblia, Liturgia Diária e orações católicas':t[1]+' — Ovelia');
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


/* ---------- Leitura em voz alta (voz do próprio aparelho, via Web Speech API; nada é enviado a servidores da Ovelia) ---------- */
var Voz=(function(){
  var ok='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window,voices=[],sel=$('#vozSel'),vel=$('#vozVel'),st=$('#vozStatus'),pz=$('#vozPausa'),prefV=null;
  try{prefV=localStorage.getItem('ovelia-voz');vel.value=+localStorage.getItem('ovelia-vel')||1}catch(e){}
  if(!ok){document.body.classList.add('sem-voz');st.textContent='Este navegador não oferece leitura em voz alta. Tente o Chrome, Edge ou Safari atualizados.';return {falar:function(){},parar:function(){},texto:function(){return ''}}}
  function carregar(){voices=speechSynthesis.getVoices().filter(function(v){return /^pt/i.test(v.lang)});
    voices.sort(function(a,b){return (/pt[-_]BR/i.test(b.lang)?1:0)-(/pt[-_]BR/i.test(a.lang)?1:0)});
    sel.innerHTML=voices.map(function(v,i){return '<option value="'+i+'">'+esc(v.name+' ('+v.lang+')')+'</option>'}).join('');
    voices.forEach(function(v,i){if(prefV&&v.name===prefV)sel.value=i});
    if(!voices.length)st.textContent='Procurando vozes em português no seu aparelho...'}
  carregar();if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',carregar);
  setTimeout(function(){if(!voices.length)st.textContent='Seu aparelho não tem voz em português instalada. Instale uma nas configurações de voz do aparelho (acessibilidade ou idioma) e recarregue a página.'},2500);
  sel.addEventListener('change',function(){try{localStorage.setItem('ovelia-voz',voices[sel.value].name)}catch(e){}});
  vel.addEventListener('change',function(){try{localStorage.setItem('ovelia-vel',vel.value)}catch(e){}});
  function partir(t){var r=t.match(/[^.!?;:\n]+[.!?;:]?\s*/g)||[t],o=[],c='';r.forEach(function(s){if((c+s).length>170&&c){o.push(c);c=s}else c+=s});if(c)o.push(c);return o}
  function parar(){speechSynthesis.cancel();pz.textContent='Pausar';st.textContent=''}
  function falar(txt,tit){
    if(!voices.length){st.textContent='Nenhuma voz em português disponível neste aparelho.';return}
    speechSynthesis.cancel();pz.textContent='Pausar';var v=voices[+sel.value||0],ch=partir(txt.replace(/\s+/g,' ').trim());
    if(!ch.length||!ch[0]){st.textContent='Não há texto para ler aqui.';return}
    setTimeout(function(){ch.forEach(function(c,i){var u=new SpeechSynthesisUtterance(c);u.voice=v;u.lang=v.lang;u.rate=+vel.value;
      if(i===ch.length-1)u.onend=function(){st.textContent='Leitura concluída.'};u.onerror=function(e){if(e.error&&e.error!=='canceled'&&e.error!=='interrupted')st.textContent='Não foi possível ler em voz alta neste aparelho.'};
      speechSynthesis.speak(u)});st.textContent='Lendo: '+(tit||'texto')+'.'},60)}
  function texto(no,tudo){var c=no.cloneNode(true);$$('button,select,input,label,script,.beads,.prog,.vozbar,[aria-hidden="true"],[hidden]',c).forEach(function(x){x.parentNode&&x.parentNode.removeChild(x)});
    if(!tudo)$$('details',c).forEach(function(d){if(!d.open)[].slice.call(d.children).forEach(function(x){if(x.tagName!=='SUMMARY')d.removeChild(x)})});
    $$('h1,h2,h3,p,li,summary,div,td,th,caption,small,a.btn,.tag',c).forEach(function(x){x.appendChild(document.createTextNode('. '))});
    return c.textContent.replace(/\.\s*\.(\s*\.)*/g,'.').replace(/([!?:;])\s*\./g,'$1')}
  $('#vozPag').addEventListener('click',function(){var s=$('section.pg.on');var h=s.querySelector('h1,h2');falar(texto(s),h?h.textContent:'página')});
  pz.addEventListener('click',function(){if(speechSynthesis.paused){speechSynthesis.resume();pz.textContent='Pausar'}else if(speechSynthesis.speaking){speechSynthesis.pause();pz.textContent='Continuar'}});
  $('#vozParar').addEventListener('click',parar);
  $('#vozCfg').addEventListener('click',function(){var o=$('#vozOpc');o.hidden=!o.hidden;this.setAttribute('aria-expanded',!o.hidden)});
  window.addEventListener('pagehide',function(){speechSynthesis.cancel()});
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
 {t:'Orações da Ovelia para o dia a dia',o:'original',ids:['manha','noite','agradecimento','familias','dificeis']}
];
var ORIG={
 manha:{n:'Para a manhã',t:'Senhor, obrigado por este novo dia.\nGuia os meus passos, os meus pensamentos e as minhas palavras.\nQue eu viva hoje com amor e com coragem. Amém.'},
 noite:{n:'Para a noite',t:'Senhor, ao fim deste dia, agradeço o que recebi\ne peço perdão pelo que deixei de fazer.\nGuarda o meu descanso e o de quem amo. Amém.'},
 agradecimento:{n:'De agradecimento',t:'Obrigado, Senhor, pela vida, pelas pessoas ao meu lado\ne por tantas coisas que recebo sem perceber.\nAjuda-me a reconhecer os teus dons e a partilhá-los. Amém.'},
 familias:{n:'Pelas famílias',t:'Senhor, abençoa a nossa família.\nDá-nos paciência, respeito e perdão uns com os outros.\nQue a nossa casa seja lugar de paz e de oração. Amém.'},
 dificeis:{n:'Para momentos difíceis',t:'Senhor, estou cansado e preciso da tua ajuda.\nSegura-me quando eu não tiver forças\ne coloca no meu caminho pessoas que me apoiem.\nEu confio em ti. Amém.'}
};
for(var k in ORIG)P[k]=ORIG[k];
var lo=$('#listaOracoes');
lo.innerHTML=CATS.map(function(c){return '<h3>'+esc(c.t)+'</h3>'+(c.o==='original'?'<p class="aviso"><b>Composições originais da Ovelia.</b> Não são orações oficiais da Igreja.</p>':'')+c.ids.map(function(id){var p=P[id];
  return '<details id="or-'+id+'"><summary>'+esc(p.n)+'</summary><div class="oracao" id="t-'+id+'">'+esc(p.t)+'</div><button class="btn g" type="button" data-copiar="'+id+'">Copiar texto</button> <span class="tag '+(c.o==='original'?'pd':'ok')+'">'+(c.o==='original'?'Original da Ovelia':'Oração tradicional')+'</span><span class="sr" role="status" aria-live="polite" style="margin-left:8px"></span></details>'}).join('')}).join('');
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
$('#litAtual').textContent=L.ultimaAtualizacao?('Última atualização do conteúdo: '+L.ultimaAtualizacao.split('-').reverse().join('/')):'Nenhum conteúdo litúrgico foi publicado neste site ainda.';
function parte(id,titulo,o){if(!o)return '';return '<section class="card" id="'+id+'"><h3>'+titulo+'</h3><p><b>'+esc(o.ref||'')+'</b></p>'+(o.refrao?'<p><i>Refrão: '+esc(o.refrao)+'</i></p>':'')+'<div class="oracao">'+esc(o.texto||'')+'</div></section>'}
if(dia){
  var partes=[['l1','Primeira leitura',dia.primeiraLeitura],['sal','Salmo responsorial',dia.salmo],['l2','Segunda leitura',dia.segundaLeitura],['acl','Aclamação ao Evangelho',dia.aclamacao],['ev','Evangelho',dia.evangelho]].filter(function(x){return x[2]});
  $('#litDia').innerHTML='<div class="card"><span class="tag ok">Conteúdo revisado</span><h3 style="margin-top:8px">'+esc(dia.celebracao||'')+'</h3>'+(dia.fonte?'<p style="color:var(--mut)">Fonte: '+esc(dia.fonte)+'</p>':'')+'<div class="row">'+partes.map(function(x){return '<button class="btn g" type="button" data-scroll="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'+
   partes.map(function(x){return parte(x[0],x[1],x[2])}).join('')+(dia.reflexao?'<div class="card"><span class="tag pd">Reflexão da Ovelia · conteúdo editorial</span><p>'+esc(dia.reflexao)+'</p></div>':'');
  var s=$('#litSem');if(s)s.hidden=true;
}
$('#homeLit').textContent=dia?('Hoje: '+(dia.celebracao||'liturgia do dia')+'.'):'A liturgia de hoje ainda não foi publicada aqui. Consulte a fonte oficial indicada na página.';

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

$$('details').forEach(function(d){var s=d.querySelector('summary'),b=document.createElement('button');b.type='button';b.className='btn g voz-btn';b.textContent='🔊 Ouvir';b.setAttribute('aria-label','Ouvir: '+s.textContent.trim());b.addEventListener('click',function(){Voz.falar(Voz.texto(d,true),s.textContent.trim())});s.insertAdjacentElement('afterend',b)});
$('#ano').textContent=new Date().getFullYear();
show(true);
})();
