# Ovelia — atualização incremental de identidade visual e PWA

## Base e preservação
- Base: `ovelia-atualizada-pwa-fase1(1).zip`, fornecido nesta conversa.
- A aplicação não foi reconstruída. A estrutura e os recursos existentes foram mantidos.
- O pacote final contém a pasta `ovelia/` pronta para publicar e a cópia do ZIP original em `_backup_original/` fora da pasta do site.

## Alterações realizadas
- `ovelia/estilo.css`: substituída a paleta-base verde/creme por uma paleta roxa equilibrada, com variante escura coerente; reforçados foco visível e movimento reduzido.
- `ovelia/navegacao-inferior.css`: barra inferior flutuante também em telas pequenas, com cantos arredondados, sombra leve, recuo inferior e espaço de segurança para não encobrir conteúdo. Destinos preservados.
- `ovelia/manifest.webmanifest`: cores de tema e fundo atualizadas para combinar com a identidade roxa.
- `ovelia/index.html`: cache-busting para CSS e manifesto atualizados.
- `ovelia/sw.js`: nome de cache alterado para que navegadores reconheçam a nova versão e removam o cache anterior da família `ovelia-shell-*`.
- A cópia original do ZIP está preservada separadamente em `_backup_original/`.

## Limitações conhecidas após a auditoria do ZIP-base
- Não há arquivos JSON de dados da Bíblia nem da Liturgia incluídos no pacote. A leitura integral depende de dados autorizados gerados ou de fonte externa válida.
- A configuração do workflow de liturgia existente não gera o texto integral das leituras; depende de confirmação de licenciamento.
- O pacote contém cinco lições com conteúdo real; a trilha de 100 aulas ainda não está completa.
- O service worker e a instalação PWA não foram validados em dispositivo físico nem em navegador automatizado neste ambiente.
- A cor e o layout foram corrigidos no CSS, mas o teste visual em telas reais ainda é pendente.

## Testes
- Integridade do ZIP-base e do pacote final.
- Sintaxe de todos os JavaScript e scripts inline.
- Validade do manifesto JSON.
- Referências locais de scripts, CSS e ícones.
- Verificação de seletores da paleta roxa e da atualização do cache do service worker.
- Não foram executados testes de navegador, GitHub Actions, API externa ou instalação física.
