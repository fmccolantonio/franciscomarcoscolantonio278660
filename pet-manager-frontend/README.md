# Pet Manager - Front End (Processo Seletivo Sênior)

Este projeto é uma solução SPA (Single Page Application) desenvolvida em Angular para o gerenciamento de Pets e Tutores.

## 🚀 Tecnologias e Arquitetura

O projeto foi construído seguindo rigorosamente os requisitos do Edital, com foco em escalabilidade e manutenibilidade.

* **Framework:** Angular (v17+ Standalone Components)
* **Estilização:** Tailwind CSS (Responsividade e Design System)
* **Gerenciamento de Estado:** Padrão **Facade** com `BehaviorSubject` (RxJS) para reatividade e cache local.
* **Rotas:** Lazy Loading implementado para módulos `Pets` e `Tutores`.
* **Formulários:** Reactive Forms com validação tipada.
* **Segurança:** Autenticação JWT com Interceptor HTTP e AuthGuard.
* **Infraestrutura:** Docker e Nginx para containerização.

## 📋 Funcionalidades Implementadas

### Módulo de Pets
* [x] Listagem com Paginação e Busca por nome.
* [x] Cadastro e Edição (CRUD).
* [x] Upload de Foto do Pet.
* [x] Visualização em Cards responsivos.

### Módulo de Tutores
* [x] CRUD Completo de Tutores.
* [x] **Vinculação Sênior:** Gerenciamento de vínculo Pet-Tutor diretamente na interface.
* [x] Listagem aninhada de pets por tutor.

### Autenticação
* [x] Tela de Login.
* [x] Proteção de rotas (Guard).
* [x] Interceptor para envio automático de Token.

## 🐳 Como Executar (Docker)

A aplicação está totalmente containerizada.

1.  **Construir a imagem:**
    ```bash
    docker build -t pet-manager .
    ```

2.  **Rodar o container:**
    ```bash
    docker run -p 80:80 pet-manager
    ```

3.  Acesse em: `http://localhost`

## 🧪 Testes

Para executar os testes unitários:
```bash
npm test
```

---
*Desenvolvido como parte do Processo Seletivo Simplificado.*
