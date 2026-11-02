# Relatório — Parte 1: integridade dos arquivos e automação

Fonte de verdade auditada: ZIP recebido `ovelia-main 7(1).zip` (88 entradas ZIP, incluindo diretórios; 82 arquivos regulares).
Nenhum commit, publicação, download de tradução ou workflow de importação foi executado.

## Resultado principal

- `.github/workflows/liturgia-diaria.yml` chamava `node tools/gerar-liturgia.mjs`, mas esse arquivo tinha 1 byte. Corrigido para `node gerar-liturgia.mjs`, cujo gerador existe na raiz (6876 bytes).
- O workflow de Bíblia em `.github/workflows/atualizar-biblia.yml` tem 1 byte e não contém gatilhos nem etapas; permanece sem uso nesta Parte 1.
- O CACHE do service worker foi incrementado para `ovelia-shell-v28-20261023-integrity1` para invalidar o cache antigo. Nenhum CSS/JS do app foi alterado, então os `?v=` de `index.html` permanecem pareados com o SHELL.
- O carregador de lições em `interface.js` continua tentando primeiro `licoes-001-010.js` na raiz e depois `estudos/dados/licoes-001-010.js`; a cópia da raiz tem 36265 bytes e contém o lote. A cópia em subpasta tem 1 byte e pode ser apagada depois de decisão do usuário.
- `biblia.js` usa `LICENCA_TEXTO_CONFIRMADA = false`; a pasta `dados/biblia/` não existe. Não alterado nesta Parte 1.

## Validações executadas

- `node --check` em arquivos JS/MJS: 23 aprovados; 0 falhas.
- JSON e manifest: 1 válidos; 0 inválidos.
- IDs duplicados no `index.html`: nenhum
- Arquivos referenciados no SHELL do `sw.js` ausentes: nenhum
- Gerador da liturgia executado contra uma API local simulada: gerou JSON e índice para 2026-10-23 com marcador explícito `DADO FICTÍCIO PARA TESTE`; os arquivos de teste ficaram em `/tmp`, fora do pacote.
- Teste real de interface no Chromium/Playwright em 390 px: tentado, mas o navegador do ambiente bloqueou acesso ao servidor local (`ERR_BLOCKED_BY_ADMINISTRATOR`). Portanto, navegação visual, três perfis, tema claro/escuro e console não foram validados visualmente.
- Rede externa indisponível no shell; API pública real não foi consultada.

## Arquivos vazios (1 byte)

| Arquivo | Referenciado por | Decisão nesta Parte 1 |
|---|---|---|
| `.github/workflows/atualizar-biblia.yml` | nenhum dos três (index.html, sw.js, workflows) | Manter fora de uso por ora |
| `estudos/dados/licoes-001-010.js` | sw.js SHELL | Pode apagar após confirmação |
| `gerar-biblia.mjs` | atualizar-biblia.yml | Pode apagar após confirmação |
| `tools/gerar-biblia.mjs` | atualizar-biblia.yml | Pode apagar após confirmação |
| `tools/gerar-liturgia.mjs` | .github/workflows/liturgia-diaria.yml, liturgia-diaria.yml | Pode apagar após confirmação |

## Duplicados e cópias antigas

- `atualizar-biblia.yml` (raiz, 1635 bytes) é uma cópia solta; o GitHub Actions só reconhece workflows dentro de `.github/workflows/`.
- `liturgia-diaria.yml` (raiz, 1631 bytes) é uma cópia solta; a versão ativa é `.github/workflows/liturgia-diaria.yml`. A cópia da raiz não foi alterada nem apagada.
- `gerar-liturgia.mjs` (raiz, 6876 bytes) é o gerador existente e passa a ser chamado pelo workflow ativo. `tools/gerar-liturgia.mjs` (1 byte) não é necessário para esse workflow.
- `licoes-001-010.js` na raiz é o lote de lições confiável nesta versão. O carregador mantém fallback retrocompatível para `estudos/dados/`.
- A raiz contém vários `LEIA-ME*` e relatórios históricos; não foram apagados. Veja inventário completo abaixo.

## Inventário completo (todos os arquivos regulares do ZIP)

