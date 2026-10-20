# Ovelia — Atualização 1: estabilidade e correções críticas

**ZIP-base usado:** `ovelia-atualizacao-final-qualidade-verificada.zip` (pacote mais recente disponível antes desta atualização).  
**Escopo:** correção pequena e incremental; sem redesenho, sem expansão de conteúdo e sem publicação automática.  
**Pasta publicável:** `PUBLICAR/`.

## Correção implementada

- **Áudio de histórias no Kids:** o botão agora chama o mecanismo `Voz.falar()` mesmo quando a lista de vozes ainda não foi carregada. Antes, a verificação prévia `Voz.disponivel()` podia bloquear a tentativa inicial, justamente no momento em que o navegador ainda estava carregando as vozes. O mecanismo existente passa a tentar atualizar a lista e apresenta seu estado de indisponibilidade se nenhuma voz estiver disponível. Não foram adicionados serviços externos nem dependências.

## Preservação

- Mantidos os 12 registros de histórias existentes, sem expansão de biblioteca.
- Mantidos o leitor e a estrutura dos 73 livros; a importação automática bíblica permanece desativada enquanto a autorização editorial está pendente.
- Mantidos os controles e a arquitetura da pintura em camadas, a navegação dos perfis e o service worker.
- O ZIP-base está guardado em `BACKUP/`, fora da pasta publicável. Também são preservados os backups anteriores encontrados no pacote-base.

## Testes e resultados

- **Aprovado:** `node --check` em 25 arquivos JavaScript/MJS; falhas: 0.
- **Aprovado:** 32 referências locais `src`/`href` examinadas no HTML; destinos ausentes: 0.
- **Aprovado:** 129 IDs no HTML; IDs duplicados: 0.
- **Aprovado:** manifesto JSON válido; ícones declarados existem: True.
- **Aprovado:** 30 caminhos locais identificados no shell do service worker; ausentes: 0.
- **Aprovado:** workflow de importação bíblica existe somente como `.yml.disabled`; workflow executável `atualizar-biblia.yml` ausente.
- **Aprovado:** não há diretório `dados/biblia/` com arquivos JSON integrais na pasta publicável.
- **Aprovado:** 12 histórias encontradas; IDs, títulos e referências são únicos: True.
- **Aprovado:** integridade do ZIP de saída conferida após empacotamento.
- **Não testado:** síntese de voz real no Safari/iPhone ou Android. A validação automatizada de sintaxe não comprova reprodução sonora.
- **Não testado:** interação ponta a ponta de todos os perfis em navegador visual. Esta atualização limitou-se à falha identificada no caminho do botão de áudio Kids e às verificações estáticas.
- **Pendente externo:** autorização escrita da Editora Ave-Maria para publicação de texto bíblico integral.

## Teste manual recomendado no celular

1. Publique manualmente os arquivos da pasta `PUBLICAR/` somente depois de revisar o diff.
2. Abra a Ovelia no Safari atualizado (iPhone) ou Chrome (Android) e selecione o perfil Kids.
3. Abra uma história e toque em **Ouvir história** imediatamente após abrir o site. Se as vozes ainda estiverem carregando, aguarde alguns segundos e tente novamente.
4. Confirme que a leitura começa; toque em **Parar áudio** e confirme que a voz para.
5. Abra o perfil Adulto, abra o painel **Ouvir**, feche e abra novamente, e teste iniciar/pausar/retomar/parar.
6. Troque de perfil enquanto uma leitura estiver tocando e confirme que a leitura anterior não continua indevidamente.
7. Confira o perfil 60+ e confirme que os controles permanecem grandes e visíveis.
8. Se não houver voz pt-BR, confira as vozes instaladas no sistema. A Ovelia não pode fornecer uma voz que o dispositivo não disponibiliza.

## Limitações

Não foi executado teste em aparelho físico, nem teste sonoro real. Não se declara esta versão 100% validada em produção. Não houve publicação no GitHub.
