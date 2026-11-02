# Relatório de referências bíblicas — Parte 6

Auditoria estática do lote `licoes-001-010.js` e do catálogo de 73 livros existente no `biblia.js`.

- Lições encontradas: **10/10**.
- Referências listadas nas lições: **30**.
- Referências com livro e capítulo reconhecidos pelo catálogo: **30/30**.
- Referências inválidas não reconhecidas: **nenhuma**.
- Caso negativo usado no teste do parser: `Gênesis 999` — rejeitado por capítulo fora do catálogo.
- Alias acrescentado: `Atos` é reconhecido como `Atos dos Apóstolos`.

**Limite da auditoria:** sem arquivos de texto de uma tradução disponível, não é possível validar se cada número de versículo existe na edição escolhida nem conferir diferenças de numeração entre edições. O parser valida o formato, o livro, o capítulo e a ordem do intervalo; referências sem validação continuam texto simples, sem link.

Nenhum texto bíblico foi baixado nem incluído neste pacote.
