# Lista de arquivos — Ovelia Parte 13 + Bíblia

O ZIP não contém a aplicação inteira. Contém apenas arquivos alterados, com os nomes de preparação necessários para que todas as entradas fiquem soltas na raiz do ZIP.

## Substituir arquivos na raiz do repositório
- `index.html`
- `sw.js`
- `biblia.js`
- `catalogo-biblia.json`
- `validar-biblia.mjs`
- `importar-biblia.mjs`
- `interface.js`
- `gerar-biblia.mjs`
- `README.md`
- `RELATORIO-REGRESSAO-PARTE-13.md`
- `ROTEIRO-TESTE-IPHONE.md`

## Substituir/criar arquivos em subpastas
- `tools-gerar-biblia.mjs` → renomear e colocar em `tools/gerar-biblia.mjs` (substitui o arquivo vazio).
- `tools-gerar-liturgia.mjs` → renomear e colocar em `tools/gerar-liturgia.mjs` (substitui o arquivo vazio; encaminha ao gerador completo da raiz).
- `estudos-dados-licoes-001-010.js` → renomear e colocar em `estudos/dados/licoes-001-010.js` (substitui a cópia vazia de contingência).
- `.github-workflows-atualizar-biblia.yml` → renomear e colocar em `.github/workflows/atualizar-biblia.yml` (substitui o arquivo vazio; cria workflow manual).

## Arquivos removidos
**Nenhum.** Nenhum arquivo da aplicação foi apagado.

## Conteúdo bíblico real
O ZIP não contém a base integral da Bíblia Portuguesa Mundial. O gerador e o workflow estão preparados, mas a descarga oficial não foi possível neste ambiente. Não há versículos inventados no pacote. A BPM continua `em_preparacao` e o leitor não deve exibir texto integral até a base real ser importada, validada e explicitamente liberada.
