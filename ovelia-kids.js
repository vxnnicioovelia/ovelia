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
var list=$('#kidsLibrary'),reader=$('#kidsStoryReader'),kidsSection=$('#infantil'),questionToggle=$('#kidsStoryQuestionToggle'),title=$('#kidsStoryTitle'),ref=$('#kidsStoryRef'),text=$('#kidsStoryText'),qbox=$('#kidsStoryQuestion'),qt=$('#kidsQuestionText'),choices=$('#kidsQuestionChoices'),feedback=$('#kidsQuestionFeedback'),audioStatus=$('#kidsStoryAudioStatus'),scene=$('#kidsStoryScene'),pageCount=$('#kidsStoryPageCount'),pageProgress=$('#kidsStoryProgress');
var sceneIcons=['🌍','🌈','🧭','🌊','🛡️','⭐','⛵','🤝','🐑','🍞','🌳','🕊️'];
var current=0, answered={};
try{answered=JSON.parse(localStorage.getItem('ovelia-kids-quiz-v1')||'{}')||{}}catch(e){answered={}}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function renderList(){
 if(!list)return;
 list.innerHTML=stories.map(function(story,i){return '<button class="kids-story-card'+(i===current?' selected':'')+'" type="button" data-story="'+i+'" aria-pressed="'+(i===current)+'"><span class="kids-story-number">História '+(i+1)+'</span><strong>'+esc(story.title)+'</strong><small>'+esc(story.ref)+'</small>'+(answered[story.id]&&answered[story.id].correct?'<span class="kids-done">✓ Aprendida</span>':'')+'</button>'}).join('');
}
function setStoryMode(open){if(kidsSection)kidsSection.classList.toggle('kids-story-open',!!open);if(reader)reader.hidden=!open;var back=$('#kidsStoryBack');if(back)back.hidden=!open;if(questionToggle){questionToggle.setAttribute('aria-expanded','false');questionToggle.textContent='💡 Pergunta da história'}if(qbox)qbox.hidden=true}
function renderStory(i){
 current=(i+stories.length)%stories.length;var st=stories[current];if(reader)reader.classList.remove('kids-read-together');setStoryMode(true);
 if(title)title.textContent=st.title;if(ref)ref.textContent='Referência bíblica: '+st.ref;
 if(pageCount)pageCount.textContent=(current+1)+'/'+stories.length;if(pageProgress){pageProgress.max=stories.length;pageProgress.value=current+1}
 if(scene){scene.innerHTML='<span aria-hidden="true">'+sceneIcons[current%sceneIcons.length]+'</span><strong>'+esc(st.title)+'</strong><small>Ilustração provisória — arte final pendente</small>';scene.setAttribute('aria-label','Ilustração provisória: '+st.title)}
 if(text)text.innerHTML='<p>'+esc(st.text)+'</p><p><strong>Para guardar no coração:</strong> '+esc(st.why)+'</p>';
 if(qt)qt.textContent=st.q;if(choices){choices.innerHTML=st.choices.map(function(c,j){return '<button class="btn g" type="button" data-choice="'+j+'">'+esc(c)+'</button>'}).join('')}
 if(qbox)qbox.hidden=true;
 if(feedback){var old=answered[st.id];feedback.textContent=old&&old.correct?'Você já acertou esta pergunta. '+st.why:'Escolha uma resposta para esta história.'}
 if(choices){Array.prototype.forEach.call(choices.querySelectorAll('button'),function(btn,j){btn.disabled=!!(answered[st.id]&&answered[st.id].correct);if(answered[st.id]&&answered[st.id].correct&&j===st.correct)btn.classList.add('kids-answer-correct')})}
 renderList();
}
if(list){renderList();setStoryMode(false);list.addEventListener('click',function(e){var b=e.target.closest('[data-story]');if(b){renderStory(+b.getAttribute('data-story'));if(reader){reader.scrollIntoView({behavior:'smooth',block:'start'});var h=$('#kidsStoryTitle');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}}})}
if(choices)choices.addEventListener('click',function(e){
 var b=e.target.closest('[data-choice]');if(!b)return;var st=stories[current],n=+b.getAttribute('data-choice'),correct=n===st.correct;
 if(answered[st.id]&&answered[st.id].correct){feedback.textContent='Você já acertou esta pergunta. '+st.why;return}
 if(correct){
  answered[st.id]={correct:true,at:new Date().toISOString()};
  try{localStorage.setItem('ovelia-kids-quiz-v1',JSON.stringify(answered))}catch(e){}
  Array.prototype.forEach.call(choices.querySelectorAll('button'),function(btn,i){btn.disabled=true;if(i===st.correct)btn.classList.add('kids-answer-correct')});
  feedback.textContent='🎉 Muito bem! '+st.why;
  renderList();
 }else{
  feedback.textContent='Quase! A resposta certa é: '+st.choices[st.correct]+'. '+st.why+' Você pode tentar outra vez.';
 }
});
$('#kidsStoryPrev')?.addEventListener('click',function(){renderStory(current-1)});
$('#kidsStoryParents')?.addEventListener('click',function(){if(window.Voz&&Voz.parar)Voz.parar();if(audioStatus)audioStatus.textContent='Modo “Ler com meus pais”: texto ampliado, sem áudio.';var reader=$('#kidsStoryReader');if(reader){reader.classList.add('kids-read-together');reader.scrollIntoView({behavior:'smooth',block:'start'})}});
$('#kidsStoryBack')?.addEventListener('click',function(){if(window.Voz&&Voz.parar)Voz.parar();var parar=$('#kidsStoryStop');if(parar)parar.hidden=true;if(reader)reader.classList.remove('kids-read-together');setStoryMode(false);var lib=$('#kidsLibrary');if(lib){lib.scrollIntoView({behavior:'smooth',block:'start'});var h=$('#bibliotecaKidsTitulo');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}if(audioStatus)audioStatus.textContent='Biblioteca de histórias.'});
questionToggle?.addEventListener('click',function(){var open=!!(qbox&&qbox.hidden);if(qbox)qbox.hidden=!open;questionToggle.setAttribute('aria-expanded',String(open));questionToggle.textContent=open?'✕ Fechar pergunta':'💡 Pergunta da história';if(open&&qbox)qbox.scrollIntoView({behavior:'smooth',block:'nearest'})});
$('#kidsStoryNext')?.addEventListener('click',function(){renderStory(current+1)});
$('#kidsStoryListen')?.addEventListener('click',function(){var st=stories[current];var reader=$('#kidsStoryReader');if(reader)reader.classList.remove('kids-read-together');if(window.Voz&&typeof Voz.falar==='function'){var parar=$('#kidsStoryStop');if(parar)parar.hidden=false;if(audioStatus)audioStatus.textContent='Solicitando a leitura em voz alta…';/* Deixe Voz.falar tentar atualizar a lista: no Safari, as vozes podem chegar depois do primeiro carregamento. */Voz.falar(st.title+'. Referência bíblica: '+st.ref+'. '+st.text+' Ensinamento: '+st.why,st.title)}else if(audioStatus)audioStatus.textContent='A leitura por voz não está disponível neste navegador. Tente atualizar o navegador ou confira as vozes instaladas no aparelho.'});
 $('#kidsStoryStop')?.addEventListener('click',function(){if(window.Voz&&Voz.parar){Voz.parar();if(audioStatus)audioStatus.textContent='Leitura interrompida.';var parar=$('#kidsStoryStop');if(parar)parar.hidden=true}else if(audioStatus)audioStatus.textContent='O controle de áudio não está disponível neste navegador.'});
