# Ovelia — estrutura real e publicação pelo iPhone

## Estrutura verificada neste ZIP
Os arquivos de execução do site ficam na raiz: `index.html`, `app.js`, CSS, JS, ícones, `manifest.webmanifest` e `sw.js`. As pastas presentes neste ZIP incluem `.github/workflows/`, `tools/` e `estudos/dados/`. **Não** há `dados/biblia/` neste ZIP, embora `validar-biblia.mjs` espere encontrar `dados/biblia/catalogo.json`; por isso, a validação de catálogo não pode passar com esta árvore sem a etapa de geração autorizada. Não executei geração nem workflow.

## Publicar pelo iPhone
1. Faça backup do ZIP/versão atual antes de editar.
2. No GitHub, abra o arquivo existente na raiz e toque no lápis para editar; ou use **Add file > Upload files** para arquivos novos soltos.
3. Para substituir, mantenha exatamente o nome e o caminho existentes. Não envie pastas.
4. Para arquivo destinado a uma pasta já existente, abra/crie o arquivo no GitHub, toque no lápis e altere o campo do nome para o caminho completo, por exemplo `.github/workflows/nome.yml`.
5. Confira o diff e só então toque em **Commit changes**. Esta atualização de documentação não foi publicada por mim.

## Regras de manutenção
- Preserve os IDs, classes, rotas `location.hash`, nomes de perfis e chaves de `localStorage`.
- Ao mudar CSS/JS, atualize o `?v=` correspondente no `index.html` e o nome de cache/SHELL no `sw.js`.
- Não habilite texto de tradução bíblica sem fonte, validação técnica e confirmação explícita do proprietário nesta conversa. Não execute workflows de importação sem autorização.
- Liturgia: preserve `LIT_MOSTRAR_TEXTO` em `app.js` e o aviso de direitos.
- Teste as rotas, perfis, tema, acessibilidade e rolagem após cada publicação manual.
