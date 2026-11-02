# Ovelia — Recuperação, etapa 2 (Prioridade 1: legibilidade)

## Causa
Cartões, botões e estados do Quiz tinham fundo fixo (#fff, #E8E2D5, #DDE7D8), mas o texto usava variáveis de tema.
No tema escuro (manual ou do sistema), o texto virava claro (#F7F4EC) sobre o cartão branco: contraste 1,1:1.
Também havia texto verde-oliva escuro sobre cartão escuro (2,3:1) e "hoje" no calendário com texto branco sobre verde claro (2,4:1).

## Correção
- `estilo.css`: bloco final "Camada consolidada de contraste". Cartões, botões, respostas certa/errada e boas-vindas do 60+ passaram a usar as variáveis --card, --soft, --ink e --olive. Foram criadas --ok-bg, --bad-bg, --on-gold e --on-olive, com valores para claro, escuro e alto contraste.
- `calendario-liturgico.css`: seletores de mês/ano e dia selecionado usam as variáveis do tema.
- `index.html`: apenas números de versão (cache).

## Testes executados (Chromium, 390px)
- Auditoria automática de contraste (WCAG AA 4,5:1, ou 3:1 para texto grande) em todos os textos visíveis:
  3 perfis x 4 modos (claro, escuro, alto contraste, escuro do sistema) x todas as páginas do perfil, detalhes abertos, Quiz antes e depois de responder.
  Antes: 17 falhas distintas. Depois: 0.
- Conferência visual do Quiz em claro e escuro, após responder.

## Não coberto
Telas largas, estados hover/foco, tamanhos A+ do perfil 60+, texto sobre imagens, leitor de tela.
