# Ovelia — atualização incremental de início, navegação e criatividade Kids

## Escopo
Atualização de conteúdo e apresentação, sem publicação automática e sem reconstruir o site.

## Implementado
- Refinamento da página inicial: saudação mais destacada, cartões com menos ruído visual, superfície suave e três atalhos para terço, orações e estudos.
- Polimento da barra flutuante inferior: transparência e desfoque mais sutis, espaçamento e estados ativos mais limpos, mantendo identidade visual roxa própria.
- Área de pintura removida da página longa de Histórias e quiz e colocada em uma seção separada `#criatividade`, intitulada “Vamos criar e colorir!”.
- Novo acesso “Criar” na navegação inferior do perfil Kids e entrada no menu “Mais”.
- Redesenho vetorial no código para deixar a ovelinha, o barquinho e principalmente a pombinha mais reconhecíveis.
- Nova oração infantil antes do almoço, incluindo agradecimento pelo alimento e lembrança de quem passa fome.
- Atualização das referências de arquivos e da versão do cache do service worker para a próxima publicação.

## Verificações realizadas
- `node --check` executado em 23 arquivos JavaScript: sem erros.
- IDs duplicados no HTML: nenhum encontrado.
- Caminhos locais de `script`, `link` e `img` referenciados no HTML: nenhum ausente.
- Confirmado no código: seção Criatividade, ícone/atalho da navegação e nova oração infantil.
- Integridade do ZIP verificada após empacotamento.

## Não validado nesta entrega
- Teste completo de interação visual em navegador real e em aparelhos móveis.
- Toque real no canvas, exportação PNG em iPhone/Android e contraste em larguras de 320, 360, 390 e 412 px.
- Aparência final dos novos traços em tela real; as alterações vetoriais foram revisadas no código, mas não aprovadas visualmente em dispositivos.
- Instalação PWA e atualização do cache depois de publicar no GitHub Pages.

## Como publicar
Extrair o ZIP e enviar apenas o conteúdo da pasta `ovelia/` para a raiz do repositório GitHub Pages. Não publicar `_backup_original/`. Fazer cópia de segurança antes de substituir arquivos. Esta atualização não foi publicada automaticamente.
