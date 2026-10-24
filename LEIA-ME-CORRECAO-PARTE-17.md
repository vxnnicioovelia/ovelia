# Ovelia — Correção de integração bíblica e leitura confortável

## Arquivos neste pacote

Substituir na raiz do repositório:
- `biblia.js`
- `inicio.js`
- `interface.js`
- `inicio.css`
- `estudos.css`
- `estilo.css`
- `index.html`
- `sw.js`

O ZIP de entrega contém somente os arquivos alterados, todos soltos na raiz. Não há arquivos para apagar.

## O que foi ajustado

- A BPM é usada pelo método de consulta de referências mesmo quando a interface ainda registra o catálogo editorial como `em_preparacao`; isso permite buscar referências sem declarar as outras traduções como disponíveis.
- Estudos passam a tentar carregar as passagens através do leitor bíblico existente, em vez de bloquear tudo por uma flag antiga `licencaTextoConfirmada`.
- A Palavra do dia tenta carregar o texto da referência na BPM. Se a rede/fonte falhar, mostra um aviso e não inventa conteúdo.
- O leitor acompanha o tema global claro/escuro do site. O botão de tema do leitor aciona o controle global existente.
- O leitor passa a ter apenas o controle de intensidade do filtro quente; 0% desativa o filtro. O valor é sincronizado com o controle global e mantém o armazenamento local existente.
- Contraste explícito para texto bíblico da Palavra do dia e dos Estudos em tema claro/escuro.
- Atualizados os parâmetros `?v=` dos arquivos alterados e o nome do cache no `sw.js`.

## Aplicação pelo iPhone

1. Faça backup/baixe o `main` atual antes de substituir arquivos.
2. No GitHub, abra cada arquivo listado na raiz, toque no lápis e substitua o conteúdo pelo arquivo correspondente deste pacote.
3. Faça isso para todos os oito arquivos e revise o diff antes de salvar.
4. Salve/commit apenas quando quiser publicar a atualização.
5. Depois da publicação, feche e reabra a Ovelia. Se continuar vendo a versão antiga, atualize a página e, se necessário, feche a aba instalada e abra novamente para o service worker novo assumir.

Não há arquivos para mover para pastas nem arquivos para apagar.
