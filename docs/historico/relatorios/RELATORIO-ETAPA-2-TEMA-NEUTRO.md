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


## Correção posterior baseada na captura do iPhone
- Causa visual observada: o cartão de saudação ficou claro, mas alguns descendentes mantiveram texto branco.
- Correção: regras explícitas de contraste para títulos, parágrafos e textos auxiliares dentro de `.hero`, além de regras globais para componentes claros/escuros.
- Cache: nova versão `ovelia-shell-v41-20261023-contraste2` e nova query string do CSS.
- Ainda requer confirmação visual após aplicação no GitHub Pages; não foi possível executar Safari/iPhone nesta etapa.
