# Ovelia — atualização em massa (16/10/2026)

## O que foi atualizado
- Paleta visual alinhada à identidade Ovelia: marfim `#F7F4EC`, verde-oliva `#526B55`, dourado fosco `#D6B77A`, bege areia `#E8E2D5`, grafite esverdeado `#454A40` e branco `#FFFFFF`.
- Mantidos os três perfis: Modo infantil, Modo normal e Ovelia 60+. As cores infantis e os tamanhos para 60+ seguem a identidade comum.
- Área infantil ampliada de 2 para 7 histórias bíblicas resumidas em linguagem própria, além do quiz com mais perguntas.
- Liturgia diária: tenta consultar automaticamente data, celebração, cor litúrgica e referências via API comunitária. Não mostra os textos bíblicos completos da API; o botão leva à fonte oficial Edições CNBB enquanto a licença de reprodução não estiver confirmada. Se a API falhar, aparece um aviso e um link oficial em vez de conteúdo inventado.
- Estudos bíblicos: estudo do dia com tema, referências complementares, pergunta de meditação e ação prática, relacionado às leituras quando os dados automáticos estão disponíveis.
- Áudio: botão de teste sempre visível, status mais destacado, diagnóstico de falha e ajuste para não cancelar a voz do navegador quando ela está ociosa. A reprodução ainda precisa ser validada no Safari do iPhone; não há como garantir áudio sem teste real no aparelho.
- Cache busting nos scripts para reduzir o risco de o navegador manter a versão anterior.

## Arquivos principais alterados
`index.html`, `app.js`, `estilo.css`. Os demais arquivos e imagens foram preservados.

## Como publicar pelo iPhone
1. Extraia este ZIP no app Arquivos.
2. No repositório GitHub, substitua `index.html`, `app.js` e `estilo.css` pelos arquivos desta pasta.
3. Faça Commit changes.
4. Abra o site no Safari e recarregue a página. Se necessário, feche a aba antiga e abra o endereço novamente.

## Notas importantes
- A liturgia automática depende de uma API comunitária de terceiros e de conexão com a internet. Não é um feed oficial da CNBB e pode ficar indisponível; confira sempre as leituras na fonte oficial.
- O projeto da API: https://github.com/Dancrf/liturgia-diaria
- Fonte oficial dos textos litúrgicos: https://liturgiadiaria.edicoescnbb.com.br/app/user/user/UserView.php
- O site é estático no GitHub Pages: atualização automática ocorre quando a pessoa abre a página; não há notificações push nem atualização em segundo plano.
- Não foi possível testar a reprodução de áudio diretamente no iPhone. O novo botão de diagnóstico deve mostrar se o navegador recebeu o toque e se a API de voz iniciou.
