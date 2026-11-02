/* Ovelia — Nível 2 incremental
   Inclui navegação/links oficiais do Nível 1 + experiência, voz e check-in.
   Carregar depois de liturgia.js e app.js. Sem bibliotecas externas. */
(function () {
  'use strict';
  var INSTAGRAM = 'https://www.instagram.com/oveliaoficial/';
  var WHATSAPP = 'https://whatsapp.com/channel/0029VbDFfTh3gvWcWSGo1v3P';
  var LABELS = {
    '#home':'Início', '#liturgia':'Liturgia do dia', '#biblia':'Bíblia Sagrada',
    '#oracoes':'Biblioteca de orações', '#terco':'Meu Terço guiado',
    '#estudos':'Estudos bíblicos', '#infantil':'Área infantil',
    '#sobre':'Sobre a Ovelia', '#calendario':'Calendário, santos e check-in'
  };
  var ROUTES = {
    kids: ['home','infantil','oracoes'],
    senior: ['home','liturgia','oracoes','terco','biblia','sobre','calendario'],
    adult: ['home','liturgia','biblia','oracoes','terco','estudos','infantil','sobre','calendario']
  };
  var routeStack = [];
  var lastHash = location.hash || '#home';
  var started = false;

  function profile() {
    try {
      var p = localStorage.getItem('ovelia-perfil') || '';
      return p === 'easy' ? 'senior' : p;
    } catch (e) { return ''; }
  }
  function activeRoute() { return (location.hash || '#home').slice(1); }
  function section(id) { return document.getElementById(id); }
  function safeText(el, value) { if (el) el.textContent = value; }

  function ensureCalendarSection() {
    if (section('calendario')) return;
    var main = document.querySelector('main#conteudo');
    var about = section('sobre');
    if (!main) return;
    var s = document.createElement('section');
    s.className = 'pg';
    s.id = 'calendario';
    s.innerHTML = [
      '<h2>Calendário, santos e check-in</h2>',
      '<p>Consulte uma data, veja algumas celebrações do calendário católico e marque seus momentos de fé. Seu progresso fica salvo somente neste aparelho.</p>',
      '<div class="card n2-calendar-shell">',
        '<div class="n2-calendar-toolbar">',
          '<button class="btn g" type="button" id="n2MesAnterior" aria-label="Mês anterior">← Mês anterior</button>',
          '<h3 id="n2MesTitulo" aria-live="polite"></h3>',
          '<button class="btn g" type="button" id="n2MesProximo" aria-label="Próximo mês">Próximo mês →</button>',
        '</div>',
        '<div class="n2-calendar-grid" id="n2CalendarGrid" role="group" aria-label="Escolha uma data"></div>',
        '<div class="n2-calendar-actions"><button class="btn" type="button" id="n2Hoje">Ir para hoje</button><label for="n2DataEscolhida">Ou escolher uma data</label><input type="date" id="n2DataEscolhida"></div>',
      '</div>',
      '<div class="card n2-saint-card" id="n2SantoDia" aria-live="polite"></div>',
      '<div class="card n2-checkin" id="n2Checkin">',
        '<span class="tag pd">Meu check-in de fé</span><h3 id="n2CheckinTitulo">Pequenos passos, todos os dias</h3>',
        '<p>Marque o que você concluiu nesta data. Não é uma competição: cada momento de oração, leitura ou caridade tem valor.</p>',
        '<div id="n2CheckinLista"></div><p id="n2CheckinResumo" class="n2-muted" role="status" aria-live="polite"></p>',
        '<button class="btn g" id="n2LimparCheckin" type="button">Desmarcar esta data</button>',
      '</div>',
      '<p class="n2-muted">Nota: esta é uma seleção inicial de celebrações fixas, não um calendário litúrgico completo. Solenidades móveis e calendários locais podem alterar a celebração do dia. Para confirmação, consulte a fonte oficial da Igreja no Brasil.</p>',
      '<p><a class="btn g" href="https://liturgiadiaria.edicoescnbb.com.br/app/user/user/UserView.php" target="_blank" rel="noopener noreferrer">Consultar liturgia oficial da CNBB ↗</a></p>'
    ].join('');
    if (about && about.parentNode === main) main.insertBefore(s, about);
    else main.appendChild(s);
  }

  /* Celebrações fixas selecionadas. Não afirmar que esta lista cobre todos os santos. */
  var CELEBRACOES = {
    '01-01': ['Santa Maria, Mãe de Deus', 'Solenidade que celebra Maria como Mãe de Deus e inicia o ano civil.'],
    '01-25': ['Conversão de São Paulo Apóstolo', 'Recorda a conversão de Paulo e sua missão de anunciar o Evangelho.'],
    '02-02': ['Apresentação do Senhor', 'Celebra a apresentação de Jesus no Templo.'],
    '02-11': ['Nossa Senhora de Lourdes', 'Memória mariana ligada às aparições em Lourdes, na França.'],
    '03-19': ['São José', 'Solenidade de São José, esposo da Virgem Maria.'],
    '03-25': ['Anunciação do Senhor', 'Celebra o anúncio do anjo Gabriel a Maria.'],
    '04-25': ['São Marcos Evangelista', 'Recorda o evangelista tradicionalmente associado ao segundo Evangelho.'],
    '05-13': ['Nossa Senhora de Fátima', 'Memória de Nossa Senhora de Fátima.'],
    '06-24': ['Natividade de São João Batista', 'Celebra o nascimento de João Batista.'],
    '06-29': ['São Pedro e São Paulo, Apóstolos', 'Solenidade que celebra os dois grandes apóstolos.'],
    '07-22': ['Santa Maria Madalena', 'Memória de Maria Madalena, testemunha da Ressurreição.'],
    '07-26': ['São Joaquim e Sant’Ana', 'Memória dos pais da Virgem Maria, segundo a tradição cristã.'],
    '08-15': ['Assunção da Bem-aventurada Virgem Maria', 'Solenidade da Assunção de Maria. A data da celebração local pode ser transferida.'],
    '09-08': ['Natividade da Bem-aventurada Virgem Maria', 'Celebra o nascimento de Maria.'],
    '09-29': ['Santos Miguel, Gabriel e Rafael, Arcanjos', 'Festa dos santos arcanjos.'],
    '10-04': ['São Francisco de Assis', 'Memória de São Francisco, conhecido pela simplicidade e pelo cuidado com a criação.'],
    '10-16': ['Santa Margarida Maria Alacoque e Santa Edwiges', 'Celebrações associadas a esta data em calendários católicos; confirme a observância local.'],
    '10-17': ['Santo Inácio de Antioquia', 'Memória de Santo Inácio, bispo e mártir.'],
    '10-18': ['São Lucas Evangelista', 'Festa de São Lucas, evangelista.'],
    '11-01': ['Todos os Santos', 'Solenidade de Todos os Santos.'],
    '11-02': ['Comemoração de Todos os Fiéis Defuntos', 'Dia de oração pelos fiéis falecidos.'],
    '11-21': ['Apresentação da Bem-aventurada Virgem Maria', 'Memória da Apresentação de Maria.'],
    '12-08': ['Imaculada Conceição da Bem-aventurada Virgem Maria', 'Solenidade da Imaculada Conceição.'],
    '12-25': ['Natal do Senhor', 'Solenidade da Natividade de Nosso Senhor Jesus Cristo.']
  };
  var TAREFAS = [
    ['oracao','Fiz um momento de oração'],
    ['palavra','Li ou escutei a Palavra de Deus'],
    ['terco','Rezei o terço ou uma dezena'],
    ['caridade','Pratiquei uma boa ação']
  ];
  var currentDate = new Date();
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  var selectedDate = new Date(currentDate.getTime());

  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function parseDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    if (!m) return null;
    var d = new Date(+m[1], +m[2]-1, +m[3]);
    return d.getFullYear()===+m[1] && d.getMonth()===+m[2]-1 && d.getDate()===+m[3] ? d : null;
  }
  function sameDay(a,b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function readCheckin(d) {
    try { return JSON.parse(localStorage.getItem('ovelia-checkin-'+dateKey(d)) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function saveCheckin(d, values) {
    try { localStorage.setItem('ovelia-checkin-'+dateKey(d), JSON.stringify(values)); }
    catch (e) { /* O modo privado ou armazenamento desativado pode impedir salvar. */ }
  }
  function fmtLong(d) {
    return new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d);
  }
  function renderMonth() {
    var grid=section('n2CalendarGrid'), title=section('n2MesTitulo');
    if(!grid||!title)return;
    title.textContent=new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric'}).format(selectedDate);
    grid.innerHTML='';
    ['D','S','T','Q','Q','S','S'].forEach(function(day){
      var el=document.createElement('span');el.className='n2-weekday';el.textContent=day;el.setAttribute('aria-hidden','true');grid.appendChild(el);
    });
    var first=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    var offset=first.getDay(),days=new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0).getDate();
    for(var i=0;i<offset;i++){var blank=document.createElement('span');blank.className='n2-day n2-day-empty';blank.setAttribute('aria-hidden','true');grid.appendChild(blank);}
    for(var dayNum=1;dayNum<=days;dayNum++){
      (function(n){
        var d=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),n);
        var b=document.createElement('button');b.type='button';b.className='n2-day';b.textContent=String(n);
        b.setAttribute('aria-label',fmtLong(d));b.setAttribute('aria-pressed',String(sameDay(d,selectedDate)));
        if(sameDay(d,currentDate))b.classList.add('n2-today');
        var marks=readCheckin(d),done=TAREFAS.filter(function(t){return marks[t[0]]}).length;
        if(done)b.classList.add('n2-has-checkin');
        b.addEventListener('click',function(){selectedDate=new Date(d.getTime());syncDate();renderAll();});
        grid.appendChild(b);
      })(dayNum);
    }
  }
  function renderSaint() {
    var target=section('n2SantoDia');if(!target)return;
    var key=String(selectedDate.getMonth()+1).padStart(2,'0')+'-'+String(selectedDate.getDate()).padStart(2,'0');
    var item=CELEBRACOES[key];
    target.innerHTML='<span class="tag">Celebração selecionada</span><h3>'+fmtLong(selectedDate)+'</h3>';
    var title=document.createElement('p'),desc=document.createElement('p');
    if(item){title.className='n2-saint-name';title.textContent=item[0];desc.textContent=item[1];}
    else {title.className='n2-saint-name';title.textContent='Celebração ainda não cadastrada nesta seleção';desc.textContent='Para saber o santo, a memória ou a solenidade correspondente a esta data, consulte o calendário litúrgico oficial. Não vamos inventar uma informação quando a data ainda não foi conferida.';}
    target.appendChild(title);target.appendChild(desc);
  }
  function renderCheckin() {
    var list=section('n2CheckinLista'),summary=section('n2CheckinResumo');
    if(!list||!summary)return;
    safeText(section('n2CheckinTitulo'),'Meu check-in — '+fmtLong(selectedDate));
    var values=readCheckin(selectedDate);list.innerHTML='';
    TAREFAS.forEach(function(task){
      var label=document.createElement('label');label.className='n2-checkin-item';
      var input=document.createElement('input');input.type='checkbox';input.checked=!!values[task[0]];
      input.addEventListener('change',function(){values[task[0]]=input.checked;saveCheckin(selectedDate,values);renderMonth();renderCheckin();});
      var span=document.createElement('span');span.textContent=task[1];label.appendChild(input);label.appendChild(span);list.appendChild(label);
    });
    var done=TAREFAS.filter(function(t){return values[t[0]]}).length;
    summary.textContent=done===TAREFAS.length?'Você concluiu todos os itens desta data. Parabéns por reservar este tempo para a fé.':done+' de '+TAREFAS.length+' atividades marcadas nesta data.';
  }
  function syncDate() { var input=section('n2DataEscolhida');if(input)input.value=dateKey(selectedDate); }
  function renderAll() { renderMonth();renderSaint();renderCheckin(); }
  function setupCalendar() {
    ensureCalendarSection();
    var prev=section('n2MesAnterior'),next=section('n2MesProximo'),today=section('n2Hoje'),input=section('n2DataEscolhida'),clear=section('n2LimparCheckin');
    if(!prev||prev.dataset.bound)return;
    prev.dataset.bound='1';next.dataset.bound='1';today.dataset.bound='1';input.dataset.bound='1';clear.dataset.bound='1';
    prev.addEventListener('click',function(){selectedDate=new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1);renderAll();});
    next.addEventListener('click',function(){selectedDate=new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1);renderAll();});
    today.addEventListener('click',function(){selectedDate=new Date(currentDate.getTime());syncDate();renderAll();});
    input.addEventListener('change',function(){var d=parseDate(input.value);if(d){selectedDate=d;renderAll();}});
    clear.addEventListener('click',function(){saveCheckin(selectedDate,{});renderAll();});
    syncDate();renderAll();
  }

  function allowedRoutes(p) { return ROUTES[p] || ROUTES.adult; }
  function ensureMenu() {
    var menu=document.getElementById('menu');if(!menu)return;
    var p=profile(),allowed=allowedRoutes(p);
    menu.querySelectorAll('a[href^="#"]').forEach(function(a){
      var key=a.getAttribute('href');
      if(LABELS[key] && a.textContent!==LABELS[key])a.textContent=LABELS[key];
    });
    if(p!=='kids'&&!menu.querySelector('a[href="#calendario"]')){
      var li=document.createElement('li'),a=document.createElement('a');a.href='#calendario';a.textContent=LABELS['#calendario'];li.appendChild(a);menu.appendChild(li);
    }
    /* Reafirma nomes após o menu ser reconstruído ao trocar de perfil. */
    menu.querySelectorAll('a[href^="#"]').forEach(function(a){
      var key=a.getAttribute('href');if(LABELS[key] && a.textContent!==LABELS[key])a.textContent=LABELS[key];
      if(allowed.indexOf(key.slice(1))===-1)a.removeAttribute('data-n2-allowed');
    });
  }
  function guardRoute() {
    var p=profile();if(!p)return;
    var allowed=allowedRoutes(p),id=activeRoute();
    if(allowed.indexOf(id)<0){
      if(location.hash!=='#home')location.hash='#home';
      return;
    }
    var menu=document.getElementById('menu');
    if(menu)menu.querySelectorAll('a[href^="#"]').forEach(function(a){
      var id2=a.getAttribute('href').slice(1);
      a.hidden=allowed.indexOf(id2)<0;
    });
    document.querySelectorAll('section.pg').forEach(function(s){
      if(s.id==='home')return;
      s.classList.toggle('n2-profile-blocked',allowed.indexOf(s.id)<0);
    });
  }
  function addSectionNav() {
    document.querySelectorAll('section.pg:not(#home)').forEach(function(s){
      if(s.querySelector('.n2-section-nav'))return;
      var nav=document.createElement('div');nav.className='n2-section-nav';nav.setAttribute('aria-label','Navegação da seção');
      var back=document.createElement('button');back.type='button';back.className='btn g';back.textContent='← Voltar';
      back.addEventListener('click',function(){
        var current=activeRoute();
        if(routeStack.length && routeStack[routeStack.length-1]===current)routeStack.pop();
        var target=routeStack.length?routeStack[routeStack.length-1]:'home';
        if(!section(target)||allowedRoutes(profile()).indexOf(target)<0)target='home';
        if(location.hash==='#'+target){window.scrollTo({top:0,behavior:'smooth'});}
        else location.hash='#'+target;
      });
      var home=document.createElement('a');home.className='btn g';home.href='#home';home.textContent='⌂ Início';
      nav.appendChild(back);nav.appendChild(home);s.insertBefore(nav,s.firstChild);
    });
  }
  function addSocials() {
    var footer=document.querySelector('footer');
    if(footer&&!footer.querySelector('[data-n2-social="footer"]')){
      var box=document.createElement('div');box.className='n2-social n2-footer-social';box.setAttribute('data-n2-social','footer');
      var ig=document.createElement('a');ig.href=INSTAGRAM;ig.target='_blank';ig.rel='noopener noreferrer';ig.textContent='📸 Instagram oficial ↗';
      var wa=document.createElement('a');wa.href=WHATSAPP;wa.target='_blank';wa.rel='noopener noreferrer';wa.textContent='💬 Canal oficial no WhatsApp ↗';
      box.appendChild(ig);box.appendChild(wa);footer.appendChild(box);
    }
    var about=section('sobre');
    if(about&&!about.querySelector('[data-n2-social="about"]')){
      var card=about.querySelector('.card.side')||about,box2=document.createElement('div');box2.className='n2-social';box2.setAttribute('data-n2-social','about');
      var ig2=document.createElement('a');ig2.href=INSTAGRAM;ig2.target='_blank';ig2.rel='noopener noreferrer';ig2.textContent='📸 Instagram oficial ↗';ig2.className='btn g';
      var wa2=document.createElement('a');wa2.href=WHATSAPP;wa2.target='_blank';wa2.rel='noopener noreferrer';wa2.textContent='💬 Canal da Ovelia no WhatsApp ↗';wa2.className='btn';
      box2.appendChild(ig2);box2.appendChild(wa2);card.appendChild(box2);
    }
  }
  function improvePrayerAndRosary() {
    var prayers=section('oracoes'),rosary=section('terco');
    if(prayers&&!prayers.querySelector('.n2-prayer-intro')){
      var intro=document.createElement('div');intro.className='card n2-prayer-intro';
      intro.innerHTML='<h3>Biblioteca de orações</h3><p>Use esta área para consultar, abrir e copiar textos de oração. Se quiser ser conduzido etapa por etapa durante o terço, escolha <a href="#terco">Meu Terço guiado</a>.</p>';
      var h=prayers.querySelector('h2');if(h&&h.nextSibling)prayers.insertBefore(intro,h.nextSibling);else prayers.insertBefore(intro,prayers.firstChild);
    }
    if(rosary&&!rosary.querySelector('.n2-rosary-intro')){
      var intro2=document.createElement('div');intro2.className='card n2-rosary-intro';
      intro2.innerHTML='<h3>Meu Terço guiado</h3><p>Avance no seu ritmo. Use “Voltar”, “Próximo” e “Recomeçar” para acompanhar cada etapa.</p><div class="row"><a class="btn g" href="#oracoes">Consultar biblioteca de orações</a><a class="btn" href="#terco-iniciantes">Sou iniciante — ver explicação</a></div>';
      var h2=rosary.querySelector('.side');if(h2&&h2.parentNode)h2.insertAdjacentElement('afterend',intro2);else rosary.insertBefore(intro2,rosary.firstChild);
      var beginner=Array.from(rosary.querySelectorAll('.card h3')).find(function(h){return /para iniciantes/i.test(h.textContent)});
      if(beginner&&beginner.parentElement)beginner.parentElement.id='terco-iniciantes';
    }
  }
  function improveVoiceHelp() {
    var opts=section('vozOpc');
    if(opts&&!opts.querySelector('.n2-voice-help')){
      var p=document.createElement('p');p.className='muted-note n2-voice-help';
      p.textContent='Dica para iPhone: priorize uma voz identificada como pt-BR. As vozes e a qualidade dependem das opções instaladas no aparelho; este site não baixa nem garante vozes premium. Para adicionar vozes, confira Ajustes > Acessibilidade > Conteúdo Falado > Vozes. Use Pausar/Continuar e ajuste a velocidade conforme seu conforto.';
      opts.appendChild(p);
    }
    var pause=document.getElementById('vozPausa');
    if(pause&&!pause.dataset.n2Label){
      pause.dataset.n2Label='1';
      pause.addEventListener('click',function(){
        window.setTimeout(function(){
          /* O leitor existente alterna o mesmo botão entre Pausar e Continuar. */
          if(!window.speechSynthesis || (!window.speechSynthesis.paused&&!window.speechSynthesis.speaking))pause.textContent='Pausar';
        },0);
      });
    }
  }
  function improveProfileLabels() {
    safeText(document.querySelector('[data-profile="adult"] strong'),'Modo adulto');
    safeText(document.getElementById('perfilBtn'),'Trocar ambiente');
    var btn=document.getElementById('perfilBtn');if(btn)btn.setAttribute('aria-label','Trocar ambiente: infantil, adulto ou Ovelia 60+');
    var note=document.querySelector('.perfil-nota');if(note)note.textContent='Você pode trocar de ambiente a qualquer momento pelo botão “Trocar ambiente”. Sua escolha fica salva neste aparelho.';
  }
  function rememberRoute() {
    var next=activeRoute();
    if(!started){started=true;lastHash=location.hash||'#home';routeStack=[lastHash.slice(1)];return;}
    if(next===routeStack[routeStack.length-2])routeStack.pop();
    else if(next!==routeStack[routeStack.length-1])routeStack.push(next);
    lastHash=location.hash||'#home';
    if(routeStack.length>40)routeStack=routeStack.slice(-40);
  }
  function run() {
    ensureCalendarSection();
    setupCalendar();
    ensureMenu();
    addSectionNav();
    addSocials();
    improvePrayerAndRosary();
    improveVoiceHelp();
    improveProfileLabels();
    guardRoute();
  }
  window.addEventListener('hashchange',function(){rememberRoute();window.setTimeout(run,0);});
  var menu=document.getElementById('menu');
  if(menu&&window.MutationObserver)new MutationObserver(function(){ensureMenu();}).observe(menu,{childList:true,subtree:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){rememberRoute();run();});
  else {rememberRoute();run();}
  /* Perfil troca por evento de clique; a observação do menu e esta checagem mantêm a navegação coerente. */
  document.addEventListener('click',function(e){
    var profileButton=e.target.closest('[data-profile]');
    if(profileButton)window.setTimeout(run,0);
  });
})();