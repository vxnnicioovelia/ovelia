# Ovelia — atualização de regressão, PWA e Bíblia

## O que esta atualização corrige
- Faz o leitor da Bíblia carregar o catálogo existente na raiz (`catalogo-biblia.json`) em vez de procurar um catálogo inexistente em `dados/biblia/catalogo.json`.
- Mantém os textos bíblicos em `dados/biblia/<id>/`, separados por tradução. A Bíblia Portuguesa Mundial (BPM) tem origem e declaração de domínio público registradas com links oficiais, mas continua `em_preparacao`.
- Corrige o validador/importador para usarem o catálogo canônico e o validador que realmente existe na raiz.
- Preenche o gerador USFM que estava vazio. Ele verifica os 73 livros e capítulos esperados antes de gravar; se encontrar marcadores de versículos ambíguos, lacunas ou incompatibilidades, interrompe sem habilitar texto incorreto.
- Acrescenta o workflow manual de preparação da BPM. Ele só será executado se alguém o iniciar no GitHub Actions; não foi executado nesta atualização. Mesmo quando funcionar, deixa a tradução `em_preparacao`.
- Corrige duas sequências `\n` que estavam como texto literal no HTML, sincroniza os parâmetros de versão e reestrutura o cache do service worker para incluir os recursos locais referenciados pela página.
- Ajusta o total apresentado em cada módulo de Estudos para contar as lições realmente existentes naquele módulo, sem alterar IDs de lições ou progresso salvo; restaura a cópia de contingência de `estudos/dados/licoes-001-010.js`, que estava vazia.
- Corrige o caminho do gerador de Liturgia chamado pelo workflow já existente: `tools/gerar-liturgia.mjs` encaminha para o gerador completo da raiz e preserva as travas de texto integral/licença; nenhum workflow foi executado.

## Bíblia: fonte e limite editorial
O eBible.org identifica a [Bíblia Portuguesa Mundial (BPM)](https://ebible.org/find/details.php?id=porbrbsl) como **Public Domain** e também avisa que a tradução é um rascunho em revisão. A [página oficial de direitos](https://ebible.org/porbrbsl/copyright.htm) sustenta o metadado de licença. Não inseri texto bíblico inventado nem marquei a BPM como disponível.

A pasta de dados real ainda não existe neste ZIP de origem. Portanto, o gerador e a validação estrutural estão preparados, mas a base completa de 73 livros **não está incluída nesta entrega**: o ambiente não conseguiu acessar a internet para baixar o pacote USFM. O workflow manual deve ser testado depois que os arquivos forem colocados nos caminhos indicados. Uma falha de conversão mantém a tradução em preparação; não se deve ignorar nem contornar a validação.

## Caminhos no GitHub — upload pelo iPhone
O ZIP de atualização é intencionalmente composto por arquivos soltos. Não envie os nomes de preparação como se fossem os caminhos finais.

| Arquivo solto no ZIP | Caminho final no repositório |
|---|---|
| `index.html` | substituir `index.html` na raiz |
| `sw.js` | substituir `sw.js` na raiz |
| `biblia.js` | substituir `biblia.js` na raiz |
| `catalogo-biblia.json` | substituir `catalogo-biblia.json` na raiz |
| `validar-biblia.mjs` | substituir `validar-biblia.mjs` na raiz |
| `importar-biblia.mjs` | substituir `importar-biblia.mjs` na raiz |
| `interface.js` | substituir `interface.js` na raiz |
| `gerar-biblia.mjs` | substituir `gerar-biblia.mjs` na raiz |
| `tools-gerar-biblia.mjs` | renomear para `gerar-biblia.mjs` e colocar em `tools/` |
| `tools-gerar-liturgia.mjs` | renomear para `gerar-liturgia.mjs` e colocar em `tools/` |
| `estudos-dados-licoes-001-010.js` | renomear para `licoes-001-010.js` e colocar em `estudos/dados/` |
| `.github-workflows-atualizar-biblia.yml` | renomear para `atualizar-biblia.yml` e colocar em `.github/workflows/` |
| `README.md` | substituir o `README.md` na raiz |
| `RELATORIO-REGRESSAO-PARTE-13.md` | substituir esse relatório na raiz |
| `ROTEIRO-TESTE-IPHONE.md` | substituir o roteiro na raiz |
| `LISTA-ARQUIVOS-ALTERADOS.md` | guardar junto dos arquivos alterados na raiz, como checklist da entrega |

Se o GitHub pelo iPhone não aceitar o caminho de uma subpasta no momento do upload, abra/crie o arquivo no repositório usando **Add file → Create new file**, informe o caminho completo no nome (por exemplo, `.github/workflows/atualizar-biblia.yml`) e cole o conteúdo. Confira o diff antes de confirmar.

## Não publicar automaticamente a tradução
- A BPM permanece `em_preparacao`, mesmo após geração e validação estrutural.
- O leitor não exibe textos de traduções em preparação.
- Só mude para `disponivel` depois de a base completa ter passado pela validação e de haver confirmação explícita do responsável nesta conversa.
- Matos Soares e Figueiredo continuam independentes e em preparação; esta atualização não importa textos dessas edições.
- Nenhum commit, publicação ou workflow do GitHub Actions foi executado por esta atualização.

## Testes feitos
Consulte `RELATORIO-REGRESSAO-PARTE-13.md` para os resultados reais, as limitações e os testes manuais ainda necessários.
