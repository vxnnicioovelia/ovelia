/* Ovelia — Jornada bíblica: INTERFACE (tela principal, calendário, trilha e lição em passos).
   Dados em estudos/dados/*, regras em regras.js, estado em progresso.js. Lições são carregadas só quando abertas. */
(function(){
  'use strict';
  var E=window.OveliaEstudos,R=E.regras,T=E.trilha,P=E.progresso;
  var raiz=document.getElementById('jornada'),licaoBox=document.getElementById('licaoAberta');
  if(!raiz||!licaoBox)return;
  var DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],INI=['D','S','T','Q','Q','S','S'];

  function h(tag,cls,txt,attrs){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;if(attrs)for(var k in attrs)e.setAttribute(k,attrs[k]);return e}
  function add(p){for(var i=1;i<arguments.length;i++)if(arguments[i])p.appendChild(arguments[i]);return p}
  function btn(txt,cls,fn,attrs){var b=h('button','btn '+(cls||''),txt,attrs);b.type='button';if(fn)b.addEventListener('click',fn);return b}
  function unidadeDe(id){for(var i=0;i<T.licoes.length;i++)if(T.licoes[i].id===id)return T.licoes[i].unidade;return 0}
  var anunciar=h('p','sr jr-anuncio',null,{role:'status','aria-live':'polite'});anunciar.style.cssText='position:absolute;left:-9999px';
  function falar(t){anunciar.textContent='';setTimeout(function(){anunciar.textContent=t},30)}
  document.body.appendChild(anunciar);

  /* ---------- Tela principal ---------- */
  function topo(){
    var prox=P.proxima(),xp=P.xp(),niv=P.nivelDe(xp),falta=R.XP_POR_NIVEL-(xp%R.XP_POR_NIVEL);
    var c=h('section','card jr-topo',null,{'aria-label':'Resumo da sua jornada'});
    var cab=h('div','jr-cab');
    var img=h('img','jr-ovelha',null,{src:'ovelha.png',alt:'',width:'486',height:'640'});
    var bal=h('div','jr-balao');
    bal.appendChild(h('strong',null,'Olá! Vamos caminhar juntos?'));
    bal.appendChild(h('p',null,prox?(P.feitas()===0?'A primeira lição está esperando por você.':'Sua próxima lição: '+prox.id+'. '+prox.curto+'.'):'Você concluiu todos os estudos disponíveis. Revise quando quiser; novos estudos virão!'));
    add(cab,img,bal);c.appendChild(cab);
    var st=h('div','jr-stats');
    [[String(niv),'Nível'],[String(xp),'Pontos (XP)'],[String(falta),'XP para o nível '+(niv+1)]].forEach(function(x){var d=h('div','jr-stat');d.appendChild(h('strong',null,x[0]));d.appendChild(h('span',null,x[1]));st.appendChild(d)});
    c.appendChild(st);
    var tot=P.total(),f=P.feitas(),pct=tot?Math.round(f/tot*100):0;
    var pr=h('div','jr-prog');pr.appendChild(h('p','jr-prog-txt','Trilha: '+f+' de '+tot+' estudos disponíveis concluídos. Currículo planejado: '+T.planejadas+' estudos, publicados aos poucos.'));
    var barra=h('div','jr-barra',null,{role:'progressbar','aria-valuemin':'0','aria-valuemax':String(tot),'aria-valuenow':String(f),'aria-label':'Progresso na trilha'});var in_=h('span');in_.style.width=pct+'%';barra.appendChild(in_);pr.appendChild(barra);c.appendChild(pr);
    return c;
  }
  function semana(){
    var s=P.semana(),n=s.filter(function(x){return x.estudou}).length;
    var c=h('section','card jr-semana',null,{'aria-labelledby':'jrSemTit'});
    c.appendChild(h('h3',null,'Sua semana',{id:'jrSemTit'}));
    c.appendChild(h('p','jr-semana-txt','Você estudou '+n+' de 7 dias nesta semana.'));
    var g=h('ol','jr-dias');
    s.forEach(function(d){
      var li=h('li','jr-dia'+(d.estudou?' is-feito':'')+(d.hoje?' is-hoje':''));
      li.setAttribute('aria-label',DIAS[d.dow]+', dia '+d.dia+': '+(d.estudou?'estudou':'ainda sem estudo')+(d.hoje?' (hoje)':''));
      li.appendChild(h('span','jr-dia-n',INI[d.dow],{'aria-hidden':'true'}));li.appendChild(h('span','jr-dia-m',d.estudou?'✓':String(d.dia),{'aria-hidden':'true'}));g.appendChild(li);
    });
    c.appendChild(g);
    c.appendChild(h('p','jr-nota','O dia só é marcado quando você conclui uma atividade, e não por abrir o site.'));
    var m=h('div','jr-meta'),lab=h('label',null,'Meta diária',{'for':'jrMeta'}),sel=h('select',null,null,{id:'jrMeta'});
    R.METAS.forEach(function(x){var o=h('option',null,x.t,{value:String(x.v)});if(x.v===P.meta())o.selected=true;sel.appendChild(o)});
    sel.addEventListener('change',function(){P.setMeta(+sel.value);desenhar();falar('Meta diária atualizada.')});
    add(m,lab,sel);c.appendChild(m);
    var mt=P.meta(),hj=P.atividadesHoje();
    c.appendChild(h('p','jr-meta-st',mt===0?'Sem meta definida. Estude no seu ritmo.':hj>=mt?'Meta de hoje cumprida! ('+hj+' de '+mt+')':'Hoje: '+hj+' de '+mt+' atividade(s).'));
    return c;
  }
  function no(l,idx){
    var est=P.estadoDe(l.id),prox=P.proxima(),atual=prox&&prox.id===l.id;
    var li=h('li','jr-no-item jr-pos'+(idx%4));
    var b=h('button','jr-no is-'+est+(atual?' is-atual':''),null,{type:'button'});
    var rot=est==='concluida'?'concluído':est==='disponivel'?'disponível':'bloqueado';
    b.setAttribute('aria-label','Estudo '+l.id+': '+l.curto+', '+rot);
    b.appendChild(h('span','jr-no-n',est==='concluida'?'✓':est==='bloqueada'?'🔒':String(l.id),{'aria-hidden':'true'}));
    var tx=h('span','jr-no-txt');tx.appendChild(h('span','jr-no-t',l.id+'. '+l.curto));
    tx.appendChild(h('span','jr-no-e',est==='concluida'?'Concluído · toque para revisar':est==='disponivel'?'Disponível · '+R.XP_LICAO+' XP':'Conclua o estudo anterior'));
    b.appendChild(tx);
    b.addEventListener('click',function(){
      if(!P.desbloqueada(l.id)){falar('Este estudo está bloqueado. Conclua o estudo anterior para liberá-lo.');var m=li.querySelector('.jr-aviso-bloq');if(!m){m=h('p','jr-aviso-bloq','Conclua o estudo anterior para liberar este.');li.appendChild(m)}return}
      abrir(l.id);
    });
    li.appendChild(b);
    if(atual){var o=h('img','jr-ovelha-trilha',null,{src:'ovelha.png',alt:'',width:'486',height:'640'});li.appendChild(o)}
    return li;
  }
  function trilha(){
    var c=h('section','jr-trilha',null,{'aria-labelledby':'jrTrilhaTit'});
    c.appendChild(h('h3',null,'Trilha de estudos',{id:'jrTrilhaTit'}));
    T.unidades.forEach(function(u){
      var ls=T.licoes.filter(function(l){return l.unidade===u.n}),tot=u.ate-u.de+1,fe=ls.filter(function(l){return P.concluida(l.id)}).length;
      var s=h('div','jr-unidade'+(ls.length?'':' is-prep'));
      var hd=h('div','jr-unidade-hd');hd.appendChild(h('h4',null,'Unidade '+u.n+' — '+u.titulo));
      hd.appendChild(h('p','jr-unidade-info',ls.length?'Estudos '+u.de+' a '+u.ate+' · '+fe+' de '+ls.length+' disponíveis concluídos'+(ls.length<tot?' ('+(tot-ls.length)+' em preparação)':''):'Estudos '+u.de+' a '+u.ate+' · em preparação'));
      s.appendChild(hd);
      if(ls.length){var ol=h('ol','jr-nos');ls.forEach(function(l,i){ol.appendChild(no(l,i))});s.appendChild(ol)}
      if(ls.length&&ls.length<tot)s.appendChild(h('p','jr-prep','Os próximos estudos desta unidade (a partir do '+(ls[ls.length-1].id+1)+') ainda estão sendo preparados.'));
      c.appendChild(s);
    });
    return c;
  }
  function conquistas(){
    var g=P.conquistasGanhas(),c=h('section','card jr-conq',null,{'aria-labelledby':'jrConqTit'});
    c.appendChild(h('h3',null,'Conquistas ('+g.length+' de '+R.conquistas.length+')',{id:'jrConqTit'}));
    var l=h('ul','jr-conq-lista');
    R.conquistas.forEach(function(q){var ok=g.indexOf(q.id)>=0,li=h('li','jr-conq-item'+(ok?' is-ganha':''));li.appendChild(h('strong',null,(ok?'🏅 ':'🔒 ')+q.titulo));li.appendChild(h('span',null,q.desc));l.appendChild(li)});
    c.appendChild(l);return c;
  }
  function aviso(){
    var a=h('p','jr-local','O seu progresso fica salvo somente neste aparelho e neste navegador. Ele não é sincronizado automaticamente com outros dispositivos.');
    if(!P.salvoLocalmente())a.appendChild(h('strong','jr-local-erro',' Atenção: este navegador não permite salvar dados. Seu progresso será perdido ao fechar a página.'));
    return a;
  }
  function desenhar(){
    raiz.textContent='';
    add(raiz,topo(),semana(),trilha(),conquistas(),aviso());
  }

  /* ---------- Lição em passos ---------- */
  var carregando={};
  function nomeLote(id){var a=Math.floor((id-1)/10)*10+1,z=a+9;function p(n){return('000'+n).slice(-3)}return'licoes-'+p(a)+'-'+p(z)+'.js'}
  function carregarLicao(id,cb,erro){
    if(E.licoes&&E.licoes[id])return cb(E.licoes[id]);
    var src=nomeLote(id);
    if(!carregando[src]){carregando[src]=new Promise(function(ok,no){var s=document.createElement('script');s.src=src+'?v=20261019-biblia1';s.onload=ok;s.onerror=function(){delete carregando[src];no()};document.head.appendChild(s)})}
    carregando[src].then(function(){if(E.licoes[id])cb(E.licoes[id]);else erro()},erro);
  }
  var atual=null;
  function abrir(id){
    if(!P.desbloqueada(id))return;
    raiz.hidden=true;licaoBox.hidden=false;licaoBox.textContent='';
    licaoBox.appendChild(h('p',null,'Carregando o estudo…',{role:'status'}));
    carregarLicao(id,function(l){iniciar(l)},function(){
      licaoBox.textContent='';var c=h('div','card');c.appendChild(h('h3',null,'Não foi possível abrir este estudo'));c.appendChild(h('p',null,'O arquivo do estudo não carregou. Verifique a conexão e tente de novo.'));
      add(c,btn('Tentar de novo',null,function(){abrir(id)}),btn('Voltar à trilha','g',fechar));licaoBox.appendChild(c);
    });
  }
  function fechar(){licaoBox.hidden=true;licaoBox.textContent='';raiz.hidden=false;desenhar();window.scrollTo(0,0);var t=document.getElementById('jornadaTitulo');if(t){t.setAttribute('tabindex','-1');t.focus()}}
  function iniciar(l){
    var jaFeita=P.concluida(l.id);
    atual={l:l,passo:0,revisao:jaFeita,acertos:{},primeira:{},tentouErrar:false,feito:false,resultado:null};
    desenharPasso();
  }
  var NOMES=['Introdução','Três versículos','O que ensinam juntos','Aplicação para hoje','Atividade','Conclusão'];
  function atividadeCompleta(){
    var a=atual,tot=a.l.atividade.length,ok=0;for(var i=0;i<tot;i++)if(a.acertos[i])ok++;return ok===tot;
  }
  function desenharPasso(){
    var a=atual,l=a.l,p=a.passo;licaoBox.textContent='';
    var c=h('article','card jr-licao',null,{'aria-labelledby':'jrLicTit'});
    var top=h('div','jr-licao-topo');
    top.appendChild(btn('← Voltar à trilha','g',fechar));
    top.appendChild(h('span','jr-licao-meta','Estudo '+l.id+(a.revisao?' · revisão':'')));
    c.appendChild(top);
    c.appendChild(h('p','jr-passo-info','Passo '+(p+1)+' de 6 · '+NOMES[p]));
    var barra=h('div','jr-barra',null,{role:'progressbar','aria-valuemin':'1','aria-valuemax':'6','aria-valuenow':String(p+1),'aria-label':'Passo da lição'});var bi=h('span');bi.style.width=Math.round((p+1)/6*100)+'%';barra.appendChild(bi);c.appendChild(barra);
    var tit=h('h3',null,l.titulo,{id:'jrLicTit',tabindex:'-1'});c.appendChild(tit);
    var corpo=h('div','jr-corpo');
    if(p===0){
      var intro=h('div','jr-fala');intro.appendChild(h('img','jr-ovelha-fala',null,{src:'ovelha.png',alt:'',width:'486',height:'640'}));intro.appendChild(h('p',null,l.intro));corpo.appendChild(intro);
      add(corpo,h('h4',null,'Objetivo de aprendizagem'),h('p',null,l.objetivo));
      var m=h('p','jr-nota','Neste estudo: 3 passagens, uma atividade e um resumo.');corpo.appendChild(m);
    }else if(p===1){
      corpo.appendChild(h('p','jr-nota','Leia o trecho bíblico diretamente aqui. Os textos são carregados da Bíblia Portuguesa Mundial (BPM), tradução em revisão e em domínio público conforme informado pelo eBible.org.'));
      l.versiculos.forEach(function(vv,i){
        var d=h('section','jr-verso');d.appendChild(h('h4',null,(i+1)+'. '+vv.ref));
        var leitura=h('div','jr-texto-biblico',null,{'aria-live':'polite'});
        leitura.appendChild(h('p','jr-sem-texto','Buscando o trecho na Bíblia da Ovelia…'));
        d.appendChild(leitura);
        if(window.OVELIA_BIBLIA&&typeof window.OVELIA_BIBLIA.textoReferencia==='function'){
          (function(ref,alvo){window.OVELIA_BIBLIA.textoReferencia(ref).then(function(resultado){
            alvo.textContent='';
            resultado.versiculos.forEach(function(v){var par=h('p','jr-versiculo-texto');par.appendChild(h('sup','jr-num-verso',String(v.numero)+' '));par.appendChild(document.createTextNode(v.texto));alvo.appendChild(par)});
            alvo.appendChild(h('p','pd-credito','Bíblia Portuguesa Mundial (BPM) · domínio público informado pelo eBible.org · tradução em revisão.'));
          }).catch(function(){alvo.textContent='';alvo.appendChild(h('p','jr-sem-texto','Este trecho ainda não carregou. A Bíblia integrada depende da primeira sincronização dos arquivos bíblicos no repositório. Tente novamente quando a atualização terminar.'));var ir=btn('Abrir leitor da Bíblia','g',function(){location.hash='#biblia'});alvo.appendChild(ir)})})(vv.ref,leitura);
        } else {leitura.textContent='O leitor bíblico ainda está inicializando. Recarregue a página e tente novamente.';}
        d.appendChild(h('p',null,vv.explicacao));corpo.appendChild(d);
      });
    }else if(p===2){
      add(corpo,h('h4',null,'O que as três passagens ensinam juntas'),h('p',null,l.conjunto),h('h4',null,'Contexto bíblico e católico'),h('p',null,l.contexto));
    }else if(p===3){
      corpo.appendChild(h('h4',null,'Como viver isso hoje'));
      var ul=h('ul','jr-aplic');l.aplicacao.forEach(function(x){var li=h('li');li.appendChild(h('strong',null,x.onde+': '));li.appendChild(document.createTextNode(x.texto));ul.appendChild(li)});corpo.appendChild(ul);
      add(corpo,h('h4',null,'Para refletir'),h('p','jr-reflexao',l.reflexao),h('p','jr-nota','A reflexão é pessoal: não é preciso responder por escrito e nada do que você pensa é guardado.'));
    }else if(p===4){
      corpo.appendChild(h('p','jr-nota','Critério para concluir: '+l.criterio));
      l.atividade.forEach(function(q,i){corpo.appendChild(questao(q,i))});
      var st=h('p','jr-ativ-status',atividadeCompleta()?'Atividade concluída! Toque em Continuar.':'Responda corretamente a todas as perguntas para continuar.',{role:'status','aria-live':'polite',id:'jrAtivStatus'});corpo.appendChild(st);
    }else{
      var r=a.resultado;
      if(r){
        corpo.appendChild(h('p','jr-parabens',r.revisao?'Revisão concluída!':r.primeira?'Estudo concluído! 🎉':'Atividade concluída!'));
        corpo.appendChild(h('p',null,r.xpGanho>0?'Você ganhou '+r.xpGanho+' XP'+(r.bonus?' (incluindo '+R.XP_BONUS+' de bônus por acertar de primeira)':'')+'.':'Esta lição já tinha dado todos os pontos possíveis, então não há XP novo. Continue revisando quando quiser!'));
        if(r.subiuNivel)corpo.appendChild(h('p','jr-parabens','Você subiu para o nível '+r.nivel+'!'));
        r.novasConquistas.forEach(function(id){var q=R.conquistas.filter(function(x){return x.id===id})[0];if(q)corpo.appendChild(h('p','jr-conq-nova','🏅 Conquista: '+q.titulo))});
        if(!r.salvo)corpo.appendChild(h('p','jr-local-erro','Este navegador não permitiu salvar o progresso.'));
      }
      corpo.appendChild(h('h4',null,'Resumo'));var ul2=h('ul');l.resumo.forEach(function(x){ul2.appendChild(h('li',null,x))});corpo.appendChild(ul2);
      var prox=P.proxima();
      corpo.appendChild(h('p','jr-prox',prox?'Próximo estudo: '+prox.id+'. '+prox.curto+'.':'Você concluiu todos os estudos disponíveis até agora.'));
    }
    c.appendChild(corpo);
    var nav=h('div','jr-nav');
    if(p>0&&p<5)nav.appendChild(btn('Voltar','g',function(){a.passo--;desenharPasso()}));
    if(p<4)nav.appendChild(btn('Continuar',null,function(){a.passo++;desenharPasso()}));
    if(p===4){var cont=btn('Continuar',null,function(){
      if(!atividadeCompleta())return;
      /* Só aqui a conclusão é registrada, e apenas se a atividade foi cumprida. */
      var perfeita=!a.tentouErrar;a.resultado=P.concluir(l.id,perfeita);
      if(!a.resultado.ok){falar('Não foi possível registrar: este estudo está bloqueado.');return}
      a.passo=5;desenharPasso();
    },{id:'jrContinuar'});if(!atividadeCompleta()){cont.disabled=true}nav.appendChild(cont)}
    if(p===5){
      var prox2=P.proxima();
      if(prox2&&prox2.id!==l.id&&P.desbloqueada(prox2.id))nav.appendChild(btn('Próximo estudo',null,function(){abrir(prox2.id)}));
      nav.appendChild(btn('Voltar à trilha',prox2&&prox2.id!==l.id?'g':'',fechar));
    }
    c.appendChild(nav);licaoBox.appendChild(c);
    tit.focus({preventScroll:true});window.scrollTo(0,0);falar('Passo '+(p+1)+' de 6: '+NOMES[p]);
  }
  function questao(q,i){
    var a=atual,box=h('section','jr-q'),fb=h('p','jr-fb',null,{role:'status','aria-live':'polite'});
    box.appendChild(h('h4',null,(i+1)+'. '+q.enunciado));
    function feito(){return !!a.acertos[i]}
    function marcarCerto(){a.acertos[i]=true;fb.className='jr-fb is-certo';fb.textContent='✔ '+q.certo;atualizarContinuar()}
    function marcarErro(){a.tentouErrar=true;fb.className='jr-fb is-errado';fb.textContent='Ainda não. '+q.errado}
    if(q.tipo==='escolha'){
      var ops=h('div','jr-ops',null,{role:'group','aria-label':q.enunciado});
      q.opcoes.forEach(function(o,k){
        var b=btn(o,'g jr-op',null);
        if(feito()){b.disabled=true;if(k===q.correta)b.classList.add('is-certa')}
        b.addEventListener('click',function(){
          if(feito())return;
          if(k===q.correta){marcarCerto();Array.prototype.forEach.call(ops.children,function(x,j){x.disabled=true;if(j===q.correta)x.classList.add('is-certa')})}
          else{b.classList.add('is-errada');b.disabled=true;marcarErro()}
        });ops.appendChild(b);
      });box.appendChild(ops);
    }else{
      var sels=[],grade=h('div','jr-assoc');
      q.itens.forEach(function(it,k){
        var linha=h('div','jr-assoc-linha'),id='jrA'+i+'_'+k;linha.appendChild(h('label',null,it.situacao,{'for':id}));
        var s=h('select',null,null,{id:id});s.appendChild(h('option',null,'Escolha…',{value:''}));q.opcoes.forEach(function(o,j){s.appendChild(h('option',null,o,{value:String(j)}))});
        if(feito()){s.value=String(it.resposta);s.disabled=true}
        sels.push(s);linha.appendChild(s);grade.appendChild(linha);
      });box.appendChild(grade);
      var ver=btn('Verificar respostas',null,function(){
        if(feito())return;
        if(sels.some(function(s){return s.value===''})){fb.className='jr-fb is-errado';fb.textContent='Escolha uma opção em todas as linhas antes de verificar.';return}
        var tudo=true;sels.forEach(function(s,k){var ok=+s.value===q.itens[k].resposta;s.classList.toggle('is-errada',!ok);if(!ok)tudo=false});
        if(tudo){sels.forEach(function(s){s.disabled=true;s.classList.remove('is-errada')});ver.disabled=true;marcarCerto()}else marcarErro();
      });if(feito())ver.disabled=true;box.appendChild(ver);
    }
    if(feito()){fb.className='jr-fb is-certo';fb.textContent='✔ '+q.certo}
    box.appendChild(fb);return box;
  }
  function atualizarContinuar(){
    var ok=atividadeCompleta(),b=document.getElementById('jrContinuar'),s=document.getElementById('jrAtivStatus');
    if(b)b.disabled=!ok;if(s)s.textContent=ok?'Atividade concluída! Toque em Continuar.':'Responda corretamente a todas as perguntas para continuar.';
  }

  desenhar();
  window.OveliaJornada={abrir:abrir,fechar:fechar,desenhar:desenhar};
  window.addEventListener('hashchange',function(){if(location.hash==='#estudos'&&!licaoBox.hidden){/* mantém a lição aberta */}});
})();
