# Ovelia — atualização do menu bíblico minimalista

## Fonte e licença da BPM
A página oficial do eBible.org identifica a Bíblia Portuguesa Mundial (BPM) como **Public Domain / domínio público** e informa que é um rascunho em revisão. A Ovelia pode reproduzir e incorporar o texto dessa tradução, identificando corretamente a fonte e a edição usada. Isso não libera automaticamente outras traduções.

A versão técnica que o código atual usa está fixada em 19/08/2026. A página oficial consultada foi atualizada em 08/10/2026; este pacote não troca o endpoint nem a edição técnica — apenas corrige a interface e a mensagem de licença.
Fonte: https://ebible.org/porbrbsl/copyright.htm
Detalhes e formatos: https://ebible.org/details.php?id=porbrbsl

## Arquivos a substituir na raiz
1. `index.html`
2. `app.js`
3. `biblia.js`
4. `biblia.css`
5. `sw.js`

Todos os arquivos do ZIP estão soltos. **Não apague nem substitua outros arquivos.** Não altere workflows.

## O que muda
- Remove o aviso incorreto de “autorização editorial pendente” para a BPM.
- Exibe aviso compacto com domínio público, fonte e data da edição técnica usada.
- O menu de livros começa recolhido, abrindo por “Escolher livro”.
- Dentro do menu, Antigo Testamento e Novo Testamento são seções recolhíveis.
- A busca abre automaticamente os grupos que têm resultados.
- Ao selecionar um livro, ele abre no capítulo 1 e o menu se fecha; o seletor de capítulo continua disponível no leitor.
- O painel “Ajustes de leitura” inclui o tema claro/escuro, tamanho de fonte, espaçamento e “Diminuir luz azul”.
- O controle de luz azul sincroniza com `#filtroQuente` e `#filtroIntensidade`, usando o filtro global existente para cobrir toda a tela.
- As versões dos arquivos e o cache do PWA foram atualizados.

## Como aplicar pelo iPhone
1. Baixe o ZIP e extraia os cinco arquivos de código.
2. No GitHub, abra cada arquivo na raiz e use o lápis para substituir pelo conteúdo do ZIP.
3. Faça as alterações arquivo a arquivo. Não use o editor para alterar workflows.
4. Depois de salvar/commitar, aguarde o GitHub Pages atualizar.
5. Feche o Safari completamente e reabra `https://vxnnicioovelia.github.io/ovelia/#biblia`.

## Teste manual obrigatório
- Abra “Escolher livro”; confirme que aparecem “Antigo Testamento” e “Novo Testamento” recolhidos.
- Abra Antigo Testamento e escolha Gênesis; confirme que o livro abre no capítulo 1 e o menu se fecha.
- Troque para outro capítulo pelo seletor; avance e volte.
- Reabra o menu, busque “Marcos”, escolha-o e confirme que os resultados aparecem e o livro abre.
- Abra “Ajustes de leitura”; alterne tema claro/escuro e confira contraste em título, versículos, botões, controles e créditos.
- Ative “Diminuir luz azul”, aumente e diminua a intensidade, confirme que a página inteira recebe o filtro e que os controles continuam clicáveis.
- Confirme que a preferência global de luz azul continua sincronizada com o botão Aa do cabeçalho.
- Confira Terço, Santo Rosário, Liturgia e Estudos sem alterações.
