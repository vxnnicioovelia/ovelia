# Relatório técnico — Leitor bíblico estilo Kindle

## Alterações
- `index.html`: adiciona estrutura do leitor e carrega os novos arquivos CSS/JS.
- `biblia.css`: acrescenta estilos de leitura dentro da nova área, mantendo o conteúdo original.
- `biblia-leitor.css`: nova camada visual do leitor em tela inteira.
- `biblia-leitor.js`: interface, sincronização com o motor atual, menu de livros/capítulos, preferências locais e navegação por gestos.
- `sw.js`: cache do PWA versionado e novos arquivos adicionados ao shell.

## Preservação
- `biblia.js` não foi alterado.
- `favoritos.js`, `interface.js`, conteúdo, catálogo de livros, sequência do Terço/Rosário e dados dos Estudos foram mantidos.
- Não foram adicionadas dependências externas.
- Não houve commit nem publicação.

## Verificações executadas
- `node --check` aprovou `biblia.js`, `biblia-leitor.js`, `favoritos.js`, `interface.js`, `app.js` e `navegacao-inferior.js`.
- As referências aos novos arquivos estão presentes em `index.html` e no `sw.js`.
- Cache PWA alterado para `ovelia-shell-v43-20261024-kindle-reader`.
- Os novos arquivos estão previstos para a raiz, compatíveis com o caminho `/ovelia/`.

## Não executado
- Nenhum teste automatizado real no Safari/iPhone.
- Não foi executado Playwright/Chromium; a aparência final, a seleção de capítulo, os gestos e a integração com links dos Estudos ainda precisam ser confirmados no navegador.
- Testes de contraste e comportamento táctil em 320/360/390/412 px permanecem pendentes.
