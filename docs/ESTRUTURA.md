# Estrutura do projeto

A aplicação é servida pelo GitHub Pages a partir da raiz. Os arquivos de implementação ficam separados por tipo em `assets/`; os dados ficam em `dados/` e `estudos/dados/`.

A raiz é reservada aos pontos de entrada e configurações do site estático. Novos relatórios e notas de versão devem ir para `docs/atualizacoes/`; ferramentas ficam em `tools/`; materiais antigos são preservados em `docs/historico/`.

Antes de mover recursos, atualize todos os caminhos que os carregam, incluindo o HTML de entrada, a página 404, o manifesto, estilos, scripts dinâmicos e o service worker.
