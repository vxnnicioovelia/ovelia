/* Ovelia — favoritos locais e cópia de segurança. Nenhum dado é enviado à rede. */
(function(){
'use strict';
var FAV_KEY='ovelia-favoritos-v1', HISTORY_KEY='ovelia-historico-leitura-v1', pendingImport=null;
var $=function(id){return document.getElementById(id)};
function profile(){try{return localStorage.getItem('ovelia-perfil')||'adult'}catch(e){return'adult'}}
function parse(key,fallback){try{var x=JSON.parse(localStorage.getItem(key)||'');return x==null?fallback:x}catch(e){return fallback}}
function save(key,val){try{localStorage.setItem(key,JSON.stringify(val));return true}catch(e){return false}}
function allFav(){var a=parse(FAV_KEY,[]);return Array.isArray(a)?a:[]}
function kidOnly(){return profile()==='kids'}
function visible(item){return !kidOnly()||item.infantil===true||item.tipo==='historia'&&item.infantil===true||item.tipo==='oracao'&&item.infantil===true}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function add(item){
  if(!item||!item.titulo)return false;
  var a=allFav(),key=item.id||[item.tipo,item.titulo,item.referencia||''].join('|');
  if(a.some(function(x){return x.id===key}))return false;
  item.id=key;item.criado=item.criado||new Date().toISOString();item.perfil=profile();
  if(kidOnly()&&!item.infantil)return false;
  a.unshift(item);return save(FAV_KEY,a);
}
function remove(id){return save(FAV_KEY,allFav().filter(function(x){return x.id!==id}))}
function record(item){
 var a=parse(HISTORY_KEY,[]);if(!Array.isArray(a))a=[];
 var id=item.id||item.titulo;
 a=a.filter(function(x){return x.id!==id});
 a.unshift({id:id,titulo:item.titulo,referencia:item.referencia||'',tipo:item.tipo||'leitura',data:new Date().toISOString(),href:item.href||location.hash||'#home'});
 save(HISTORY_KEY,a.slice(0,30));
}
window.OVELIA_FAVORITOS={
 adicionar:function(item){return add(item)},remover:remove,listar:function(){return allFav().filter(visible)},
 registrarLeitura:record, listarHistorico:function(){return parse(HISTORY_KEY,[]).filter(function(x){return !kidOnly()||x.tipo==='historia'||x.infantil===true}).slice(0,30)}
};
function labelType(t){return({biblia:'Versículo',oracao:'Oração',licao:'Lição',historia:'História infantil',liturgia:'Liturgia',leitura:'Leitura','pao-diario':'Pão Diário'})[t]||'Conteúdo'}
function render(){
 var list=$('favoritosLista'),hist=$('historicoLeituraLista'),filter=$('favoritosFiltro');if(!list||!hist)return;
 var type=filter?filter.value:'todos',a=allFav().filter(visible).filter(function(x){return type==='todos'||x.tipo===type});
 list.innerHTML=a.length?a.map(function(x){return '<article class="favorito-item"><div><span class="tag pd">'+esc(labelType(x.tipo))+'</span><strong>'+esc(x.titulo)+'</strong>'+(x.referencia?'<p>'+esc(x.referencia)+'</p>':'')+(x.nota?'<p>'+esc(x.nota)+'</p>':'')+'<small>Guardado neste aparelho</small></div><div class="favorito-acoes">'+(x.href?'<a class="btn g" href="'+esc(x.href)+'">Abrir</a>':'')+'<button class="btn g" type="button" data-fav-remover="'+esc(x.id)+'">Remover</button></div></article>'}).join(''):'<p>Você ainda não guardou itens deste tipo.</p>';
 var h=window.OVELIA_FAVORITOS.listarHistorico();
 try{for(var si=0;si<localStorage.length;si++){var sk=localStorage.key(si);if(sk&&sk.indexOf('ovelia-biblia-posicao-v1-')===0){var pos=JSON.parse(localStorage.getItem(sk)||'null');if(pos&&pos.code&&pos.chapter){var tid=sk.slice('ovelia-biblia-posicao-v1-'.length),id='biblia-pos:'+tid; if(!h.some(function(x){return x.id===id}))h.unshift({id:id,titulo:'Bíblia — '+tid,referencia:pos.code+' '+pos.chapter,href:'#biblia',data:new Date().toISOString(),tipo:'biblia'});}}}}catch(e){}
 hist.innerHTML=h.length?h.map(function(x){return '<article class="favorito-item"><div><strong>'+esc(x.titulo)+'</strong>'+(x.referencia?'<p>'+esc(x.referencia)+'</p>':'')+'<small>'+esc(new Date(x.data).toLocaleString('pt-BR'))+'</small></div><a class="btn g" href="'+esc(x.href||'#home')+'">Retomar</a></article>'}).join(''):'<p>Suas leituras recentes aparecerão aqui.</p>';
}
function currentSection(){
 var id=location.hash.slice(1)||'home',section=$(id);if(!section)return;
 if(['liturgia','estudos','infantil','criatividade','terco'].indexOf(id)<0)return;
 if(kidOnly()&&['liturgia','estudos','terco'].indexOf(id)>=0)return;
 var holder=section.querySelector('h1,h2');if(!holder)return;
 if(section.querySelector('[data-fav-section="'+id+'"]'))return;
 var btn=document.createElement('button');btn.type='button';btn.className='btn g favorito-salvar-secao';btn.dataset.favSection=id;
 btn.textContent='☆ Guardar '+({liturgia:'liturgia do dia',oracoes:'esta oração',estudos:'esta lição',infantil:'esta história',criatividade:'esta atividade',terco:'este roteiro do terço'}[id]||'nos favoritos');
 holder.insertAdjacentElement('afterend',btn);
 btn.addEventListener('click',function(){
  var title=holder.textContent.trim()||id, type=id==='liturgia'?'liturgia':id==='terco'?'oracao':id==='estudos'?'licao':id==='infantil'?'historia':'leitura';
  var ok=add({tipo:type,titulo:title,href:'#'+id,infantil:kidOnly()});
  btn.textContent=ok?'✓ Guardado nos favoritos':'Já está guardado ou não pode ser guardado neste perfil';
  render();
 });
}
function verseButtons(){
 var root=$('bibliaTexto');if(!root||kidOnly())return;
 root.querySelectorAll('.biblia-v[data-versiculo]').forEach(function(span){
  if(span.querySelector('.biblia-favoritar'))return;
  var book=$('bibliaTituloLivro'),chapter=$('bibliaCapitulo'),translation=$('bibliaTraducao');
  var verse=span.getAttribute('data-versiculo'),ref=(book?book.textContent.trim():'Bíblia')+' '+(chapter?chapter.value:'')+':'+verse;
  var b=document.createElement('button');b.type='button';b.className='biblia-favoritar';b.textContent='☆';b.title='Guardar este versículo';b.setAttribute('aria-label','Guardar '+ref);
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var ok=add({tipo:'biblia',titulo:ref,referencia:ref,traducao:translation&&translation.value||'',texto:span.textContent.trim(),href:'#biblia'});b.textContent=ok?'★':'✓';b.title=ok?'Guardado nos favoritos':'Já guardado';render()});
  span.appendChild(b);
 });
}
function backupObject(){
 var keys=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('ovelia-')===0)keys.push(k)}
 keys.sort();var data={};keys.forEach(function(k){try{data[k]=JSON.parse(localStorage.getItem(k))}catch(e){data[k]=localStorage.getItem(k)}});
 return {app:'Ovelia',version:2,createdAt:new Date().toISOString(),keys:data};
}
function downloadBackup(){
 var text=JSON.stringify(backupObject(),null,2),status=$('backupStatus'),area=$('backupTexto'),copy=$('copiarBackupBtn');
 if(area){area.hidden=false;area.value=text} if(copy)copy.hidden=false;
 try{
  var blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='ovel ia-dados.json'.replace(' ','');a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000);
  if(status)status.textContent='Cópia preparada para baixar. Se o navegador não baixar o arquivo, use “Copiar texto da cópia”.';
 }catch(e){if(status)status.textContent='O download não está disponível neste navegador. Copie o texto da cópia abaixo.'}
}
function readImport(file){
 var status=$('backupStatus'),preview=$('importarPrevia'),confirm=$('confirmarImportacaoBtn'),area=$('backupTexto'),copy=$('copiarBackupBtn');
 if(!file)return;
 var reader=new FileReader();
 reader.onload=function(){
  try{
   var raw=JSON.parse(String(reader.result||'')),data=raw.keys||raw.data||raw.dados||raw.storage;
   if(!data&&raw.version===1&&raw.items)data=raw.items;
   if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('Formato de cópia não reconhecido.');
   var safe={};Object.keys(data).forEach(function(k){if(k.indexOf('ovelia-')===0)safe[k]=data[k]});
   if(!Object.keys(safe).length)throw new Error('A cópia não contém chaves Ovelia reconhecidas.');
   pendingImport={version:Number(raw.version||raw.versao||1),data:safe};
   var favCount=Array.isArray(safe[FAV_KEY])?safe[FAV_KEY].length:0;
   var bytes=Object.keys(safe).length;
   if(preview){preview.hidden=false;preview.innerHTML='<p><strong>Prévia da cópia</strong></p><p>Versão: '+esc(pendingImport.version)+' · '+bytes+' grupos de dados · '+favCount+' favoritos.</p><p>Somente chaves <code>ovelia-*</code> serão restauradas. A restauração substituirá valores das mesmas chaves neste aparelho.</p>'}
   if(confirm)confirm.hidden=false;if(status)status.textContent='Arquivo validado. Confira a prévia antes de restaurar.';
  }catch(e){pendingImport=null;if(preview)preview.hidden=true;if(confirm)confirm.hidden=true;if(status)status.textContent='Não foi possível importar: '+e.message}
 };
 reader.onerror=function(){if(status)status.textContent='Não consegui ler o arquivo.'};
 reader.readAsText(file);
}
function confirmImport(){
 if(!pendingImport)return;
 var keys=pendingImport.data,overwrite=Object.keys(keys);
 if(!window.confirm('Restaurar '+overwrite.length+' grupos de dados Ovelia? Os valores atuais dessas mesmas chaves serão substituídos.'))return;
 try{
  overwrite.forEach(function(k){var v=keys[k];localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))});
  var status=$('backupStatus');if(status)status.textContent='Cópia restaurada. Recarregue a página para aplicar todas as preferências.';
  pendingImport=null;$('confirmarImportacaoBtn').hidden=true;render();
 }catch(e){var s=$('backupStatus');if(s)s.textContent='Falha ao restaurar. O armazenamento pode estar cheio ou bloqueado.'}
}

