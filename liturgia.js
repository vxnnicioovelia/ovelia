/* LITURGIA DIÁRIA — arquivo editado à mão.
   O site NÃO busca a liturgia na internet. Só mostra o que estiver aqui, revisado por uma pessoa.
   Para cada dia, copie o bloco de exemplo abaixo (dentro de "dias") e preencha com texto de fonte autorizada.
   Não cole leituras sem conferir a permissão de uso da tradução. Se não houver bloco para a data de hoje, o site avisa isso ao visitante.

   Exemplo (apague o "//" para usar):
   {
     data: "2026-10-17",            // AAAA-MM-DD
     celebracao: "Nome da memória, festa ou domingo do tempo litúrgico",
     primeiraLeitura: { ref: "Livro capítulo,versículos", texto: "..." },
     salmo: { ref: "Sl ...", refrao: "...", texto: "..." },
     segundaLeitura: null,          // use null quando não houver
     aclamacao: { ref: "...", texto: "..." },
     evangelho: { ref: "...", texto: "..." },
     reflexao: "Texto próprio da Ovelia (ou deixe vazio)",
     fonte: "Nome da fonte e como a permissão foi confirmada"
   }
*/
window.LITURGIA = {
  ultimaAtualizacao: null,   // ex.: "2026-10-17"
  dias: []
};
