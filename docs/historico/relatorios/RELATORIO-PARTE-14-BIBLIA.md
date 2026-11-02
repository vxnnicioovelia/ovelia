# Relatório — Parte 14: leitor bíblico e navegação móvel

## Alterações
- Catálogo de livros em cartões compactos, sem marcadores de lista, com layout de duas colunas e adaptação para uma coluna em telas estreitas.
- Painel de texto vazio ocultado quando não há versículos, evitando a faixa vazia sob o aviso.
- Mensagem de status mais direta: explica que faltam arquivos reais integrados/validados, sem sugerir que o texto já está disponível.
- Corrigida a comparação de limite de capítulo na navegação anterior/próximo para usar `chapterCount()`.
- Atualizadas as versões de `biblia.css` e `biblia.js` no `index.html` e no cache do service worker; cache incrementado.

## Verificações executadas
- `node --check biblia.js`: aprovado.
- `node --check sw.js`: aprovado.
- Referências e versão de cache: verificadas por inspeção dos arquivos.

## Não executado / pendente
- Não foi executado teste funcional em Safari/iPhone ou Playwright nesta etapa.
- Não foram importados textos bíblicos reais. O arquivo USFM oficial não foi anexado à conversa; sem ele, não é possível mostrar versículos completos.
- Nenhum commit ou publicação foi feito.

## Próximo passo para Bíblia completa
Anexar o ZIP USFM oficial. Importar para `dados/biblia/bpm/`, validar os 73 livros, capítulos e versículos (incluindo as seções deuterocanônicas de Ester e Daniel), revisar créditos/licença e só então ativar a tradução.
