# Relatório — Bíblia integrada, estudos e áudio

## Mudanças no código

1. **Bíblia nos estudos:** `biblia.js` expõe um resolvedor de referências. O passo 2 da jornada tenta carregar os versículos indicados de `dados/biblia/` e exibi-los no próprio estudo.
2. **Sincronização dos dados:** o workflow `Atualizar Bíblia` executa após atualizações de código em `main`/`master` e também pode ser executado manualmente em Actions. O gerador existente valida a presença dos livros e capítulos esperados antes de gravar os dados.
3. **Áudio:** a fala usa o idioma informado pela voz selecionada. As vozes em português continuam aparecendo primeiro; vozes em outros idiomas podem ser úteis quando o navegador traduz o conteúdo da página.
4. **Cache:** a versão do service worker foi atualizada e os JSON de conteúdo continuam excluídos do cache do shell.

## Fonte e licenciamento

A Bíblia Portuguesa Mundial (BPM) é identificada pelo eBible.org como domínio público, mas ainda em revisão. Fonte: https://ebible.org/find/details.php?id=porbrbsl. A interface informa essa condição e não declara aprovação oficial da Igreja Católica.

## O que foi verificado

- `node --check` nos arquivos JavaScript modificados e nos arquivos JavaScript do projeto.
- Presença das rotas e arquivos referenciados pelo HTML.
- Versões dos arquivos no HTML e no service worker.

## O que ainda precisa de teste real

- Publicar no GitHub e confirmar que o workflow conclui e cria `dados/biblia/`.
- Conferir alguns trechos conhecidos em livros do Antigo e Novo Testamento, incluindo livros deuterocanônicos.
- Testar áudio em iPhone, Android e computador; selecionar vozes pt-BR e uma voz inglesa com página traduzida pelo navegador.
- Testar interface, pintura Kids, contraste e responsividade em telas pequenas.

## Limitação das vozes

O site só pode listar vozes reais disponíveis no dispositivo. O código não inventa vozes. Para garantir duas ou três vozes brasileiras em todos os dispositivos, será necessário adotar TTS externo (avaliando custos, privacidade e termos) ou incorporar gravações licenciadas.
