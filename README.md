# API Node.js + PostgreSQL

API REST desenvolvida com **Node.js**, **Express** e **PostgreSQL** para gerenciamento de **clientes** e **pedidos**.

Este projeto foi criado com o objetivo de consolidar conhecimentos em desenvolvimento backend, aplicando conceitos fundamentais como arquitetura em camadas, integração com banco de dados relacional, operações CRUD e relacionamentos entre tabelas.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express.js
- PostgreSQL
- JavaScript (ES6+)
- node-postgres (pg)
- Dotenv
- Git
- GitHub

---

## 📚 O que foi desenvolvido

### Customers

- Criar clientes
- Listar clientes
- Buscar cliente por ID
- Atualizar cliente
- Remover cliente

### Orders

- Criar pedidos
- Listar pedidos
- Buscar pedido por ID
- Atualizar pedido
- Remover pedido
- Buscar todos os pedidos de um cliente

---

## 🧠 Conceitos estudados

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes do desenvolvimento backend, como:

- Desenvolvimento de APIs REST
- CRUD completo
- Organização em camadas (Controllers e Repositories)
- Integração entre Node.js e PostgreSQL
- SQL parametrizado (prevenção contra SQL Injection)
- Relacionamento **1:N** entre Customers e Orders
- Foreign Keys
- Manipulação de `req.params`
- Manipulação de `req.body`
- Versionamento de código com Git e GitHub

---

## 📁 Estrutura do projeto

```text
src
├── controllers
├── repositories
└── routes
```

A aplicação foi organizada em camadas para separar as responsabilidades entre o controle das requisições, acesso ao banco de dados e definição das rotas.

---

## 🚧 Próximas melhorias

As próximas etapas de desenvolvimento da API incluem:

- [ ] Validação dos dados recebidos
- [ ] Validação da existência do cliente antes da criação de pedidos
- [ ] Middleware de validação
- [ ] Middleware global para tratamento de erros
- [ ] Camada de Services
- [ ] Consultas utilizando INNER JOIN
- [ ] Refatoração das regras de negócio

---

## 🎯 Objetivo do projeto

Este projeto faz parte da minha jornada de estudos em desenvolvimento backend utilizando **Node.js** e **PostgreSQL**.

O objetivo é evoluir gradualmente uma API REST, aplicando boas práticas utilizadas no mercado, como arquitetura em camadas, modelagem de banco de dados, relacionamentos entre tabelas, organização do código e validação de dados.

Além de consolidar os conhecimentos adquiridos, este projeto também faz parte do meu portfólio, demonstrando minha evolução contínua como desenvolvedor backend.

---

## 👨‍💻 Autor

**Vitor Azevedo Fernandes**

GitHub: https://github.com/viitorfernandess