| Arquivo | Bytes | Referências diretas em index/sw/workflows |
|---|---:|---|
| `.github/workflows/atualizar-biblia.yml` | 1 | — |
| `.github/workflows/liturgia-diaria.yml` | 816 | — |
| `404.html` | 1402 | — |
| `ARQUIVOS-MODIFICADOS.md` | 878 | — |
| `CHECKSUMS-ESTRUTURA.txt` | 6479 | — |
| `CHECKSUMS.txt` | 110 | — |
| `INSTRUCOES-TESTE-MANUAL.md` | 1344 | — |
| `LEIA-ME-ATUALIZACAO-CORRIGIDA.md` | 2747 | — |
| `LEIA-ME-ATUALIZACAO.md` | 2530 | — |
| `LEIA-ME-BIBLIA-INTEGRADA-AUDIO.md` | 3399 | — |
| `LEIA-ME-BIBLIA.md` | 2867 | — |
| `LEIA-ME-CORRECAO-ESTUDOS.md` | 829 | — |
| `LEIA-ME-ETAPA2-CABECALHO.md` | 940 | — |
| `LEIA-ME-ETAPA2-NAVEGACAO.md` | 1575 | — |
| `LEIA-ME-LITURGIA-E-BIBLIA.md` | 1047 | — |
| `LEIA-ME-LITURGIA.txt` | 1334 | — |
| `LEIA-ME-NIVEIS-2-E-3.md` | 2303 | — |
| `LEIA-ME-NIVEL2.md` | 4114 | — |
| `LEIA-ME-PERFIS.txt` | 226 | — |
| `LEIA-ME-PUBLICACAO-GITHUB.md` | 1986 | — |
| `LEIA-ME-RECUPERACAO-1.md` | 1225 | — |
| `LEIA-ME-RECUPERACAO-2.md` | 1426 | — |
| `LEIA-ME-RECUPERACAO-3.md` | 2911 | — |
| `LEIA-ME-RECUPERACAO-4.md` | 4057 | — |
| `LEIA-ME.md` | 1729 | — |
| `LEIA-ME.txt` | 324 | — |
| `README.md` | 794 | — |
| `RELATORIO-ATUALIZACAO-AUDIO-KIDS.md` | 1973 | — |
| `RELATORIO-ATUALIZACAO-HOME-KIDS-CREATIVIDADE.md` | 2242 | — |
| `RELATORIO-AUDITORIA-20261022.md` | 2238 | — |
| `RELATORIO-BIBLIA-ESTUDOS-AUDIO.md` | 2570 | — |
| `RELATORIO-CORRECOES-USABILIDADE-20261022.md` | 2255 | — |
| `RELATORIO-TECNICO-CONTINUIDADE.md` | 2281 | — |
| `RELATORIO-TECNICO-FASE-ATUAL.md` | 3317 | — |
| `RELATORIO-TECNICO.md` | 6300 | — |
| `RESULTADOS-TESTES.md` | 1682 | — |
| `app.js` | 68044 | index.html, sw.js SHELL |
| `apple-touch-icon.png` | 39477 | index.html, sw.js SHELL |
| `atualizar-biblia.yml` | 1635 | — |
| `biblia.css` | 2375 | index.html, sw.js SHELL |
| `biblia.js` | 14408 | index.html, sw.js SHELL |
| `calendario-liturgico.css` | 1828 | index.html, sw.js SHELL |
| `calendario-liturgico.js` | 5585 | index.html, sw.js SHELL |
| `estilo.css` | 49840 | index.html, sw.js SHELL |
| `estudos.css` | 9847 | index.html, sw.js SHELL |
| `estudos/dados/licoes-001-010.js` | 1 | sw.js SHELL |
| `favicon-64.png` | 15265 | index.html, sw.js SHELL |
| `gerar-biblia.mjs` | 1 | atualizar-biblia.yml |
| `gerar-liturgia.mjs` | 6876 | .github/workflows/liturgia-diaria.yml, liturgia-diaria.yml |
| `icone-128.png` | 35673 | index.html, sw.js SHELL |
| `index.html` | 33228 | sw.js SHELL |
| `inicio-dados.js` | 10721 | index.html, sw.js SHELL |
| `inicio.css` | 6747 | index.html, sw.js SHELL |
| `inicio.js` | 3775 | index.html, sw.js SHELL |
| `interface.js` | 22446 | index.html, sw.js SHELL |
| `licoes-001-010.js` | 36265 | sw.js SHELL |
| `liturgia-diaria.yml` | 1631 | — |
| `liturgia.js` | 1218 | index.html, sw.js SHELL |
| `manifest.webmanifest` | 635 | index.html, sw.js SHELL |
| `navegacao-inferior.css` | 4643 | index.html, sw.js SHELL |
| `navegacao-inferior.js` | 4469 | index.html, sw.js SHELL |
| `nivel1.css` | 1031 | — |
| `nivel1.js` | 3595 | — |
| `nivel2.css` | 3460 | — |
| `nivel2.js` | 21167 | — |
| `nivel3.css` | 2380 | — |
| `nivel3.js` | 20749 | — |
| `ovelha-biblia.png` | 361802 | index.html |
| `ovelha.png` | 328656 | index.html |
| `ovelia-kids.js` | 23189 | index.html, sw.js SHELL |
| `ovelia-pwa.css` | 431 | index.html, sw.js SHELL |
| `ovelia-pwa.js` | 3167 | index.html, sw.js SHELL |
| `pomba.png` | 189470 | index.html |
| `progresso.js` | 5771 | index.html, sw.js SHELL |
| `pwa-192.png` | 62949 | sw.js SHELL |
| `pwa-512.png` | 288261 | sw.js SHELL |
| `regras.js` | 1818 | index.html, sw.js SHELL |
| `robots.txt` | 23 | — |
| `sw.js` | 2844 | — |
| `tools/gerar-biblia.mjs` | 1 | atualizar-biblia.yml |
| `tools/gerar-liturgia.mjs` | 1 | .github/workflows/liturgia-diaria.yml, liturgia-diaria.yml |
| `trilha.js` | 1763 | index.html, sw.js SHELL |

