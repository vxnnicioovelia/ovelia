# Relatório técnico — Correção integrada Ovelia

## Causa principal identificada no ZIP recebido
1. `ovelia-interface.css` existia na raiz, mas não era referenciado em `index.html`; assim, regras anteriores de tema neutro e contraste não eram aplicadas.
2. O CSS anterior tentou corrigir a saudação selecionando `.hero`, mas o HTML real utiliza `.home-saudacao`. Os títulos e parágrafos da saudação tinham cores brancas explícitas em `inicio.css`, por isso continuavam ilegíveis sobre fundos claros.
3. O texto dos versículos usa `.biblia-v` dentro de `.biblia-par`; uma regra no contêiner não garantia, por si só, que todos os elementos de texto dentro do capítulo herdassem a cor correta quando o tema escuro interno do leitor estava ativo.
4. A página `#oracoes` apresentava diretamente a biblioteca, sem um menu para encaminhar ao Terço guiado ou ao Santo Rosário. O motor do Terço existia na seção `#terco`, mas faltavam acessos claros a ele.
5. As categorias de orações infantis eram geradas sempre para todos os perfis, em vez de serem filtradas conforme o perfil ativo.

## Correções aplicadas
- Ligada `ovelia-interface.css` como última folha de estilo, para que os overrides prevaleçam.
- Variáveis dos temas claro/escuro explicitadas no `body`: claro branco, escuro grafite, roxo reservado a seleção/foco.
- Contraste corrigido nos elementos reais `.home-saudacao` e descendentes.
- Cores do texto bíblico corrigidas em descendentes `.biblia-par` e `.biblia-v`, considerando tanto o tema interno do leitor quanto o tema global.
- Filtro quente usa uma camada fixa em `html::after`, sem `mix-blend-mode`, com intensidade proveniente do controle existente; a camada não captura toques.
- Criado menu compacto com entradas Orações, Terço guiado e Santo Rosário.
- Criada seção de entrada `#rosario`, que encaminha ao motor já existente de oração por contas e preserva a sequência/progresso; não duplica a lógica do Terço.
- Categorias infantis são omitidas de perfis adulto e +60 e a lista é atualizada quando o perfil muda.
- Perfil infantil permanece bloqueado para Terço/Rosário/Bíblia adulta, incluindo a nova seção `#rosario`.
- Corrigidos dois caracteres literais `\n` que estavam embutidos na marcação HTML.
- Versões de CSS/JavaScript e nome do cache do service worker atualizados.

## Arquivos alterados
- `index.html`
- `app.js`
- `ovelia-interface.css`
- `sw.js`

## Testes executados
- `node --check`: 27 arquivos JavaScript/MJS do pacote passaram sem erros.
- JSON/webmanifest: 4 arquivos validados.
- HTML: 161 IDs identificados; nenhum duplicado.
- Links de âncora: nenhum hash interno quebrado.
- Referências locais em `index.html`: nenhum recurso referenciado ausente.
- CSS: `tinycss2` não reportou erros de parsing em nenhuma folha CSS do pacote.
- Confirmada a referência da nova folha `ovelia-interface.css` no HTML e no shell do PWA.
- Confirmadas as seções `#terco` e `#rosario` e o filtro das categorias infantis pelo perfil no código.

## Não verificado
- Não foi possível executar a interface no Safari do iPhone nesta etapa. Portanto, contraste ao vivo, camada de filtro na composição real do Safari e funcionamento com interação de toque ainda precisam de confirmação manual.
- Nenhum commit nem publicação foram realizados.
