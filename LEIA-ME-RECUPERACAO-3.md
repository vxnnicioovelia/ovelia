# Ovelia — Recuperação, etapa 3 (Prioridade 2: nova página inicial)

## O que mudou
- **Adulto e 60+:** a Início agora tem a Ovelha (com a Pomba como complemento), a saudação por horário, a data, o cartão "Palavra do dia" e um acesso discreto à Liturgia de hoje.
  Foram removidos da Início os cartões que repetiam o menu: Orações, Terço, Estudos, Área infantil, Bíblia, "Letra grande", "Paz e esperança" e os botões Rezar o terço/Ver orações.
  Nenhuma página foi removida; todas continuam na barra inferior ou em "Mais".
- **60+:** saíram os 4 cartões de atalho. Ficam a saudação, a Palavra do dia, o acesso à Liturgia e o cartão "Precisa de ajuda?" com leitura em voz alta.
- **Kids:** saudação "Bom dia/Boa tarde/Boa noite, amiguinho!", lembrança e desafio do dia (14 mensagens originais, que mudam por data). Os cartões de atalho foram removidos; a navegação continua na barra inferior.
- **Saudação:** 5h–11h59 Bom dia; 12h–17h59 Boa tarde; 18h–4h59 Boa noite, pelo relógio do aparelho. Atualiza sozinha (a cada minuto e ao voltar à aba).
- **Palavra do dia:** 31 passagens, escolhidas pela data local (a mesma o dia todo, outra no dia seguinte). Só a **referência** e uma **reflexão original** são mostradas, identificadas como conteúdo da Ovelia.
  O **texto bíblico não é exibido**: nenhuma tradução com licença foi confirmada. O cartão mostra isso de forma transparente.
- **Liturgia:** o resumo vem do mecanismo existente (`#homeLit`, preenchido por `app.js`), que não foi alterado.

## Como adicionar texto autorizado depois
Em `inicio-dados.js`, em cada item de `versiculos`, preencha `texto`, `traducao`, `licenca` e `fonte`. O texto só aparece se os quatro estiverem preenchidos.

## Arquivos
Novos: `inicio.js`, `inicio-dados.js`, `inicio.css`. Alterado: `index.html` (home e três referências).

## Testes executados (Chromium, relógio simulado)
- Saudação em 00:30, 04:59, 05:00, 11:59, 12:00, 17:59 e 18:00: todas corretas.
- Cartão diário: 3 dias seguidos = 3 passagens diferentes; estável após recarregar; igual às 00:10 e às 23:50 do mesmo dia.
- Três perfis em tema claro e escuro, 390px, e computador a 1280px: sem rolagem horizontal e sem erros de JavaScript.
- Botão "Abrir a Liturgia" abre a página; barra inferior volta à Início; troca para Kids funciona.
- Auditoria de contraste da etapa 2 repetida com a nova página: 0 falhas.

## Pendências
- Os textos bíblicos do cartão dependem de uma tradução com licença confirmada (Prioridade 3).
- Com o rodapé de voz aberto no 60+ (barra "Ouvir o site"), a saudação fica abaixo da dobra no celular. Não alterei esse bloco.
- O resumo da Liturgia na Início só mostra a celebração do dia quando o arquivo/API de liturgia responde; sem rede aparece o texto padrão.
- Não testado em iPhone real, leitor de tela, nem com os dados de liturgia ao vivo.