function attachContentButtons(){
 var prayerRoot=$('listaOracoes');
 if(prayerRoot)prayerRoot.querySelectorAll('details[id^="or-"]').forEach(function(d){
  if(d.querySelector('[data-fav-prayer]'))return;
  var summary=d.querySelector('summary');if(!summary)return;
  var b=document.createElement('button');b.type='button';b.className='btn g favorito-salvar-item';b.dataset.favPrayer='1';b.textContent='☆ Guardar oração';
  summary.insertAdjacentElement('afterend',b);
  b.addEventListener('click',function(){var title=summary.textContent.trim(),text=(d.querySelector('.oracao')||{}).textContent||'',isKid=d.closest('.kids-cat')!==null;
   var ok=add({tipo:'oracao',titulo:title,texto:text,href:'#oracoes',infantil:isKid});b.textContent=ok?'✓ Oração guardada':'Já guardada ou indisponível neste perfil';render()});
 });
 var lesson=$('licaoAberta');
 if(lesson&&lesson.textContent.trim()&&!lesson.querySelector('[data-fav-lesson]')){
  var h=lesson.querySelector('h1,h2,h3');
  if(h){var b2=document.createElement('button');b2.type='button';b2.className='btn g favorito-salvar-item';b2.dataset.favLesson='1';b2.textContent='☆ Guardar esta lição';h.insertAdjacentElement('afterend',b2);
   b2.addEventListener('click',function(){var ok=add({tipo:'licao',titulo:h.textContent.trim(),texto:lesson.innerText.slice(0,2000),href:'#estudos'});b2.textContent=ok?'✓ Lição guardada':'Já guardada ou indisponível neste perfil';render()})}
 }
 var kidsRoot=$('infantil');
 if(kidsRoot)kidsRoot.querySelectorAll('.card,article,details').forEach(function(card){
  if(card.querySelector('[data-fav-story]'))return;
  var h=card.querySelector('h1,h2,h3,summary');if(!h||!h.textContent.trim())return;
  var b3=document.createElement('button');b3.type='button';b3.className='btn g favorito-salvar-item';b3.dataset.favStory='1';b3.textContent='☆ Guardar história';
  card.appendChild(b3);
  b3.addEventListener('click',function(){var ok=add({tipo:'historia',titulo:h.textContent.trim(),texto:card.innerText.slice(0,2000),href:'#infantil',infantil:true});b3.textContent=ok?'✓ História guardada':'Já guardada';render()});
 });
}

