# Relatório — contraste global

- Base de referência: `ovelia-main 11.zip`.
- Corrigida a regra da saudação: `.hero` utilizava texto branco por padrão, mesmo quando o fundo se tornava branco.
- O filtro quente agora usa `html::after` fixo e classe no elemento raiz, em vez de depender apenas de `body::after` com `mix-blend-mode: soft-light`.
- A intensidade máxima foi elevada para 0,42 para tornar o efeito perceptível e uniforme.
- `index.html` e `sw.js` atualizados para carregar as novas versões.
- Verificações: sintaxe JavaScript e JSON não aplicável aos arquivos desta entrega; referências e versão conferidas por inspeção estática.
- Não testado em Safari real e não publicado.
