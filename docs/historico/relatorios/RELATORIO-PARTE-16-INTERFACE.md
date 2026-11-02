# Relatório — Parte 16: interface de leitura bíblica

## Alterações

- `biblia.js`: agrupamento dos controles existentes num painel recolhível acessível por botão, sem renomear IDs usados pelas funções de tradução, fonte, espaçamento e tema.
- `biblia.css`: melhorias de tipografia responsiva, espaçamento, foco visível, rolagem e área livre no fim da seção para reduzir a sobreposição com a navegação fixa.
- `index.html`: atualização das versões de `biblia.css` e `biblia.js`.
- `sw.js`: atualização do nome do cache e das versões de CSS/JS no shell.

## Testes executados

- `node --check biblia.js`: aprovado.
- `node --check sw.js`: aprovado.
- Conferência das versões: `index.html` e `sw.js` apontam para `20261023-leitura-mobile1` nos dois arquivos.
- Revisão dos arquivos: IDs originais do leitor foram preservados; a alteração apenas envolve os controles existentes num contêiner.

## Limitação

Foi tentada uma execução Chromium headless contra uma cópia local, mas o processo não concluiu dentro do limite do ambiente e não gerou DOM verificável. Portanto, não declaro aprovação de teste visual/funcional em navegador. O teste em Safari no iPhone é necessário depois de aplicar os quatro arquivos no GitHub Pages.

## Preservação

Não foram alterados os textos bíblicos, o catálogo, a navegação entre capítulos, a lista de livros, as outras traduções, a Liturgia, o Terço, as Orações, os Estudos ou os perfis. Não houve publicação nem commit.
