/* Ovelia — Jornada bíblica: REGRAS DE PONTUAÇÃO (separadas da interface).
   - Primeira conclusão válida de uma lição: XP_LICAO.
   - Bônus se todas as respostas da atividade estiverem certas na primeira tentativa: XP_BONUS.
   - Revisão: XP_REVISAO, concedido uma única vez por lição. Revisões seguintes não dão pontos.
   - Cada nível exige XP_POR_NIVEL pontos. Não há moedas, energia, anúncios nem bloqueio comercial. */
(function(){
  var E=window.OveliaEstudos=window.OveliaEstudos||{};
  E.regras={
    XP_LICAO:20,XP_BONUS:5,XP_REVISAO:3,XP_POR_NIVEL:100,
    METAS:[{v:0,t:'Sem meta'},{v:1,t:'1 atividade por dia'},{v:2,t:'2 atividades por dia'}],META_PADRAO:1,
    /* ctx: {concluidas, bonus, revisoes, diasNaSemana, unidadesCompletas, nivel} */
    conquistas:[
      {id:'primeiro',titulo:'Primeiro passo',desc:'Concluir a primeira lição.',ok:function(c){return c.concluidas>=1}},
      {id:'cinco',titulo:'Caminhante',desc:'Concluir cinco lições.',ok:function(c){return c.concluidas>=5}},
      {id:'dez',titulo:'Peregrino',desc:'Concluir dez lições.',ok:function(c){return c.concluidas>=10}},
      {id:'perfeita',titulo:'Acerto de primeira',desc:'Acertar toda a atividade de uma lição na primeira tentativa.',ok:function(c){return c.bonus>=1}},
      {id:'revisor',titulo:'Revisor atento',desc:'Revisar uma lição já concluída.',ok:function(c){return c.revisoes>=1}},
      {id:'semana',titulo:'Semana constante',desc:'Estudar em 3 dias diferentes na mesma semana.',ok:function(c){return c.melhorSemana>=3}},
      {id:'unidade',titulo:'Unidade concluída',desc:'Concluir todas as lições de uma unidade.',ok:function(c){return c.unidadesCompletas>=1}},
      {id:'nivel2',titulo:'Nível 2',desc:'Chegar ao nível 2.',ok:function(c){return c.nivel>=2}}
    ]
  };
})();
