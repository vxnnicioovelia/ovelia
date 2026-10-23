# Relatório — Etapa 2: tema neutro

- Criado `ovelia-interface.css`, carregado por último para reduzir a dominância do roxo sem remover a identidade.
- Tema claro: fundos brancos, texto escuro, bordas cinza claras.
- Tema escuro: fundo `#17181C`, painéis `#202127`, texto claro e acentos lavanda.
- Ajustado o leitor bíblico para usar as superfícies globais, sem alterar `biblia.js`.
- Reduzida a opacidade máxima do filtro global de conforto de 0,34 para 0,16.
- `index.html` e `sw.js` atualizados para carregar a folha nova e renovar o cache.

## Preservação
Não foram alterados rotas, IDs, chaves de armazenamento, sequência do Terço, dados dos Estudos ou conteúdo litúrgico. Nenhum commit ou publicação foi feito.

## Verificação
As referências de CSS/cache foram conferidas estaticamente. Os testes visuais reais no Safari/iPhone ainda precisam ser feitos após aplicação. Alguns estilos hardcoded em módulos podem exigir ajustes específicos após observar as telas.
