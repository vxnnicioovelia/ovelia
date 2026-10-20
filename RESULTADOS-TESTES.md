# Resultados dos testes — Atualização 1.1

- **APROVADO:** `node --check` em 25 arquivos JS/MJS, sem erros.
- **APROVADO:** 37 referências locais de HTML verificadas, sem destinos ausentes.
- **APROVADO:** manifesto JSON válido e ícones 192/512 presentes.
- **APROVADO:** 30 referências locais do service worker, sem arquivos ausentes.
- **APROVADO:** gerador com API simulada para cinco datas distintas, com datas conferidas.
- **APROVADO:** a trava dupla remove textos/refrões quando `LITURGIA_INCLUIR_TEXTO=sim` mas a autorização está `nao`.
- **APROVADO:** código de renderização só exibe textos se houver `textoIntegralAutorizado: true` e identificação de licença.
- **APROVADO:** integridade do ZIP final.
- **NÃO TESTADO:** renderização visual completa, responsividade visual do site completo, navegação real de calendário em navegador e teste físico em iPhone/Android.
- **NÃO TESTADO:** execução real do GitHub Actions e consulta de dados reais da API para três datas. Os testes de datas foram feitos com fixture local, não com conteúdo litúrgico real.
- **DEPENDÊNCIA EXTERNA:** autorização escrita para redistribuição integral dos textos.
