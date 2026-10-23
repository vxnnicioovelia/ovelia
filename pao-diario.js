/* Pão Diário: conteúdo original local, sem texto bíblico integral. */
(function(){'use strict';
var $=function(id){return document.getElementById(id)}, data=window.OVELIA_PAO_DIARIO, section=$('paoDiario'),homeLink=$('homePaoDiario'),current=null;
function profile(){try{return localStorage.getItem('ovelia-perfil')||'adult'}catch(e){return'adult'}}
function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function niceDate(iso){var p=iso.split('-');return p[2]+'/'+p[1]+'/'+p[0]}
function render(){if(!section||!data||!Array.isArray(data.meditacoes))return;var iso=today();current=data.meditacoes.filter(function(x){return x[0]===iso})[0]||null;
 if(homeLink)homeLink.hidden=false;
 var title=$('paoTitulo'),date=$('paoData'),body=$('paoConteudo'),status=$('paoStatus');
 if(!current){title.textContent='Uma pausa para o coração';date.textContent='Tema geral · '+niceDate(iso);body.innerHTML='<p>Hoje não há uma meditação específica cadastrada para esta data. Em vez de mostrar outro dia como se fosse hoje, deixamos uma proposta geral: faça uma pausa, reconheça uma coisa pela qual agradecer e escolha um gesto concreto de cuidado.</p><p><strong>Pergunta:</strong> Qual atitude pode aproximar minhas escolhas do bem?</p><p><strong>Prática:</strong> Reserve cinco minutos de silêncio e faça hoje um gesto simples de serviço.</p><p class="muted-note">Tema geral, não uma meditação datada.</p>';status.textContent='Tema geral para hoje.';return;}
 var simple=profile()==='senior'||profile()==='kids';title.textContent=current[1];date.textContent=niceDate(current[0]);body.innerHTML='<p>'+esc(current[2])+'</p>'+(simple?'<details><summary>Pergunta e prática do dia</summary><p><strong>Pergunta:</strong> '+esc(current[3])+'</p><p><strong>Prática:</strong> '+esc(current[4])+'</p></details>':'<div class="pao-reflexao"><h3>Pergunta para refletir</h3><p>'+esc(current[3])+'</p><h3>Prática do dia</h3><p>'+esc(current[4])+'</p></div>')+'<p class="pao-referencia"><strong>Referência bíblica:</strong> <a href="#biblia" id="paoRefLink">'+esc(current[5])+'</a><small> A referência abre o leitor; o texto integral depende de uma tradução disponível.</small></p>';
 var ref=$('paoRefLink');if(ref)ref.addEventListener('click',function(){try{sessionStorage.setItem('ovelia-biblia-passagem-pendente',JSON.stringify({referencia:current[5],origem:'pao-diario'}))}catch(e){}});
 status.textContent='Meditação original da Ovelia para '+niceDate(current[0])+'.';
}
function favorite(){var b=$('paoFavoritar');if(!b)return;b.addEventListener('click',function(){if(!current){b.textContent='Não há meditação datada para guardar hoje';return;}var api=window.OVELIA_FAVORITOS;if(!api||!api.adicionar){b.textContent='Favoritos indisponíveis neste momento';return;}var ok=api.adicionar({tipo:'pao-diario',titulo:current[1],referencia:current[5],nota:current[2],href:'#paoDiario',infantil:profile()==='kids'});b.textContent=ok?'✓ Guardado nos favoritos':'Esta meditação já está nos favoritos ou não pode ser guardada neste perfil';});}
render();favorite();window.addEventListener('hashchange',function(){if(location.hash==='#paoDiario')render()});window.addEventListener('focus',render);document.addEventListener('visibilitychange',function(){if(!document.hidden)render()});
})();
