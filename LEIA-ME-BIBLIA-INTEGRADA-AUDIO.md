> **AVISO DE VERSÃO — DOCUMENTO HISTÓRICO:** este arquivo preserva decisões e instruções de uma etapa anterior. A atualização de qualidade de 19/10/2026 substitui as instruções sobre importação automática da Bíblia. O workflow de Bíblia está desativado e os textos integrais aguardam autorização editorial confirmada. Não execute os passos antigos deste documento para importar ou publicar uma tradução.

# Ovelia — Bíblia integrada e áudio multilíngue

## Bíblia dentro dos estudos

O leitor e os estudos agora usam a mesma fonte local: arquivos JSON gerados em `dados/biblia/`. As passagens das lições são resolvidas pela referência (livro, capítulo e versículos), e o texto aparece diretamente no passo do estudo quando os dados estão presentes. Não é necessário copiar o texto manualmente em cada lição.

### Como os arquivos bíblicos são gerados

O repositório contém o workflow `.github/workflows/atualizar-biblia.yml`. Depois que os arquivos desta atualização forem enviados à branch `main` ou `master`, o GitHub Actions tentará baixar os arquivos USFM da Bíblia Portuguesa Mundial no eBible.org, validar a presença dos 73 livros e gerar `dados/biblia/*.json`. Também é possível executá-lo manualmente em GitHub → Actions → **Atualizar Bíblia** → **Run workflow**.

Se o workflow falhar, abra a execução em Actions e consulte o log. Confira se Actions está habilitado e se o workflow tem permissão de gravar conteúdo no repositório. Não publique uma Bíblia parcial como se estivesse completa. Os dados JSON são excluídos do cache do service worker para que o conteúdo não fique preso a uma versão antiga.

### Fonte e limite editorial

Fonte: https://ebible.org/find/details.php?id=porbrbsl

O eBible.org identifica a Bíblia Portuguesa Mundial (BPM) como domínio público, mas também informa que a tradução está em revisão. A Ovelia deve exibir essa informação e não afirmar que a tradução recebeu aprovação oficial da Igreja Católica. Se futuramente for desejada uma edição católica de uso editorial específico, solicite autorização por escrito ao titular dos direitos da tradução escolhida antes de incorporar o texto integral.

## Vozes de leitura

O navegador só pode listar vozes reais fornecidas pelo sistema operacional/navegador. A Ovelia não deve criar nomes de vozes fictícias. A voz selecionada agora fornece também o idioma da fala, em vez de forçar sempre `pt-BR`; isso permite testar vozes em inglês ou outros idiomas quando o texto da página tiver sido traduzido pelo navegador.

Para obter duas ou três vozes brasileiras garantidas em todos os aparelhos, será necessário integrar um serviço TTS externo ou incluir gravações autorizadas. Isso pode exigir conta, chave de API, limites e/ou custo; não é possível garantir vozes extras apenas com JavaScript no site estático. No iPhone, a lista depende das vozes instaladas/disponíveis no iOS.

## Validações desta atualização

- Ajustado o idioma do `SpeechSynthesisUtterance` para acompanhar a voz selecionada.
- Estudos passam a tentar carregar cada referência bíblica do JSON local.
- Workflow pode executar após atualização de código ou manualmente.
- Ainda é necessário publicar em repositório, aguardar o workflow, abrir o site e testar leitura, referências e áudio em iPhone/Android/desktop.
