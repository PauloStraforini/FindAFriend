# App

Principais Funcionalidades da Aplicação (versão Pets)
1. Usuários (Owners)

Podem se cadastrar e autenticar.

Visualizar e atualizar seus perfis.

Gerenciar seus pets.

2. Pets

Cada usuário pode cadastrar, atualizar e visualizar seus pets.

Possuem informações como: nome, espécie, raça, idade, histórico de vacinas e características especiais.

3. Eventos (Events)

Agendamentos para consultas veterinárias, banhos, vacinas, etc.

Cada evento está associado a um pet.

Permite notificar o dono do pet sobre eventos futuros.

4. Serviços (Services)

Tipos de serviços oferecidos (veterinário, banho, tosa, vacinação, etc.).

Possível integração para agendamento direto via API.

Tecnologias Utilizadas

Node.js: execução do servidor.

TypeScript: tipagem estática para maior robustez.

Fastify: framework web rápido e leve.

Prisma: ORM para PostgreSQL, gerenciando Users, Pets e Events.

Zod: validação de esquemas de entrada/saída.

Vitest: testes unitários e de integração.

Docker: ambiente de desenvolvimento isolado com PostgreSQL.

TSX / TSUP: execução direta de TypeScript e bundling da aplicação.

FindAFriend API

## Regras da aplicação

- [ x ] Deve ser possível se cadastrar como uma ORG
- [ x ]  Deve ser possível realizar login como uma ORG
- [ x ]  Deve ser possível cadastrar um pet
- [ x ]  Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ x ]  Deve ser possível filtrar pets por suas características
- [ x ]  Deve ser possível visualizar detalhes de um pet para adoção

## Regras de negócio

- [ x ]  Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ x ]  Uma ORG precisa ter um endereço e um número de WhatsApp
- [ x ]  Um pet deve estar ligado a uma ORG
- [ x ]  O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ x ]  Todos os filtros, além da cidade, são opcionais
- [ x ]  Para uma ORG acessar a aplicação como admin, ela precisa estar logada

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
