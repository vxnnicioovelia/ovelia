# Ovelia — correção global de contraste e filtro quente

## Arquivos
Substitua estes quatro arquivos na raiz do repositório:
- `estilo.css`
- `app.js`
- `index.html`
- `sw.js`

## O que corrige
- Saudação (`.hero`) com texto escuro sobre fundo claro no tema claro.
- Saudação com texto claro sobre grafite no tema escuro.
- Contraste de texto nos cartões principais.
- Filtro quente aplicado por uma camada fixa sobre a página inteira, incluindo navegação fixa e cartões, sem bloquear toques.
- Atualização das versões de CSS/JS e do cache do service worker.

## Aplicação pelo iPhone
1. Baixe o ZIP e extraia os quatro arquivos.
2. No GitHub, abra cada arquivo na raiz do repositório e use Editar/substituir conteúdo.
3. Faça commit dos quatro arquivos.
4. Aguarde a publicação do Pages.
5. Feche a aba antiga e abra novamente o site. Se continuar antigo, feche o Safari e abra o link de novo para permitir a atualização do service worker.

## Limitação
Os arquivos foram verificados estaticamente, mas a correção ainda precisa ser confirmada visualmente no Safari após publicação. O filtro afeta o conteúdo da página web; não consegue colorir a barra de status nem a interface do próprio Safari.
