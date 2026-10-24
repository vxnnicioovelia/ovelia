# Relatório — Parte 17: BPM, tema, filtro quente e Estudos

## Resultado das verificações executadas

| Verificação | Resultado | Observação |
|---|---|---|
| `node --check` nos arquivos JS/MJS da raiz | Aprovado | 33 arquivos verificados, nenhum erro de sintaxe. |
| JSON e webmanifest | Aprovado | 4 arquivos analisados, todos parseiam. |
| Referências locais de `index.html` | Aprovado | 58 referências examinadas; nenhuma referência local ausente. |
| Versões `?v=` dos seis recursos atualizados | Aprovado | `index.html` e `sw.js` coincidem em `estilo.css`, `inicio.css`, `estudos.css`, `biblia.js`, `inicio.js` e `interface.js`. |
| Remoção da barreira antiga de texto nos Estudos | Aprovado estaticamente | Não há mais referência a `licencaTextoConfirmada` em `interface.js`/`biblia.js`; a função usa `textoReferencia`. |
| Teste real em Safari/iPhone | Pendente | Não foi executado neste ambiente. |
| Teste visual em 320/360/390/412 px e desktop | Pendente | Não há navegador automatizado disponível nesta execução. |
| Requisição real de todas as passagens BPM e verificação de cobertura | Pendente | O carregamento depende da rede, do CORS e da disponibilidade da fonte remota; não foi validado capítulo por capítulo aqui. |
| Persistência e interação real do filtro quente/tema | Parcial | Lógica e sintaxe verificadas; necessita confirmação no navegador real. |

## Limitações e cuidado editorial

A fonte eBible.org identifica a BPM como domínio público, mas também informa que a tradução está em revisão. A aplicação consulta capítulos de uma edição técnica remota fixada. O catálogo permanece marcado como `em_preparacao` para não declarar a edição inteira editorialmente validada. Esta alteração libera consultas para Palavra do dia e Estudos usando o motor BPM já existente; não habilita nem incorpora as traduções Matos Soares ou Figueiredo.

## Teste manual recomendado no iPhone

1. Abrir `#biblia`, alternar o tema global e confirmar que o leitor acompanha o tema.
2. Em Ajustes de leitura, mover a intensidade de 0% a 45%; confirmar que o filtro cobre toda a tela e que 0% desativa.
3. Abrir Início e aguardar a Palavra do dia; confirmar que o trecho aparece ou que surge um aviso de rede sem texto inventado.
4. Abrir Estudos e chegar ao passo “Três versículos”; confirmar que cada referência carrega ou apresenta uma mensagem de falha compreensível.
5. Repetir no tema claro e escuro; conferir contraste, navegação inferior e rolagem.
