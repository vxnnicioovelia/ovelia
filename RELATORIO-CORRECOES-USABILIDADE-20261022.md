# Ovelia — correções de usabilidade (22/10/2026)

## Alterações
- Corrigido um problema concreto da liturgia: o workflow chamava `tools/gerar-liturgia.mjs`, mas esse arquivo continha apenas uma quebra de linha (1 byte), enquanto o gerador real estava na raiz. O workflow agora executa o gerador correto, e o arquivo em `tools/` encaminha para ele.
- O gerador automático agora tenta uma API comunitária alternativa no servidor quando a fonte principal falha. A reserva salva data, celebração, cor e referências — não o texto integral sem licença confirmada.
- O botão “Voltar” do menu principal fica oculto enquanto o menu está fechado; aparece somente quando o menu é aberto.
- O contraste fica reunido no painel “Aa”, evitando o botão duplicado no cabeçalho.
- O filtro de cor é descrito como filtro quente de leitura, com aviso de que ele não altera fisicamente a emissão de luz azul do aparelho.
- O perfil infantil usa tamanhos de texto, cartões, controles e espaçamentos mais compactos, especialmente em telas estreitas.
- Ao selecionar uma história, a tela entra em modo de leitura, ocultando introdução, biblioteca e demais blocos. “Voltar à biblioteca” retorna à lista. A pergunta interativa começa recolhida e abre por um botão próprio.
- As versões dos arquivos e do cache do service worker foram atualizadas para evitar reaproveitamento da interface antiga.

## Validação
- JavaScript verificado por sintaxe com Node.js.
- O gerador foi testado com uma API simulada: quando a fonte primária não retornou o formato esperado, a fonte reserva produziu JSON válido com referências e sem incorporar texto integral.
- A API externa alternativa não pôde ser validada ao vivo neste ambiente. A simulação confirma a lógica de fallback, não a disponibilidade atual do serviço externo.
- Após publicar no GitHub Pages, execute manualmente **Actions → Atualizar liturgia diária → Run workflow** para gerar os primeiros JSONs imediatamente. Depois, o agendamento diário mantém os dados atualizados.
- Depois de publicar, teste o perfil infantil (abrir história / voltar à biblioteca), o menu (abrir / fechar), os controles do painel “Aa” e a liturgia de hoje e de uma data anterior.
