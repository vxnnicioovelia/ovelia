# Ovelia — pacote para atualização e compartilhamento

## Incluído nesta versão
- Identidade visual Ovelia em marfim, verde-oliva, dourado fosco, bege areia e grafite esverdeado.
- Três experiências: Modo infantil, Modo normal e Ovelia 60+.
- Sete histórias bíblicas infantis e quiz com dez perguntas.
- Liturgia diária: consulta automática de metadados/referências ao abrir o site, usando a API comunitária já integrada; os textos completos continuam na fonte indicada enquanto a permissão de reprodução não estiver confirmada.
- Novo seletor de data para abrir a consulta da Canção Nova com dia, mês e ano escolhidos. A seleção de outra data abre a fonte externa; ela não muda as leituras automáticas internas, que continuam relativas ao dia atual.
- Estudo do dia relacionado às referências disponíveis, com explicação, versículos complementares, pergunta e ação prática.
- Leitor de voz ajustado para priorizar vozes em português brasileiro, preferir nomes de voz que indiquem maior qualidade quando existirem no aparelho, iniciar em velocidade mais lenta (0,85) e inserir pausas entre frases. A qualidade final depende das vozes instaladas no iPhone/navegador; não é uma voz neural própria.

## Atualizar pelo iPhone
1. Baixe e extraia este ZIP no app Arquivos.
2. Abra https://github.com/vxnnicioovelia/ovelia
3. Substitua os arquivos `index.html`, `app.js` e `estilo.css` pelos arquivos desta pasta `ovelia`.
4. Faça Commit changes.
5. Abra https://vxnnicioovelia.github.io/ovelia/ no Safari e recarregue.

Não apague imagens nem os demais arquivos do repositório. O ZIP contém o site completo para backup, mas para a atualização basta substituir os três arquivos acima.

## Limitações conhecidas
- A leitura integral da liturgia abre a fonte externa porque a Ovelia não tem permissão confirmada para republicar os textos completos.
- O seletor de data encaminha a consulta à Canção Nova; a integração interna de liturgias de datas passadas/futuras ainda não está concluída.
- O leitor usa a síntese de voz do dispositivo. Não é possível forçar uma voz premium que não esteja instalada ou exposta pelo Safari.
- O pacote foi validado por sintaxe/estrutura, mas deve ser testado no Safari do iPhone antes de ser divulgado amplamente.
