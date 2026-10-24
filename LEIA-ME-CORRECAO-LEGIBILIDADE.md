# Ovelia — correção de legibilidade (hotfix 2026-10-23)

## Arquivos deste pacote
- `estilo.css` — reforça contraste dos textos no cartão de boas-vindas em tema claro/escuro e mantém o filtro quente global sobre a viewport.
- `biblia.css` — força cores legíveis dentro do leitor bíblico, respeitando o tema escuro próprio do leitor; reduz o impacto visual e alinha os botões de favorito junto à numeração do versículo.
- `index.html` — atualiza os parâmetros `?v=` de `estilo.css` e `biblia.css`.
- `sw.js` — invalida o cache antigo e atualiza as URLs desses estilos no shell.

## Escopo e preservação
A atualização é visual. Não modifica textos bíblicos, lógica de seleção de livro/capítulo, favoritos, armazenamento local, navegação, sequência do Terço ou conteúdo dos Estudos.

## Limitação importante: versículos usados nos Estudos
O ZIP de origem enviado nesta conversa **não contém a pasta `dados/biblia/` nem arquivos de capítulos da tradução BPM**. Ele contém o catálogo de traduções e o código do leitor, mas não os arquivos reais de capítulos que a validação e o leitor esperam buscar. Por isso, não incluí versículos bíblicos inventados nem removi mensagens de pendência nos Estudos. Para vincular os versículos reais, precisamos integrar os arquivos de capítulos BPM efetivamente usados pelo site publicado, confirmar a estrutura e só então mapear as referências das lições.

## Validação executada
- `node --check biblia.js`: aprovado.
- `node --check app.js`: aprovado.
- `node --check favoritos.js`: aprovado.
- Conferência estática: os parâmetros de versão de `estilo.css` e `biblia.css` estão alinhados entre `index.html` e `sw.js`.
- Teste visual real em Safari/iPhone: **pendente**. Não foi executado nesta etapa; aplicar o pacote e conferir os estados claro, escuro e filtro quente no dispositivo.

## Aplicação pelo iPhone
1. Faça download deste ZIP e extraia os quatro arquivos.
2. No GitHub, abra `estilo.css`, toque no lápis, substitua pelo arquivo do pacote e salve.
3. Repita para `biblia.css`, `index.html` e `sw.js`.
4. Aguarde o GitHub Pages publicar. Feche a aba da Ovelia e abra novamente; se estiver instalada como app, feche-a completamente antes de abrir.
5. Em `#biblia`, teste o tema claro da página, o tema escuro interno do leitor, o tema escuro geral e o filtro de leitura quente. Confirme que os textos permanecem legíveis e que os ícones de favorito não cobrem o texto.
6. Não altere nem exclua outros arquivos nesta etapa.

## Próxima etapa, após seu OK
Projetar o leitor bíblico estilo livro/Kindle com navegação por gesto lateral e transições, mantendo os controles de livro/capítulo acessíveis. Isso será separado deste hotfix de contraste.
