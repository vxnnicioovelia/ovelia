# Ovelia — Parte 15: corrigir a leitura bíblica

## Instalação no GitHub pelo iPhone

Esta atualização é baseada no ZIP `ovelia-main 3(1).zip`. Ela não foi publicada, não cria commits e não altera o repositório automaticamente.

**Substitua estes cinco arquivos na raiz (`/`) do repositório `ovelia`:**

1. `biblia.js`
2. `catalogo-biblia.json`
3. `index.html`
4. `biblia.css`
5. `sw.js`

Todos ficam soltos na raiz; não crie pastas novas. Não delete outros arquivos. Os documentos `LEIA-ME-PARTE-15-LEITOR-BIBLICO.md` e `RELATORIO-PARTE-15-CORRECAO-LEITURA.md` são para consulta e não precisam ser enviados ao site.

## O que esta versão faz

- habilita a BPM no leitor online, sem liberar as outras duas traduções que ainda não possuem arquivos/validação;
- busca apenas o capítulo selecionado e converte o formato de versículos para o formato que a Ovelia já renderiza;
- tenta uma segunda CDN se a fonte primária falhar;
- mantém em Cache Storage os capítulos efetivamente abertos, para reutilização sem conexão quando o navegador permitir;
- apresenta erro recuperável e botão de tentar novamente se não houver conexão nem cópia em cache;
- atualiza as referências de versão em `index.html` e o nome de cache em `sw.js`;
- preserva os IDs, a navegação, o armazenamento da posição e as outras áreas do site.

## Fonte e limitações

O texto é da **Bíblia Portuguesa Mundial (BPM)**, identificada pelo eBible.org como domínio público e ainda em revisão. A base JSON usada para o carregamento por capítulo é um espelho técnico fixado no commit `ff8c1b95abd6a70c3bf83ca3467b22fe660fe745`, derivado do pacote-fonte eBible de 19/08/2026. A página oficial consultada em 23/10/2026 já indica uma atualização de fonte de 13/10/2026; portanto, o espelho é um snapshot anterior, não a edição mais recente do eBible.

- Fonte oficial: https://ebible.org/find/details.php?id=porbrbsl
- Licença declarada: https://ebible.org/porbrbsl/copyright.htm
- Pacote oficial USFM: https://ebible.org/Scriptures/porbrbsl_usfm.zip

A primeira leitura de um capítulo exige internet. Só capítulos que o navegador conseguiu salvar poderão ser consultados depois sem conexão. Esta atualização **não** empacota o texto inteiro no repositório.

## Como verificar após atualizar

1. Abra `https://vxnnicioovelia.github.io/ovelia/#biblia` no Safari.
2. Faça recarga completa ou feche e abra de novo a página para atualizar o cache.
3. Escolha Gênesis e confira se Gênesis 1 mostra versículos.
4. Escolha Romanos, mude para capítulo 2 e confira se o título passa a “Romanos 2” e aparecem os versículos.
5. Se a rede bloquear a fonte, deve aparecer erro legível e botão **Tentar novamente**, não um painel vazio.
6. Teste tamanho de letra, espaçamento e tema escuro.
7. Confirme que Início, Liturgia, Oração, Terço e Estudos continuam abrindo.

Não considere o teste concluído até verificar no próprio iPhone.
