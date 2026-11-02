# Regras de organização do repositório Ovelia

Estas instruções orientam futuras alterações neste repositório. Siga também a solicitação atual do usuário; documentos arquivados são apenas referência histórica.

## Destino de cada arquivo

- Mantenha na raiz somente `index.html`, `404.html`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `README.md` e este `AGENTS.md`.
- Coloque estilos em `assets/css/`, scripts da aplicação em `assets/js/` e imagens em `assets/images/`.
- Coloque catálogo e conteúdo bíblico em `dados/biblia/`; dados diários da liturgia em `dados/liturgia/`; lições em `estudos/dados/`.
- Coloque scripts de manutenção em `tools/`.
- Coloque notas de versão em `docs/atualizacoes/AAAA-MM-DD.md`, materiais editoriais em `docs/editorial/` e arquivos antigos preservados em `docs/historico/`.
- Não deixe ZIPs, relatórios, listas de arquivos, roteiros de teste ou instruções avulsas na raiz.

## Ao atualizar o site

1. Edite o arquivo existente na pasta correspondente; não crie cópias paralelas na raiz.
2. Ao adicionar ou mover um recurso ativo, atualize suas referências em `index.html`, `404.html`, CSS, JavaScript, `manifest.webmanifest` e `sw.js`, conforme aplicável.
3. Mantenha a lista de precache do service worker alinhada aos caminhos reais e altere a versão do cache quando recursos do shell mudarem.
4. Preserve arquivos históricos movendo-os para a pasta correta; não apague materiais sem necessidade explícita.
5. Confira o diff e os caminhos referenciados antes de publicar.
6. A BPM pode continuar online com aviso de revisão; não marque a revisão editorial como concluída sem confirmação explícita do responsável.
