# Ovelia — como publicar e manter o site

Site estático (HTML, CSS e JavaScript puros). Não precisa de servidor, banco de dados, cadastro nem chaves secretas.

## Estrutura
```
index.html          página única com todas as seções (Início, Liturgia, Bíblia, Orações, Terço, Estudos, Infantil, Sobre)
404.html            página para endereços inexistentes
robots.txt          permite os buscadores
css/estilo.css      visual (as cores oficiais ficam no topo, em :root)
js/app.js           navegação, acessibilidade, orações, terço, busca de livros, quiz
dados/liturgia.js   liturgia diária (editado à mão)
img/                mascotes oficiais e ícones
```

## Publicar (substituindo a versão atual com segurança)
1. **Guarde a cópia de segurança.** A pasta `copia-de-seguranca/` do ZIP tem o site publicado atual e o protótipo original. Não precisa enviá-la ao GitHub.
2. Extraia o ZIP e abra a pasta `ovelia/`.
3. No GitHub, abra o repositório `ovelia`, clique em **Add file → Upload files** e arraste o **conteúdo** da pasta `ovelia/` (não a pasta em si). O `index.html` precisa ficar na raiz.
4. Escreva uma mensagem como “Versão com orações, terço, estudos e área infantil” e clique em **Commit changes**. O histórico anterior fica guardado no GitHub e pode ser restaurado em **Commits**.
5. Os nomes de arquivo mudaram em relação à versão atual: o `favicon.svg` antigo não é mais usado e pode ser apagado do repositório (clique no arquivo, depois na lixeira).
6. Espere de 1 a 3 minutos e abra https://vxnnicioovelia.github.io/ovelia/ (use Ctrl+F5 ou aba anônima para evitar a versão antiga em cache).
7. O GitHub Pages já está ativado. Se não estiver: **Settings → Pages → Branch: main, pasta / (root)**.

## Atualizar a Liturgia Diária
Abra `dados/liturgia.js`, copie o bloco de exemplo para dentro de `dias`, preencha com o texto de **fonte autorizada** e ajuste `ultimaAtualizacao`. O site só mostra a liturgia da data de hoje se houver um bloco com essa data. Sem ele, mostra um aviso honesto. **Não há atualização automática.**

## Adicionar orações ou estudos
- Orações: em `js/app.js`, objeto `P` (texto) e `CATS` (categoria).
- Estudos: em `index.html`, seção `id="estudos"`, copie um bloco `<details>`.
- Histórias infantis: seção `id="infantil"`. Perguntas do quiz: lista `Q` em `js/app.js`.

## Dependência externa
Fontes de letra do Google Fonts. Se estiverem indisponíveis, o site usa as fontes do aparelho e continua funcionando.

## Checklist depois de publicar (computador e celular)
- [ ] A página inicial abre com a ovelha com Bíblia, sem imagem quebrada.
- [ ] Todos os itens do menu abrem (no celular, pelo botão ☰ Menu).
- [ ] A−, A+ e Contraste funcionam e a escolha permanece ao recarregar.
- [ ] Em Orações, abrir uma oração e tocar em “Copiar texto”.
- [ ] No Terço, avançar e voltar passos, trocar os mistérios e chegar ao fim.
- [ ] Na Bíblia, buscar “Lucas” na lista de livros.
- [ ] Na área infantil, abrir uma história e jogar o quiz.
- [ ] Digitar um endereço inexistente (`.../ovelia/teste`) mostra a página 404 com a ovelha.
- [ ] Nada rola para os lados no celular.
