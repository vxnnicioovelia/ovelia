# Relatório de correção — leitor bíblico Ovelia

## Correções aplicadas
1. **Integração ausente:** adicionado `#bibliaLeitorUX` ao `index.html`; o leitor deixou de existir apenas como arquivos sem ligação à página.
2. **Carregamento:** `index.html` agora carrega `biblia-leitor.css` e `biblia-leitor.js`; o helper é carregado depois do motor bíblico e do módulo de favoritos.
3. **PWA/cache:** atualizadas as entradas de shell e o nome do cache no `sw.js` para `ovelia-shell-v38-20261024-reader-integration`.
4. **Inicialização:** `syncFromLegacy()` inicializa a lista de livros antes de resolver o título atual.
5. **Menu minimalista:** seletor agrupado por Antigo/Novo Testamento, busca de livros e grade de capítulos que aparece depois de escolher um livro.
6. **Tema/filtro:** controles de tema claro/escuro/quente e filtro de luz azul no leitor; o filtro está sincronizado com os controles globais já existentes.
7. **Favoritos:** cliques nos botões de favorito clonados para a área de leitura são encaminhados ao botão original, preservando o sistema de armazenamento existente.
8. **Retorno e falhas:** o botão superior retorna à seção de origem conhecida; falhas/avisos do leitor original são mostrados no novo leitor, com tentativa de recarregamento quando aplicável.

## Arquivos modificados
- `index.html`
- `biblia-leitor.js`
- `biblia-leitor.css`
- `sw.js`

## Recursos preservados por escopo
`app.js`, `biblia.js`, `favoritos.js`, o catálogo da Bíblia, os dados e os módulos de Liturgia, Orações, Terço, Santo Rosário e Estudos não foram reescritos nesta correção. O texto bíblico continua vindo do motor de leitura existente, sem inventar versículos ou incorporar outra tradução.

## Testes executados
- `node --check`: 27 arquivos JavaScript na raiz aprovados.
- JSON/webmanifest: 4 arquivos válidos.
- HTML: 192 IDs únicos; nenhum ID duplicado.
- Referências de CSS/JS locais: nenhuma referência inexistente encontrada.
- Versões: referências no `index.html` alinhadas com `sw.js` para `app.js`, `biblia.js`, `biblia.css`, `biblia-leitor.js` e `biblia-leitor.css`.
- CSS: parser `tinycss2` não encontrou erros sintáticos em `biblia.css` e `biblia-leitor.css`.

## Testes não concluídos
- A execução de Playwright/Chromium foi tentada, mas o ambiente bloqueou a abertura local com `ERR_BLOCKED_BY_ADMINISTRATOR`. Não foi possível confirmar o resultado visual real nem concluir os cliques de menu, carregamento de capítulo ou gestos no navegador.
- Safari/iPhone e as larguras 320/360/390/412 px continuam exigindo validação manual após aplicar o ZIP.

## Importante
Esta entrega é uma correção de integração baseada no ZIP fornecido. Não foi feita publicação, commit, alteração de branch ou mudança de workflow.
