# Ovelia — Níveis 2 e 3 (pacote combinado para iPhone)

Este ZIP combina as melhorias incrementais de experiência do Nível 2 com conteúdo e aprendizado do Nível 3. Não substitui os arquivos existentes do site.

## Instalação
1. Extraia o ZIP no app Arquivos do iPhone.
2. No repositório https://github.com/vxnnicioovelia/ovelia, adicione `nivel2.js`, `nivel2.css`, `nivel3.js` e `nivel3.css` à raiz, ao lado de `index.html` e `app.js`.
3. Dentro de `<head>` no `index.html`, antes de `</head>`, adicione: `<link rel="stylesheet" href="nivel2.css">` e `<link rel="stylesheet" href="nivel3.css">`.
4. No final do `index.html`, depois do script `app.js` e antes de `</body>`, adicione nesta ordem: `<script src="nivel2.js"></script>` e `<script src="nivel3.js"></script>`.
5. Salve/commite os arquivos na branch `main`, aguarde o GitHub Pages e recarregue https://vxnnicioovelia.github.io/ovelia/ no Safari.

## Inclui
- Nível 2: Voltar/Início, troca de ambientes, links oficiais, orientações de voz, calendário/check-in e atalhos entre biblioteca de orações e Meu Terço.
- Nível 3: liturgia por data com referências e reflexão original, 12 histórias Kids novas, pontos/níveis/conquistas e revisão com cinco perguntas.

## Direitos e limites
A liturgia integral continua na fonte oficial enquanto a permissão de reprodução não estiver confirmada. A API comunitária pode fornecer referências, mas isso não equivale a licença para republicar os textos. Fontes: https://liturgiadiaria.edicoescnbb.com.br/app/user/user/UserView.php e https://github.com/Dancrf/liturgia-diaria.
A coleção de 365 histórias ainda não está completa; esta versão acrescenta 12 histórias. Progresso e check-ins são locais no aparelho.

## Checklist após publicar
- [ ] Voltar/Início e troca de ambientes.
- [ ] Testar voz pt-BR, velocidade, pausa/continuação e parar no iPhone.
- [ ] Escolher outra data na liturgia e conferir referências; testar sem internet.
- [ ] Buscar uma história Kids, marcá-la como concluída e recarregar.
- [ ] Marcar etapas de estudo, concluir revisão e quiz; conferir pontos/conquistas.
- [ ] Check-in persiste depois de recarregar.

O ZIP e a sintaxe do JavaScript foram verificados, mas não houve publicação automática nem teste em iPhone físico.
