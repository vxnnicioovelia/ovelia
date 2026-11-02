# Ovelia — Etapa 2: navegação inferior

Esta atualização implementa somente a navegação inferior. Não modifica o conteúdo da liturgia, a Bíblia, o tema, o contraste ou os controles A−/A+.

## Arquivos desta etapa
- `navegacao-inferior.js`: monta a barra e reutiliza as rotas e o seletor de perfil existentes.
- `navegacao-inferior.css`: aparência responsiva, área segura do iPhone e espaço para não cobrir o final do conteúdo.
- `index.html`: duas referências novas para carregar o CSS e o JavaScript.

## Perfis
- Adulto: Início, Liturgia, Bíblia, Oração, Estudos e Mais.
- Ovelia 60+: Início, Liturgia, Bíblia, Orações, Terço e Mais.
- Kids: Início, Histórias, Orações e Mais, distribuídos pela largura disponível.

“Mais” abre o menu existente; não cria uma página nem elimina opções antigas. Os links principais usam as âncoras existentes no site.

## Instalação
Este é o pacote completo da etapa 2. Faça backup do repositório antes de enviar arquivos. Extraia o ZIP e envie a pasta `ovelia` respeitando a estrutura. Não envie o ZIP compactado diretamente como página. Não publique até revisar o diff.

## Testes executados
- Verificação de sintaxe JavaScript com `node --check` para o módulo novo e `app.js`.
- Verificação estática de que os destinos usados existem como seções no `index.html`.
- Verificação de integridade do ZIP.

Não foram executados testes automatizados de navegador, Safari/iPhone físico, leitor de tela ou console remoto. Esses testes manuais permanecem pendentes antes de publicar.
