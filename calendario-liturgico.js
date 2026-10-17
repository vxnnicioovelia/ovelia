/* Calendário mensal Ovelia. Reutiliza o seletor de data e os eventos existentes em app.js. */
(function(){
 'use strict';
 var input=document.getElementById('litDataEscolhida');
 var sec=document.getElementById('liturgia');
 if(!input||!sec||document.getElementById('calMensalOvelia'))return;
 var meses=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
 var dias=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
 function parseISO(s){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;var d=new Date(+m[1],+m[2]-1,+m[3],12);return d.getFullYear()===+m[1]&&d.getMonth()===+m[2]-1&&d.getDate()===+m[3]?d:null}
 function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
 function hojeLocal(){var p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(p);if(m)return m[1]+'-'+m[2]+'-'+m[3];var f=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());var o={};f.forEach(function(x){o[x.type]=x.value});return o.year+'-'+o.month+'-'+o.day}
 var selecionada=parseISO(input.value)||parseISO(hojeLocal())||new Date();var ano=selecionada.getFullYear(),mes=selecionada.getMonth();
 var card=document.createElement('section');card.className='cal-mensal';card.id='calMensalOvelia';card.setAttribute('aria-label','Calendário mensal litúrgico');
 card.innerHTML='<div class="cal-mensal-topo"><div><div class="cal-mensal-titulo" id="calMensalTitulo">Calendário litúrgico</div><div class="cal-mensal-legenda">Escolha um dia para consultar a liturgia disponível.</div></div><div class="cal-mensal-nav"><button type="button" class="btn g" id="calMesAnterior" aria-label="Mês anterior">←</button><select id="calMesSelect" aria-label="Mês"></select><select id="calAnoSelect" aria-label="Ano"></select><button type="button" class="btn g" id="calMesProximo" aria-label="Próximo mês">→</button><button type="button" class="btn g" id="calIrHoje">Hoje</button></div></div><div class="cal-mensal-grade" id="calMensalGrade" role="group" aria-label="Dias do mês"></div><p class="cal-mensal-legenda" id="calMensalAjuda" aria-live="polite">O destaque dourado indica hoje; o verde indica a data selecionada.</p>';
 var controles=input.closest('.calendario-controles')||input.parentElement; if(controles&&controles.parentNode)controles.parentNode.insertBefore(card,controles.nextSibling);else sec.insertBefore(card,sec.firstChild.nextSibling);
 var mesSel=card.querySelector('#calMesSelect'),anoSel=card.querySelector('#calAnoSelect'),grade=card.querySelector('#calMensalGrade'),titulo=card.querySelector('#calMensalTitulo');
 meses.forEach(function(m,i){var o=document.createElement('option');o.value=i;o.textContent=m.charAt(0).toUpperCase()+m.slice(1);mesSel.appendChild(o)});
 for(var y=1900;y<=2100;y++){var op=document.createElement('option');op.value=y;op.textContent=y;anoSel.appendChild(op)}
 function render(){mesSel.value=String(mes);anoSel.value=String(ano);titulo.textContent=meses[mes].charAt(0).toUpperCase()+meses[mes].slice(1)+' de '+ano;grade.innerHTML='';dias.forEach(function(d){var el=document.createElement('div');el.className='cal-mensal-dia-semana';el.textContent=d;el.setAttribute('aria-hidden','true');grade.appendChild(el)});
  var primeiro=new Date(ano,mes,1,12),offset=(primeiro.getDay()+6)%7,total=new Date(ano,mes+1,0,12).getDate();
  for(var z=0;z<offset;z++){var vazio=document.createElement('span');vazio.className='cal-mensal-dia vazio';vazio.setAttribute('aria-hidden','true');grade.appendChild(vazio)}
  var hoje=hojeLocal();for(var dia=1;dia<=total;dia++){var data=iso(new Date(ano,mes,dia,12)),b=document.createElement('button');b.type='button';b.className='cal-mensal-dia';b.textContent=dia;b.dataset.date=data;b.setAttribute('aria-label',dia+' de '+meses[mes]+' de '+ano);if(data===hoje)b.classList.add('hoje');if(data===input.value)b.classList.add('selecionado');if(data===input.value)b.setAttribute('aria-pressed','true');else b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){selecionar(this.dataset.date)});grade.appendChild(b)}
 }
 function selecionar(data){var d=parseISO(data);if(!d)return;ano=d.getFullYear();mes=d.getMonth();input.value=data;selecionada=d;render();input.dispatchEvent(new Event('change',{bubbles:true}));var a=document.getElementById('calMensalAjuda');if(a)a.textContent='Data selecionada: '+d.toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo',day:'2-digit',month:'long',year:'numeric'})+'. A liturgia será carregada na área acima.'}
 card.querySelector('#calMesAnterior').addEventListener('click',function(){if(mes===0){if(ano<=1900)return;ano--;mes=11}else mes--;render()});
 card.querySelector('#calMesProximo').addEventListener('click',function(){if(mes===11){if(ano>=2100)return;ano++;mes=0}else mes++;render()});
 mesSel.addEventListener('change',function(){mes=+mesSel.value;render()});anoSel.addEventListener('change',function(){ano=+anoSel.value;render()});
 card.querySelector('#calIrHoje').addEventListener('click',function(){selecionar(hojeLocal())});
 input.addEventListener('change',function(){var d=parseISO(input.value);if(!d)return;ano=d.getFullYear();mes=d.getMonth();render()});
 render();
 window.OveliaCalendarioLiturgico={diasNoMes:function(y,m){return new Date(y,m+1,0).getDate()},parseISO:parseISO,iso:iso,hojeSaoPaulo:hojeLocal};
})();
