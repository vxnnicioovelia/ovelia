# Ovelia — atualização 1 (navegação, perfis e links oficiais)

## O que mudou nesta atualização
- Reforçada a validação dos perfis salvos: escolhas antigas são migradas e valores inválidos voltam à seleção inicial, sem quebrar a navegação.
- Melhorado o uso do seletor de perfil por teclado, mantendo o foco dentro da janela enquanto ela está aberta.
- O seletor inicial leva o foco para a primeira opção, facilitando a navegação por acessibilidade.
- Adicionado o link oficial do Instagram `@oveliaoficial` na página Sobre e no rodapé.
- A página 404 agora usa a identidade visual oficial da Ovelia, em vez da antiga paleta azul.
- Preservados os conteúdos, mascotes, orações, terço, liturgia, Bíblia, estudos, histórias e quiz existentes.

## Atualizar pelo iPhone
1. Baixe este ZIP e toque nele no app **Arquivos** para extrair.
2. Entre na pasta `ovelia` extraída.
3. No GitHub, abra o repositório: https://github.com/vxnnicioovelia/ovelia
4. Substitua somente estes arquivos pelos arquivos da pasta `ovelia`: `app.js`, `index.html`, `404.html` e `LEIA-ME-ATUALIZACAO.md`. O `estilo.css` e todos os arquivos de conteúdo/imagens permanecem iguais; não é necessário substituí-los.
5. Faça **Commit changes** no GitHub.
6. Abra https://vxnnicioovelia.github.io/ovelia/#home no Safari e recarregue a página. Se a versão antiga continuar aparecendo, feche a aba e abra novamente.

> O ZIP contém uma cópia completa do site para segurança. Não apague arquivos do repositório. Esta atualização não altera o site publicado automaticamente: é necessário enviar os arquivos ao GitHub e confirmar o commit.

## Checklist de teste após publicar
- [ ] Selecionar cada um dos três perfis e confirmar que a escolha permanece após recarregar.
- [ ] No Modo infantil, confirmar que páginas restritas retornam ao Início.
- [ ] No Modo normal, confirmar que todas as áreas continuam disponíveis.
- [ ] No Ovelia 60+, confirmar letras maiores e menu simplificado.
- [ ] Abrir Sobre e tocar no link do Instagram.
- [ ] Abrir um endereço inexistente no site e confirmar que a página 404 mantém a identidade Ovelia.
- [ ] Conferir orações, terço, liturgia, lista de livros bíblicos, estudos, histórias e quiz.

## Importante sobre testes
A estrutura e a sintaxe do JavaScript serão verificadas no pacote. O teste visual/interativo final precisa ser feito no Safari do iPhone depois de publicar, pois não consigo executar o site dentro do Safari do seu aparelho nesta etapa.

---

