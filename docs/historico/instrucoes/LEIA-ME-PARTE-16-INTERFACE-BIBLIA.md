# Ovelia — Parte 16: interface de leitura bíblica no celular

## Objetivo

Melhorar a leitura da BPM no iPhone sem alterar a fonte dos versículos, a seleção de livros/capítulos ou as demais áreas da Ovelia.

## Arquivos para substituir na raiz do repositório

1. `biblia.css`
2. `biblia.js`
3. `index.html`
4. `sw.js`

Todos os arquivos deste pacote estão soltos. Não apague outros arquivos nem crie pastas novas.

## O que muda

- No celular, as configurações de tradução, fonte, espaçamento e tema começam recolhidas em **Ajustes de leitura**, deixando o texto em primeiro plano. O botão expande/recolhe os ajustes.
- Em telas maiores, as configurações continuam abertas por padrão.
- Ajuste da tipografia e do espaçamento do texto para leitura confortável em telas estreitas.
- Mais área de rolagem no fim da seção Bíblia para o conteúdo não terminar atrás da navegação fixa inferior.
- Margens de rolagem para títulos e lista de livros, mantendo os elementos acessíveis após navegação.
- Versões de CSS/JS e cache do PWA atualizadas para evitar reaproveitar os arquivos antigos.

## Aplicação pelo iPhone

1. Abra o repositório `vxnnicioovelia/ovelia` no GitHub.
2. Abra cada arquivo listado acima, toque no lápis e substitua o conteúdo pelo arquivo correspondente do ZIP.
3. Salve cada alteração. Não mexa em outros arquivos nesta etapa.
4. Abra o site e recarregue. Se o visual antigo continuar, feche a aba do site e abra novamente; o cache do PWA foi versionado.

## Verificação manual recomendada

- Em iPhone, abra Bíblia e confirme que **Ajustes de leitura** começa recolhido.
- Expanda e altere fonte, espaçamento e tema escuro; confirme que cada opção continua funcionando.
- Abra Romanos 1, avance para Romanos 2 e use Voltar à lista de livros.
- Role até o fim da leitura e confirme que os botões inferiores podem ser alcançados acima da navegação fixa.
- Repita em 320–390 px e no perfil +60.

A atualização não muda o conteúdo da Bíblia nem ativa outras traduções. O teste final em Safari/iPhone deve ser feito após a aplicação no GitHub Pages.
