# Ovelia

Aplicação web estática instalável (PWA) com áreas de liturgia, Bíblia, oração, estudos, conteúdo infantil e acompanhamento pessoal. Este repositório contém o site web; os aplicativos nativos para iOS e Android ainda não fazem parte deste pacote.

## Estrutura do repositório

- `index.html`, `404.html`, `manifest.webmanifest`, `sw.js` e `robots.txt`: entradas e configurações do GitHub Pages.
- `assets/css/`: estilos do site.
- `assets/js/`: código JavaScript da aplicação.
- `assets/images/`: imagens, ícones e ilustrações.
- `dados/`: catálogos bíblicos e dados litúrgicos.
- `estudos/dados/`: lições carregadas pela área de estudos.
- `tools/`: ferramentas de manutenção e validação.
- `docs/atualizacoes/`: registros de mudanças.
- `docs/editorial/`: materiais editoriais.
- `docs/historico/`: arquivos antigos preservados para consulta, não carregados pelo site.

As regras para futuras alterações estão em [AGENTS.md](AGENTS.md). A raiz fica reservada às entradas e configurações do site.

## Bíblia Portuguesa Mundial (BPM)

A BPM permanece disponível para leitura online com aviso visível de que o texto está em revisão. O catálogo registra a declaração de domínio público do eBible.org. A disponibilidade técnica não significa revisão editorial concluída.

## Desenvolvimento

O site não exige compilação. Sirva `index.html` por um servidor estático para visualizá-lo localmente. Ao mover um recurso, atualize os caminhos de carregamento, o manifesto e o cache do service worker.
