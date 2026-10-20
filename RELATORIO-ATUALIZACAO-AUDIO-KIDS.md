> **AVISO DE VERSÃO — DOCUMENTO HISTÓRICO:** este arquivo preserva decisões e instruções de uma etapa anterior. A atualização de qualidade de 19/10/2026 substitui as instruções sobre importação automática da Bíblia. O workflow de Bíblia está desativado e os textos integrais aguardam autorização editorial confirmada. Não execute os passos antigos deste documento para importar ou publicar uma tradução.



## Atualização incremental seguinte — Bíblia integrada aos estudos e idioma do áudio (2026-10-19)

- O leitor bíblico continua usando arquivos locais `dados/biblia/*.json`, mas o ZIP não continha esses dados. O workflow `Atualizar Bíblia` agora também dispara após mudanças de código na branch `main` ou `master` (exceto quando a mudança é apenas nos próprios dados gerados ou em documentação), além de permitir execução manual.
- O passo de passagens dos estudos tenta resolver cada referência na Bíblia local e exibe os versículos diretamente no estudo. Quando os dados ainda não existem ou a geração falha, mostra uma mensagem explícita e um atalho para o leitor bíblico.
- O idioma da fala agora acompanha o idioma real da voz selecionada, em vez de forçar sempre `pt-BR`. Isso permite testar uma voz inglesa se o navegador tiver traduzido o conteúdo para inglês.
- Limitação: não é possível adicionar vozes de português brasileiro que o aparelho não disponibiliza apenas com JavaScript. Para garantir múltiplas vozes em todos os dispositivos, seria necessário um serviço TTS externo ou áudio gravado autorizado.
- Fonte bíblica configurada: Bíblia Portuguesa Mundial (BPM), eBible.org, declarada como domínio público pela fonte, mas ainda em revisão. A interface não afirma aprovação oficial da Igreja Católica.
- Validações locais: sintaxe JavaScript verificada; testes reais de reprodução, GitHub Actions e visualização em dispositivos ainda precisam ocorrer após publicação.
