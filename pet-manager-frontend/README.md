# Desafio Técnico - Front End (Pet Manager)
**Processo Seletivo Conjunto N. 001/2026/SEPLAG**

**Candidato:** Francisco Marcos Colantonio
**Vaga:** Analista de Tecnologia da Informação - Perfil Engenheiro da Computação (Sênior)

---

## Visão Geral
Este projeto consiste em uma Single Page Application (SPA) desenvolvida para o gerenciamento de Pets e Tutores, integrada à API governamental fornecida. O objetivo principal do desenvolvimento foi entregar uma solução robusta que atenda não apenas aos requisitos funcionais, mas também aos critérios de qualidade de código, escalabilidade e arquitetura exigidos para o perfil Sênior.

A aplicação foi construída utilizando Angular (versão mais recente), seguindo estritamente as melhores práticas de mercado, e é entregue containerizada via Docker, pronta para execução em qualquer ambiente que suporte orquestração de containers.

---

## Tecnologias e Arquitetura

Para garantir a manutenibilidade e performance do software, foram adotadas as seguintes estratégias:

* **Angular e Modularização:** A aplicação foi estruturada em módulos de funcionalidade distintos (Auth, Pets, Tutors) com carregamento sob demanda (Lazy Loading).
* **Gerenciamento de Estado:** Utilização do padrão Facade para abstrair a lógica de estado dos componentes visuais, utilizando BehaviorSubject do RxJS.
* **Containerização:** Dockerfile multi-stage (Build Angular + Servidor Nginx) e Docker Compose com verificação de saúde (Health Checks).
* **Estilização:** TailwindCSS para responsividade e consistência visual.

---

## Instruções de Execução (Docker)

O projeto foi configurado para ser executado com um único comando de orquestração.

1. Certifique-se de ter o **Docker** e **Docker Compose** instalados.
2. Abra o terminal na raiz do projeto (onde se encontra o arquivo `docker-compose.yml`).
3. Execute o comando para construir e subir os containers:

    ```bash
    docker-compose up --build
    ```

4. A aplicação estará acessível através do navegador no endereço: `http://localhost:80`

**Nota:** O container aguarda as verificações de saúde (Health Checks) antes de receber requisições.

---

## Testes Unitários

Para validar a qualidade do código, foram implementados testes unitários cobrindo serviços, guards e componentes. Para rodar localmente (fora do Docker):

```bash
npm run test -- --watch=false

Notas sobre a Implementação e Priorização
Seguindo a diretriz de transparência solicitada no edital, abaixo estão detalhados os focos de desenvolvimento e observações técnicas relevantes encontradas durante a integração.

Prioridades de Desenvolvimento
Requisitos Sênior: Foi dada prioridade máxima aos itens diferenciadores do perfil, especificamente: implementação de testes unitários, configuração de Health Checks no Docker Compose e a aplicação rigorosa do padrão Facade para gestão de estado.

Segurança e Autenticação: Implementação robusta de interceptadores HTTP (AuthInterceptor) para anexar automaticamente o Token JWT nas requisições e realizar a renovação transparente da sessão (Refresh Token) sem interromper o fluxo de trabalho do usuário.

Qualidade de Código: Foco em Clean Code, tipagem estrita com TypeScript e separação clara de responsabilidades entre componentes, serviços e fachadas.

Limitações Identificadas (API Externa)
Campo "Espécie" dos Pets: Durante a integração com a API fornecida, foi identificado que o endpoint de listagem de pets (GET /v1/pets) não retorna os dados referentes à espécie do animal, embora este campo seja esperado na interface de listagem conforme requisitos de negócio comuns.

Solução Adotada: O campo foi mantido na interface para preservar a fidelidade ao layout proposto, porém foi implementado um tratamento no front-end para lidar com a ausência desse dado (valor nulo ou vazio) sem causar erros na aplicação. Trata-se de uma limitação do serviço externo que o front-end reflete de maneira controlada.

Checklist de Entregas (Conformidade com o Edital)
Para facilitar a avaliação técnica, abaixo encontra-se o mapeamento dos requisitos solicitados:

1. Funcionalidades Gerais
[x] Consumo de API: Integração completa via HttpClient.

[x] Layout Responsivo: Implementado via TailwindCSS.

[x] Lazy Loading: Configurado no arquivo app-routing.module.ts.

[x] Paginação: Controles de paginação implementados nas listagens.

2. Funcionalidades de Negócio
[x] CRUD Pets: Listagem, Detalhamento, Cadastro e Edição funcionais.

[x] CRUD Tutores: Cadastro, Edição e Vinculação com Pets operacionais.

[x] Upload de Imagens: Fluxo de envio de fotos implementado.

[x] Busca: Filtros de pesquisa integrados à API.

3. Segurança
[x] Login JWT: Autenticação via Token funcional.

[x] Refresh Token: Renovação automática de token implementada.

[x] Guards: Proteção de rotas privadas ativa.

4. Diferenciais Sênior
[x] Health Checks: Configurados no arquivo docker-compose.yml.

[x] Testes Unitários: Arquivos .spec.ts presentes e validados.

[x] Arquitetura Facade: Implementada nos módulos de Pets e Tutores.

Estrutura de Pastas
A organização do projeto segue uma estrutura modular para facilitar a escalabilidade:

src/
├── app/
│   ├── core/                  # Singleton services e configurações globais
│   │   ├── components/        # Navbar e componentes globais
│   │   ├── guards/            # Guardas de rota (AuthGuard)
│   │   ├── interceptors/      # Interceptadores HTTP (AuthInterceptor)
│   │   ├── models/            # Interfaces globais (Auth, Pagination)
│   │   └── services/          # Serviços globais (AuthService)
│   ├── modules/               # Módulos de funcionalidade (Lazy Loaded)
│   │   ├── auth/
│   │   │   └── pages/login    # Página de Login
│   │   ├── pets/
│   │   │   ├── models/        # Modelos de Pets
│   │   │   ├── pages/         # Componentes de Página (PetList)
│   │   │   ├── services/      # Serviços específicos de Pets
│   │   │   └── state/         # Gerenciamento de Estado (PetsFacade)
│   │   └── tutors/
│   │       ├── models/        # Modelos de Tutores
│   │       ├── pages/         # Componentes de Página (TutorList)
│   │       ├── services/      # Serviços específicos de Tutores
│   │       └── state/         # Gerenciamento de Estado (TutorsFacade)
│   ├── shared/                # Componentes compartilhados
│   ├── app.routes.ts          # Definição de rotas principais
│   └── app.config.ts          # Configuração da aplicação (Providers)
├── environments/              # Variáveis de ambiente
├── docker-compose.yml         # Orquestração de containers
├── Dockerfile                 # Definição de imagem Docker
└── nginx.conf                 # Configuração do servidor web