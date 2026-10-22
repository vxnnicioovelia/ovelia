# Ovelia — auditoria e correção (22/10/2026)

## Defeitos encontrados no ZIP recebido
1. **Liturgia presa em "Buscando a liturgia…"**: o Terço (app.js) tentava preencher `#meditacao` e `#tercoStatus`, que não existiam no index.html. O erro interrompia o app.js antes do código da liturgia. Corrigido: elementos adicionados ao index.html e o código do Terço ganhou proteção contra elementos ausentes.
2. **Lições não abriam**: `licoes-001-010.js` estava vazio (1 byte) e a trilha anuncia 10 lições. Restauradas as lições 1 a 5 e escritas as lições 6 a 10 (conteúdo original, só referências bíblicas, sem texto de tradução).
3. **Gerador da liturgia perdido**: `gerar-liturgia.mjs` na raiz tinha só 110 bytes (um atalho que importava a si mesmo) e `tools/gerar-liturgia.mjs` estava vazio. Restaurado o gerador completo na raiz. O workflow deve passar a chamar `node gerar-liturgia.mjs`.
4. **Cache**: versões ?v= do index.html e do sw.js estavam desalinhadas; alinhadas e atualizadas (cache v27). O carregador das lições usava uma versão fixa que podia manter o arquivo vazio em cache.
5. **Perfil Ovelias Sábias**: botões do painel de voz viravam elipses altas; corrigido no CSS.
6. Rótulo do filtro quente trocado de "Reduzir luz azul" para "Filtro de leitura quente" (o filtro muda a aparência do texto, não a luz do aparelho).

## Testes executados (Chromium, servidor local)
- 3 perfis x 320/390 px x claro/escuro: sem erro de JavaScript, sem 404, sem rolagem horizontal.
- Liturgia com resposta simulada: carrega; com API fora, erro 500 e JSON inválido: mostra "Indisponível agora" com botão de nova tentativa.
- Terço: avançar, salvar, recarregar, reiniciar com confirmação.
- Estudos: lição 1 abre; as 10 lições carregam e têm estrutura válida.
- Pequenas Ovelias: história em páginas, voltar à biblioteca, pintura exporta PNG válido, quiz presente.
- Filtro quente liga e aplica a classe de leitura.

## Não verificado
- Fonte real da liturgia (o ambiente de teste não acessa a internet).
- Fluxo completo das lições 6 a 10 com respostas (só carregamento e estrutura).
- iPhone físico, áudio real, instalação PWA.
- Partes 6, 10, 11 e 12 do roteiro (fora do escopo).
