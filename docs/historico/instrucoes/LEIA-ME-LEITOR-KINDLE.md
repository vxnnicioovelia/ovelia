# Ovelia — Leitor bíblico imersivo (estilo livro digital)

## Arquivos alterados/criados
- **SUBSTITUIR** `index.html`
- **SUBSTITUIR** `biblia.css`
- **SUBSTITUIR** `sw.js`
- **CRIAR** `biblia-leitor.css`
- **CRIAR** `biblia-leitor.js`

Os arquivos estão todos soltos. Não apague os demais arquivos do repositório.

## O que foi implementado
- Nova experiência de leitor em tela inteira, ativada ao entrar na aba `#biblia`.
- Barra superior discreta com seletor de livro/capítulo, configurações e modo de ocultar controles.
- Seletor com busca e lista dos livros separados por Antigo e Novo Testamento.
- Capítulos em grade após escolher um livro.
- Tipografia de leitura, espaçamento e tema claro/escuro/quente independentes.
- Navegação anterior/próximo e gesto horizontal no texto.
- Barra de progresso da rolagem.
- Uso do conteúdo renderizado pelo motor `biblia.js` existente; não há nova fonte bíblica e não há texto bíblico inventado.
- Preservação do script de favoritos existente, cujos botões são transportados com o conteúdo do capítulo.
- Controles de saída do modo leitor; a tecla Escape também fecha painéis ou sai do leitor.
- Atualização da versão de cache do PWA.

## Limites conhecidos
- Esta é uma primeira integração da camada de interface e precisa ser validada no Safari/iPhone antes de ser considerada pronta.
- A seleção e navegação reaproveitam `window.OVELIA_BIBLIA.abrir` e observam `#bibliaTexto` para copiar o conteúdo carregado.
- O gesto lateral é aplicado somente dentro da área de leitura e ignora alvos interativos; ainda precisa ser testado em dispositivo real.
- O filtro quente nesta primeira versão é um tema do leitor (fundo quente uniforme). Não altera a barra de status do iOS/Safari.
- O menu principal e as demais áreas não são redesenhados por este pacote.

## Instalação pelo iPhone
1. Abra o repositório GitHub e entre na raiz.
2. Substitua `index.html`, `biblia.css` e `sw.js` pelos arquivos do ZIP.
3. Crie `biblia-leitor.css` e `biblia-leitor.js` na raiz, colando os respectivos arquivos do ZIP.
4. Não altere outros arquivos, nem o workflow da Bíblia.
5. Após publicar, feche completamente a aba/app do Safari e reabra `https://vxnnicioovelia.github.io/ovelia/#biblia`.
6. Se houver erro, volte à raiz e restaure os três arquivos substituídos a partir do backup.

## Checklist de testes manuais
- Abrir a aba Bíblia e confirmar que o leitor em tela inteira aparece.
- Selecionar um livro, depois um capítulo; confirmar que os versículos são os do capítulo escolhido.
- Testar anterior/próximo e gestos laterais; confirmar que rolagem vertical continua natural.
- Testar fonte, espaçamento e tema claro/escuro/quente.
- Testar favoritos nos versículos.
- Abrir a Bíblia por uma referência acionada nos Estudos e confirmar destaque do versículo.
- Sair pelo botão superior e confirmar que a navegação normal continua.
- Testar perfil +60 e confirmar fontes grandes.
- Conferir Terço, Rosário, Liturgia e Estudos.
