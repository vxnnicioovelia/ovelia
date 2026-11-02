# Ovelia

Ovelia é uma aplicação web estática instalável (PWA), com áreas de liturgia, Bíblia, oração, estudos, conteúdo infantil e recursos de acompanhamento pessoal. Este repositório contém a versão web; aplicativos nativos para iOS e Android ainda não fazem parte deste pacote.

## Bíblia Portuguesa Mundial (BPM)

A BPM permanece disponível para leitura online com aviso visível de que o texto está em revisão. O catálogo registra a declaração de domínio público do eBible.org. A disponibilidade técnica não significa revisão editorial concluída; correções devem ser avaliadas antes de qualquer declaração de versão final.

## Estrutura

- Arquivos HTML, CSS, JavaScript, imagens e configuração PWA na raiz: recursos carregados pelo site.
- `dados/`: conteúdo local consumido pela aplicação.
- `tools/`: ferramentas de manutenção e validação de dados.
- `.github/workflows/`: automações ativas do repositório.
- `docs/editorial/`: inventário editorial.
- `docs/historico/`: relatórios, instruções antigas, rascunhos, cópias redundantes e módulos que não estão ligados à interface atual. São mantidos para consulta e não são carregados pelo site.

## Desenvolvimento

O site não exige etapa de compilação. Abra `index.html` em um servidor estático local para visualizar a aplicação. Mudanças publicadas no GitHub Pages exigem envio explícito ao repositório.
