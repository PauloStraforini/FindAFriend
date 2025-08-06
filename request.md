# App

FindAFriend API

## Regras da aplicação

- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG
- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção

## Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Padrão de Commits

| Tipo       | Para quê serve                                                                   |
| ---------- | -------------------------------------------------------------------------------- |
| `feat`     | Adição de nova funcionalidade                                                    |
| `fix`      | Correção de bug                                                                  |
| `chore`    | Tarefas de manutenção, sem impacto direto no código de produção                  |
| `docs`     | Alterações na documentação                                                       |
| `style`    | Alterações de formatação, sem mudança de lógica (ex: ponto e vírgula, identação) |
| `refactor` | Refatoração de código (melhoria interna sem alterar comportamento externo)       |
| `test`     | Adição ou modificação de testes                                                  |
| `perf`     | Melhorias de performance                                                         |
| `ci`       | Alterações na configuração de integração contínua                                |
| `build`    | Mudanças que afetam o build (webpack, vite, deps, etc.)                          |
