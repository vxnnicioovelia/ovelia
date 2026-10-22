/* Ovelia — Jornada bíblica, lote 1 (estudos 1 a 10). PRONTAS: 1 a 5. As lições 6 a 10 ainda não foram produzidas.
   Explicações, aplicações e atividades são conteúdo ORIGINAL da Ovelia.
   Versículos: aqui constam apenas as referências. Para exibir o texto bíblico, preencha "texto", "traducao", "licenca" e "fonte"
   em cada item de "versiculos", somente com tradução cuja reprodução esteja autorizada. */
(function(){
  var E=window.OveliaEstudos=window.OveliaEstudos||{};E.licoes=E.licoes||{};
  function v(ref,explicacao){return{ref:ref,explicacao:explicacao,texto:null,traducao:null,licenca:null,fonte:null}}
  var L=[
  {id:1,unidade:1,titulo:'O que é a Bíblia',
   objetivo:'Compreender que a Bíblia é Palavra de Deus em palavras humanas e que ela nos orienta e nos aproxima de Deus.',
   intro:'Oi! Eu sou a Ovelinha e vou caminhar com você nesta trilha. Vamos começar pelo começo: o que é, afinal, a Bíblia?',
   versiculos:[
    v('2 Timóteo 3,16-17','Paulo escreve a Timóteo que a Escritura é inspirada por Deus e útil para ensinar, corrigir e educar na justiça. Isso quer dizer que a Bíblia não é só um livro antigo: ela quer formar quem a lê.'),
    v('Salmo 119,105','O salmista compara a Palavra a uma lâmpada que ilumina os passos. A luz não mostra o caminho inteiro de uma vez, mas o bastante para dar o próximo passo com segurança.'),
    v('Hebreus 4,12','A carta aos Hebreus apresenta a Palavra de Deus como viva e eficaz. Ela não é só informação: quando é acolhida, toca o coração e pede uma resposta.')],
   conjunto:'Juntas, as três passagens mostram que a Bíblia vem de Deus (2 Timóteo), serve de guia no dia a dia (Salmo 119) e age em quem a escuta (Hebreus). Para a Igreja Católica, Deus é o autor da Bíblia e os autores humanos escreveram como verdadeiros autores, em sua época e com sua linguagem. Por isso lemos a Escritura com fé, atenção ao contexto e em comunhão com a Igreja.',
   contexto:'A Bíblia católica reúne 73 livros: 46 no Antigo Testamento e 27 no Novo. Foi escrita ao longo de muitos séculos, por diferentes autores. A Igreja a recebe como Palavra de Deus e a lê dentro da sua Tradição (veja a Constituição Dogmática Dei Verbum, do Concílio Vaticano II).',
   aplicacao:[{onde:'Em casa',texto:'Escolha um horário fixo, mesmo de cinco minutos, para ler uma passagem curta.'},{onde:'No trabalho',texto:'Antes de começar o dia, leia uma frase da Bíblia e leve-a como intenção para as tarefas.'},{onde:'Na comunidade',texto:'Pergunte a alguém da sua comunidade como a Palavra de Deus o ajudou e conte também a sua experiência.'}],
   atividade:[
    {tipo:'escolha',enunciado:'Segundo 2 Timóteo 3,16-17, para que serve a Escritura?',opcoes:['Apenas para registrar fatos antigos','Para ensinar, corrigir e educar na justiça','Para substituir a oração'],correta:1,certo:'Isso mesmo! A Escritura é inspirada e ajuda a formar quem a lê.',errado:'Quase! O texto diz que a Escritura é útil para ensinar, corrigir e educar na justiça, e não somente para registrar fatos.'},
    {tipo:'escolha',enunciado:'Quantos livros tem a Bíblia católica?',opcoes:['66','73','81'],correta:1,certo:'Correto! São 46 livros no Antigo Testamento e 27 no Novo.',errado:'A Bíblia católica tem 73 livros (46 + 27). A edição com 66 livros é usada por outras tradições cristãs.'},
    {tipo:'escolha',enunciado:'O que a imagem da “lâmpada” no Salmo 119,105 sugere?',opcoes:['A Palavra ilumina os passos de quem caminha','A Bíblia deve ser lida só à noite','A Palavra serve apenas para pessoas muito instruídas'],correta:0,certo:'Muito bem! A Palavra orienta os passos, um de cada vez.',errado:'Não é bem isso. A imagem da lâmpada fala de luz para quem caminha, e isso vale para qualquer pessoa.'}],
   reflexao:'Em que área da sua vida você gostaria de receber mais luz neste momento?',
   resumo:['A Bíblia é Palavra de Deus escrita por autores humanos.','A Bíblia católica tem 73 livros.','Lemos a Escritura com fé, atenção ao contexto e em comunhão com a Igreja.'],
   criterio:'Acertar todas as perguntas da atividade. Se errar, você pode tentar de novo.'},

  {id:2,unidade:1,titulo:'Antigo e Novo Testamento',
   objetivo:'Entender como o Antigo e o Novo Testamento se relacionam e por que a Igreja os lê juntos.',
   intro:'Agora vamos olhar a Bíblia como uma grande história em duas partes. Será que uma parte combina com a outra? Vamos descobrir!',
   versiculos:[
    v('Jeremias 31,31-34','O profeta anuncia que Deus fará uma nova aliança, escrita no coração do povo. É uma promessa feita dentro do Antigo Testamento que olha para frente.'),
    v('Mateus 5,17','Jesus diz que não veio abolir a Lei e os Profetas, mas dar-lhes pleno cumprimento. O Novo Testamento não joga fora o Antigo: ele o leva à plenitude.'),
    v('Lucas 24,44-45','Depois da Ressurreição, Jesus explica que o que estava escrito na Lei de Moisés, nos Profetas e nos Salmos se refere a ele, e abre a inteligência dos discípulos para compreender as Escrituras.')],
   conjunto:'Os três textos mostram uma só história de salvação. O Antigo Testamento prepara e promete; o Novo mostra o cumprimento em Jesus. Por isso a Igreja lê os dois juntos, sem descartar o Antigo e sem tratá-lo como um simples rascunho: ele tem valor próprio como Palavra de Deus.',
   contexto:'O Antigo Testamento tem 46 livros (Pentateuco, livros históricos, sapienciais e proféticos). O Novo Testamento tem 27: os quatro Evangelhos, os Atos dos Apóstolos, as cartas e o Apocalipse. Aqui, a palavra “testamento” traduz “aliança”, isto é, a relação de Deus com o seu povo.',
   aplicacao:[{onde:'Em casa',texto:'Leia em família um salmo e, depois, um trecho do Evangelho sobre o mesmo tema, como a confiança em Deus.'},{onde:'No trabalho',texto:'Diante de uma promessa que demora a se realizar, lembre-se de que Deus conduz a história no seu tempo.'},{onde:'Na comunidade',texto:'Na Missa, observe como a primeira leitura e o Evangelho conversam entre si.'}],
   atividade:[
    {tipo:'escolha',enunciado:'O que significa dizer que Jesus deu “pleno cumprimento” à Lei e aos Profetas?',opcoes:['Que o Antigo Testamento perdeu o valor','Que ele leva à plenitude o que Deus vinha preparando','Que a Lei foi esquecida pela Igreja'],correta:1,certo:'Isso! Jesus leva à plenitude o que Deus vinha preparando.',errado:'Quase. Em Mateus 5,17 Jesus diz justamente que não veio abolir, mas dar pleno cumprimento.'},
    {tipo:'associar',enunciado:'Ligue cada situação ao texto em que ela aparece.',opcoes:['Antigo Testamento — Jeremias','Novo Testamento — Mateus','Novo Testamento — Lucas'],itens:[
      {situacao:'Uma promessa de aliança escrita no coração do povo',resposta:0},
      {situacao:'Jesus diz que veio dar pleno cumprimento à Lei',resposta:1},
      {situacao:'Jesus explica aos discípulos o que a Lei, os Profetas e os Salmos dizem sobre ele',resposta:2}],
     certo:'Perfeito! Você reconheceu cada passagem.',errado:'Alguma ligação ainda não está certa. Releia as explicações do passo 2 e tente de novo.'},
    {tipo:'escolha',enunciado:'Quantos livros tem o Novo Testamento?',opcoes:['27','46','12'],correta:0,certo:'Correto! São 27 livros.',errado:'O Novo Testamento tem 27 livros. Os 46 são do Antigo Testamento.'}],
   reflexao:'Que promessa de Deus você já viu se realizar, mesmo que tenha demorado?',
   resumo:['O Antigo Testamento prepara e promete; o Novo mostra o cumprimento em Jesus.','A Igreja lê os dois Testamentos juntos.','“Testamento” aqui quer dizer “aliança”.'],
   criterio:'Acertar todas as perguntas da atividade. Se errar, você pode tentar de novo.'},

  {id:3,unidade:1,titulo:'Livros, capítulos e versículos',
   objetivo:'Aprender a ler e a localizar uma citação bíblica, como Jo 3,16.',
   intro:'Toda passagem da Bíblia tem um “endereço”. Hoje vamos aprender a ler esse endereço para você nunca se perder!',
   versiculos:[
    v('Gênesis 1,1','É a primeira frase da Bíblia. “Gn 1,1” quer dizer: livro de Gênesis, capítulo 1, versículo 1. A vírgula separa o capítulo do versículo.'),
    v('Salmo 23,1','Nos Salmos, o número depois do nome do livro indica o salmo, que funciona como um “capítulo”. Por isso se escreve “Sl 23,1”. A numeração dos versículos dos Salmos pode variar um pouco entre as edições.'),
    v('João 3,16','“Jo 3,16” é o Evangelho de João, capítulo 3, versículo 16. É um versículo muito conhecido, que fala do amor de Deus pelo mundo.')],
   conjunto:'Os três exemplos ensinam o “endereço” bíblico: livro, capítulo e versículo. Com ele, qualquer pessoa encontra a mesma passagem em qualquer edição. Capítulos e versículos foram acrescentados séculos depois dos textos originais, só para facilitar a consulta. Por isso é importante ler o contexto, e não apenas o versículo isolado.',
   contexto:'Nas Bíblias em português, a vírgula costuma separar o capítulo do versículo (Jo 3,16). O hífen indica um intervalo (Jo 3,16-18). Cada edição traz, no início, a lista de abreviaturas dos livros.',
   aplicacao:[{onde:'Em casa',texto:'Anote no celular o endereço de um versículo que ajudou você na semana.'},{onde:'No trabalho',texto:'Se alguém citar uma passagem, procure-a inteira e leia também o que vem antes e depois.'},{onde:'Na comunidade',texto:'Ao ouvir a leitura na Missa, tente identificar o livro, o capítulo e o versículo no folheto.'}],
   atividade:[
    {tipo:'escolha',enunciado:'Em “Jo 3,16”, o que representa o número 16?',opcoes:['O capítulo','O versículo','O número do livro'],correta:1,certo:'Isso! Depois da vírgula vem o versículo.',errado:'O 16 é o versículo. O capítulo é o número antes da vírgula, ou seja, o 3.'},
    {tipo:'escolha',enunciado:'Como se lê “Gn 1,1”?',opcoes:['Gênesis, capítulo 1, versículo 1','Gênesis, versículo 1, capítulo 1','Gênesis, livro 1'],correta:0,certo:'Correto! Livro, capítulo e versículo, nessa ordem.',errado:'A ordem é sempre livro, depois capítulo, depois versículo.'},
    {tipo:'associar',enunciado:'Ligue cada endereço ao seu significado.',opcoes:['Salmo 23, versículo 1','João, capítulo 3, do versículo 16 ao 18','Gênesis, capítulo 1, versículo 1'],itens:[
      {situacao:'Sl 23,1',resposta:0},{situacao:'Jo 3,16-18',resposta:1},{situacao:'Gn 1,1',resposta:2}],
     certo:'Muito bem! Você já sabe ler um endereço bíblico.',errado:'Alguma ligação não está certa. Lembre: o hífen indica um intervalo de versículos.'}],
   reflexao:'Qual versículo você gostaria de aprender a encontrar sem ajuda?',
   resumo:['A citação segue a ordem livro, capítulo e versículo.','A vírgula separa capítulo e versículo; o hífen indica intervalo.','Capítulos e versículos ajudam na consulta, mas o contexto é essencial.'],
   criterio:'Acertar todas as perguntas da atividade. Se errar, você pode tentar de novo.'},

  {id:4,unidade:1,titulo:'Os Evangelhos',
   objetivo:'Compreender o que são os Evangelhos e qual é o objetivo de cada um ao anunciar Jesus.',
   intro:'Chegou a hora de conhecer os quatro livros que contam a vida e a mensagem de Jesus. Vamos ver como eles nasceram?',
   versiculos:[
    v('Marcos 1,1','Marcos abre o seu livro chamando-o de “Evangelho de Jesus Cristo”. “Evangelho” quer dizer “boa notícia”: o anúncio de que Deus se aproximou de nós em Jesus.'),
    v('Lucas 1,1-4','Lucas explica que se informou com cuidado para escrever uma narrativa ordenada, para dar segurança ao leitor sobre o que aprendeu. Mostra que os Evangelhos nascem do testemunho e de um trabalho cuidadoso.'),
    v('João 20,30-31','João diz que Jesus fez muitos outros sinais que não estão escritos no livro, e que o que foi escrito tem um objetivo: que o leitor creia em Jesus e tenha vida em seu nome.')],
   conjunto:'Os Evangelhos não são biografias completas: são testemunhos de fé escritos para anunciar Jesus. Marcos fala de “boa notícia”, Lucas destaca a narrativa baseada em testemunhas e João declara o propósito: crer e ter vida. Os quatro contam a mesma boa notícia com ênfases diferentes, e isso enriquece a nossa compreensão.',
   contexto:'São quatro Evangelhos: Mateus, Marcos, Lucas e João. Os três primeiros são chamados de sinóticos, porque podem ser lidos lado a lado. Na Missa, o Evangelho é proclamado com todos em pé, sinal da honra especial que a Igreja lhe dá.',
   aplicacao:[{onde:'Em casa',texto:'Leia um trecho curto de um Evangelho por noite e conte à família o que mais chamou a sua atenção.'},{onde:'No trabalho',texto:'Pergunte-se: como a “boa notícia” pode aparecer no modo como trato meus colegas?'},{onde:'Na comunidade',texto:'Compartilhe uma boa notícia com alguém que está desanimado.'}],
   atividade:[
    {tipo:'escolha',enunciado:'O que significa a palavra “Evangelho”?',opcoes:['Boa notícia','Lei antiga','Carta de um apóstolo'],correta:0,certo:'Isso mesmo! Evangelho é boa notícia.',errado:'“Evangelho” quer dizer “boa notícia”, como em Marcos 1,1.'},
    {tipo:'escolha',enunciado:'Qual objetivo João declara em 20,30-31?',opcoes:['Que o leitor creia em Jesus e tenha vida','Listar todos os milagres de Jesus','Escrever uma biografia completa'],correta:0,certo:'Correto! João escreve para que creiamos e tenhamos vida.',errado:'João diz que não escreveu tudo. O objetivo é que o leitor creia e tenha vida em Jesus.'},
    {tipo:'associar',enunciado:'Ligue cada passagem à sua ideia principal.',opcoes:['O Evangelho é uma boa notícia','Narrativa ordenada, baseada em testemunhas','Escrito para crer e ter vida'],itens:[
      {situacao:'Marcos 1,1',resposta:0},{situacao:'Lucas 1,1-4',resposta:1},{situacao:'João 20,30-31',resposta:2}],
     certo:'Perfeito! Cada Evangelho tem o seu jeito de anunciar Jesus.',errado:'Alguma ligação não está certa. Releia as explicações do passo 2.'}],
   reflexao:'Que “boa notícia” do Evangelho você mais precisa ouvir hoje?',
   resumo:['Evangelho significa “boa notícia”.','São quatro: Mateus, Marcos, Lucas e João.','Os Evangelhos são testemunhos de fé escritos para anunciar Jesus.'],
   criterio:'Acertar todas as perguntas da atividade. Se errar, você pode tentar de novo.'},

  {id:5,unidade:1,titulo:'Salmos, cartas e outros gêneros',
   objetivo:'Reconhecer que a Bíblia tem gêneros literários diferentes e que cada um pede um modo de leitura.',
   intro:'A Bíblia é como uma biblioteca, com poesias, cartas, histórias e conselhos. Vamos conhecer alguns desses estilos?',
   versiculos:[
    v('Salmo 100','É um salmo de louvor e ação de graças, que convida a servir ao Senhor com alegria. Os Salmos são orações em forma de poesia, que a Igreja reza até hoje.'),
    v('Romanos 1,1-7','Paulo começa a carta apresentando-se e saudando os cristãos de Roma, como era comum nas cartas daquele tempo. As cartas respondem a situações concretas das comunidades; por isso é preciso saber quem escreve, para quem e por quê.'),
    v('Provérbios 1,7','Provérbios é um livro de sabedoria. Em frases curtas, ensina a viver bem e apresenta o respeito e a confiança em Deus como o começo da sabedoria.')],
   conjunto:'A Bíblia reúne gêneros diferentes: poesia e oração (Salmos), cartas (Paulo), sabedoria (Provérbios), além de narrativas, leis, profecias e Evangelhos. Cada gênero pede um jeito de ler: um salmo se reza, uma carta se lê no seu contexto e um provérbio se medita. Ler tudo do mesmo modo leva a interpretações erradas.',
   contexto:'Costuma-se agrupar os livros do Antigo Testamento em Pentateuco, históricos, sapienciais e poéticos e proféticos. No Novo Testamento há Evangelhos, Atos, cartas e Apocalipse. O Catecismo da Igreja Católica ensina a prestar atenção ao gênero literário ao interpretar a Escritura (cf. CIC 109-110).',
   aplicacao:[{onde:'Em casa',texto:'Reze devagar um salmo curto, em voz alta, em família.'},{onde:'No trabalho',texto:'Ao receber uma mensagem difícil, pense no contexto de quem escreveu, como se faz com uma carta bíblica.'},{onde:'Na comunidade',texto:'Procure em grupo identificar, na leitura da Missa, se o texto é carta, narrativa ou profecia.'}],
   atividade:[
    {tipo:'escolha',enunciado:'Como ler melhor um salmo?',opcoes:['Rezando-o, como uma oração em forma de poesia','Procurando só a data histórica','Pulando-o, porque é difícil'],correta:0,certo:'Isso! Os Salmos são orações poéticas.',errado:'Os Salmos são orações em forma de poesia. Por isso se rezam, e não apenas se estudam.'},
    {tipo:'escolha',enunciado:'Por que é importante conhecer o gênero de um texto bíblico?',opcoes:['Porque cada gênero pede um modo de ler adequado','Porque só alguns gêneros são Palavra de Deus','Porque o gênero não muda a leitura'],correta:0,certo:'Correto! O gênero orienta a leitura.',errado:'Todos os livros da Bíblia são Palavra de Deus, e cada gênero pede um modo de leitura adequado.'},
    {tipo:'associar',enunciado:'Ligue cada texto ao seu gênero.',opcoes:['Poesia e oração','Carta','Sabedoria'],itens:[
      {situacao:'Salmo 100',resposta:0},{situacao:'Romanos 1,1-7',resposta:1},{situacao:'Provérbios 1,7',resposta:2}],
     certo:'Muito bem! Você reconheceu os três gêneros.',errado:'Alguma ligação não está certa. Releia as explicações do passo 2.'}],
   reflexao:'Qual gênero bíblico você tem mais facilidade para ler? E qual gostaria de conhecer melhor?',
   resumo:['A Bíblia é uma biblioteca com gêneros diferentes.','Cada gênero pede um modo de leitura: rezar, contextualizar ou meditar.','Você chegou ao fim dos estudos disponíveis até agora. Novos estudos serão publicados em breve.'],
   criterio:'Acertar todas as perguntas da atividade. Se errar, você pode tentar de novo.'},

  {id:6,unidade:1,titulo:'Como encontrar uma passagem bíblica',
   objetivo:'Localizar livros, capítulos e versículos e usar referências para encontrar uma leitura sem depender de uma tradução específica.',
   intro:'Uma referência bíblica funciona como um endereço: ela ajuda você a encontrar o trecho certo em qualquer edição autorizada.',
   versiculos:[v('Lucas 4,16-21','Jesus lê uma passagem do profeta Isaías na sinagoga e explica sua missão. O episódio mostra a importância de localizar e compreender a leitura no contexto.'),v('Atos 8,26-35','Filipe acompanha o viajante que lê o profeta Isaías e o ajuda a compreender o sentido. A leitura pode crescer quando fazemos perguntas e aprendemos em comunidade.')],
   conjunto:'O nome indica o livro; o número antes da vírgula indica o capítulo; os números depois da vírgula indicam os versículos. Um hífen indica uma sequência. Em algumas edições, abreviações e pontuação podem variar, mas a referência permite encontrar a passagem.',
   contexto:'Na Bíblia impressa, os capítulos e versículos são divisões de consulta acrescentadas ao longo da história para facilitar a localização. Eles ajudam a encontrar um trecho, mas não substituem a leitura do parágrafo ou do capítulo completo.',
   aplicacao:[{onde:'Em casa',texto:'Escolha uma referência indicada na homilia e procure-a na sua Bíblia católica.'},{onde:'No trabalho',texto:'Anote a referência de uma leitura que chamou sua atenção para voltar a ela depois.'},{onde:'Na comunidade',texto:'Peça a alguém para mostrar como encontra livro, capítulo e versículo na própria edição.'}],
   atividade:[{tipo:'escolha',enunciado:'Em “Lucas 4,16-21”, o que significa o número 4?',opcoes:['O capítulo','O versículo','O número de páginas'],correta:0,certo:'Isso mesmo: 4 indica o capítulo de Lucas.',errado:'O número antes da vírgula indica o capítulo.'},{tipo:'escolha',enunciado:'O que indica “16-21” nessa referência?',opcoes:['Uma sequência de versículos','Seis capítulos','Duas traduções'],correta:0,certo:'Correto: é a sequência do versículo 16 ao 21.',errado:'O hífen indica uma sequência, do versículo 16 ao 21.'}],
   reflexao:'Qual passo você pode praticar para encontrar uma leitura com mais autonomia?',resumo:['A referência é um endereço para localizar a passagem.','O número antes da vírgula indica o capítulo.','Leia o contexto ao redor dos versículos.'],criterio:'Acertar as perguntas. Você pode tentar novamente.'},

  {id:7,unidade:1,titulo:'Ler a Bíblia com atenção ao contexto',
   objetivo:'Perceber quem fala, a quem, em qual situação e qual é a ideia principal de uma passagem.',
   intro:'Um versículo pode parecer dizer uma coisa quando é separado do restante. Hoje vamos praticar uma leitura atenta ao contexto.',
   versiculos:[v('Neemias 8,1-8','O povo escuta a Lei e recebe explicação para compreender a leitura. O episódio valoriza a escuta, a interpretação e a compreensão comunitária.'),v('Lucas 10,25-37','A parábola do bom samaritano responde a uma pergunta sobre o próximo. A pergunta que provoca a história ajuda a compreender sua mensagem e sua aplicação.')],
   conjunto:'Antes de concluir o que uma passagem significa, observe o que acontece antes e depois, quem está falando, quem escuta e qual pergunta ou situação está em jogo. Depois, identifique a mensagem central e pense em como ela se relaciona com o conjunto da fé cristã.',
   contexto:'A Bíblia contém diferentes épocas, estilos e situações. A leitura católica considera a intenção dos autores humanos, as condições do tempo, a unidade de toda a Escritura e a Tradição viva da Igreja. Um trecho não deve ser usado isoladamente para justificar qualquer ideia.',
   aplicacao:[{onde:'Em casa',texto:'Leia alguns versículos antes e depois do trecho escolhido.'},{onde:'No trabalho',texto:'Antes de compartilhar uma frase, confira de onde ela veio e o que o texto está tratando.'},{onde:'Na comunidade',texto:'Conversem sobre quem participa da passagem e qual problema ou pergunta ela apresenta.'}],
   atividade:[{tipo:'escolha',enunciado:'Por que observar o contexto?',opcoes:['Para entender a situação e a mensagem do trecho','Para evitar ler o texto completo','Para fazer qualquer frase significar qualquer coisa'],correta:0,certo:'Exatamente. O contexto ajuda a interpretar com responsabilidade.',errado:'O contexto mostra a situação, os interlocutores e a ideia principal.'},{tipo:'escolha',enunciado:'Na parábola do bom samaritano, o que ajuda a entender a história?',opcoes:['A pergunta que a provocou e a resposta de Jesus','Somente o nome dos personagens','Uma frase isolada de qualquer contexto'],correta:0,certo:'Muito bem: a pergunta e a resposta fazem parte do sentido.',errado:'Leia Lucas 10,25-37 como uma unidade, observando a pergunta inicial.'}],
   reflexao:'Você já entendeu de outro modo uma frase depois de ler o que vinha antes e depois?',resumo:['Observe quem fala e a quem.','Leia o trecho dentro da passagem maior.','Interprete com atenção à unidade da Escritura e à fé da Igreja.'],criterio:'Acertar as perguntas. Você pode tentar novamente.'},

  {id:8,unidade:1,titulo:'A Palavra e as escolhas do dia a dia',
   objetivo:'Transformar a leitura bíblica em uma atitude concreta de serviço, verdade e misericórdia.',
   intro:'Ler a Bíblia não termina quando fechamos o livro. A Palavra também nos convida a escolher como agir.',
   versiculos:[v('Tiago 1,22-25','Tiago convida os ouvintes a praticarem a Palavra, não apenas a escutá-la. A imagem do espelho chama a observar a própria vida e agir.'),v('Mateus 7,24-27','Jesus compara quem escuta e pratica suas palavras a alguém que constrói sobre a rocha. A imagem destaca a importância de transformar a escuta em prática.')],
   conjunto:'Uma aplicação responsável nasce da mensagem real do texto, não de uma associação aleatória. Pergunte: que atitude esta passagem recomenda? Que mudança pequena é possível hoje? Como isso respeita a dignidade das pessoas?',
   contexto:'A vida cristã reúne oração, escuta, discernimento e ação. Uma aplicação não precisa ser grandiosa: pode ser pedir perdão, cumprir uma promessa, ajudar alguém ou evitar espalhar uma informação não verificada.',
   aplicacao:[{onde:'Em casa',texto:'Escolha uma tarefa concreta para aliviar o dia de alguém da família.'},{onde:'No trabalho',texto:'Pratique a honestidade mesmo quando ninguém estiver conferindo.'},{onde:'Na comunidade',texto:'Ofereça ajuda prática a alguém sem esperar reconhecimento.'}],
   atividade:[{tipo:'escolha',enunciado:'Depois de ler uma passagem, qual é um bom próximo passo?',opcoes:['Escolher uma atitude concreta ligada à mensagem','Inventar uma regra que o texto não apresenta','Ignorar o sentido e compartilhar uma frase solta'],correta:0,certo:'Isso: a aplicação deve nascer da mensagem e virar uma atitude possível.',errado:'Procure uma atitude concreta que respeite o sentido do texto.'},{tipo:'escolha',enunciado:'Qual exemplo combina com uma leitura que se torna prática?',opcoes:['Cumprir uma promessa e agir com honestidade','Usar a passagem para humilhar alguém','Concluir que não é preciso mudar nada'],correta:0,certo:'Correto. A Palavra pode orientar escolhas concretas.',errado:'A prática cristã procura coerência, caridade e respeito à dignidade.'}],
   reflexao:'Qual atitude pequena você pode praticar hoje a partir do que leu?',resumo:['A escuta pede uma resposta.','A aplicação deve respeitar o sentido da passagem.','Pequenas atitudes concretas também expressam a fé.'],criterio:'Acertar as perguntas. Você pode tentar novamente.'},

  {id:9,unidade:1,titulo:'Os sacramentos na vida da Igreja',
   objetivo:'Reconhecer os sete sacramentos e compreender que são sinais eficazes da graça confiados à Igreja.',
   intro:'Os sacramentos acompanham momentos importantes da vida cristã. Vamos conhecer seu lugar na caminhada da Igreja.',
   versiculos:[v('Mateus 28,19-20','O envio dos discípulos menciona o batismo e a missão de ensinar. A passagem é uma referência importante para refletir sobre a iniciação cristã.'),v('1 Coríntios 11,23-26','Paulo transmite à comunidade a tradição da Ceia do Senhor. O texto é uma referência central para a compreensão da Eucaristia.')],
   conjunto:'A Igreja Católica reconhece sete sacramentos: Batismo, Confirmação, Eucaristia, Penitência e Reconciliação, Unção dos Enfermos, Ordem e Matrimônio. Eles não são apenas cerimônias: são sinais eficazes da graça, celebrados na vida da Igreja.',
   contexto:'Os sacramentos se relacionam com a vida inteira do cristão. Batismo, Confirmação e Eucaristia são sacramentos da iniciação cristã; Reconciliação e Unção dos Enfermos se relacionam com cura; Ordem e Matrimônio estão a serviço da comunhão e da missão. Para aprofundar, consulte o Catecismo da Igreja Católica, §§ 1113-1131.',
   aplicacao:[{onde:'Em casa',texto:'Converse com a família sobre os sacramentos que já recebeu e o que significam.'},{onde:'No trabalho',texto:'Respeite a caminhada de fé de outras pessoas sem reduzir os sacramentos a costumes sociais.'},{onde:'Na comunidade',texto:'Procure a catequese ou a secretaria paroquial para esclarecer dúvidas sobre preparação sacramental.'}],
   atividade:[{tipo:'escolha',enunciado:'Quantos sacramentos a Igreja Católica reconhece?',opcoes:['Cinco','Sete','Nove'],correta:1,certo:'Isso mesmo: são sete sacramentos.',errado:'A Igreja Católica reconhece sete sacramentos.'},{tipo:'escolha',enunciado:'Qual grupo reúne sacramentos da iniciação cristã?',opcoes:['Batismo, Confirmação e Eucaristia','Ordem, Matrimônio e Unção','Reconciliação, Ordem e Matrimônio'],correta:0,certo:'Correto: Batismo, Confirmação e Eucaristia.',errado:'A iniciação cristã reúne Batismo, Confirmação e Eucaristia.'}],
   reflexao:'Qual sacramento você gostaria de compreender melhor e com quem poderia conversar sobre ele?',resumo:['A Igreja reconhece sete sacramentos.','Eles são sinais eficazes da graça.','Os sacramentos acompanham a vida e a missão cristã.'],criterio:'Acertar as perguntas. Você pode tentar novamente.'},

  {id:10,unidade:1,titulo:'Batismo e Eucaristia: caminhar com Cristo',
   objetivo:'Identificar o sentido do Batismo e da Eucaristia como fundamentos da vida cristã, sem confundir seus significados.',
   intro:'Nesta lição, vamos olhar para dois sacramentos centrais da iniciação cristã: o Batismo e a Eucaristia.',
   versiculos:[v('Romanos 6,3-4','Paulo relaciona o Batismo à participação na morte e ressurreição de Cristo e a uma vida nova.'),v('Lucas 22,14-20','Na última ceia, Jesus entrega aos discípulos o sinal da aliança em seu corpo e sangue. A Igreja celebra a Eucaristia em memória dele.'),v('Atos 2,42','A comunidade persevera no ensinamento dos apóstolos, na comunhão, na fração do pão e nas orações.')],
   conjunto:'No Batismo, a pessoa é incorporada a Cristo e à Igreja e inicia a vida cristã. Na Eucaristia, a Igreja celebra o memorial da Páscoa do Senhor e recebe Cristo. Os dois sacramentos estão ligados, mas não são a mesma celebração nem têm a mesma finalidade.',
   contexto:'O Batismo é a porta de entrada para a vida sacramental. A Eucaristia é fonte e ápice da vida cristã. A preparação e a vivência desses sacramentos acontecem na comunidade, com catequese e acompanhamento pastoral. Para aprofundar, consulte o Catecismo da Igreja Católica, §§ 1213-1284 (Batismo) e §§ 1322-1419 (Eucaristia).',
   aplicacao:[{onde:'Em casa',texto:'Recorde a data do seu Batismo e, se possível, agradeça por quem ajudou você a crescer na fé.'},{onde:'No trabalho',texto:'Procure viver a comunhão por meio da justiça, da paciência e do serviço.'},{onde:'Na comunidade',texto:'Participe da Missa com atenção e converse com a catequese se tiver dúvidas sobre a preparação sacramental.'}],
   atividade:[{tipo:'escolha',enunciado:'O que o Batismo significa na vida cristã?',opcoes:['Início da vida cristã e incorporação a Cristo e à Igreja','Uma festa sem relação com a fé','O mesmo que a Eucaristia'],correta:0,certo:'Muito bem: o Batismo inicia a vida sacramental e nos incorpora a Cristo e à Igreja.',errado:'O Batismo é a porta de entrada para a vida sacramental; não é o mesmo que a Eucaristia.'},{tipo:'escolha',enunciado:'O que a Igreja celebra na Eucaristia?',opcoes:['O memorial da Páscoa do Senhor','Apenas uma reunião social','Uma lembrança sem relação com Cristo'],correta:0,certo:'Correto: a Eucaristia celebra o memorial da Páscoa do Senhor.',errado:'A Eucaristia é o memorial da Páscoa do Senhor e centro da vida da Igreja.'}],
   reflexao:'Como você pode viver mais conscientemente o Batismo e a participação na Eucaristia?',resumo:['O Batismo inicia a vida sacramental.','A Eucaristia celebra o memorial da Páscoa do Senhor.','Ambos nos conduzem à comunhão e à missão.'],criterio:'Acertar as perguntas. Você pode tentar novamente.'}
  ];
  L.forEach(function(x){E.licoes[x.id]=x});
})();
