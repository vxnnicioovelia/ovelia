/* Ovelia — Jornada bíblica: DADOS DA TRILHA (unidades e índice de lições).
   Só as lições que já existem aparecem como nós. As demais unidades aparecem como "em preparação".
   Cada lição completa fica em estudos/dados/licoes-AAA-BBB.js (lotes de 10), carregado só quando a lição é aberta. */
(function(){
  var E=window.OveliaEstudos=window.OveliaEstudos||{};
  E.trilha={
    planejadas:100,
    unidades:[
      {n:1,titulo:'Fundamentos da Bíblia',de:1,ate:7},
      {n:2,titulo:'Conhecendo a história da salvação',de:8,ate:13},
      {n:3,titulo:'Jesus Cristo e o Evangelho',de:4,ate:15}
    ],
    /* Os IDs e o progresso das dez primeiras lições permanecem inalterados. */
    licoes:[
      {id:1,unidade:1,curto:'O que é a Bíblia'},
      {id:2,unidade:1,curto:'Antigo e Novo Testamento'},
      {id:3,unidade:1,curto:'Livros, capítulos e versículos'},
      {id:4,unidade:3,curto:'Os Evangelhos'},
      {id:5,unidade:1,curto:'Salmos, cartas e outros gêneros'},
      {id:6,unidade:1,curto:'Como encontrar uma passagem bíblica'},
      {id:7,unidade:1,curto:'Ler a Bíblia com atenção ao contexto'},
      {id:8,unidade:2,curto:'A Palavra e as escolhas do dia a dia'},
      {id:9,unidade:3,curto:'Os sacramentos na vida da Igreja'},
      {id:10,unidade:3,curto:'Batismo e Eucaristia: caminhar com Cristo'},
      {id:11,unidade:2,curto:'A criação e a dignidade humana'},
      {id:12,unidade:2,curto:'Alianças e patriarcas: uma história de promessa'},
      {id:13,unidade:2,curto:'Êxodo e profetas: esperança e preparação'},
      {id:14,unidade:3,curto:'Jesus anuncia o Reino de Deus'},
      {id:15,unidade:3,curto:'Páscoa de Jesus e caminho do discípulo'}
    ]
  };
})();
