# Ovelia — atualização preparada para publicação pelo iPhone

## O que foi atualizado
- Tela inicial para escolher Crianças e Jovens, Adolescentes e Adultos ou Modo Fácil.
- Menu adaptado ao perfil; perfil pode ser trocado pelo botão no cabeçalho.
- Modo Fácil com fonte ampliada e controles de acessibilidade.
- Leitura por voz reescrita para ler um trecho por vez, com controles de pausar/continuar/parar, velocidade e seleção das vozes disponibilizadas pelo aparelho.
- Orações curtas originais para crianças.
- Trilha infantil e trilha geral com etapas marcáveis, salvas somente no aparelho.
- Reflexão diária original da Ovelia, claramente identificada como reflexão geral e não como comentário oficial da liturgia.
- Link direto para a Liturgia Diária das Edições CNBB.
- Links externos para consultar edições bíblicas, sem copiar traduções protegidas para o site.
- Notícias e notificações diárias continuam adiadas; a página informa essas ideias como próximas etapas.

## Limitações conhecidas (importante)
- A Liturgia Diária ainda NÃO é incorporada automaticamente ao site. A Ovelia abre a fonte externa das Edições CNBB, pois não foi confirmada uma API com autorização de reprodução dos textos. A reflexão diária atual é um conteúdo devocional original e NÃO é gerada a partir das leituras litúrgicas do dia.
- O texto integral da Bíblia não é reproduzido dentro da Ovelia. Os links levam a fontes externas; confirme a edição e sua adequação para uso catequético com sua paróquia.
- A leitura por voz depende do Safari/iOS e das vozes instaladas no aparelho. O site lista as vozes que o navegador disponibilizar; não pode garantir três vozes, nem identificar com segurança o gênero de cada uma.
- Notificações automáticas, notícias, login e sincronização entre aparelhos não estão implementados.
- O código passou por verificação sintática do JavaScript e leitura do HTML, mas precisa ser testado no Safari do iPhone depois de publicado.

## Arquivos do pacote completo
Todos os arquivos deste ZIP devem ficar juntos na raiz do repositório `ovelia`, no mesmo nível de `index.html`.

## Publicação pelo iPhone (pacote completo)
1. Abra o ZIP no app Arquivos do iPhone para descompactá-lo.
2. No Safari, abra https://github.com/vxnnicioovelia/ovelia
3. Toque em **Add file** e depois em **Upload files**.
4. Selecione os arquivos descompactados e envie-os para a raiz do repositório. Não envie a pasta do ZIP como uma pasta aninhada.
5. Se o GitHub perguntar sobre substituir arquivos existentes, confirme somente os arquivos do pacote que têm o mesmo nome.
6. Toque em **Commit changes**.
7. Aguarde alguns minutos e abra https://vxnnicioovelia.github.io/ovelia/ em uma aba privada ou atualize a página.

## Alternativa mais simples
O arquivo `index.html` também pode ser enviado sozinho para substituir o `index.html` do repositório. Ele contém CSS e JavaScript incorporados e usa as imagens que já existem no repositório. Assim, os outros arquivos antigos podem continuar lá, sem serem carregados pela nova página.

Para substituir somente o `index.html`: abra o arquivo no repositório, escolha editar (lápis ou menu), use o método de upload/substituição disponível no GitHub pelo navegador se aparecer; se não aparecer uma opção para substituir por arquivo, use **Add file → Upload files** e envie o novo `index.html`.
