/* Ovelia — página inicial: saudação por horário, Palavra do dia e Liturgia discreta.
   Os dados ficam em inicio-dados.js. Usa apenas a data e a hora locais do aparelho; nada é sorteado. */
(function(){
  'use strict';
  var D=window.OveliaInicioDados;
  function $(s){return document.getElementById(s)}
  function periodo(h){return h>=5&&h<12?'manha':h>=12&&h<18?'tarde':'noite'}
  var SAUDACAO={manha:'Bom dia!',tarde:'Boa tarde!',noite:'Boa noite!'};
  /* Dia local como número inteiro: o conteúdo só muda quando a data local muda. */
  function indiceDoDia(d){return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000)}
  /* Entre 0h e 4h59 ainda é "noite" do mesmo calendário; o conteúdo diário segue a data civil. */
  function dataLonga(d){
    try{var t=d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});return t.charAt(0).toUpperCase()+t.slice(1)}catch(e){return d.toLocaleDateString()}
  }
  function iso(d){var m=d.getMonth()+1,dia=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(dia<10?'0':'')+dia}
  function setTxt(id,t){var e=$(id);if(e)e.textContent=t}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

  function textoAutorizado(v){return !!(v&&v.texto&&v.traducao&&v.licenca&&v.fonte)}

  function renderPalavra(d){
    var box=$('palavraDiaConteudo');if(!box)return;
    var lista=D&&D.versiculos;box.textContent='';
    if(!lista||!lista.length){
      box.appendChild(el('p','pd-sub','Uma palavra de esperança para acompanhar seu dia.'));
      box.appendChild(el('p','pd-aviso','O conteúdo de hoje não pôde ser carregado. Tente novamente mais tarde.'));return;
    }
    var v=lista[indiceDoDia(d)%lista.length];
    box.setAttribute('data-data',iso(d));box.setAttribute('data-ref',v.ref);
    box.appendChild(el('p','pd-sub','Uma palavra de esperança para acompanhar seu dia'));
    if(textoAutorizado(v)){
      box.appendChild(el('p','pd-ref',v.ref));
      var bq=el('blockquote','pd-texto',v.texto);box.appendChild(bq);
      box.appendChild(el('p','pd-credito',v.traducao+' · '+v.licenca+' · Fonte: '+v.fonte));
    }else{
      var p=el('p','pd-ref');p.appendChild(el('span','pd-rotulo','Passagem para ler hoje: '));p.appendChild(document.createTextNode(v.ref));box.appendChild(p);
      var aviso=el('p','pd-aviso','Carregando a passagem da Bíblia Portuguesa Mundial (BPM)…');box.appendChild(aviso);
      var bib=window.OVELIA_BIBLIA, referencia=v.ref, dataDaPassagem=iso(d);
      if(bib&&typeof bib.textoReferencia==='function'){
        bib.textoReferencia(referencia).then(function(resultado){
          if(!box.isConnected||box.getAttribute('data-data')!==dataDaPassagem||box.getAttribute('data-ref')!==referencia)return;
          aviso.remove();var trecho=el('blockquote','pd-texto');
          resultado.versiculos.forEach(function(vv){trecho.appendChild(document.createTextNode(vv.numero+' '));trecho.appendChild(document.createTextNode(vv.texto+' '));});
          box.insertBefore(trecho,box.querySelector('.pd-reflexao'));
          box.insertBefore(el('p','pd-credito','Bíblia Portuguesa Mundial (BPM) · domínio público declarado pelo eBible.org; tradução em revisão.'),box.querySelector('.pd-reflexao'));
        }).catch(function(){if(box.isConnected&&box.getAttribute('data-data')===dataDaPassagem)aviso.textContent='Não foi possível carregar a passagem agora. Confira a conexão ou abra a referência no leitor bíblico.';});
      }else aviso.textContent='O leitor bíblico ainda está iniciando. Abra a Bíblia para consultar esta referência.';
    }
    var r=el('div','pd-reflexao');r.appendChild(el('span','tag pd','Reflexão da Ovelia · conteúdo original'));r.appendChild(el('p',null,v.reflexao));box.appendChild(r);
    var bib=window.OVELIA_BIBLIA,available=bib&&typeof bib.traducoes==='function'?bib.traducoes().find(function(t){return t.estado==='disponivel'}):null;
    if(available){var ref=resolverReferencia(v.ref);if(ref){var link=el('button','btn g pd-abrir-biblia','Ler passagem na Bíblia');link.type='button';link.addEventListener('click',function(){location.hash='#biblia';setTimeout(function(){window.OVELIA_BIBLIA.abrir(ref.book.code,ref.chapter,available.id,ref.verse)},80)});box.appendChild(link)}}
  }


  function resolverReferencia(ref){
    var bib=window.OVELIA_BIBLIA;if(!bib||!Array.isArray(bib.books))return null;
    var m=/^(.+?)\s+(\d+)(?:\s*[:,]\s*(\d+))?(?:\s*[-–]\s*(\d+))?$/.exec(String(ref||'').trim());
    if(!m)return null;
    var norm=function(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().replace(/^sl$/,'salmos').replace(/^salmo$/,'salmos').replace(/^jo$/,'joao').replace(/^joao$/,'joao').replace(/^mt$/,'mateus').replace(/^lc$/,'lucas').replace(/^mc$/,'marcos').replace(/^1 cor$/,'1 corintios').replace(/^2 cor$/,'2 corintios').replace(/^fil$/,'filipenses').replace(/^ef$/,'efesios').replace(/^is$/,'isaias').replace(/^rom$/,'romanos');};
    var name=norm(m[1]), aliases={'salmos':'salmos','joao':'joao','1 corintios':'1 corintios','2 corintios':'2 corintios','atos':'atos dos apostolos','cantico':'cantico dos canticos','siracida':'eclesiastico (siracida)'};
    name=aliases[name]||name;
    var book=bib.books.find(function(b){return norm(b.name)===name || norm(b.name).replace(' (siracida)','')===name || norm(b.name).replace(' dos apostolos','')===name;});
    if(!book)return null;
    var chapter=+m[2],verse=m[3]?+m[3]:null;if(chapter<1||chapter>book.chapters|| (verse!==null&&verse<1))return null;
    return {book:book,chapter:chapter,verse:verse};
  }
  function renderContinuar(){
    var card=$('homeContinuarCard'),items=$('homeContinuarItens');if(!card||!items)return;
    items.textContent='';var entries=[];
    if(document.body.classList.contains('perfil-kids')){card.hidden=true;return;}
    var bib=window.OVELIA_BIBLIA;
    if(bib&&Array.isArray(bib.books)){
      var ids=Object.keys(localStorageSafe()).filter(function(k){return /^ovelia-biblia-posicao-v1-/.test(k)}).sort();
      var pos=null,tid=null;
      for(var i=ids.length-1;i>=0;i--){try{var v=JSON.parse(localStorageSafe()[ids[i]]);if(v&&typeof v.code==='string'&&Number(v.chapter)>0){pos=v;tid=ids[i].slice('ovelia-biblia-posicao-v1-'.length);break}}catch(e){}}
      if(pos){var b=bib.books.find(function(x){return x.code===pos.code});if(b&&+pos.chapter<=b.chapters)entries.push({kind:'biblia',title:'Continuar a Bíblia',detail:b.name+' '+pos.chapter,action:function(){location.hash='#biblia';setTimeout(function(){if(window.OVELIA_BIBLIA)window.OVELIA_BIBLIA.abrir(pos.code,+pos.chapter,tid)},80)}})}
    }
    var E=window.OveliaEstudos, P=E&&E.progresso;
    if(P){var st=null;try{st=JSON.parse(localStorage.getItem('ovelia-jornada-v1')||'null')}catch(e){}
      var latest=0,latestDate='';if(st&&st.licoes)Object.keys(st.licoes).forEach(function(k){var x=st.licoes[k];if(x&&/^\d{4}-\d{2}-\d{2}$/.test(x.data)&&x.data>=latestDate){latestDate=x.data;latest=+k}});
      var next=P.proxima&&P.proxima();var target=latest|| (next&&next.id);
      if(target)entries.push({kind:'estudos',title:latest?'Retomar meu estudo':'Começar meus estudos',detail:latest?'Lição '+latest:'Próxima lição '+target,action:function(){location.hash='#estudos';setTimeout(function(){if(window.OveliaJornada&&window.OveliaJornada.abrir)window.OveliaJornada.abrir(target)},80)}});
    }
    entries.forEach(function(x){var b=el('button','home-continuar-item');b.type='button';b.appendChild(el('strong',null,x.title));b.appendChild(el('span',null,x.detail));b.appendChild(el('span','home-chevron','›'));b.addEventListener('click',x.action);items.appendChild(b)});
    card.hidden=!entries.length;
  }
  function localStorageSafe(){var o={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);o[k]=localStorage.getItem(k)}}catch(e){}return o}

  function renderKids(d,h){
    var g=periodo(h);
    setTxt('kidsSaudacao',SAUDACAO[g].replace('!','')+', amiguinho! 🐑');
    var k=D&&D.kids&&D.kids.length?D.kids[indiceDoDia(d)%D.kids.length]:null;
    if(k){setTxt('kidsMsgDia',k.msg);setTxt('kidsDesafioDia',k.desafio)}
  }

  function render(agora){
    var d=agora||new Date(),h=d.getHours(),g=periodo(h);
    setTxt('homeSaudacao',SAUDACAO[g]);
    var msgs=D&&D.boasVindas&&D.boasVindas[g];
    if(msgs&&msgs.length)setTxt('homeMsg',msgs[indiceDoDia(d)%msgs.length]);
    setTxt('homeData',dataLonga(d));setTxt('palavraDiaData',dataLonga(d));
    renderKids(d,h);
    renderContinuar();
    var chave=iso(d);var box=$('palavraDiaConteudo');
    if(!box||box.getAttribute('data-data')!==chave)renderPalavra(d);
  }

  render();
  /* Atualiza a saudação e a data sem precisar recarregar a página. */
  setInterval(function(){render()},60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)render()});
  window.OveliaInicio={render:render,periodo:periodo,indiceDoDia:indiceDoDia,renderContinuar:renderContinuar};
  window.addEventListener('storage',renderContinuar);
  window.addEventListener('hashchange',renderContinuar);
  setTimeout(renderContinuar,500);
  setTimeout(function(){renderPalavra(new Date())},900);
})();
