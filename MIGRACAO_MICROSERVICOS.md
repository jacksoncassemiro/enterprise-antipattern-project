# Migração de Arquitetura: De Camadas para Microsserviços

> Proposta arquitetural para a evolução do monólito modular (baseado em camadas) para um ecossistema distribuído de microsserviços.

---

## 1. Visão Macro da Transformação

O projeto atual, após a refatoração proposta no `REFATORACAO_CAMADAS.md`, atingiu um estado de **monólito modular**, onde as responsabilidades estão divididas em `Controllers`, `Services`, `Repositories` e `Models`. Embora essa estrutura facilite a manutenção e o isolamento lógico, ela ainda compartilha os mesmos recursos computacionais e, potencialmente, o mesmo banco de dados.

A transformação para **Microsserviços** visa quebrar essa base de código única em serviços físicos independentes, organizados em torno das capacidades de negócio (Business Capabilities) ou Subdomínios (Domain-Driven Design).

### Objetivos da Transição:

- **Escalabilidade Independente:** Permitir que domínios com maior carga (ex: Pagamentos ou Analytics) escalem independentemente de domínios com menor uso (ex: Notificações).
- **Deploy Independente:** Reduzir o risco de falhas em implantações, permitindo atualizações de rotinas isoladas.
- **Autonomia de Tecnologia:** Possibilitar o uso do banco de dados ou linguagem mais adequados para a natureza de cada serviço.

---

## 2. Boas Práticas de Desenvolvimento Adotadas

Para garantir o sucesso dessa arquitetura distribuída e evitar a criação de um "monólito distribuído" (anti-pattern crítico), adotaremos as seguintes boas práticas de engenharia de software:

### 2.1 Banco de Dados por Serviço (Database per Service)

O antipadrão mais comum na migração para microsserviços é manter um banco de dados compartilhado.

- **Implementação:** Cada microsserviço terá seu próprio banco de dados isolado (podendo ser instâncias separadas ou esquemas lógicos estritos).
- **Benefício:** Evita alto acoplamento de infraestrutura. Se o serviço de Pedidos precisar mudar o esquema do seu banco, o serviço de Pagamentos não será afetado. Comunicações de dados entre serviços ocorrerão exclusivamente via APIs ou eventos assíncronos.

### 2.2 Comunicação Assíncrona Baseada em Eventos (Event-Driven Architecture)

Em vez de orquestrar todas as transações de forma síncrona via requisições HTTP (REST/gRPC) — o que gera latência e pontos únicos de falha —, utilizaremos coreografia.

- **Implementação:** Utilização de um Message Broker (como Apache Kafka ou RabbitMQ).
- **Benefício:** Quando um pedido é criado, o serviço emite um evento (`OrderCreated`). O serviço de Pagamentos reage a esse evento de forma independente. Isso promove resiliência e baixo acoplamento.

---

## 3. Modelagem de Microsserviços (Exemplos)

A partir da segregação inicial (Auth, Orders, Payments, Analytics), modelamos os dois principais serviços críticos para o negócio:

### 3.1 Microsserviço de Pedidos (Order Service)

- **Responsabilidade (Bounded Context):** Gerenciamento de todo o ciclo de vida do pedido (criação, adição de itens, cancelamento e atualização de status).
- **Endpoints Principais:** `POST /api/v1/orders`, `GET /api/v1/orders/{id}`
- **Persistência Recomendada:** Banco de dados relacional (ex: PostgreSQL) pela forte necessidade de transações ACID e integridade dos dados na criação da ordem.
- **Eventos Publicados:** `OrderCreated`, `OrderCancelled`.
- **Eventos Consumidos:** `PaymentApproved`, `PaymentDeclined`.

### 3.2 Microsserviço de Pagamentos (Payment Service)

- **Responsabilidade (Bounded Context):** Processamento financeiro, integração com gateways de pagamento externos e regras de aprovação/estorno.
- **Endpoints Principais:** `POST /api/v1/payments/process`, `POST /api/v1/payments/{id}/refund`
- **Persistência Recomendada:** Banco de dados relacional ou NoSQL orientado a documentos com alta consistência, protegido por rigorosas auditorias.
- **Eventos Publicados:** `PaymentApproved`, `PaymentDeclined`.
- **Eventos Consumidos:** `OrderCreated` (para iniciar o processo automático de cobrança).

---

## 4. Estratégia de Observabilidade

Em sistemas distribuídos, a visibilidade operacional é fundamental para a resolução ágil de incidentes.

