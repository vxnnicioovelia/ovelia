# Ovelia — Recuperação, etapa 1

## Corrigido
- **Kids sem saída:** `app.js` escondia o botão "Trocar perfil" no modo infantil. Agora ele fica visível e pede confirmação ("Peça ajuda a um adulto") antes de abrir a escolha de perfil.
- **Menu inferior do 60+:** rótulos não quebram mais letra por letra. Agora são 5 destinos (Início, Liturgia, Bíblia, Orações, Mais), com fonte de 15px e área de toque de 64px. O Terço continua no menu "Mais".
- **Cabeçalho do 60+ no celular:** os botões passam a quebrar em linhas, sem rolagem horizontal.

## Arquivos alterados
app.js, navegacao-inferior.js, navegacao-inferior.css, estilo.css, index.html (só números de versão para forçar cache novo).

## Testes executados (Chromium, arquivo local)
- Sintaxe JS com node --check: OK.
- Kids → Trocar perfil → Adulto → 7 páginas abrem: OK.
- Perfil 60+ a 320, 360 e 412px: rótulos em 1 linha, sem rolagem horizontal: OK.

## Não testado
- Troca real claro/escuro e A−/A+, Liturgia com rede (precisa de servidor), iPhone físico, leitor de tela.

## Instruções
Faça backup do repositório, envie a pasta `ovelia` por cima respeitando a estrutura e revise o diff antes de publicar. Nada foi publicado.
