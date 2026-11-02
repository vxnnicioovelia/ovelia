# Ovelia — Etapa 1 da repaginação visual

## Objetivo

Adicionar uma camada visual complementar, mobile-first, ao projeto atual sem reconstruir módulos nem alterar a lógica funcional. Esta etapa estabelece refinamentos globais e intervenções específicas para Início, Bíblia, Liturgia, Orações, Terço/Rosário, Estudos e perfis.

## Arquivos incluídos no ZIP

Todos os arquivos estão soltos para facilitar a aplicação pelo GitHub no iPhone:

1. `ovelia-interface.css` — **arquivo novo**, enviar para a raiz do repositório.
2. `index.html` — substitui o arquivo da raiz; contém apenas uma nova referência de CSS ao fim da lista de estilos.
3. `sw.js` — substitui o arquivo da raiz; inclui o novo CSS no shell do PWA e incrementa o nome do cache.
4. `LEIA-ME-ETAPA-1-REPAGINACAO.md` — estas instruções.
5. `RELATORIO-ETAPA-1-REPAGINACAO.md` — resumo técnico e testes.
6. `ROTEIRO-TESTE-MANUAL-ETAPA-1.md` — verificação após publicação.

## Aplicação segura pelo iPhone

1. Antes de começar, mantenha o ZIP atual como backup; não apague nem reorganize pastas.
2. No GitHub, abra o repositório `ovelia` e entre na raiz (pasta principal).
3. Adicione `ovelia-interface.css` usando **Add file / Upload files**.
4. Abra `index.html` no lápis de edição. Substitua o conteúdo pelo `index.html` deste pacote e salve.
5. Faça o mesmo com `sw.js`.
6. Não altere nenhum outro arquivo e não exclua arquivos.
7. Depois que o GitHub Pages terminar de publicar, abra a Ovelia no Safari e recarregue. Se o CSS antigo persistir, feche a aba e abra novamente; a versão do shell foi incrementada para ajudar a renovar o cache.

## O que esta etapa não faz

- Não muda `app.js`, `biblia.js`, `liturgia.js`, a sequência do Terço, os conteúdos das orações, as lições ou a pontuação dos Estudos.
- Não publica por você; a atualização só entra no site quando você salvar os arquivos no GitHub.
- Não declara que o Safari foi testado: o roteiro manual é necessário para validar a aparência real no dispositivo.
