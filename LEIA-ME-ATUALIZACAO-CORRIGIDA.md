# Ovelia — pacote completo corrigido

Este pacote foi preparado a partir do ZIP enviado para revisão. Ele mantém a estrutura e os recursos existentes e acrescenta um calendário mensal integrado à seção Liturgia.

## O que foi corrigido

- Os fluxos do GitHub Actions agora ficam em `.github/workflows/`, local onde o GitHub os reconhece.
- Os geradores de liturgia e Bíblia agora ficam em `tools/`, correspondendo aos caminhos chamados pelos fluxos.
- O fluxo da liturgia grava somente referências e metadados por padrão, sem copiar automaticamente o texto integral das leituras da API comunitária.
- A data de referência da liturgia usa `America/Sao_Paulo` para evitar divergências quando o fuso do aparelho é diferente.
- O calendário mensal permite navegar entre meses e anos, selecionar uma data, ir para hoje e destacar hoje/data selecionada. Ele reutiliza o campo de data e o evento já existente no site, sem substituir o mecanismo de consulta de liturgia.
- A navegação do calendário valida datas e respeita anos bissextos; não inventa leituras quando a fonte não fornece dados.

## Instalação no iPhone

1. Baixe este ZIP e salve em **Arquivos → No Meu iPhone**, se o iCloud mostrar erro de sincronização.
2. Toque no ZIP para descompactar.
3. A pasta `ovelia` dentro do ZIP contém o site completo. Envie os arquivos e pastas mantendo a estrutura, incluindo `.github/workflows/` e `tools/`.
4. Antes de substituir o site publicado, mantenha uma cópia do conteúdo atual do repositório.
5. Após o envio, confira a página inicial, navegação, acessibilidade, orações, terço, estudos, área infantil, calendário e consulta da liturgia.

## Limites da verificação

- Os arquivos JavaScript foram validados com `node --check` e o ZIP foi verificado estruturalmente.
- Foram feitas verificações estáticas de referências a scripts, estilos e arquivos de workflow.
- A API comunitária e o comportamento real no Safari/iPhone não puderam ser testados de ponta a ponta neste ambiente.
- Não foi feita publicação nem alteração direta no GitHub.
- A pasta `dados/biblia/` não acompanha textos bíblicos gerados; o workflow da Bíblia precisa ser executado manualmente no GitHub Actions para gerar os dados, e o resultado deve ser revisado antes de ser considerado pronto.
