# Relatório técnico — menu bíblico minimalista e licença BPM

## Correções implementadas
- `index.html`: seção Bíblia reorganizada; removeu a mensagem de autorização pendente e a lista de 73 livros sempre aberta; adicionou aviso compacto da BPM e menu recolhido, mantendo os IDs funcionais `buscaLivro`, `livros`, `livrosN`, `bibliaEscolherLivro`, `bibliaCapitulo` e os controles atuais.
- `app.js`: renderização da lista de livros alterada para agrupar Antigo Testamento e Novo Testamento em `details/summary`; na busca, os grupos com resultados são abertos automaticamente.
- `biblia.js`: seleção/fechamento do menu, tema claro/escuro descrito pelo estado atual, e controles do filtro quente sincronizados com os controles globais já existentes. A chave de preferências atual `ovelia-biblia-leitura-v1` permanece compatível.
- `biblia.css`: menu e grupos mais compactos; controles do filtro; regras explícitas de contraste para tema claro e escuro.
- `sw.js`: referências atualizadas para os três arquivos alterados (`app.js`, `biblia.js`, `biblia.css`) e cache novo.

## Licença BPM
O eBible.org identifica a BPM como domínio público e informa que a tradução ainda está em revisão. A interface agora informa essa condição em vez de dizer que aguarda autorização. O código do leitor continua fixado no espelho técnico de 19/08/2026; este pacote não atualiza o texto para a revisão oficial posterior.
Fontes: https://ebible.org/porbrbsl/copyright.htm ; https://ebible.org/details.php?id=porbrbsl ; https://ebible.org/legal.php

## Preservação
- O motor de carregamento da Bíblia e a URL da edição consultada não foram modificados.
- Não foram alteradas as sequências do Terço/Rosário, os conteúdos da Liturgia, os dados dos Estudos, os perfis ou as chaves de armazenamento preexistentes.
- As traduções Matos Soares e Figueiredo continuam em preparação; a situação da BPM não foi extrapolada para elas.
- Nenhum workflow foi alterado.

## Testes estáticos executados
- `node --check app.js`: aprovado.
- `node --check biblia.js`: aprovado.
- `node --check sw.js`: aprovado.
- `catalogo-biblia.json`: JSON válido.
- 163 IDs do HTML conferidos; nenhum duplicado.
- Referências de versão de `app.js`, `biblia.js` e `biblia.css` alinhadas entre `index.html` e `sw.js`.
- IDs de menus e controles conferidos em HTML/JavaScript.

## Não executado
- Não foi executado Safari/Playwright/Chromium real nesta etapa.
- O menu agrupado, a troca de capítulo, a persistência do filtro e o contraste precisam ser conferidos no iPhone após aplicar o ZIP.
- Nenhum commit ou publicação foi feito por este procedimento.
