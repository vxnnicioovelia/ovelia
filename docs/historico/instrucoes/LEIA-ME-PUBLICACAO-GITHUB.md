# Ovelia — pacote corrigido para GitHub Pages

## Publicação pelo iPhone ou computador

1. Abra o repositório GitHub da Ovelia.
2. Entre em **Add file → Upload files**.
3. Extraia este ZIP antes de enviar: os arquivos `index.html`, `app.js`, `estilo.css` e as demais pastas devem ficar diretamente na raiz do repositório (não dentro de uma pasta extra).
4. Envie todos os arquivos e pastas deste pacote, mantendo a estrutura, inclusive `.github/workflows/`, `estudos/dados/`, `tools/` e `dados/liturgia/`.
5. Faça o commit das alterações.
6. Em **Settings → Pages**, confirme que a publicação usa a branch principal (`main`) e a pasta raiz (`/`), se esse for o método já configurado no repositório.
7. Em **Actions**, execute o workflow **Liturgia diária** manualmente uma vez. Ele também está agendado para rodar diariamente. A geração automática publica referências e metadados; textos integrais de leituras ficam desativados por padrão até haver autorização/licença documentada.
8. Aguarde o Pages terminar a publicação e abra o site. Se o iPhone mostrar uma versão antiga, feche a aba e reabra; se persistir, remova/atualize o app da tela inicial para renovar o cache.

## Verificações feitas neste pacote

- Sintaxe JavaScript verificada com `node --check` em todos os arquivos `.js` e `.mjs`.
- Referências locais de CSS/JS/imagens no `index.html` conferidas.
- Caminho da trilha bíblica conferido: `estudos/dados/licoes-001-010.js`.
- Workflow e script de geração da liturgia mantidos na estrutura esperada.

## Observações importantes

- Este é um site estático; não precisa de `npm install` nem de build.
- Não renomeie nem mova os arquivos de `estudos/dados/`, `tools/` ou `.github/workflows/`.
- O arquivo `dados/liturgia/.gitkeep` apenas mantém a pasta no repositório antes da primeira execução do workflow.
- Não publique traduções bíblicas ou textos integrais de liturgia sem verificar a licença de redistribuição.
