/* Ovelia Kids — histórias originais, quiz e pintura local. Sem cadastro ou chamadas externas. */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var stories=[
{id:'criacao',title:'Deus criou o mundo',ref:'Gênesis 1,1–31; 2,1–3',text:'A Bíblia começa contando que Deus criou o céu, a terra, a luz, as plantas, os animais e as pessoas. Ao terminar sua obra, Deus viu que tudo era muito bom. Cuidar da criação é uma maneira de agradecer por esse presente.',q:'Como podemos cuidar da criação de Deus?',choices:['Jogando lixo no chão','Cuidando das plantas e dos animais','Desperdiçando água'],correct:1,why:'Isso mesmo! Cuidar da natureza e dos seres vivos é uma forma de agradecer a Deus.'},
{id:'noe',title:'Noé e a arca',ref:'Gênesis 6–9',text:'Noé confiou em Deus e construiu uma arca. Sua família e os animais ficaram protegidos durante a grande chuva. Depois, apareceu um arco-íris no céu como sinal da promessa de Deus. A história nos convida a confiar e a cuidar da vida.',q:'Qual sinal apareceu depois da chuva?',choices:['Um arco-íris','Uma estrela do mar','Uma montanha de brinquedos'],correct:0,why:'Correto! O arco-íris lembra a promessa de Deus na história de Noé.'},
{id:'abraao',title:'Abraão confia em Deus',ref:'Gênesis 12,1–9; 15,1–6',text:'Deus chamou Abraão para partir em uma viagem e prometeu cuidar dele. Abraão não conhecia todos os caminhos, mas escolheu confiar e seguir a orientação de Deus. Confiar também pode significar pedir ajuda quando não sabemos o que fazer.',q:'O que Abraão escolheu fazer?',choices:['Confiar em Deus','Esconder-se para sempre','Parar de cuidar da família'],correct:0,why:'Muito bem! Abraão respondeu ao chamado de Deus com confiança.'},
{id:'moises',title:'Moisés atravessa o mar',ref:'Êxodo 14,10–31',text:'Moisés conduziu o povo de Israel para longe da escravidão no Egito. Diante do mar, o povo teve medo, mas Deus abriu um caminho para que atravessassem. A história recorda a libertação e a esperança de um povo que buscava viver em liberdade.',q:'O que essa história recorda?',choices:['A importância de desistir de todos','A libertação e a esperança','Que ninguém deve ajudar ninguém'],correct:1,why:'Isso! A passagem lembra a libertação do povo e sua esperança em Deus.'},
{id:'davi',title:'Davi e Golias',ref:'1 Samuel 17,1–50',text:'Davi era um jovem pastor. Quando Golias assustou o povo, Davi decidiu enfrentá-lo confiando em Deus. Ele não venceu por ser o maior ou o mais forte, mas por sua coragem. Coragem também é fazer o bem e procurar um adulto de confiança quando algo parece perigoso.',q:'O que ajudou Davi a enfrentar o desafio?',choices:['A coragem e a confiança em Deus','Querer machucar todos','Fingir que não havia problema'],correct:0,why:'Muito bem! Davi agiu com coragem e confiança em Deus.'},
{id:'nascimento',title:'Jesus nasce em Belém',ref:'Lucas 2,1–20',text:'Maria e José viajaram até Belém. Ali nasceu Jesus, que foi colocado numa manjedoura. Anjos anunciaram a boa notícia aos pastores, que foram visitar o menino com alegria. O nascimento de Jesus é sinal do amor de Deus que vem ao nosso encontro.',q:'Quem recebeu a notícia do nascimento de Jesus dos anjos?',choices:['Os pastores','Os pescadores do Egito','Os reis da Grécia'],correct:0,why:'Correto! Os anjos anunciaram a boa notícia aos pastores.'},
{id:'tempestade',title:'Jesus acalma a tempestade',ref:'Marcos 4,35–41',text:'Jesus e seus discípulos estavam em um barco quando começou uma tempestade. Os discípulos ficaram assustados. Jesus mandou o vento e o mar se acalmarem, e tudo ficou tranquilo. Quando sentimos medo, podemos rezar e procurar a ajuda de um adulto de confiança.',q:'O que podemos fazer quando sentimos medo?',choices:['Guardar o medo e nunca falar','Pedir ajuda a um adulto de confiança e rezar','Colocar-nos em perigo'],correct:1,why:'Isso mesmo! Podemos rezar e conversar com um adulto de confiança.'},
{id:'samaritano',title:'O bom samaritano',ref:'Lucas 10,25–37',text:'Jesus contou sobre um homem que foi ferido no caminho. Algumas pessoas passaram sem ajudar, mas um samaritano parou, cuidou dele e procurou ajuda. Jesus ensinou que amar o próximo significa perceber quem precisa de cuidado e agir com compaixão e segurança.',q:'O que fez o samaritano?',choices:['Parou e cuidou do homem ferido','Riu do homem','Levou embora as coisas dele'],correct:0,why:'Muito bem! O samaritano demonstrou compaixão e procurou ajudar.'},
{id:'ovelha',title:'A ovelha perdida',ref:'Lucas 15,3–7',text:'Jesus contou que um pastor tinha cem ovelhas e percebeu que uma havia se perdido. Ele foi procurá-la e ficou feliz quando a encontrou. Jesus usou essa imagem para ensinar que cada pessoa é preciosa e merece cuidado.',q:'Como o pastor reagiu quando encontrou a ovelha?',choices:['Ficou feliz','Ficou bravo com todas as ovelhas','Esqueceu-se dela'],correct:0,why:'Isso! O pastor ficou feliz porque a ovelha era importante para ele.'},
{id:'paes',title:'A partilha dos pães',ref:'João 6,1–13',text:'Uma multidão foi ouvir Jesus e as pessoas precisavam comer. Um menino ofereceu cinco pães e dois peixes. Jesus agradeceu a Deus e o alimento foi repartido. Todos comeram, e ainda sobraram pedaços. Pequenos gestos de partilha podem ajudar muita gente.',q:'O que o menino fez?',choices:['Escondeu toda a comida','Partilhou os pães e os peixes','Foi embora sem falar com ninguém'],correct:1,why:'Correto! O menino ofereceu o que tinha, e a comida foi partilhada.'},
{id:'zacheu',title:'Zaqueu encontra Jesus',ref:'Lucas 19,1–10',text:'Zaqueu queria ver Jesus e subiu em uma árvore porque era baixinho e havia muita gente. Jesus o viu e quis ficar em sua casa. Zaqueu decidiu corrigir seus erros e repartir seus bens. O encontro com Jesus pode nos inspirar a mudar e reparar o mal que fizemos.',q:'O que Zaqueu decidiu fazer?',choices:['Corrigir seus erros e repartir','Continuar enganando as pessoas','Nunca mais falar com ninguém'],correct:0,why:'Muito bem! Zaqueu decidiu mudar suas atitudes e reparar seus erros.'},
{id:'pentecostes',title:'O Espírito Santo vem',ref:'Atos dos Apóstolos 2,1–11',text:'Os discípulos estavam reunidos quando o Espírito Santo veio sobre eles. Eles ganharam coragem para anunciar a mensagem de Jesus a pessoas de muitos lugares. A festa de Pentecostes recorda a presença do Espírito Santo e o nascimento missionário da Igreja.',q:'O que os discípulos receberam?',choices:['Coragem para anunciar Jesus','Uma ordem para nunca sair de casa','Um mapa do Egito'],correct:0,why:'Isso! O Espírito Santo fortaleceu os discípulos para anunciar Jesus.'}
];
var list=$('#kidsLibrary'),title=$('#kidsStoryTitle'),ref=$('#kidsStoryRef'),text=$('#kidsStoryText'),qbox=$('#kidsStoryQuestion'),qt=$('#kidsQuestionText'),choices=$('#kidsQuestionChoices'),feedback=$('#kidsQuestionFeedback');
var current=0, answered={};
try{answered=JSON.parse(localStorage.getItem('ovelia-kids-quiz-v1')||'{}')||{}}catch(e){answered={}}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function renderList(){
 if(!list)return;
 list.innerHTML=stories.map(function(story,i){return '<button class="kids-story-card'+(i===current?' selected':'')+'" type="button" data-story="'+i+'" aria-pressed="'+(i===current)+'"><span class="kids-story-number">História '+(i+1)+'</span><strong>'+esc(story.title)+'</strong><small>'+esc(story.ref)+'</small>'+(answered[story.id]&&answered[story.id].correct?'<span class="kids-done">✓ Aprendida</span>':'')+'</button>'}).join('');
}
function renderStory(i){
 current=(i+stories.length)%stories.length;var st=stories[current];
 if(title)title.textContent=st.title;if(ref)ref.textContent='Referência bíblica: '+st.ref;
 if(text)text.innerHTML='<p>'+esc(st.text)+'</p><p><strong>Para guardar no coração:</strong> '+esc(st.why)+'</p>';
 if(qt)qt.textContent=st.q;if(choices){choices.innerHTML=st.choices.map(function(c,j){return '<button class="btn g" type="button" data-choice="'+j+'">'+esc(c)+'</button>'}).join('')}
 if(qbox)qbox.hidden=false;
 if(feedback){var old=answered[st.id];feedback.textContent=old?(old.correct?'Você já respondeu corretamente. Muito bem!':'Você já respondeu esta pergunta. Leia a explicação e tente a próxima história.'):'Escolha uma resposta.'}
 renderList();
}
if(list){renderList();list.addEventListener('click',function(e){var b=e.target.closest('[data-story]');if(b)renderStory(+b.getAttribute('data-story'))})}
if(choices)choices.addEventListener('click',function(e){
 var b=e.target.closest('[data-choice]');if(!b)return;var st=stories[current],n=+b.getAttribute('data-choice'),correct=n===st.correct;
 if(answered[st.id]){feedback.textContent='Esta pergunta já foi respondida. '+st.why;return}
 answered[st.id]={correct:correct,at:new Date().toISOString()};
 try{localStorage.setItem('ovelia-kids-quiz-v1',JSON.stringify(answered))}catch(e){}
 Array.prototype.forEach.call(choices.querySelectorAll('button'),function(btn,i){btn.disabled=true;if(i===st.correct)btn.classList.add('kids-answer-correct')});
 feedback.textContent=(correct?'🎉 Muito bem! ':'Quase! A resposta certa é: '+st.choices[st.correct]+'. ')+st.why;
 renderList();
});
$('#kidsStoryPrev')?.addEventListener('click',function(){renderStory(current-1)});
$('#kidsStoryNext')?.addEventListener('click',function(){renderStory(current+1)});
$('#kidsStoryListen')?.addEventListener('click',function(){var st=stories[current];if(window.Voz&&Voz.falar)Voz.falar(st.title+'. Referência bíblica: '+st.ref+'. '+st.text+' Para guardar no coração: '+st.why,st.title);else if($('#kidsPaintStatus'))$('#kidsPaintStatus').textContent='A leitura em voz alta não está disponível neste navegador.'});
/* Pintura em canvas: desenhos vetoriais próprios desenhados localmente. */
var canvas=$('#kidsCanvas'),ctx=canvas&&canvas.getContext('2d'),drawing=false,last=null,eraser=false;
var select=$('#kidsDrawingSelect'),color=$('#kidsColor'),brush=$('#kidsBrush'),status=$('#kidsPaintStatus');
function line(points){ctx.beginPath();points.forEach(function(p,i){if(!i)ctx.moveTo(p[0],p[1]);else ctx.lineTo(p[0],p[1])});ctx.stroke()}
function ellipse(x,y,rx,ry){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.stroke()}
function setupCanvas(){
 if(!ctx)return;
 ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='#27212f';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
 var type=select?select.value:'sheep';
 if(type==='sheep'){
  // Cordeirinho original em traço simples para colorir
  ellipse(420,340,190,145);ellipse(610,300,95,78);ellipse(680,310,26,32);ellipse(585,240,38,34);ellipse(638,224,34,30);ellipse(690,242,31,29);ellipse(718,283,24,25);
  ellipse(625,294,7,8);ellipse(687,294,7,8);line([[644,327],[654,337],[665,327]]);
  line([[300,445],[300,535],[360,535],[360,450]]);line([[455,450],[455,535],[515,535],[515,445]]);
  ellipse(245,260,44,40);ellipse(310,240,44,40);ellipse(365,260,44,40);ellipse(420,245,44,40);ellipse(475,265,44,40);ellipse(520,295,44,40);
  line([[185,535],[600,535]]);ellipse(180,535,18,18);ellipse(605,535,18,18);
 }else if(type==='boat'){
  line([[150,390],[740,390],[650,500],[260,500],[150,390]]);line([[445,150],[445,390]]);line([[445,170],[610,350],[445,350]]);line([[420,210],[280,350],[420,350]]);line([[150,535],[740,535]]);line([[190,560],[700,560]]);
  ellipse(300,390,22,18);ellipse(400,390,22,18);ellipse(500,390,22,18);ellipse(600,390,22,18);
 }else{
  // Pomba original em linhas geométricas simples
  line([[180,320],[320,300],[430,230],[500,170],[480,270],[620,230],[760,260],[670,340],[770,390],[620,400],[510,460],[390,440],[300,490],[330,400],[180,320]]);
  line([[430,230],[455,350],[390,440]]);line([[480,270],[560,335],[670,340]]);line([[180,320],[115,285],[135,340],[180,320]]);
  ellipse(505,300,8,8);line([[520,305],[550,315],[520,322]]);
 }
 ctx.strokeStyle='#27212f';ctx.lineWidth=5;
 try{var saved=localStorage.getItem('ovelia-kids-paint-'+type);if(saved){var im=new Image();im.onload=function(){ctx.drawImage(im,0,0,canvas.width,canvas.height)};im.src=saved}}catch(e){}
}
function pos(e){var r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}}
function down(e){if(!ctx)return;drawing=true;last=pos(e);canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);e.preventDefault()}
function move(e){if(!drawing||!ctx)return;var p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle=eraser?'#ffffff':(color?color.value:'#7c4dba');ctx.lineWidth=(brush?+brush.value:10)*(canvas.width/canvas.getBoundingClientRect().width);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();last=p;e.preventDefault()}
function up(){if(!drawing)return;drawing=false;last=null;try{localStorage.setItem('ovelia-kids-paint-'+(select?select.value:'sheep'),canvas.toDataURL('image/png'));if(status)status.textContent='Desenho guardado neste aparelho.'}catch(e){if(status)status.textContent='O desenho está pronto. Use “Salvar imagem” para guardar uma cópia.'}}
if(canvas){canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);setupCanvas()}
if(select)select.addEventListener('change',setupCanvas);
$('#kidsEraser')?.addEventListener('click',function(){eraser=true;if(status)status.textContent='Borracha selecionada.'});
$('#kidsBrushMode')?.addEventListener('click',function(){eraser=false;if(status)status.textContent='Pincel selecionado.'});
$('#kidsClear')?.addEventListener('click',function(){if(select){try{localStorage.removeItem('ovelia-kids-paint-'+select.value)}catch(e){}setupCanvas();if(status)status.textContent='Desenho reiniciado.'}});
$('#kidsSave')?.addEventListener('click',function(){if(!canvas)return;try{var a=document.createElement('a');a.download='ovelia-desenho-'+(select?select.value:'kids')+'.png';a.href=canvas.toDataURL('image/png');a.click();if(status)status.textContent='Imagem pronta para salvar.'}catch(e){if(status)status.textContent='Não foi possível exportar neste navegador.'}});
/* Progresso diário sem nomes, cadastro ou envio externo. */
var progressBoxes=document.querySelectorAll('[data-progress]');
progressBoxes.forEach(function(el){try{el.checked=localStorage.getItem('ovelia-'+el.dataset.progress)==='1'}catch(e){}el.addEventListener('change',function(){try{localStorage.setItem('ovelia-'+el.dataset.progress,el.checked?'1':'0')}catch(e){}})});
renderStory(0);
})();
