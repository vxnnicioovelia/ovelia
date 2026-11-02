# Ovelia — Etapa 2: tema neutro e conforto visual

## Arquivos na raiz
- **CRIAR** `ovelia-interface.css`
- **SUBSTITUIR** `index.html`, `app.js` e `sw.js`

Não apague outros arquivos.

## Alterações
- Tema claro: branco como superfície principal; roxo apenas em estados ativos, ícones e destaques.
- Tema escuro: grafite profundo e painéis grafite, não preto puro; texto claro e lavanda discreta.
- O leitor bíblico acompanha o tema global sem alterar o carregamento dos versículos.
- O filtro de conforto visual continua aplicado à tela inteira, mas a intensidade máxima foi reduzida de 34% para 16%, evitando amarelo excessivo.
- Mantidas as chaves existentes de preferências locais. Cache PWA atualizado.

## Aplicação pelo iPhone
1. Crie `ovelia-interface.css` na raiz e cole o arquivo do ZIP.
2. Substitua `index.html`, `app.js` e `sw.js`.
3. Confira os nomes antes de salvar/publicar.
4. Atualize o site e reabra-o para renovar o cache.

## Teste manual
- Tema claro e escuro no Início, Bíblia, Liturgia, Orações, Terço e Estudos.
- Persistência do tema após recarregar.
- Bíblia continua carregando versículos, navegando capítulos e mantendo controles de fonte/espaçamento.
- Filtro de conforto no mínimo e máximo; deve cobrir a tela inteira e não bloquear toques.
- Testar larguras 320, 360, 390 e 430 px e desktop.


## Correção complementar de contraste
A captura do iPhone mostrou texto branco sobre a área clara da saudação. Esta correção força texto escuro no tema claro, texto claro no tema escuro, melhora a cor de textos secundários e placeholders e reforça o foco visível. O arquivo `ovelia-interface.css` continua sendo carregado por último. A versão de cache foi atualizada para evitar reutilização do CSS antigo.
