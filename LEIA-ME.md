# Ovelia — Nível 1 (pacote incremental)

Este pacote foi feito para aplicar navegação, redes oficiais e nomes de menu sem substituir o restante do site nem sobrescrever conteúdos recentes do repositório.

## Inclui
- `nivel1.js`: adiciona Voltar e Início às páginas internas, padroniza os rótulos do menu e acrescenta os links oficiais do Instagram e WhatsApp.
- `nivel1.css`: estilos responsivos para os botões e links.

## Links oficiais
- Instagram: https://www.instagram.com/oveliaoficial/
- Canal do WhatsApp: https://whatsapp.com/channel/0029VbDFfTh3gvWcWSGo1v3P

## Como instalar pelo iPhone/GitHub
1. Extraia este ZIP no app Arquivos.
2. No repositório https://github.com/vxnnicioovelia/ovelia, adicione `nivel1.js` e `nivel1.css` na raiz (mesma pasta de `index.html` e `app.js`).
3. Abra `index.html` para editar.
4. Dentro de `<head>`, antes de `</head>`, adicione esta linha:
   `<link rel="stylesheet" href="nivel1.css">`
5. No fim do arquivo, depois de `<script src="app.js...">` e antes de `</body>`, adicione:
   `<script src="nivel1.js"></script>`
6. Salve/commite os três arquivos na branch `main`.
7. Aguarde o GitHub Pages publicar e teste no Safari.

## Teste recomendado
- Abra `#home`, entre em Liturgia e depois em Bíblia; toque em Voltar e confirme que retorna à seção anterior.
- Toque em Início e confirme que retorna à página inicial.
- Confira os nomes do menu nos perfis normal, infantil e 60+.
- Abra Instagram e canal do WhatsApp e confirme que os endereços oficiais abrem.

O pacote é incremental para reduzir o risco de substituir uma versão mais recente do site. O funcionamento final deve ser confirmado após a publicação no Safari.