### 4.1 Logs Centralizados

- **Ferramentas:** Stack ELK (Elasticsearch, Logstash, Kibana) ou Datadog.
- **Estratégia:** Todos os microsserviços irão gerar logs estruturados no formato JSON. Será exigido o uso de um **Correlation ID** (um UUID único inserido no cabeçalho da primeira requisição no API Gateway) que será repassado para todos os serviços subsequentes. Isso permite rastrear a jornada completa do usuário através dos múltiplos logs.

### 4.2 Métricas de Aplicação e Negócio

- **Ferramentas:** Prometheus e Grafana.
- **Estratégia:** Coleta de métricas sistêmicas (Uso de CPU, Memória) da infraestrutura (Kubernetes/Containers) e métricas RED (Rate, Errors, Duration) nas chamadas HTTP. Adicionalmente, métricas de negócio (como "Taxa de Pedidos Cancelados por Minuto") serão exportadas para painéis de alerta.

### 4.3 Rastreamento Distribuído (Distributed Tracing)

- **Ferramentas:** OpenTelemetry (OTel) integrado com Jaeger.
- **Estratégia:** Instrumentação do código para capturar _spans_ de tempo nas requisições intra-serviços, permitindo identificar gargalos de performance invisíveis em chamadas isoladas.

---

## 5. Tipos de Testes Adotados

Garantir a confiabilidade na arquitetura distribuída exige testes que vão além da camada unitária (já estabelecida na refatoração anterior).

### 5.1 Testes de Contrato (Contract Testing)

- **Por que adotar:** Em arquiteturas de microsserviços, um serviço provedor (ex: `Payment Service`) pode alterar o formato de sua API ou evento e quebrar silenciosamente os consumidores (`Order Service`).
- **Como funciona:** Ferramentas como **Pact** serão usadas. O consumidor cria um "contrato" detalhando o que espera (payloads de entrada/saída). O contrato é validado contra o serviço real no pipeline de CI/CD. Isso garante que serviços possam ser implantados independentemente sem quebrar o ecossistema e sem a necessidade de levantar ambientes E2E pesados.

### 5.2 Testes de Integração de Componentes (Component Tests)

- **Por que adotar:** Como os serviços são pequenos, faz sentido testá-los "de ponta a ponta" mas de forma isolada, em relação à rede externa.
- **Como funciona:** Usando ferramentas como **Testcontainers** (subindo instâncias efêmeras de banco de dados e mensageria no Docker). O teste chama o endpoint real do microsserviço (ex: `POST /orders`) e verifica se a resposta HTTP é correta, se o dado persistiu no banco real (container) e se o evento `OrderCreated` foi devidamente publicado no Kafka (mockado ou via container), garantindo que a infraestrutura, a injeção de dependência e as configurações operam em harmonia.

---

## 6. Próximos Passos Sugeridos

1. **Containerização:** Garantir que a arquitetura em camadas atual rode perfeitamente em Docker.
2. **Desenho de APIs (API First):** Documentar contratos usando OpenAPI (Swagger) antes de extrair as rotinas.
3. **API Gateway:** Adicionar um Gateway (ex: Kong ou AWS API Gateway) para centralizar a segurança e rotear os pacotes ao novo modelo segregado.

---

## 7. Requisitos Solicitados (Boas praticas e observailidade)

- **Duas boas práticas de desenvolvimento:**
  - `Database per Service` (evita acoplamento de dados) — seção **2.1 Banco de Dados por Serviço**.
  - `Event-Driven / Coreografia` (com Message Broker) — seção **2.2 Comunicação Assíncrona Baseada em Eventos**.

- **Modelagem de pelo menos dois microsserviços:**
  - `Order Service` e `Payment Service` com responsabilidades, endpoints e eventos — seção **3.1** e **3.2**.

- **Estratégia de observabilidade (logs, métricas e monitoramento):**
  - Logs centralizados com Correlation ID — seção **4.1 Logs Centralizados**.
  - Métricas (Prometheus/Grafana) e métricas RED — seção **4.2 Métricas de Aplicação e Negócio**.
  - Rastreamento distribuído com OpenTelemetry/Jaeger — seção **4.3 Rastreamento Distribuído**.

- **Dois tipos de testes para garantir qualidade e confiabilidade:**
  - `Testes de Contrato (Contract Testing)` — detalhado em **5.1 Testes de Contrato**.
  - `Testes de Integração de Componentes (Component Tests)` usando Testcontainers — detalhado em **5.2 Testes de Integração de Componentes**.
