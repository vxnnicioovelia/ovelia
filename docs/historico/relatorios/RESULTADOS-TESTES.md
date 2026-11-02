# Resultados dos testes — revisão de branch Ovelia

Data da revisão: 2026-10-21

## Verificações executadas nesta revisão

- Integridade dos ZIPs de revisão: aprovada.
- Sintaxe dos arquivos JavaScript/MJS: aprovada; nenhum arquivo reportou erro em `node --check`.
- `manifest.webmanifest`: JSON válido; dois ícones declarados.
- HTML: 129 IDs encontrados, sem duplicações.
- Referências locais `src`/`href` em `index.html`: nenhuma referência ausente detectada.
- Workflow da Liturgia: configuração estática revisada; texto integral permanece desabilitado e o passo de gravação só executa após sucesso.
- Gerador da Liturgia, teste de integração isolado com servidor HTTP simulado: aprovado. O gerador gravou os metadados e as referências para 2026-10-21, criou o índice e não incluiu os textos de teste quando `LITURGIA_INCLUIR_TEXTO=sim` mas `LITURGIA_TEXTO_AUTORIZADO=nao` e a licença estava vazia.

## Limites dos testes

- O servidor HTTP usado no teste de integração foi simulado localmente; isso não comprova disponibilidade nem formato atual da API pública.
- Não foi executado o GitHub Actions real nem foi feito push para o GitHub.
- Não foi executado teste visual em navegador/Safari/iPhone.
- Não foram testados integralmente os fluxos interativos de Terço, Orações, Estudos, Kids, pintura, áudio, preferências ou instalação PWA.
- A autorização editorial para distribuir textos integrais da Liturgia ou da Bíblia continua pendente. A configuração permanece fechada por padrão.

## Estado de publicação

Este pacote é para revisão. Nenhuma alteração foi enviada à `main` e nenhum site foi publicado por esta etapa.
