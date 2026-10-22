# Documentação da Ovelia

- `guias/`: instruções por recurso e manutenção.
- `relatorios/`: relatórios de implementação e continuidade.
- `auditoria/`: arquivos modificados, testes e inventários.
- `historico/`: notas e guias de etapas anteriores, preservados para consulta.

Os arquivos de execução continuam na raiz para preservar os caminhos relativos usados pelo site.

## Perfis

Nomes visíveis: **Pequenas Ovelias** (infantil), **Ovelias em Caminhada** (geral) e **Ovelias Sábias** (leitura confortável e navegação simplificada; qualquer pessoa pode escolher).
Por compatibilidade, os identificadores internos não mudam: `data-profile="kids|adult|senior"`, classes `perfil-*` e a chave `ovelia-perfil` no armazenamento local (valores antigos como `easy` são migrados).
