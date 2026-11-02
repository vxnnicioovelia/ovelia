# Ovelia — Nível 2 (pacote incremental para iPhone)

Este pacote acrescenta as melhorias do Nível 2 e também ativa as funções de navegação/redes do Nível 1. Ele não substitui `app.js`, `estilo.css`, `liturgia.js` nem as imagens existentes.

## Arquivos
- `nivel2.js` — navegação Voltar/Início, rótulos de menu, links oficiais, orientação de voz, separação de ambientes, Meu Terço/Biblioteca de Orações e calendário com check-in local.
- `nivel2.css` — estilos responsivos para os novos recursos.
- `LEIA-ME-NIVEL2.md` — estas instruções.

## Links oficiais incluídos
- Instagram: https://www.instagram.com/oveliaoficial/
- Canal do WhatsApp: https://whatsapp.com/channel/0029VbDFfTh3gvWcWSGo1v3P

## Instalação pelo iPhone
1. Baixe e extraia este ZIP no app **Arquivos**.
2. Abra https://github.com/vxnnicioovelia/ovelia
3. Adicione `nivel2.js` e `nivel2.css` à raiz do repositório, na mesma pasta de `index.html` e `app.js`.
4. Edite `index.html`. Dentro de `<head>`, antes de `</head>`, adicione:
   `<link rel="stylesheet" href="nivel2.css">`
5. No final de `index.html`, adicione esta linha depois de `<script src="app.js..."></script>` e antes de `</body>`:
   `<script src="nivel2.js"></script>`
6. Salve/commite os três arquivos na branch `main` e aguarde o GitHub Pages publicar.
7. Abra https://vxnnicioovelia.github.io/ovelia/#home no Safari. Se necessário, recarregue a página.

**Importante:** este pacote já inclui a navegação e os atalhos sociais do Nível 1. Não adicione também `nivel1.js` e `nivel1.css` ao `index.html`, para evitar funções duplicadas. Se esses arquivos já estiverem no repositório, podem continuar lá; basta não carregá-los junto com o Nível 2.

## O que muda
- Botões **Voltar** e **Início** nas páginas internas, usando o histórico de seções visitadas.
- Menus com nomes mais claros e acesso ao calendário para Adulto e 60+.
- Instagram e canal oficial do WhatsApp no rodapé e em Sobre.
- Troca de ambiente renomeada para **Trocar ambiente**, com escolha preservada no aparelho.
- Proteção de rotas: Kids fica em Início, Histórias/quiz e Orações infantis; 60+ recebe navegação simplificada; Adulto recebe a experiência completa.
- Voz: mantém as vozes fornecidas pelo dispositivo, escolha de voz, velocidade, pausar/continuar e parar. Não instala novas vozes nem garante voz premium; teste no iPhone é obrigatório.
- Biblioteca de Orações e Meu Terço guiado continuam em seções separadas, com atalhos e explicação para iniciantes.
- Calendário mensal, seleção de data, uma seleção inicial de celebrações fixas e check-in com oração, Palavra, terço e boa ação. Os check-ins são salvos apenas no aparelho, sem conta ou servidor.

## Limitações e teste obrigatório
- O calendário de santos é uma **seleção inicial**, não cobre todos os dias e não substitui o calendário litúrgico oficial. Datas móveis e calendários locais podem mudar a celebração.
- Não é possível verificar remotamente quais vozes estão instaladas no seu iPhone. Abra “Ajustar voz”, selecione uma voz pt-BR, toque em “Testar voz” e confira pausar/continuar, velocidade e leitura até o final.
- O progresso do check-in depende do armazenamento local do navegador. Limpar os dados do Safari pode apagar os registros.
- Este pacote não foi publicado por esta ferramenta nem testado num iPhone físico. Confirme os itens acima depois do deploy antes de avançar.

## Checklist de teste
- [ ] Entre em Liturgia, depois Bíblia; toque em **Voltar** e confira se volta à Liturgia.
- [ ] Toque em **Início** e confira se retorna ao começo.
- [ ] Troque entre Kids, Adulto e 60+; confirme os menus e tente abrir diretamente uma seção não permitida.
- [ ] Abra Instagram e WhatsApp; confira os endereços oficiais.
- [ ] No leitor de voz, teste uma voz pt-BR, velocidade, pausa/continuação e parar.
- [ ] Abra Meu Terço e Biblioteca de Orações e confira os atalhos.
- [ ] No calendário, selecione outra data, marque atividades, recarregue e confirme que as marcações continuam salvas.
