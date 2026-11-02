# Roteiro manual no iPhone — regressão e Bíblia Ovelia

1. Abra a Ovelia no Safari e confirme que a Home carrega sem texto literal `\n`, sem página em branco e sem avisos de recurso ausente.
2. Abra **Trocar perfil**; teste Pequenas Ovelias, Ovelias em Caminhada e Ovelias Sábias. Navegue entre telas e confirme que o perfil se mantém.
3. Abra **Estudos**. Confira os módulos e a contagem das lições existentes; abra e conclua uma lição, retorne e confira que o progresso foi preservado.
4. Abra **Bíblia**. Confirme que o catálogo de traduções carrega; BPM, Matos Soares e Figueiredo devem continuar marcadas como “Em preparação” e não exibir texto integral antes da ativação autorizada.
5. Na Bíblia, teste seleção de livro/capítulo, letra normal/grande/muito grande, espaçamento e tema escuro. No perfil Pequenas Ovelias, a Bíblia adulta deve continuar bloqueada.
6. Abra **Liturgia** e mude a data. Confirme que a referência do dia é correta e que a mensagem de direitos/indisponibilidade não foi removida.
7. Abra **Orações** e **Terço**; avance e volte pelas etapas e teste a leitura por voz, se disponível.
8. Abra **Favoritos** e **Pão Diário**; salve/consulte um item, recarregue a página e confirme persistência.
9. Teste **Santo do Dia**, **Nomes Bíblicos**, **Sobre** e **Instalar**; verifique busca/filtros, mensagens e instalação PWA.
10. Teste largura/zoom, alternância de tema, conectividade offline e recarregamento. Anote qualquer erro de console, 404, rolagem horizontal ou dado perdido antes de considerar aprovado.

## Depois da geração da BPM (etapa separada)
O workflow da Bíblia é manual e não foi executado nesta entrega. Depois de revisar o código e decidir iniciá-lo, execute-o pelo GitHub Actions. Se falhar em contagem de capítulos, numeração de versículos ou livro ausente, não contorne a validação: registre o erro e revise o formato da fonte. Mesmo quando passar, confirme que o catálogo permanece `em_preparacao`; ativação é uma etapa separada.