/* Pintura em canvas: desenhos vetoriais próprios desenhados localmente. */
var canvas=$('#kidsCanvas'),ctx=canvas&&canvas.getContext('2d'),paintCtx=ctx,
     outlineCanvas=$('#kidsOutlineCanvas'),outlineCtx=outlineCanvas&&outlineCanvas.getContext('2d'),
     drawing=false,last=null,eraser=false;
var select=$('#kidsDrawingSelect'),color=$('#kidsColor'),brush=$('#kidsBrush'),status=$('#kidsPaintStatus');
function line(points){ctx.beginPath();points.forEach(function(p,i){if(!i)ctx.moveTo(p[0],p[1]);else ctx.lineTo(p[0],p[1])});ctx.stroke()}
function ellipse(x,y,rx,ry){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.stroke()}
function setupCanvas(){
 if(!ctx||!outlineCtx)return;
 /* O contorno é uma camada independente; a borracha só atua na camada de pintura. */
 ctx=outlineCtx;ctx.clearRect(0,0,outlineCanvas.width,outlineCanvas.height);
 ctx.strokeStyle='#27212f';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
 var type=select?select.value:'sheep';
 if(type==='sheep'){
  // Cordeirinho com silhueta legível: lã, rosto, orelhas e quatro patas.
  ctx.beginPath();ctx.moveTo(205,340);ctx.bezierCurveTo(165,300,190,245,240,250);ctx.bezierCurveTo(250,190,325,190,350,225);ctx.bezierCurveTo(390,180,455,200,470,240);ctx.bezierCurveTo(525,225,570,270,550,315);ctx.bezierCurveTo(585,365,545,420,495,420);ctx.lineTo(265,420);ctx.bezierCurveTo(220,420,185,385,205,340);ctx.stroke();
  ctx.beginPath();ctx.moveTo(515,290);ctx.bezierCurveTo(545,245,610,245,650,280);ctx.bezierCurveTo(700,270,735,305,725,350);ctx.bezierCurveTo(715,390,670,405,625,390);ctx.bezierCurveTo(580,405,535,375,515,340);ctx.closePath();ctx.stroke();
  ctx.beginPath();ctx.moveTo(575,285);ctx.quadraticCurveTo(550,250,570,235);ctx.quadraticCurveTo(600,230,615,275);ctx.stroke();
  ctx.beginPath();ctx.moveTo(670,285);ctx.quadraticCurveTo(700,245,720,270);ctx.quadraticCurveTo(730,290,700,310);ctx.stroke();
  ellipse(625,320,7,9);ellipse(690,320,7,9);line([[645,350],[658,360],[671,350]]);
  line([[285,415],[280,515],[325,515],[330,415]]);line([[435,415],[440,515],[485,515],[480,415]]);line([[255,515],[335,515]]);line([[425,515],[495,515]]);
  // Pequenos cachos separados deixam áreas de pintura mais claras.
  ellipse(225,305,29,28);ellipse(280,255,29,27);ellipse(330,235,28,25);ellipse(390,235,29,25);ellipse(445,260,28,26);ellipse(490,300,27,27);
 }else if(type==='boat'){
  // Barco com casco, mastro central, vela triangular e pequenas vigias.
  line([[145,390],[755,390],[700,455],[640,500],[255,500],[195,455],[145,390]]);
  line([[445,135],[445,390]]);
  line([[425,165],[270,350],[425,350],[425,165]]);
  line([[465,185],[625,350],[465,350],[465,185]]);
  line([[130,535],[770,535]]);line([[190,565],[710,565]]);
  ellipse(300,425,17,15);ellipse(390,425,17,15);ellipse(500,425,17,15);ellipse(590,425,17,15);
  // Bandeirinha no topo do mastro.
  line([[445,135],[495,155],[445,175]]);
 }else{
  // Pomba em voo com cabeça, bico, cauda aberta, asa com penas e ramo de oliveira.
  ctx.beginPath();ctx.moveTo(255,350);ctx.quadraticCurveTo(220,315,255,280);ctx.quadraticCurveTo(290,250,325,280);ctx.lineTo(360,305);ctx.quadraticCurveTo(420,260,475,210);ctx.quadraticCurveTo(525,170,555,180);ctx.quadraticCurveTo(535,225,515,270);ctx.quadraticCurveTo(590,235,655,245);ctx.quadraticCurveTo(720,255,765,295);ctx.quadraticCurveTo(700,305,655,330);ctx.quadraticCurveTo(710,350,735,390);ctx.quadraticCurveTo(660,400,610,385);ctx.quadraticCurveTo(555,435,485,435);ctx.quadraticCurveTo(415,440,365,405);ctx.quadraticCurveTo(320,405,285,385);ctx.closePath();ctx.stroke();
  // Asa em arco, com penas separadas e legíveis.
  ctx.beginPath();ctx.moveTo(350,310);ctx.quadraticCurveTo(420,220,515,205);ctx.quadraticCurveTo(480,270,465,320);ctx.quadraticCurveTo(435,350,405,375);ctx.stroke();
  line([[385,320],[430,285],[448,330]]);line([[410,345],[455,310],[470,350]]);line([[438,365],[480,330],[495,370]]);line([[465,385],[510,350],[530,385]]);
  // Olho e bico claramente separados do contorno.
  ellipse(292,298,7,7);line([[252,320],[220,330],[255,340]]);
  // Ramo de oliveira no bico.
  line([[225,332],[160,300],[125,270]]);ctx.beginPath();ctx.ellipse(150,285,15,7,-.6,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(180,305,15,7,.6,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(130,270,12,6,-.7,0,Math.PI*2);ctx.stroke();
 }
 /* Restaura apenas a pintura salva, nunca os contornos. */
 ctx=paintCtx;ctx.clearRect(0,0,canvas.width,canvas.height);
 try{
   var newKey='ovelia-kids-paint-v2-'+type,oldKey='ovelia-kids-paint-'+type,saved=localStorage.getItem(newKey),migrar=false;
   if(!saved){saved=localStorage.getItem(oldKey);migrar=!!saved}
   if(saved){var im=new Image();im.onload=function(){if(select&&select.value!==type)return;paintCtx.drawImage(im,0,0,canvas.width,canvas.height);if(migrar){try{localStorage.setItem(newKey,canvas.toDataURL('image/png'));localStorage.removeItem(oldKey)}catch(e){}}};im.src=saved}
 }catch(e){}
}
function pos(e){var r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}}
function down(e){if(!ctx)return;drawing=true;last=pos(e);canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);e.preventDefault()}
function move(e){if(!drawing||!ctx)return;var p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.globalCompositeOperation=eraser?'destination-out':'source-over';ctx.strokeStyle=color?color.value:'#7c4dba';ctx.lineWidth=(brush?+brush.value:10)*(canvas.width/canvas.getBoundingClientRect().width);ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();ctx.globalCompositeOperation='source-over';last=p;e.preventDefault()}
function up(){if(!drawing)return;drawing=false;last=null;try{localStorage.setItem('ovelia-kids-paint-v2-'+(select?select.value:'sheep'),canvas.toDataURL('image/png'));if(status)status.textContent='Desenho guardado neste aparelho.'}catch(e){if(status)status.textContent='O desenho está pronto. Use “Salvar imagem” para guardar uma cópia.'}}
if(canvas){canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);setupCanvas()}
if(select)select.addEventListener('change',setupCanvas);
$('#kidsEraser')?.addEventListener('click',function(){eraser=true;if(status)status.textContent='Borracha selecionada.'});
$('#kidsBrushMode')?.addEventListener('click',function(){eraser=false;if(status)status.textContent='Pincel selecionado.'});
$('#kidsClear')?.addEventListener('click',function(){if(select){try{localStorage.removeItem('ovelia-kids-paint-v2-'+select.value)}catch(e){}setupCanvas();if(status)status.textContent='Desenho reiniciado.'}});
$('#kidsSave')?.addEventListener('click',function(){if(!canvas||!outlineCanvas)return;try{
  var out=document.createElement('canvas');out.width=canvas.width;out.height=canvas.height;var outCtx=out.getContext('2d');
  outCtx.fillStyle='#fff';outCtx.fillRect(0,0,out.width,out.height);
  outCtx.drawImage(canvas,0,0);outCtx.drawImage(outlineCanvas,0,0);
  out.toBlob(function(blob){if(!blob||blob.type!=='image/png'||blob.size<100){if(status)status.textContent='Não foi possível gerar um PNG válido neste navegador.';return}var url=URL.createObjectURL(blob),a=document.createElement('a');a.download='ovelia-desenho-'+(select?select.value:'kids')+'.png';a.href=url;a.click();setTimeout(function(){URL.revokeObjectURL(url)},1500);if(status)status.textContent='PNG válido criado. Se o navegador não baixar automaticamente, confira os arquivos baixados.'},' image/png'.trim())}catch(e){if(status)status.textContent='Não foi possível exportar neste navegador.'}});
