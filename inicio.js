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
      box.appendChild(el('p','pd-aviso','O texto desta passagem aparecerá aqui quando houver uma tradução com uso autorizado. Por enquanto, leia-a na sua Bíblia.'));
    }
    var r=el('div','pd-reflexao');r.appendChild(el('span','tag pd','Reflexão da Ovelia · conteúdo original'));r.appendChild(el('p',null,v.reflexao));box.appendChild(r);
  }

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
    var chave=iso(d);var box=$('palavraDiaConteudo');
    if(!box||box.getAttribute('data-data')!==chave)renderPalavra(d);
  }

  render();
  /* Atualiza a saudação e a data sem precisar recarregar a página. */
  setInterval(function(){render()},60000);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)render()});
  window.OveliaInicio={render:render,periodo:periodo,indiceDoDia:indiceDoDia};
})();
