# Ovelia — pacote integrado (base + melhorias dos níveis 2 e 3)

Este pacote integra as melhorias existentes diretamente à página principal. Não é apenas um conjunto de arquivos soltos: `index.html` carrega os estilos e scripts de calendário/check-in, navegação, liturgia por data, histórias adicionais e revisão/gamificação.

## Arquivos importantes

- `index.html`: estrutura das páginas e carregamento dos módulos.
- `estilo.css`: estilos principais.
- `app.js`: navegação principal, perfis, leitura em voz alta, orações, terço, estudos, quiz e liturgia do dia.
- `nivel2.js` / `nivel2.css`: calendário/check-in, navegação voltar/início, rótulos, links oficiais e orientações de voz.
- `nivel3.js` / `nivel3.css`: consulta de referências litúrgicas pela data selecionada, biblioteca de 12 histórias adicionais e revisão/gamificação local.
- `liturgia.js`: estrutura opcional para leituras manuais com permissão de uso confirmada; está vazia por padrão.
- `404.html`, ícones e imagens: mantidos.

## Como atualizar o GitHub Pages pelo iPhone

1. Baixe e extraia o ZIP no app **Arquivos** do iPhone.
2. Abra o repositório: https://github.com/vxnnicioovelia/ovelia
3. Envie os arquivos extraídos para a **raiz do repositório**, no mesmo nível de `index.html`. Substitua os arquivos de mesmo nome pelos deste pacote; mantenha as imagens e ícones incluídos.
4. Se o GitHub não remover arquivos antigos automaticamente, exclua estes arquivos obsoletos, que não são mais carregados: `nivel1.js` e `nivel1.css`.
5. Os antigos guias de instalação por nível também foram consolidados neste `LEIA-ME.md`; se ainda estiverem no repositório, podem ser removidos: `LEIA-ME-ATUALIZACAO.md`, `LEIA-ME-NIVEL2.md` e `LEIA-ME-NIVEIS-2-E-3.md`.
6. Faça o commit na branch `main` e aguarde o GitHub Pages publicar.
7. Abra https://vxnnicioovelia.github.io/ovelia/#home no Safari. Se necessário, feche a aba e abra novamente para evitar cache antigo.

**Importante:** não basta colocar o ZIP no repositório. Os arquivos extraídos precisam ficar na raiz, junto de `index.html`.

## O que foi integrado nesta versão

- Navegação de seção com Voltar e Início, links oficiais e rótulos de menu.
- Calendário mensal com seleção de data, seleção de celebrações fixas cadastradas e check-in de fé salvo localmente.
- Orientações de leitura por voz para iPhone, mantendo os controles já existentes no site.
- Liturgia por data selecionada: tenta consultar referências da data escolhida e oferece acesso à fonte oficial quando a API falha.
- 12 histórias bíblicas adicionais em paráfrase, com referências, lição, atividade e oração.
- Revisão de cinco perguntas, pontos, níveis e conquistas calculados a partir das atividades registradas.
- Preservação das áreas existentes: início, liturgia, Bíblia, orações, Terço, estudos, infantil e sobre.

## Limites conhecidos — não confundir com recursos concluídos

- O calendário de santos é uma seleção inicial de datas fixas, não um calendário litúrgico completo. Confirme celebrações móveis e locais em fonte oficial.
- A biblioteca infantil ainda não contém 365 histórias; esta etapa acrescenta 12 histórias.
- A Bíblia ainda não oferece consulta integrada de todos os capítulos e versículos.
- A liturgia apresenta referências e reflexão editorial própria; os textos integrais permanecem na fonte oficial até confirmar a permissão de reprodução da tradução.
- O progresso é guardado no armazenamento local deste aparelho. Não sincroniza entre dispositivos e pode ser perdido se os dados do navegador forem apagados.
- A síntese de voz depende das vozes disponíveis no aparelho e no navegador; não é possível garantir vozes específicas em todos os iPhones.
- Não há login, backend ou sincronização na nuvem.

## Testes e validação

Verificações realizadas neste pacote:

- Sintaxe JavaScript de `app.js`, `nivel2.js` e `nivel3.js`.
- Conferência da integridade do ZIP.
- Conferência de que `index.html` referencia os estilos e scripts necessários.
- Conferência estática de IDs principais e referências a arquivos locais; o teste automatizado de navegador não pôde ser concluído neste ambiente.

Ainda é necessário testar no Safari do iPhone depois da publicação, incluindo troca de perfis, navegação voltar/início, data da liturgia, check-in, histórias e revisão. A publicação não é automática: o usuário precisa enviar os arquivos e fazer commit no GitHub.
