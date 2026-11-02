# Relatório de regressão — Ovelia Parte 13 + correções da Bíblia

**Base auditada:** `ovelia-main 2(1).zip` recebido nesta conversa, extraído sem substituir o projeto por uma reescrita.

**Resultado geral:** a correção estática e o caminho técnico da Bíblia foram preparados. A regressão completa de navegador continua pendente porque o Chromium deste ambiente bloqueia o endereço local com `ERR_BLOCKED_BY_ADMINISTRATOR`. Nenhum commit, publicação, workflow do GitHub Actions ou download de texto bíblico foi executado.

## Alterações incluídas

1. `biblia.js` agora lê `catalogo-biblia.json` na raiz, local onde esse catálogo realmente está; os dados de cada tradução continuam previstos em `dados/biblia/<id>/`.
2. `catalogo-biblia.json` registra para a Bíblia Portuguesa Mundial (BPM) a fonte oficial do eBible.org e a declaração de domínio público. O estado continua **`em_preparacao`**, pois a própria fonte avisa que a tradução é um rascunho em revisão e a base completa ainda não foi importada e validada.
3. `validar-biblia.mjs` e `importar-biblia.mjs` usam o catálogo canônico da raiz (com compatibilidade para o caminho antigo) e o validador real, sem chamar o caminho inexistente `tools/validar-biblia.mjs`.
4. O gerador USFM que estava vazio foi preenchido. Ele verifica os 73 livros, a quantidade de capítulos, a numeração dos versículos e os textos não vazios. Marcadores de versículos fora do padrão inteiro ou lacunas interrompem a geração; o código não ativa a tradução.
5. Foi preparado um workflow manual em `.github/workflows/atualizar-biblia.yml` para baixar a fonte oficial, gerar e validar os arquivos. Ele não foi iniciado; a tradução permanecerá em preparação mesmo depois de eventual geração estruturalmente aprovada.
6. `index.html` não contém mais as duas sequências literais `\n` nos pontos de inclusão de CSS/JS. Os parâmetros `?v=` modificados e o nome do cache do `sw.js` foram sincronizados.
7. O shell do service worker agora inclui todas as referências locais de CSS/JS/imagens/manifest do `index.html` e os lotes de Estudos utilizados por carregamento dinâmico. Os feeds `.json` continuam excluídos do cache genérico.
8. Em Estudos, o total do módulo conta as lições realmente cadastradas, sem mexer nos IDs das lições ou nas chaves de progresso. A cópia de `estudos/dados/licoes-001-010.js`, que estava vazia, foi restaurada a partir do lote existente na raiz.
9. `tools/gerar-liturgia.mjs`, antes vazio e chamado pelo workflow existente, agora encaminha para o gerador completo da raiz. As travas de texto integral/licença no gerador original foram preservadas. Nenhum workflow foi executado.

## Testes realmente executados

| Verificação | Resultado | Observação |
|---|---|---|
| Sintaxe Node.js | **Aprovado** | 34 arquivos `.js`/`.mjs` passaram em `node --check`. |
| JSON e webmanifest | **Aprovado** | 4 arquivos passaram pelo parser JSON. |
| Referências locais em `index.html` | **Aprovado** | 42 referências locais encontradas; os arquivos existem. |
| IDs duplicados em `index.html` | **Aprovado** | 178 IDs únicos; nenhum duplicado. |
| Sequências literais `\n` no HTML | **Aprovado** | Nenhuma ocorrência restante. |
| Shell do service worker | **Aprovado estaticamente** | Todas as referências locais usadas no `index.html` também estão no shell; todas as entradas locais existem. O cache foi incrementado. |
| Catálogo da Bíblia | **Aprovado estruturalmente** | 73 livros, códigos e números de capítulos correspondem aos 73 livros definidos em `biblia.js`; fonte/licença da BPM registradas. |
| Auto-teste do parser USFM | **Aprovado** | Testa capítulo, versículos, cabeçalho e remoção de nota com uma fixture sintética. |
| Simulação isolada do gerador + validador | **Aprovado** | 73 arquivos de teste sintéticos gerados em pasta temporária; nenhum versículo real ou fictício foi incorporado ao projeto/ZIP. A BPM permaneceu `em_preparacao`. |
| Validação da base real `node validar-biblia.mjs bpm .` | **Pendente/bloqueada por ausência de dados** | A ferramenta reconhece o catálogo, mas não encontra `dados/biblia/bpm/indice.json` nem os 73 livros. Resultado esperado nesta fonte: reprovado até importar a base real. |
| Download do pacote USFM oficial | **Não concluído** | O ambiente falhou na resolução DNS para `ebible.org`; nenhum texto bíblico foi baixado ou incluído. |
| Chromium/Playwright | **Bloqueado pelo ambiente** | O `localhost:8777` respondeu HTTP 200 via `curl`, mas Chromium retornou `ERR_BLOCKED_BY_ADMINISTRATOR`; por isso, não afirmo teste funcional de interface. |

## Matriz das áreas do produto

| Área | Situação após esta entrega |
|---|---|
| Home, links e recursos locais | Validado estaticamente; comportamento no navegador pendente |
| Três perfis e troca de perfil | Pendente de teste manual no iPhone |
| Temas claro/escuro, leitura e acessibilidade | Pendente de teste manual |
| Bíblia: catálogo, origem, licença e bloqueio de texto | Alteração validada estaticamente; fluxo real no navegador pendente |
| Bíblia: 73 livros de texto integral | **Não disponível nesta entrega**; fonte USFM não foi baixada e os arquivos reais não existem no ZIP base |
| Estudos e contagem dos módulos | Correção estática aprovada; percurso por lições/progresso pendente |
| Liturgia, API válida/falha/data incorreta | Código existente preservado; simulação funcional no navegador pendente |
| Workflow de geração da Liturgia | Compatibilidade estática corrigida; não executado |
| Orações e Terço | Pendente de teste manual |
| Favoritos e Pão Diário | Pendente de teste manual |
| Santo do Dia, Nomes Bíblicos, Sobre e Instalar | Pendente de teste manual |
| PWA offline, instalação e limpeza de cache | Shell/versionamento validado estaticamente; teste no aparelho pendente |
| Larguras 320/360/390/412 px e desktop; rolagem horizontal | **Não testado no navegador** por bloqueio do Chromium |

## Não foi feito

- Não alterei `LIT_MOSTRAR_TEXTO` em `app.js` nem removi o aviso editorial de direitos da Liturgia.
- Não marquei a BPM como `disponivel` e não ativei Matos Soares ou Figueiredo.
- Não gerei versículos de exemplo para serem exibidos como Escritura.
- Não excluí arquivos antigos ou workflows duplicados sem análise de dependências.
- Não publiquei, não fiz commit e não executei Actions.

## Próximas etapas seguras

1. Coloque os arquivos nos caminhos exatos da tabela do `README.md` e confira o diff antes de fazer o commit manual.
2. Teste primeiro a navegação e os três perfis no iPhone; confira Bíblia, Estudos, Liturgia, Orações/Terço, Favoritos, Pão Diário e instalação.
3. Quando decidir iniciar o workflow manual da BPM, revise o resultado. Se o formato USFM apresentar marcador de versículo incomum, falta de livro ou diferença de capítulos, não contorne a falha: ajuste o parser com base no arquivo-fonte e rode a validação novamente.
4. Mesmo após a importação aprovada, deixe `estado: "em_preparacao"` até haver confirmação explícita para liberar o texto no leitor.
