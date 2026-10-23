# Relatório único de regressão — Ovelia Parte 13
Data: 2026-10-23
Fonte: `ovelia-main(8).zip`, tratado como fonte de verdade. Nenhum commit, publicação, download de tradução ou workflow foi executado.

## Resumo
A auditoria estática foi executada. O teste funcional de navegador foi **bloqueado pelo ambiente**: o servidor local via `python3 -m http.server` respondeu HTTP 200, mas a navegação do Chromium/Playwright para `127.0.0.1` retornou `ERR_BLOCKED_BY_ADMINISTRATOR`. Não afirmo que o percurso funcional esteja aprovado.

## Testes estáticos executados
- `node --check`: 24 arquivos `.js` e 6 `.mjs`, todos aprovados.
- JSON: `catalogo-biblia.json`, `manifest.webmanifest`, `mapa-passagens.json` e `metadados-biblia.json` são JSON válidos.
- Referências locais em `index.html`: 39 referências verificadas, nenhuma ausente.
- SHELL do `sw.js`: 34 caminhos locais verificados, nenhum ausente.
- Arquivos vazios: nenhum.
- IDs HTML duplicados em `index.html`: nenhum (167 IDs analisados).
- Catálogo/validador bíblico: **bloqueado por dependência estrutural**. `node validar-biblia.mjs bpm /raiz` falha porque não existe `dados/biblia/catalogo.json` nesta fonte; existe `catalogo-biblia.json` na raiz. Não criei dados nem rodei importação para contornar isso.
- Verificação de `?v=` e cache: encontrei duas divergências entre `index.html` e `sw.js` (`inicio.css` e `inicio.js`). Corrigi as duas referências no `sw.js` para `v=20261023-parte8` e atualizei o nome do cache para `ovelia-shell-v34-20261023-regressao13`. A comparação após a correção não encontrou divergências nos arquivos CSS/JS compartilhados entre index e SHELL.

## Comparação com a fonte recebida
As funções existentes foram preservadas; a única mudança de execução foi corrigir duas versões antigas no SHELL do service worker e incrementar seu nome de cache: roteamento por hash, perfis `kids|adult|senior`, Início, Liturgia, Bíblia, Estudos, Orações/Terço, Favoritos, Pão Diário, Santo do Dia, Sobre e instalação PWA. A auditoria não comprova o comportamento em runtime.

## Matriz por função
| Área | Resultado |
|---|---|
| Sintaxe JS/MJS | aprovado em teste executado |
| JSON estático | aprovado em teste executado |
| Referências locais do `index.html` | aprovado em teste executado |
| SHELL do service worker e versões compartilhadas | aprovado em teste executado |
| IDs duplicados/arquivos vazios | aprovado em teste executado |
| Roteamento e navegação | bloqueado por ambiente (Playwright não abriu localhost) |
| Perfis nos 3 modos | pendente de teste manual |
| Tema claro/escuro | pendente de teste manual |
| Liturgia com API ok/fora do ar/data errada | não implementado nesta auditoria; requer testes funcionais simulados |
| Bíblia sem tradução/com base fictícia | parcial; catálogo não está no caminho esperado pelo validador e não foi criado dado fictício |
| Estudos, todas as lições | pendente de teste manual |
| Orações e Terço | pendente de teste manual |
| Pequenas Ovelias | pendente de teste manual |
| Favoritos e exportação | pendente de teste manual |
| Pão Diário | pendente de teste manual |
| Santo do Dia e Nomes Bíblicos | pendente de teste manual |
| Sobre e Instalar | pendente de teste manual |
| 320/360/390/412 px e desktop, console/404/rolagem horizontal | bloqueado por ambiente |
| Workflow/importação de Bíblia | não executado por instrução do proprietário |

## Limpeza segura — lista “pode apagar”
**Nenhum arquivo foi removido e não recomendo apagar arquivos com base apenas neste ZIP.** Os nomes `CORRECAO-liturgia-diaria.yml`, `atualizar-biblia.yml`, `workflow-importar-biblia.yml`, `gerar-biblia.mjs`, `importar-biblia.mjs`, e os pares de ferramentas em `tools/` parecem sobrepostos pelo nome, mas a dependência real de workflow/paths não foi executada nem rastreada de forma completa. Classificação: **não apagar até conferir referências e histórico do GitHub Actions**. Arquivos históricos `LEIA-ME-*` e `RELATORIO-*` também foram mantidos.

## Pendências prioritárias
1. Executar testes Playwright num ambiente que permita acessar o servidor local.
2. Corrigir/confirmar a origem do catálogo bíblico esperado por `validar-biblia.mjs` e executar o validador após a geração autorizada, sem baixar/importar traduções.
3. Rodar testes de API da liturgia com respostas simuladas e o percurso completo em todos os perfis, temas e larguras.
