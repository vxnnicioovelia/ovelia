# Relatório técnico — Ovelia: áudio e Kids

## Alterações
- Corrigida a abertura do painel de áudio no perfil Adulto: o CSS ocultava os controles mesmo quando o atributo `hidden` era removido; agora a classe `voz-aberto` acompanha o estado do botão.
- Lista de vozes construída a partir de `speechSynthesis.getVoices()`; prioriza `pt-BR`, depois outras vozes em português, sem criar opções fictícias.
- Preferência de voz salva por nome e idioma; velocidade continua salva localmente.
- Mensagens mais claras quando o navegador ainda não disponibilizou vozes ou não há voz em português.
- Controles de voz mantidos expostos no perfil 60+, com seletor e velocidade visíveis e botões maiores.
- Adicionado `ovelia-kids.js`: 12 histórias originais curtas, referências bíblicas, pergunta de compreensão por história, correção explicada e progresso local sem cadastro.
- Adicionada pintura funcional com três desenhos vetoriais próprios (ovelha, barco e pomba), cor, tamanho do pincel, borracha, reinício, salvamento local e exportação PNG.
- Cache PWA versionado para incluir o novo módulo Kids e os scripts atualizados.
- Identidade roxa e navegação existentes preservadas.

## Testes executados
- Integridade do ZIP de entrada: aprovada.
- `node --check` em 23 arquivos JavaScript: sem erros.
- Referências locais `src`/`href` do HTML: nenhuma ausente.
- IDs HTML duplicados: nenhum.
- Manifesto PWA e ícones declarados: válidos/presentes.
- Referências locais no shell do service worker: nenhuma ausente.
- Estrutura do módulo Kids: 12 histórias verificadas por inspeção do código; canvas e controles presentes.

## Testes pendentes / limitações
- Não foi possível executar teste de navegador automatizado: Chromium headless falhou ao iniciar corretamente neste ambiente.
- Vozes reais, pausa/retomada e pronúncia dependem das vozes fornecidas pelo dispositivo/navegador; não houve teste físico em iPhone, Android ou computador.
- A renderização visual e interação tátil não foram validadas em aparelhos reais.
- Os desenhos são traços vetoriais simples originais, não uma biblioteca de 100 desenhos.
- A biblioteca inicial tem 12 histórias, não 365; nenhuma história vazia foi criada para completar a meta.
- A pintura salva no armazenamento local do navegador quando possível; a exportação PNG depende das permissões do navegador.
- Bíblia e Liturgia mantêm as dependências de dados já registradas em versões anteriores; esta atualização não acrescenta traduções bíblicas nem leituras litúrgicas protegidas.

## Publicação
Envie somente o conteúdo da pasta `ovelia/` para a raiz do repositório GitHub Pages. Não publique `_backup_original/`. Não houve publicação automática.
