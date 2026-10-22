/* Ovelia — Jornada bíblica: DADOS DA TRILHA (unidades e índice de lições).
   Só as lições que já existem aparecem como nós. As demais unidades aparecem como "em preparação".
   Cada lição completa fica em estudos/dados/licoes-AAA-BBB.js (lotes de 10), carregado só quando a lição é aberta. */
(function(){
  var E=window.OveliaEstudos=window.OveliaEstudos||{};
  E.trilha={
    planejadas:100,
    unidades:[
      {n:1,titulo:'Conhecendo a Bíblia',de:1,ate:10},
      {n:2,titulo:'Conhecendo Deus e a criação',de:11,ate:20},
      {n:3,titulo:'Quem é Jesus e por que Ele veio',de:21,ate:35},
      {n:4,titulo:'Os ensinamentos e as parábolas de Jesus',de:36,ate:50},
      {n:5,titulo:'Paixão, morte e Ressurreição',de:51,ate:60},
      {n:6,titulo:'Espírito Santo e Igreja',de:61,ate:70},
      {n:7,titulo:'Oração e vida espiritual',de:71,ate:80},
      {n:8,titulo:'Vivendo o Evangelho no dia a dia',de:81,ate:90},
      {n:9,titulo:'Aprofundamento e revisão',de:91,ate:100}
    ],
    /* Lições publicadas com conteúdo pronto (id sequencial, sem lacunas). */
    licoes:[
      {id:1,unidade:1,curto:'O que é a Bíblia'},
      {id:2,unidade:1,curto:'Antigo e Novo Testamento'},
      {id:3,unidade:1,curto:'Livros, capítulos e versículos'},
      {id:4,unidade:1,curto:'Os Evangelhos'},
      {id:5,unidade:1,curto:'Salmos, cartas e outros gêneros'},
      {id:6,unidade:1,curto:'Como encontrar uma passagem bíblica'},
      {id:7,unidade:1,curto:'Ler a Bíblia com atenção ao contexto'},
      {id:8,unidade:1,curto:'A Palavra e as escolhas do dia a dia'},
      {id:9,unidade:1,curto:'Os sacramentos na vida da Igreja'},
      {id:10,unidade:1,curto:'Batismo e Eucaristia: caminhar com Cristo'}
    ]
  };
})();