function init(){
 var filter=$('favoritosFiltro');if(filter)filter.addEventListener('change',render);
 var list=$('favoritosLista');if(list)list.addEventListener('click',function(e){var b=e.target.closest('[data-fav-remover]');if(b){remove(b.getAttribute('data-fav-remover'));render()}});
 var exp=$('exportarDadosBtn');if(exp)exp.addEventListener('click',downloadBackup);
 var imp=$('importarDadosBtn'),file=$('importarDadosArquivo');if(imp&&file)imp.addEventListener('click',function(){file.click()});
 if(file)file.addEventListener('change',function(){readImport(file.files&&file.files[0]);file.value=''});
 var conf=$('confirmarImportacaoBtn');if(conf)conf.addEventListener('click',confirmImport);
 var copy=$('copiarBackupBtn');if(copy)copy.addEventListener('click',function(){var area=$('backupTexto');if(!area)return;area.focus();area.select();try{var ok=document.execCommand('copy');$('backupStatus').textContent=ok?'Texto da cópia copiado.':'Selecione e copie o texto manualmente.'}catch(e){$('backupStatus').textContent='Selecione o texto e copie manualmente.'}});
 document.addEventListener('click',function(e){var link=e.target.closest('a[href^="#"]');if(link){setTimeout(function(){record({id:location.hash,titulo:document.title.replace(' — Ovelia',''),href:location.hash,tipo:location.hash==='#biblia'?'biblia':location.hash==='#estudos'?'licao':'leitura'});render();currentSection();verseButtons();attachContentButtons()},50)}});
 window.addEventListener('hashchange',function(){setTimeout(function(){record({id:location.hash,titulo:document.title.replace(' — Ovelia',''),href:location.hash,tipo:location.hash==='#biblia'?'biblia':location.hash==='#estudos'?'licao':'leitura'});render();currentSection();verseButtons();attachContentButtons()},80)});
 currentSection();verseButtons();attachContentButtons();render();
 if($('bibliaTexto'))new MutationObserver(function(){verseButtons();attachContentButtons()}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