/* Progresso diário sem nomes, cadastro ou envio externo. */
function localISODate(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function isoWeek(d){var x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7));var y=new Date(Date.UTC(x.getUTCFullYear(),0,1));return x.getUTCFullYear()+'-W'+String(Math.ceil((((x-y)/86400000)+1)/7)).padStart(2,'0')}
var progressBoxes=document.querySelectorAll('[data-progress],[data-progress-week]');
progressBoxes.forEach(function(el){
 var daily=el.dataset.progress,weekly=el.dataset.progressWeek,legacy=daily?'ovelia-'+daily:null,legacyApp=daily?'ovelia-progresso-'+daily:null;
 var key=daily?'ovelia-kids-dia-'+localISODate(new Date())+'-'+daily:'ovelia-kids-semana-'+isoWeek(new Date())+'-'+weekly;
 try{
   var saved=localStorage.getItem(key);
   if(saved===null&&legacy&&(localStorage.getItem(legacy)==='1'||(legacyApp&&localStorage.getItem(legacyApp)==='1'))){saved='1';localStorage.setItem(key,'1');localStorage.removeItem(legacy);if(legacyApp)localStorage.removeItem(legacyApp)}
   el.checked=saved==='1';
 }catch(e){}
 el.addEventListener('change',function(){try{localStorage.setItem(key,el.checked?'1':'0')}catch(e){if(status)status.textContent='Não foi possível guardar o progresso neste aparelho.'}});
});
document.querySelectorAll('[data-kids-tab]').forEach(function(btn){btn.addEventListener('click',function(){var tab=btn.getAttribute('data-kids-tab');document.querySelectorAll('[data-kids-tab]').forEach(function(b){var active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',active?'true':'false')});if(tab==='drawings'){location.hash='criatividade';var paint=$('#criatividade');if(paint)paint.scrollIntoView({behavior:'smooth',block:'start'})}else if(tab==='quiz'){var quiz=$('#quiz');if(quiz)quiz.scrollIntoView({behavior:'smooth',block:'start'})}else if(tab==='stories'){var library=$('#kidsLibrary');if(library)library.scrollIntoView({behavior:'smooth',block:'start'})}})});
renderStory(0);
})();
