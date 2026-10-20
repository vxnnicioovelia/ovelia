> **AVISO DE VERSÃO — DOCUMENTO HISTÓRICO:** este arquivo preserva decisões e instruções de uma etapa anterior. A atualização de qualidade de 19/10/2026 substitui as instruções sobre importação automática da Bíblia. O workflow de Bíblia está desativado e os textos integrais aguardam autorização editorial confirmada. Não execute os passos antigos deste documento para importar ou publicar uma tradução.

# Ovelia — atualização Bíblia integrada (versão inicial)

## O que esta atualização faz
- Acrescenta um leitor de capítulos à seção Bíblia existente.
- Permite selecionar um dos 73 livros na lista atual, selecionar capítulos e avançar/voltar.
- Preserva os outros módulos e os perfis atuais.
- Identifica a Bíblia Portuguesa Mundial (BPM) como tradução em revisão, não apresentada como edição oficialmente aprovada pela Igreja Católica.
- Usa a fonte pública do eBible.org. O texto não é copiado para o repositório nesta versão.

## Limitação importante
Esta versão carrega cada capítulo dentro de um quadro incorporado da página oficial do eBible.org. Portanto, precisa de internet, depende da disponibilidade da fonte e **não funciona offline**. A integração não substitui a etapa futura de preparar e validar dados locais por livro. Se o site de origem impedir a incorporação ou não carregar em algum navegador, use o botão “Abrir texto na fonte”.

A fonte declara a tradução como domínio público, mas também diz que ela é um rascunho ainda em revisão:
- https://ebible.org/porbrbsl/
- https://ebible.org/porbrbsl/copyright.htm

A lista usa a ordem dos 73 livros católicos. Ester utiliza a edição grega com os acréscimos deuterocanônicos; Daniel usa a edição com porções gregas, conforme a descrição da fonte. Os caminhos e contagens dos capítulos ainda devem ser verificados de ponta a ponta antes de considerar todos os livros validados.

## Instalação
1. Faça uma cópia/backup do repositório antes de substituir arquivos.
2. Envie `index.html`, `biblia.js` e `biblia.css` para a raiz do repositório, substituindo `index.html` e adicionando os dois novos arquivos.
3. Não apague nem substitua `app.js`, `estilo.css`, `liturgia.js`, `nivel2.js`, `nivel3.js` ou os assets.
4. Faça commit na branch `main` e aguarde o GitHub Pages publicar.
5. Abra a Ovelia no iPhone, entre na área Bíblia, toque em Gênesis e teste os capítulos 1 e 2. Teste também um salmo, um livro deuterocanônico e o fim de um livro.

## Testes executados ao preparar o pacote
- Sintaxe JavaScript: verificada com Node.js.
- Estrutura ZIP: verificada.
- Quantidade de livros no mapa: 73.
- Referência do capítulo Gênesis 1: observada na página oficial do eBible.org.
- Não foram realizados testes de navegador/Safari nem verificação automática de todos os 73 livros e capítulos.