## Pode apagar (não apagado nesta entrega)

- `estudos/dados/licoes-001-010.js` (1 byte): cópia vazia; o arquivo da raiz tem as lições. O fallback pode permanecer no código para compatibilidade, mesmo que a cópia vazia seja removida.
- `tools/gerar-liturgia.mjs` (1 byte): deixou de ser chamado pelo workflow corrigido.
- `tools/gerar-biblia.mjs` (1 byte): vazio e não usado pelo workflow de Bíblia atualmente vazio.
- `gerar-biblia.mjs` (1 byte): vazio, sem uso identificado no `index.html`, `sw.js` ou workflows ativos.
- `atualizar-biblia.yml` e `liturgia-diaria.yml` na raiz: cópias soltas de workflows; não são workflows executáveis pelo GitHub Actions nesse local. Confirmar antes de apagar.
- `CHECKSUMS*`, relatórios e `LEIA-ME*` antigos: não apagados; podem ter valor de histórico, mas alguns podem estar desatualizados.
- `.github/workflows/atualizar-biblia.yml` (1 byte): mantido vazio e fora de uso, conforme instrução. Não é necessário apagá-lo para esta Parte 1.

## Arquivos para substituir / criar / apagar

- **Substituir:** `.github/workflows/liturgia-diaria.yml` usando o arquivo solto `CORRECAO-liturgia-diaria.yml` do ZIP (ver instruções de caminho abaixo).
- **Substituir:** `sw.js` (CACHE atualizado).
- **Criar:** nenhum arquivo de site novo.
- **Apagar agora:** nenhum arquivo. A lista “Pode apagar” acima é apenas recomendação para decisão do usuário.

## Como instalar o workflow pelo iPhone

1. No GitHub, abra `.github/workflows/liturgia-diaria.yml` e toque no lápis para editar.
2. Para usar o arquivo fornecido, crie/abra o arquivo no editor e coloque o conteúdo de `CORRECAO-liturgia-diaria.yml`.
3. Se o GitHub permitir renomear no campo do nome, use exatamente `.github/workflows/liturgia-diaria.yml`; confirme que ficou dentro de `.github/workflows/`.

Nota: o ZIP de alterações contém apenas arquivos soltos. O arquivo do workflow está nomeado `CORRECAO-liturgia-diaria.yml` para facilitar a identificação no iPhone.
