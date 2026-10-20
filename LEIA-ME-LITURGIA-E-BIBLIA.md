> **AVISO DE VERSÃO — DOCUMENTO HISTÓRICO:** este arquivo preserva decisões e instruções de uma etapa anterior. A atualização de qualidade de 19/10/2026 substitui as instruções sobre importação automática da Bíblia. O workflow de Bíblia está desativado e os textos integrais aguardam autorização editorial confirmada. Não execute os passos antigos deste documento para importar ou publicar uma tradução.

# Ovelia — Liturgia diária e Bíblia dentro do site

## O que mudou
- **Bíblia**: os 73 livros ficam guardados dentro do próprio site (pasta `dados/biblia`). O leitor mostra o capítulo na página da Ovelia, sem quadro externo e sem botão que leve a outro site. Funciona também sem depender do eBible depois de instalada.
- **Liturgia diária**: a página lê o arquivo do dia em `dados/liturgia`, que é atualizado **sozinho todos os dias** (00:10 e 06:00, horário de Brasília) por uma rotina do GitHub. Mostra celebração, cor litúrgica e o texto das leituras na própria página. Há calendário interno (dia anterior / hoje / dia seguinte / escolher data).
- Os botões que levavam a Canção Nova, CNBB, eBible, Ora et Labora e Bíblias Católicas foram removidos.
- Correção: o `index.html` anterior não carregava `biblia.js` nem `biblia.css`. Agora carrega.

## Como instalar (pelo iPhone, no Safari, em github.com/vxnnicioovelia/ovelia)
**Parte 1 — enviar os arquivos**
1. Extraia o ZIP no app Arquivos.
2. No repositório, toque em **Add file → Upload files** e envie, **substituindo**: `index.html`, `app.js`, `biblia.js`, `biblia.css`, `estilo.css`, `liturgia.js`. Envie também a pasta `tools` (com `gerar-biblia.mjs` e `gerar-liturgia.mjs`). Faça **Commit changes**.

**Parte 2 — criar as duas rotinas automáticas** (o app Arquivos esconde pastas que começam com ponto, por isso as rotinas estão na pasta visível `workflows-para-copiar`)
1. No repositório: **Add file → Create new file**.
2. No nome, digite exatamente `.github/workflows/atualizar-biblia.yml` (ao digitar a barra `/`, o GitHub cria as pastas).
3. Abra `workflows-para-copiar/atualizar-biblia.yml`, copie todo o conteúdo e cole. **Commit changes**.
4. Repita com `.github/workflows/liturgia-diaria.yml` ← conteúdo de `workflows-para-copiar/liturgia-diaria.yml`.

**Parte 3 — permissão e primeira execução**
1. Em **Settings → Actions → General → Workflow permissions**, marque **Read and write permissions** e salve.
2. Aba **Actions → Atualizar Bíblia → Run workflow**. Leva alguns minutos. Quando ficar verde, a pasta `dados/biblia` aparece com 73 arquivos.
3. Aba **Actions → Liturgia diária → Run workflow**. Fica verde e cria `dados/liturgia/` com hoje e os próximos 7 dias. Depois disso roda sozinho todo dia.
4. Abra https://vxnnicioovelia.github.io/ovelia/ e recarregue (se aparecer a versão antiga, feche e reabra a aba).

## Se algo ficar vermelho (Actions)
- **Atualizar Bíblia**: o script só grava se os 73 livros e todos os capítulos estiverem completos. Se falhar, ele lista no log o que faltou ou o que não baixou. Nada é gravado pela metade.
- **Liturgia diária**: o log mostra qual data falhou e por quê. Ele só grava dias cuja data confere com o que a fonte devolveu; nunca grava leituras de outro dia. Se a fonte estiver fora do ar, a página tenta a fonte ao vivo e, se também falhar, avisa que a liturgia está indisponível (sem inventar).

## Pontos importantes
- **Direitos do texto da liturgia**: o texto das leituras é do lecionário usado no Brasil (CNBB) e vem de uma API comunitária. A Ovelia antes evitava reproduzi-lo. Exibir o texto completo é uma decisão sua; confirme a permissão de uso. Para voltar a mostrar só as referências, no arquivo `.github/workflows/liturgia-diaria.yml` troque `LITURGIA_INCLUIR_TEXTO: "sim"` por `"nao"` e rode o workflow de novo.
- **Bíblia Portuguesa Mundial**: domínio público segundo o eBible.org, mas ainda em revisão e **não** é a tradução oficial da Igreja. O aviso está na tela. A liturgia usa a tradução litúrgica; as duas podem diferir.
- Os arquivos `nivel2.js` e `nivel3.js` não estão ligados ao `index.html`. Se você ligá-los no futuro, o `nivel3.js` recria um seletor de liturgia com link para a CNBB; não o ligue.
- A rotina agendada do GitHub pode ser pausada se o repositório ficar 60 dias sem atividade; as gravações diárias já contam como atividade.
- Não consegui testar com os servidores reais (o ambiente de trabalho não os alcança). Testei o gerador e o site com dados de exemplo; o primeiro teste real é a execução da Parte 3.
