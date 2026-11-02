# Correção localizada — Jornada de Estudos

Este pacote usa a organização de arquivos compatível com o repositório publicado: os arquivos da Jornada ficam na raiz do site, junto ao `index.html`.

## Arquivos da jornada alterados/adicionados na raiz
- `index.html`: referências dos arquivos de Estudos apontam para a raiz.
- `estudos.css`, `regras.js`, `progresso.js`, `interface.js`, `trilha.js`, `licoes-001-010.js`: cópias dos arquivos da jornada para os caminhos efetivamente usados no repositório.
- `interface.js`: o carregamento sob demanda de lotes futuros usa a raiz (`licoes-AAA-BBB.js`).

O pacote contém o site completo. Envie o conteúdo desta pasta para a raiz do repositório, mantendo todos os arquivos já existentes. Esta correção ainda precisa ser validada no GitHub Pages depois da publicação.
