/* Ovelia — Jornada bíblica: ESTADO DE PROGRESSO (armazenamento local tolerante a erros).
   Nada sai do aparelho. Sem conta, sem servidor. Se o armazenamento falhar, o app continua em memória. */
(function(){
  var E=window.OveliaEstudos,R=E.regras,T=E.trilha,KEY='ovelia-jornada-v1';
  var salvoOk=true,estado=carregar();
  function vazio(){return{v:1,licoes:{},dias:{},meta:R.META_PADRAO,revisao:{}}}
  function pad(n){return n<10?'0'+n:''+n}
  function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
  function hoje(){return iso(new Date())}
  function indice(id){for(var i=0;i<T.licoes.length;i++)if(T.licoes[i].id===id)return i;return -1}
  /* Valida o que veio do armazenamento: só lições existentes e sempre em sequência (sem pular etapas). */
  function sanear(raw){
    var s=vazio();if(!raw||typeof raw!=='object')return s;
    if(raw.meta===0||raw.meta===1||raw.meta===2)s.meta=raw.meta;
    var okSeq=true;
    T.licoes.forEach(function(l){
      var r=raw.licoes&&raw.licoes[l.id];
      if(!okSeq||!r||typeof r!=='object'||!/^\d{4}-\d{2}-\d{2}$/.test(String(r.data||''))){okSeq=false;return}
      s.licoes[l.id]={data:r.data,bonus:r.bonus===true,rev:r.rev===true};
    });
    if(raw.dias&&typeof raw.dias==='object')Object.keys(raw.dias).forEach(function(k){
      var n=raw.dias[k];if(/^\d{4}-\d{2}-\d{2}$/.test(k)&&typeof n==='number'&&n>0&&n<1000)s.dias[k]=Math.floor(n);
    });
    if(raw.revisao&&typeof raw.revisao==='object')Object.keys(raw.revisao).forEach(function(k){var q=raw.revisao[k];if(q&&Number.isInteger(+q.licao)&&indice(+q.licao)>=0&&Number.isInteger(+q.questao)){s.revisao[k]={licao:+q.licao,questao:+q.questao,enunciado:String(q.enunciado||'Pergunta para revisar').slice(0,240),tentativas:Math.max(1,+q.tentativas||1),proxima:String(q.proxima||hoje())}}});
    return s;
  }
  function carregar(){
    try{var t=window.localStorage.getItem(KEY);return sanear(t?JSON.parse(t):null)}
    catch(e){return vazio()}
  }
  function salvar(){
    try{window.localStorage.setItem(KEY,JSON.stringify(estado));salvoOk=true}catch(e){salvoOk=false}
    return salvoOk;
  }
  /* Teste de escrita no início: avisa a interface se o aparelho não permite salvar. */
  try{window.localStorage.setItem(KEY+'-teste','1');window.localStorage.removeItem(KEY+'-teste')}catch(e){salvoOk=false}

  function concluida(id){return !!estado.licoes[id]}
  function desbloqueada(id){
    var i=indice(id);if(i<0)return false;
    return i===0||concluida(T.licoes[i-1].id);
  }
  function estado_(id){return concluida(id)?'concluida':desbloqueada(id)?'disponivel':'bloqueada'}
  function xp(){
    var t=0;Object.keys(estado.licoes).forEach(function(k){var l=estado.licoes[k];t+=R.XP_LICAO+(l.bonus?R.XP_BONUS:0)+(l.rev?R.XP_REVISAO:0)});return t;
  }
  function nivelDe(x){return Math.floor(x/R.XP_POR_NIVEL)+1}
  function proxima(){for(var i=0;i<T.licoes.length;i++)if(!concluida(T.licoes[i].id))return T.licoes[i];return null}
  function marcarDia(){var h=hoje();estado.dias[h]=(estado.dias[h]||0)+1}
  /* Semana de domingo a sábado, pela data local do aparelho. */
  function semana(ref){
    var d=ref||new Date(),base=new Date(d.getFullYear(),d.getMonth(),d.getDate()-d.getDay()),out=[];
    for(var i=0;i<7;i++){var x=new Date(base.getFullYear(),base.getMonth(),base.getDate()+i);var k=iso(x);out.push({iso:k,dia:x.getDate(),dow:x.getDay(),estudou:(estado.dias[k]||0)>0,hoje:k===iso(d),n:estado.dias[k]||0})}
    return out;
  }
  function melhorSemana(){
    var best=0,vistos={};
    Object.keys(estado.dias).forEach(function(k){var p=k.split('-'),w=semana(new Date(+p[0],+p[1]-1,+p[2]));var id=w[0].iso;if(vistos[id])return;vistos[id]=1;var c=w.filter(function(x){return x.estudou}).length;if(c>best)best=c});
    return best;
  }
  function unidadesCompletas(){
    var n=0;T.unidades.forEach(function(u){var ls=T.licoes.filter(function(l){return l.unidade===u.n});if(ls.length&&ls.every(function(l){return concluida(l.id)}))n++;});return n;
  }
  function contexto(){
    var ls=Object.keys(estado.licoes).map(function(k){return estado.licoes[k]}),x=xp();
    return{concluidas:ls.length,bonus:ls.filter(function(l){return l.bonus}).length,revisoes:ls.filter(function(l){return l.rev}).length,melhorSemana:melhorSemana(),unidadesCompletas:unidadesCompletas(),nivel:nivelDe(x)};
  }
  function conquistasGanhas(){var c=contexto();return R.conquistas.filter(function(q){return q.ok(c)}).map(function(q){return q.id})}

  /* Única porta de entrada para registrar conclusão. Recusa lições bloqueadas e inexistentes. */
  function concluir(id,perfeita){
    id=+id;
    if(indice(id)<0)return{ok:false,motivo:'inexistente'};
    if(!desbloqueada(id))return{ok:false,motivo:'bloqueada'};
    var antesXp=xp(),antesN=nivelDe(antesXp),antesC=conquistasGanhas(),r={ok:true,primeira:false,revisao:false,xpGanho:0};
    if(!concluida(id)){
      estado.licoes[id]={data:hoje(),bonus:perfeita===true,rev:false};r.primeira=true;r.bonus=perfeita===true;
    }else if(!estado.licoes[id].rev){
      estado.licoes[id].rev=true;r.revisao=true;
    }
    /* Dia de estudo: conta sempre que uma atividade válida é concluída (lição nova ou revisão). */
    marcarDia();
    var dep=xp();r.xpGanho=dep-antesXp;r.xpTotal=dep;r.nivel=nivelDe(dep);r.subiuNivel=r.nivel>antesN;
    r.novasConquistas=conquistasGanhas().filter(function(c){return antesC.indexOf(c)<0});
    r.salvo=salvar();return r;
  }
  function setMeta(v){if(v===0||v===1||v===2){estado.meta=v;salvar()}}
  function registrarErro(id,questao,enunciado){var k=String(+id)+':'+String(+questao),q=estado.revisao[k]||{licao:+id,questao:+questao,enunciado:String(enunciado||'Pergunta para revisar').slice(0,240),tentativas:0};q.tentativas++;q.proxima=iso(new Date(Date.now()+86400000));estado.revisao[k]=q;salvar();return q}
  function resolverErro(id,questao){var k=String(+id)+':'+String(+questao);if(estado.revisao[k]){delete estado.revisao[k];salvar();return true}return false}
  function revisoes(){var h=hoje();return Object.keys(estado.revisao).map(function(k){var q=estado.revisao[k];q.chave=k;q.pronta=q.proxima<=h;return q}).sort(function(a,b){return a.proxima.localeCompare(b.proxima)})}
  function reiniciar(){estado=vazio();salvar()}
  E.progresso={
    concluida:concluida,desbloqueada:desbloqueada,estadoDe:estado_,xp:xp,nivelDe:nivelDe,proxima:proxima,semana:semana,
    concluir:concluir,meta:function(){return estado.meta},setMeta:setMeta,atividadesHoje:function(){return estado.dias[hoje()]||0},
    contexto:contexto,conquistasGanhas:conquistasGanhas,salvoLocalmente:function(){return salvoOk},reiniciar:reiniciar,registrarErro:registrarErro,resolverErro:resolverErro,revisoes:revisoes,
    total:function(){return T.licoes.length},feitas:function(){return Object.keys(estado.licoes).length},
    revisada:function(id){return !!(estado.licoes[id]&&estado.licoes[id].rev)},iso:iso
  };
})();
