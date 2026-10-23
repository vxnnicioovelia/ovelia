# Ovelia — Correção integrada de contraste e Orações/Terço/Rosário

Esta atualização parte do arquivo mais recente `ovelia-main 6.zip`. Ela corrige as regras de interface e recupera os pontos de entrada para as experiências de oração, sem substituir os motores de Bíblia, Terço, Liturgia ou Estudos.

## Arquivos do site incluídos (todos soltos no ZIP)
- `index.html` — inclui a folha de estilo que estava ausente, acrescenta o menu de oração e a entrada Santo Rosário; corrige dois separadores `\n` literais.
- `app.js` — corrige o filtro de categorias infantis por perfil e mantém renderização correta ao trocar de perfil; dá títulos corretos às páginas Terço e Rosário.
- `ovelia-interface.css` — tema claro neutro, tema escuro grafite, texto da saudação legível, contraste explícito do texto bíblico no tema interno escuro, filtro quente uniforme e estilos compactos de navegação de oração.
- `sw.js` — nova versão do cache e inclusão da folha de estilos no shell do PWA.

Não apague outros arquivos. Nenhuma pasta nova é necessária. Aplique os quatro arquivos na raiz do repositório.

## O que foi preservado
- `biblia.js` não foi alterado: não mexi no carregamento real dos versículos.
- A sequência de passos, as contas, os mistérios, os controles de voz e a chave local de progresso do Terço foram preservados.
- O conteúdo e as regras dos Estudos, Liturgia e demais módulos foram preservados.
- As orações infantis não são renderizadas nos perfis adulto/+60; a troca de perfil re-renderiza a biblioteca.
- O link Santo Rosário abre uma página própria e encaminha para o mesmo motor guiado de contas/orações, sem duplicar nem divergir a sequência.

## Aplicação pelo iPhone
1. Abra o repositório no GitHub.
2. Substitua `index.html`, `app.js` e `sw.js` pelos arquivos do ZIP.
3. Substitua também `ovelia-interface.css` pelo arquivo do ZIP (o arquivo já existe no repositório, mas não estava sendo carregado pelo HTML).
4. Confira os nomes antes de confirmar as alterações.
5. Após o GitHub Pages publicar, feche a aba do Safari e abra novamente; se necessário, recarregue o site para renovar o cache.

## Teste manual obrigatório no iPhone
- Início em tema claro: “Boa tarde!” e a mensagem abaixo devem aparecer em texto escuro sobre fundo branco.
- Início em tema escuro: fundo grafite e texto claro.
- Bíblia com tema de leitura escuro ativo mesmo com a página em tema claro: o texto dos versículos deve ficar claro sobre grafite.
- Ative o filtro quente e mova a intensidade de 0 ao máximo: deve colorir a tela do site de maneira uniforme, incluindo cartões, cabeçalho e barra inferior. A barra de status e os controles nativos do Safari não podem ser cobertos pelo site.
- Perfil Ovelias em Caminhada e Ovelias Sábias: a biblioteca não deve mostrar categorias infantis.
- Perfil Pequenas Ovelias: o perfil infantil continua sem acesso à Bíblia adulta, Terço ou Rosário.
- Abra Orações e confira os três acessos: Orações, Terço guiado e Santo Rosário.
- Terço: comece, avance e volte contas, confira o texto e o progresso.
- Teste larguras 320, 360, 390 e 430 px e confira ausência de rolagem horizontal.

Não publique se o contraste não estiver legível ao vivo. O relatório descreve o que foi verificado estaticamente e o que ainda depende do Safari.
