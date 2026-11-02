# Ovelia — correção da integração do leitor bíblico

## Diagnóstico da versão recebida
O ZIP recebido continha `biblia-leitor.js` e `biblia-leitor.css`, mas o `index.html` não continha o elemento `#bibliaLeitorUX` e não carregava esses arquivos. Por isso, o leitor estilo Kindle não era iniciado; a tela mostrava a interface bíblica tradicional das capturas. O `sw.js` também não incluía os arquivos novos no shell do PWA.

Também foi corrigida a ordem de inicialização do leitor: a lista de livros é carregada antes de tentar descobrir o livro/capítulo atual.

## Arquivos a substituir na raiz do repositório
- `index.html`
- `biblia-leitor.js`
- `biblia-leitor.css`
- `sw.js`

O ZIP não contém outros arquivos do site. **Não apague nem substitua `app.js`, `biblia.js`, `favoritos.js` ou qualquer arquivo de oração/estudo.** O motor bíblico continua sendo o existente.

## Comportamento esperado após aplicar
1. Tocar em **Bíblia** abre o leitor imersivo em tela inteira, em vez de deixar a interface antiga como experiência principal.
2. O botão superior abre a seleção: **Antigo Testamento / Novo Testamento → livro → capítulo**.
3. Ao selecionar o capítulo, o painel fecha e o texto é carregado pelo motor `biblia.js` existente.
4. Os botões Anterior/Próximo e gestos laterais navegam entre capítulos.
5. O menu `Aa` concentra tamanho da letra, espaçamento, tema claro/escuro/quente e filtro de luz azul.
6. O filtro de luz azul usa o controle global existente (`#filtroQuente`, `#filtroIntensidade` e a chave local `ovelia-filtro-quente`) para afetar a tela toda.
7. O botão de voltar sai do leitor e retorna à tela de origem, quando conhecida.
8. Os favoritos são encaminhados aos botões originais do motor para manter o armazenamento existente.

## Instalação pelo iPhone
1. Faça backup do último `main` antes de alterar arquivos.
2. Baixe e extraia este ZIP.
3. Na raiz do GitHub, substitua os quatro arquivos listados acima pelo conteúdo do pacote.
4. Não modifique workflows, `app.js`, `biblia.js`, os dados bíblicos ou módulos de oração.
5. Salve as mudanças e aguarde a publicação do GitHub Pages.
6. Feche completamente o Safari e reabra `https://vxnnicioovelia.github.io/ovelia/#biblia`.
7. Se o app ainda mostrar a interface antiga, confirme primeiro que o commit publicado inclui `index.html` atualizado e os dois arquivos `biblia-leitor.*`. A instalação do PWA pode manter cache até atualizar o service worker.

## Limites
- Não foi feito commit nem publicação.
- O teste de navegador real foi bloqueado no ambiente de verificação por `ERR_BLOCKED_BY_ADMINISTRATOR`; não há confirmação visual automatizada da tela no Safari/iPhone.
- Testes de sintaxe, referências locais, IDs, JSON e parsing de CSS foram executados e estão relatados em `RELATORIO-CORRECAO-LEITOR-BIBLICO.md`.
