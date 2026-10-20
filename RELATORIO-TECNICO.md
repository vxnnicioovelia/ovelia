# Ovelia — Atualização 1.1: recuperação segura da Liturgia
**Data:** 20/10/2026  
**ZIP-base efetivamente usado:** `ovelia-atualizacao1-estabilidade.zip` (é o pacote Atualização 1 disponível no ambiente; a cópia exata foi preservada em `BACKUP/`).  
**Publicação no GitHub:** não realizada.

## Conclusão executiva
A atualização identificou duas causas diretas para os textos não aparecerem: (1) o workflow define `LITURGIA_INCLUIR_TEXTO: "nao"` e o gerador remove `texto` e `refrao` dos dados; (2) a função `renderLiturgy()` da interface também descartava os campos de texto, mesmo que eles estivessem presentes no JSON. Portanto, mudar apenas a variável não seria suficiente.

A API configurada no projeto é `https://liturgia.up.railway.app/v2/`. A documentação pública do projeto comunitário descreve a API como fornecedora das orações e leituras da Missa, mas a inspeção da documentação não confirmou uma licença que autorize redistribuir os textos integrais em um site público: https://github.com/Dancrf/liturgia-diaria. O acesso técnico à API não comprova autorização de reprodução da tradução/conteúdo.

**Resultado editorial:** os textos integrais não foram restaurados nem importados. A autorização da Editora Ave-Maria continua pendente, e não foi encontrada licença documentada que autorize a reprodução integral da fonte atual. As referências, o calendário e a navegação permanecem. A interface continua informando a pendência sem substituir a tradução por outra.

## Alterações implementadas

1. `PUBLICAR/.github/workflows/liturgia-diaria.yml`
   - Mantém `LITURGIA_INCLUIR_TEXTO: "nao"`.
   - Acrescenta `LITURGIA_TEXTO_AUTORIZADO: "nao"` e campo de licença vazio.
   - Atualiza os comentários para deixar explícito que não basta mudar a variável antiga.

2. `PUBLICAR/tools/gerar-liturgia.mjs`
   - Adiciona uma trava dupla: só permite texto integral quando a inclusão é solicitada, a autorização é explicitamente marcada e há identificação de licença preenchida.
   - O JSON registra `textoIntegralAutorizado` e `licencaTexto` somente no modo explicitamente autorizado.
   - Com as configurações atuais do workflow, o gerador grava apenas referências e metadados.

3. `PUBLICAR/app.js`
   - A interface só renderiza texto/refrão quando o próprio registro contém `textoIntegralAutorizado: true` e uma identificação de licença.
   - Dados da API ao vivo, sem metadados de autorização, continuam mostrando referências e aviso editorial.
   - Mensagem explica que acesso à API não prova direito de redistribuição.

4. `PUBLICAR/estilo.css`
   - Adiciona estilos responsivos e legíveis para parágrafos longos de leituras caso a integração autorizada seja ativada no futuro.

5. `PUBLICAR/index.html` e `PUBLICAR/sw.js`
   - Atualiza os parâmetros de cache dos arquivos alterados e a versão do cache para `ovelia-shell-v7-liturgia11`.

## Arquivos alterados
- `.github/workflows/liturgia-diaria.yml`
- `tools/gerar-liturgia.mjs`
- `app.js`
- `estilo.css`
- `index.html`
- `sw.js`

Não foram alterados áudio, Kids, pintura, Bíblia, Terço, Estudos, XP, progresso ou arquitetura. O backup original foi preservado fora de `PUBLICAR/`.

## Testes e resultados

### APROVADO
- Integridade do ZIP-base: verificada.
- `node --check` nos 25 arquivos `.js`/`.mjs`: sem erros de sintaxe.
- Caminhos locais do HTML: 37 referências verificadas, nenhum destino ausente.
- Manifesto PWA: JSON válido; ícones 192×192 e 512×512 existem.
- Service worker: 30 referências locais examinadas, nenhum arquivo ausente.
- Gerador com servidor de teste local e dados sintéticos para cinco datas distintas: gravou as datas corretas e preservou referências.
- Trava dupla: mesmo solicitando `LITURGIA_INCLUIR_TEXTO=sim`, sem autorização explícita o gerador descartou os textos e refrões fictícios.
- Inspeção estática da interface: textos não são exibidos sem marcador de autorização e identificação de licença.
- ZIP final: verificado com teste de integridade sem erros.

### NÃO TESTADO
- Teste completo de interface no navegador com navegação de calendário e renderização visual da página inteira.
- Responsividade visual da página completa em 320, 360, 390, 412 px e desktop.
- Teste em iPhone/Android e instalação PWA real.
- Execução real do workflow no GitHub Actions.
- Dados reais da API para três datas: o gerador foi testado em ambiente controlado com fixtures; não se declara validação litúrgica dos conteúdos simulados.

### DEPENDÊNCIA EXTERNA
- Licença escrita para redistribuir os textos integrais da fonte/API ou autorização da Editora Ave-Maria.
- Teste final no domínio publicado, após publicação manual.

## Instruções de validação manual no celular
1. Publique manualmente apenas o conteúdo de `PUBLICAR/` na raiz do site.
2. Abra a Ovelia no Safari/Chrome e entre em **Liturgia Diária**.
3. Confira a data atual, os títulos e as referências.
4. Escolha três datas diferentes (ontem, hoje e amanhã); confirme que a data exibida acompanha a seleção e que não há leitura de uma data aparecendo em outra.
5. Sem dados disponíveis, confirme que aparece uma mensagem de indisponibilidade, não uma leitura inventada.
6. Confirme que o aviso editorial informa a pendência do texto integral e que a leitura não troca silenciosamente de tradução.
7. Aumente o tamanho da fonte e teste os temas claro/escuro, especialmente em um iPhone estreito.
8. Após publicação, se aparecer uma versão antiga, feche a PWA e reabra o site para o service worker instalar o cache novo.

## Situação da licença e origem
- Fonte configurada: `https://liturgia.up.railway.app/v2/`, API comunitária referenciada no README público do projeto Dancrf.
- Conteúdo integral: a API pode fornecer campos de texto, mas a permissão de redistribuição desses textos não foi comprovada.
- Editora Ave-Maria: autorização pendente.
- Nenhum texto integral foi adicionado ao pacote publicável nesta atualização.

**Estado:** correção segura concluída; a leitura integral não foi restaurada porque a licença não está confirmada. A integração futura está preparada para exigir metadados de autorização, sem ativar a publicação agora.
