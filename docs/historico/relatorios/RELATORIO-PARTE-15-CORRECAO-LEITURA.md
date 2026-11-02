# Relatório — Parte 15: correção funcional da leitura bíblica

Data: 23/10/2026
Base auditada: arquivo enviado `ovelia-main 3(1).zip`.

## Causa identificada

No ZIP de base, `biblia.js` só considerava disponível uma tradução com `estado === 'disponivel'`. BPM estava registrada como `em_preparacao`, e não existia `dados/biblia/bpm/` com os arquivos previstos por `loadBook()`. Portanto, mesmo com navegação de livros e capítulos funcionando, o leitor nunca chegava ao carregamento de versículos. O aviso da interface refletia esse bloqueio.

## Correções realizadas

- BPM passa a ser elegível para leitura online por uma flag separada (`estadoLeitura: disponivel_online` e `fonteRemota: true`), preservando `estado: em_preparacao` como marcador editorial do snapshot.
- `loadBpmChapter()` busca um JSON do capítulo selecionado em uma versão fixada do espelho da BPM, valida formato, livro/capítulo e presença de texto, e adapta os versículos ao renderizador existente.
- A fonte primária é `raw.githubusercontent.com`; a alternativa é `cdn.jsdelivr.net`. Cada tentativa tem timeout de 8 segundos. Se ambas falharem, o leitor tenta Cache Storage e informa a falha caso o capítulo ainda não esteja salvo.
- `loadChapter()` e `textoReferencia()` usam a nova camada de carregamento por capítulo; as traduções sem conteúdo permanecem bloqueadas.
- Atualizados o aviso/creditação da página, as versões de `biblia.js` e `biblia.css` e o cache principal do service worker.
- Acrescentadas regras de contenção para o texto do leitor em tela pequena.

## Verificações realizadas

- `node --check`: 35 arquivos JavaScript/MJS sem erros de sintaxe.
- JSON/webmanifest: 4 arquivos parseados sem erros.
- Mapeamento local do leitor: 73 livros; 73 códigos mapeados; 73 entradas de catálogo; sem faltas.
- Contagem de capítulos: 73/73 coincide entre o catálogo local e a lista mapeada.
- IDs repetidos em `index.html`: nenhum.
- Referências de versão de `biblia.js` e `biblia.css`: correspondem entre `index.html` e `sw.js`.
- Fonte do espelho consultada via GitHub: conferidos exemplos reais de Gênesis 1 (31 versículos), Romanos 2 (29), Salmo 23 (6), Ester grego 1, Daniel grego 14, 1 Macabeus 16 e Apocalipse 22.

## Limitações que não foram ocultadas

- Teste visual/interativo no navegador: **bloqueado pelo ambiente**. Playwright falhou ao navegar para `127.0.0.1` com `ERR_BLOCKED_BY_ADMINISTRATOR`; Chromium headless também não produziu DOM e o serviço de rede encerrou/crashou. Não afirmo que o fluxo foi aprovado no Safari.
- A primeira consulta depende de uma conexão que permita uma das duas fontes. O cache é apenas por capítulo visitado e suportado pelo navegador; não é Bíblia offline completa.
- A página oficial do eBible consultada em 23/10/2026 informa que o código-fonte foi gerado em 20/10 a partir de fontes de 13/10/2026, ao passo que o espelho técnico empregado tem snapshot de 19/08/2026. Assim, o conteúdo funciona com um snapshot público, mas não é a edição-fonte mais recente e pode ter diferenças em relação à versão oficial atual.
- A BPM é domínio público segundo o eBible.org, mas é explicitamente um rascunho em revisão e não deve ser descrita como tradução com aprovação eclesiástica.

## Arquivos modificados

- `biblia.js`
- `catalogo-biblia.json`
- `index.html`
- `biblia.css`
- `sw.js`

Nada foi publicado nem commitado. As verificações do Safari/produção e a atualização para a revisão oficial de outubro seguem pendentes.
