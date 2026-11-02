> **AVISO DE VERSÃO — DOCUMENTO HISTÓRICO:** este arquivo preserva decisões e instruções de uma etapa anterior. A atualização de qualidade de 19/10/2026 substitui as instruções sobre importação automática da Bíblia. O workflow de Bíblia está desativado e os textos integrais aguardam autorização editorial confirmada. Não execute os passos antigos deste documento para importar ou publicar uma tradução.

# Ovelia — entrega intermediária: auditoria e PWA

## Base preservada
- Base utilizada: `ovelia-correcao-contraste-estudos-v3(3).zip`.
- O site não foi reconstruído do zero. Foram preservados os arquivos e recursos preexistentes.
- Cópia exata do ZIP de origem incluída em `_backup_original/ovelia-base-original.zip` para reversão. Não envie a pasta `_backup_original` para a raiz publicada do site; ela é apenas backup do pacote.

## Alterações implementadas nesta entrega
- `index.html`: metadados PWA, ligação do manifesto, entrada para instalar, guia de instalação para iOS/iPadOS, Android e computador; atualiza identificadores de cache; remove a seção visual de estudos avulsos sem apagar arquivos históricos.
- `manifest.webmanifest`: nome, escopo e caminhos relativos para hospedagem em subpasta do GitHub Pages.
- `pwa-192.png`, `pwa-512.png`: ícones PWA redimensionados a partir do ícone original da Ovelia.
- `ovelia-pwa.js`: usa evento de instalação direta quando suportado, apresenta instruções manuais nos demais casos e registra service worker com caminho relativo.
- `ovelia-pwa.css`: estilos complementares da área de instalação.
- `sw.js`: cache limitado a arquivos estáticos da aplicação; não armazena JSON, dados bíblicos nem dados de liturgia. Tenta rede primeiro e usa cópia local em falha de navegação.
- `RELATORIO-TECNICO-FASE-ATUAL.md`: inventário, verificações e limitações.

## Limitações que permanecem
- O pacote não contém os dados gerados de `dados/biblia/` nem `dados/liturgia/`; esses fluxos precisam ser executados e validados no GitHub Actions.
- O workflow da Bíblia faz commit/push no repositório quando executado. Este ZIP não executa workflows nem publica mudanças.
- O workflow de liturgia está configurado para gerar referências sem texto integral (`LITURGIA_INCLUIR_TEXTO: "nao"`). Alterar isso depende de confirmação de licença/termos da fonte.
- Há cinco lições de Estudos com conteúdo no lote atual; o currículo de 100 aulas não está completo.
- A instalação PWA depende de HTTPS e de suporte do navegador. Não foi possível testar fisicamente em iPhone/Android ou executar instalação real neste ambiente.
- Service worker usa estratégia de rede primeiro para HTML/CSS/JS; JSON e dados de conteúdo não são armazenados em cache.

## Testes realizados nesta execução
- Integridade do ZIP de origem e do ZIP de saída.
- Sintaxe dos arquivos JavaScript existentes e do novo script PWA.
- Sintaxe do service worker.
- Parse do manifesto JSON.
- Verificação de que todos os caminhos locais referenciados em scripts e CSS do HTML existem.
- Verificação de existência dos ícones declarados no manifesto.
- Teste de integridade das imagens PNG.
- Não foram executados testes reais de navegador, GitHub Actions, instalação em dispositivo, rede offline ou fontes externas.
