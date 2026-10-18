# Ovelia — Recuperação, etapa 4: Jornada bíblica (aba Estudos)

## Estado real desta entrega
- **5 lições completas de 100 planejadas** (Unidade 1, estudos 1 a 5). Os estudos 6 a 100 **não existem ainda**.
  A trilha mostra só as lições prontas; as demais unidades aparecem como "em preparação". Não há lições vazias.
- **Textos bíblicos:** as lições trazem as **3 referências** e uma **explicação original** de cada uma. O texto das passagens não é reproduzido, porque nenhuma tradução com licença foi confirmada. A tela avisa isso.

## O que foi implementado
- Tela "Sua jornada bíblica": Ovelha com mensagem, nível, XP, progresso da trilha, calendário semanal (domingo a sábado, data local) e meta diária (sem meta, 1 ou 2 atividades). Não obriga nada.
- Trilha vertical por unidades, com nós concluído / disponível / bloqueado e a Ovelha indicando a próxima lição. Só a lição 1 começa liberada; concluir libera a seguinte; lições concluídas podem ser revisadas.
- Lição em 6 passos: introdução, 3 versículos (referência + explicação), entendimento conjunto + contexto bíblico e católico, aplicação (casa, trabalho, comunidade) + reflexão, atividade (múltipla escolha e associação, com feedback educativo e nova tentativa) e conclusão.
- A conclusão só é registrada depois que **todas** as perguntas forem acertadas. O botão Continuar fica desativado até lá.
- Pontos (em `estudos/regras.js`): 20 XP pela primeira conclusão; +5 se acertar tudo de primeira; revisão dá 3 XP **uma única vez** por lição; níveis a cada 100 XP; 8 conquistas.
- O dia da semana só é marcado ao concluir uma atividade (lição nova ou revisão). Abrir o site não marca nada.
- Progresso salvo em `localStorage` (chave `ovelia-jornada-v1`) e **validado ao carregar**: só lições existentes e em sequência são aceitas. Se o armazenamento estiver bloqueado, o app funciona em memória e avisa. O aviso de que o progresso não sincroniza entre aparelhos está na tela.
- **Preservado:** o conteúdo anterior da aba (estudo do dia pela liturgia, trajetória em caixas de seleção, cartão de pontos Kids/estudos, revisão e os 2 estudos avulsos) foi movido, sem alterações, para o botão "Estudos avulsos e materiais anteriores".

## Arquivos
Novos: `estudos/regras.js`, `estudos/progresso.js`, `estudos/interface.js`, `estudos/estudos.css`, `estudos/dados/trilha.js`, `estudos/dados/licoes-001-010.js`.
Alterado: `index.html` (seção Estudos, 1 CSS e 4 scripts).
Aviso: existem agora dois sistemas de pontos. O cartão antigo ("Minha jornada") soma caixas de seleção, histórias Kids e quiz; o novo é independente. Em etapa futura vale unificar.

## Como continuar
- Próximo lote: estudos 6 a 10 (completar a Unidade 1). Acrescente as lições em `licoes-001-010.js` e os itens em `trilha.js` (id sequencial, `unidade`, `curto`). Lotes seguintes usam `licoes-011-020.js` etc.; o arquivo é carregado só quando a lição é aberta.
- Para exibir texto bíblico depois, preencha `texto`, `traducao`, `licenca` e `fonte` em cada versículo.

## Testes executados (Chromium)
36 verificações automáticas, todas OK: lição 1 liberada e demais bloqueadas; conclusão libera a próxima; revisão; pontos sem repetição; semana só muda após atividade e reinicia em nova semana; progresso após recarregar; tentativa de concluir lição bloqueada pela API e forçando o botão; armazenamento adulterado; armazenamento indisponível; sem rolagem horizontal em 320, 360, 390 e 1280px nos perfis Adulto e 60+ (inclusive A+ e alto contraste); navegação inferior e troca de perfil; materiais anteriores.
Auditoria de contraste (trilha, os 5 passos e feedback, 2 perfis x 4 modos): 0 falhas.

## Não testado / pendências
- iPhone real, leitor de tela e Safari.
- Não há pontos por "dia seguido" (sequência); só o calendário semanal.
- Atividade de "organização de ideias" ainda não implementada (há múltipla escolha e associação).
- O perfil Kids não acessa Estudos (como antes).
