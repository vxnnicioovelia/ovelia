# Ovelia — Parte 17: repaginação de Orações e Rosário

## Arquivos para substituir na raiz do repositório
- `index.html`
- `app.js`
- `estilo.css`
- `sw.js`

Não apague outros arquivos. Este pacote preserva o leitor bíblico da Parte 16 e não inclui `biblia.js` nem `biblia.css`.

## O que muda
- Área Orações com três destinos claros: Orações, Terços e Santo Rosário.
- Lista de orações em detalhes recolhíveis, com texto e ação de copiar.
- Orações infantis ocultas nos perfis normal e +60; ficam apenas em Pequenas Ovelias.
- Rosário/terço com marcador textual do passo atual, ligado visualmente ao tipo de conta.
- Corrigido o cursor das contas: a conta atual é destacada, não a próxima.
- Controles do terço reorganizados para telas estreitas.
- Hierarquia visual distinta para Início, Liturgia, Bíblia, Estudos e Orações, sem padronizar todos os ambientes no mesmo cartão.
- Atualizados os parâmetros de cache de `app.js`, `estilo.css` e o nome do cache do service worker.

## Instalação pelo iPhone
No GitHub, abra cada arquivo na raiz, toque no lápis, substitua o conteúdo pelo arquivo correspondente do ZIP e salve. Faça os quatro arquivos um por vez. Não publique antes de conferir o diff e o status dos arquivos.

## Teste manual após publicar
1. Abrir `#oracoes` no perfil Ovelias em Caminhada: devem aparecer Orações, Terços e Santo Rosário.
2. Abrir Orações: os títulos devem expandir o texto e o botão Copiar texto deve permanecer.
3. Entrar no perfil Pequenas Ovelias: só orações infantis; não devem aparecer terço/rosário.
4. Voltar ao perfil normal e +60: nenhuma oração infantil deve aparecer.
5. Iniciar o terço: avançar e voltar; o marcador e a conta destacada devem acompanhar o passo atual.
6. Selecionar Santo Rosário: título e explicação devem mudar para esse modo.
7. Conferir a Bíblia, Liturgia e Estudos; a Parte 17 não altera os scripts desses ambientes.
8. Testar em 320–390 px e confirmar que nenhum controle fica fora da tela.
