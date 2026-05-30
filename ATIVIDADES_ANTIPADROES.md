# Atividades de Refatoração - Enterprise AntiPattern Project

## 📋 Descrição Geral

Este documento detalha cada atividade de refatoração identificada no projeto, com análise específica de antipadrões, código problemático e solução proposta.

**Total de Atividades**: 28 tarefas
**Tempo Estimado**: 12 semanas (6 sprints)
**Prioridade Geral**: Crítica

---

## 🎯 Legenda de Severidade

| Ícone | Significado | Impacto                                      |
| ----- | ----------- | -------------------------------------------- |
| 🔴    | CRÍTICO     | Afeta funcionalidade/manutenibilidade severa |
| 🟠    | ALTO        | Impacto significativo em qualidade           |
| 🟡    | MÉDIO       | Impacto moderado em qualidade                |
| 🟢    | BAIXO       | Melhoria incremental                         |

---

## 📅 FASE 1: FUNDAÇÃO (Sprints 1-2, Semanas 1-4)

### ATIVIDADE 1.1: Configurar TypeScript 🟡

**Sprint**: 1
**Prioridade**: Alta
**Tempo Estimado**: 4 horas

#### Descrição

Configurar TypeScript para o projeto, habilitando strict mode e configurando compilação adequada.

#### Antipadrões Abordados

- Falta de tipagem
- Código sem verificação de tipos
- Propensão a erros em tempo de execução

#### Código Atual

```javascript
// src/EnterpriseMonsterService.js
class EnterpriseMonsterService {
  constructor() {
    this.users = []      // Sem tipo
    this.orders = []     // Sem tipo
  }
  processThing1(a,b,c,d,e,f,g) {  // Parâmetros sem tipo
    let obj = { ... }    // Sem tipo
  }
}
```

#### Código Esperado

```typescript
// src/EnterpriseMonsterService.ts
interface ServiceData {
	users: User[];
	orders: Order[];
}

class EnterpriseMonsterService {
	private data: ServiceData;

	constructor() {
		this.data = {
			users: [],
			orders: [],
		};
	}

	processThing1(
		a: string,
		b: number,
		c: string,
		d: any,
		e: any,
		f: any,
		g: any,
	): Record {
		// ...
	}
}
```

#### Arquivos Afetados

- `package.json` - Adicionar scripts TypeScript
- Criar `tsconfig.json`
- Converter todo `src/` para `.ts`

#### Tarefas Sub-atividades

- [ ] Instalar TypeScript e dependências
- [ ] Criar e configurar `tsconfig.json` com strict mode
- [ ] Renomear todos `.js` para `.ts`
- [ ] Resolver erros de tipo
- [ ] Testar compilação

#### Critério de Aceitação

- [x] Projeto compila sem erros
- [x] Strict mode ativado
- [x] Sem erros de tipo
- [x] Build script funciona

#### Dependências

- Nenhuma

---

### ATIVIDADE 1.2: Configurar ESLint e Prettier 🟡

**Sprint**: 1
**Prioridade**: Alta
**Tempo Estimado**: 3 horas

#### Descrição

Estabelecer padrões de código com ESLint e Prettier para garantir consistência.

#### Antipadrões Abordados

- Código inconsistente
- Falta de padrões de formatação
- Variáveis sem significado

#### Código Atual

```javascript
// Sem padrão
let x = {};
let obj = { id: Math.random(), value: b, status: "OPEN" };
if (a) {
	console.log("a");
} else {
	console.log("b");
}
```

#### Código Esperado

```javascript
// Com padrão aplicado
const record = {};
const analytics = {
	id: UUID.generate(),
	value: amount,
	status: "OPEN",
};

if (isValid) {
	console.log("Valid");
} else {
	console.log("Invalid");
}
```

#### Arquivos Afetados

- Criar `.eslintrc.json`
- Criar `.prettierrc.json`
- Criar `.eslintignore`
- Todos os arquivos serão reformatados

#### Tarefas Sub-atividades

- [ ] Instalar ESLint, Prettier e plugins
- [ ] Criar configurações ESLint (strict)
- [ ] Criar configurações Prettier
- [ ] Executar formatação em todo código
- [ ] Configurar pre-commit hooks

#### Critério de Aceitação

- [x] ESLint passa sem warnings
- [x] Prettier formata código consistentemente
- [x] Pre-commit hooks funcionam
- [x] Documentação atualizada

#### Dependências

- ATIVIDADE 1.1

---

### ATIVIDADE 1.3: Configurar Jest e Estrutura de Testes 🔴

**Sprint**: 1
**Prioridade**: Crítica
**Tempo Estimado**: 5 horas

#### Descrição

Implementar framework de testes com Jest, configurando ambiente e estrutura inicial.

#### Antipadrões Abordados

- Falta de testes (0% cobertura)
- Impossibilidade de refatorar com segurança
- Regressões não detectadas

#### Situação Atual

```
src/
└─ (nenhuma pasta de testes)
```

#### Estrutura Esperada

```
src/
├─ __tests__/
│  ├─ unit/
│  │  ├─ services/
│  │  ├─ repositories/
│  │  └─ validators/
│  ├─ integration/
│  │  ├─ services/
│  │  └─ controllers/
│  └─ e2e/
│     └─ api/
├─ (código principal)
```

#### Arquivos Afetados

- Criar `jest.config.js`
- Criar `jest.setup.js`
- Criar `src/__tests__/` diretório
- `package.json` - Adicionar scripts de test

#### Tarefas Sub-atividades

- [ ] Instalar Jest, ts-jest, @types/jest
- [ ] Criar `jest.config.js`
- [ ] Criar estrutura de pastas
- [ ] Criar arquivo de setup
- [ ] Configurar coverage reporting
- [ ] Testar execução

#### Critério de Aceitação

- [x] Jest rodando sem erros
- [x] Testes simples passam
- [x] Coverage report gerado
- [x] Scripts npm funcionam

#### Dependências

- ATIVIDADE 1.1

---

### ATIVIDADE 1.4: Criar Estrutura de Pastas 🔴

**Sprint**: 1
**Prioridade**: Crítica
**Tempo Estimado**: 6 horas

#### Descrição

Reorganizar código em arquitetura em camadas (apresentação, aplicação, domínio, infraestrutura).

#### Antipadrões Abordados

- Falta de separação de camadas
- Código desorganizado
- Violação de SRP (Single Responsibility Principle)

#### Estrutura Atual

```
src/
├─ EnterpriseMonsterService.js  (God Class)
├─ main.js                      (God File - tudo misturado)
├─ analytics/
│  ├─ AnalyticsManager1-7.js    (Código duplicado)
├─ auth/
│  ├─ AuthManager1-7.js         (Código duplicado)
└─ ... (caótico)
```

#### Estrutura Esperada

```
src/
├─ presentation/
│  ├─ controllers/
│  │  ├─ AuthController.ts
│  │  ├─ UserController.ts
│  │  ├─ OrderController.ts
│  │  ├─ PaymentController.ts
│  │  ├─ AnalyticsController.ts
│  │  ├─ NotificationController.ts
│  │  └─ index.ts
│  ├─ routes/
│  │  ├─ authRoutes.ts
│  │  ├─ userRoutes.ts
│  │  ├─ orderRoutes.ts
│  │  ├─ paymentRoutes.ts
│  │  ├─ analyticsRoutes.ts
│  │  ├─ notificationRoutes.ts
│  │  └─ index.ts
│  └─ middleware/
│     ├─ errorHandler.ts
│     ├─ validationHandler.ts
│     ├─ authMiddleware.ts
│     ├─ loggingMiddleware.ts
│     └─ index.ts
│
├─ application/
│  ├─ services/
│  │  ├─ AuthService.ts
│  │  ├─ UserService.ts
│  │  ├─ OrderService.ts
│  │  ├─ PaymentService.ts
│  │  ├─ AnalyticsService.ts
│  │  ├─ NotificationService.ts
│  │  └─ index.ts
│  ├─ dto/
│  │  ├─ auth.dto.ts
│  │  ├─ user.dto.ts
│  │  ├─ order.dto.ts
│  │  ├─ payment.dto.ts
│  │  ├─ analytics.dto.ts
│  │  ├─ notification.dto.ts
│  │  └─ index.ts
│  └─ validators/
│     ├─ AuthValidator.ts
│     ├─ UserValidator.ts
│     ├─ OrderValidator.ts
│     ├─ PaymentValidator.ts
│     ├─ AnalyticsValidator.ts
│     ├─ NotificationValidator.ts
│     └─ index.ts
│
├─ domain/
│  ├─ entities/
│  │  ├─ User.ts
│  │  ├─ Order.ts
│  │  ├─ Payment.ts
│  │  ├─ Analytics.ts
│  │  ├─ Notification.ts
│  │  └─ index.ts
│  ├─ interfaces/
│  │  ├─ IAuthService.ts
│  │  ├─ IUserService.ts
│  │  ├─ IOrderService.ts
│  │  ├─ IPaymentService.ts
│  │  ├─ IAnalyticsService.ts
│  │  ├─ INotificationService.ts
│  │  ├─ IRepository.ts
│  │  ├─ ILogger.ts
│  │  ├─ IValidator.ts
│  │  └─ index.ts
│  ├─ exceptions/
│  │  ├─ ValidationError.ts
│  │  ├─ NotFoundError.ts
│  │  ├─ UnauthorizedError.ts
│  │  ├─ ConflictError.ts
│  │  ├─ InternalError.ts
│  │  └─ index.ts
│  └─ valueObjects/
│     ├─ Money.ts
│     ├─ Address.ts
│     ├─ Email.ts
│     ├─ Phone.ts
│     └─ index.ts
│
├─ infrastructure/
│  ├─ repositories/
│  │  ├─ UserRepository.ts
│  │  ├─ OrderRepository.ts
│  │  ├─ PaymentRepository.ts
│  │  ├─ AnalyticsRepository.ts
│  │  ├─ NotificationRepository.ts
│  │  └─ index.ts
│  ├─ external/
│  │  ├─ EmailService.ts
│  │  ├─ SMSService.ts
│  │  ├─ PaymentGateway.ts
│  │  ├─ AnalyticsProvider.ts
│  │  └─ index.ts
│  ├─ persistence/
│  │  ├─ Database.ts
│  │  ├─ Redis.ts
│  │  └─ index.ts
│  └─ logger/
│     ├─ Logger.ts
│     ├─ WinstonLogger.ts
│     └─ index.ts
│
├─ config/
│  ├─ database.ts
│  ├─ environment.ts
│  ├─ container.ts      (IoC Container)
│  └─ index.ts
│
├─ __tests__/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
│
├─ utils/
│  ├─ constants.ts
│  ├─ helpers.ts
│  └─ index.ts
│
├─ types/
│  ├─ index.ts
│  └─ global.d.ts
│
└─ main.ts             (Arquivo principal limpo)
```

#### Tarefas Sub-atividades

- [ ] Criar todas as pastas base
- [ ] Criar arquivos index.ts em cada pasta
- [ ] Mover arquivos existentes para novas pastas
- [ ] Atualizar imports em todo projeto
- [ ] Validar que estrutura compila
- [ ] Documentar estrutura

#### Critério de Aceitação

- [x] Todas as pastas criadas
- [x] Projeto compila sem erros
- [x] Imports estão corretos
- [x] Estrutura documentada
- [x] Sem código duplicado em pastas

#### Dependências

- ATIVIDADE 1.1, 1.2

---

### ATIVIDADE 1.5: Criar Interfaces de Domínio 🔴

**Sprint**: 2
**Prioridade**: Crítica
**Tempo Estimado**: 8 horas

#### Descrição

Definir interfaces para todos os serviços, repositories e componentes principais.

#### Antipadrões Abordados

- Falta de interfaces
- Acoplamento alto (dependências concretas)
- Violação de DIP (Dependency Inversion Principle)

#### Código Atual

```javascript
// Sem interfaces - acoplado
class AnalyticsManager1 {
	execute(a, b, c, d, e) {
		this.saveDatabase(x); // Hardcoded
		this.sendEmail(x); // Hardcoded
		this.sendSMS(x); // Hardcoded
	}
}
```

#### Código Esperado

```typescript
// domain/interfaces/IAnalyticsService.ts
export interface IAnalyticsService {
	create(request: CreateAnalyticsRequest): Promise<Analytics>;
	findById(id: string): Promise<Analytics | null>;
	update(id: string, request: UpdateAnalyticsRequest): Promise<Analytics>;
	delete(id: string): Promise<void>;
	list(params: ListParams): Promise<Analytics[]>;
}

// domain/interfaces/IRepository.ts
export interface IRepository<T> {
	create(entity: T): Promise<T>;
	findById(id: string): Promise<T | null>;
	update(id: string, entity: Partial<T>): Promise<T>;
	delete(id: string): Promise<void>;
	list(params?: ListParams): Promise<T[]>;
}

// domain/interfaces/ILogger.ts
export interface ILogger {
	debug(message: string, meta?: any): void;
	info(message: string, meta?: any): void;
	warn(message: string, meta?: any): void;
	error(message: string, meta?: any): void;
}

// infrastructure/persistence/Database.ts
export interface IDatabase {
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	query<T>(sql: string, params?: any[]): Promise<T[]>;
	execute(sql: string, params?: any[]): Promise<void>;
}
```

#### Interfaces a Criar

1. **Serviços** (7 interfaces)
   - IAuthService
   - IUserService
   - IOrderService
   - IPaymentService
   - IAnalyticsService
   - INotificationService
   - IInventoryService

2. **Persistência** (5 interfaces)
   - IRepository<T>
   - IUserRepository extends IRepository<User>
   - IOrderRepository extends IRepository<Order>
   - IPaymentRepository extends IRepository<Payment>
   - IAnalyticsRepository extends IRepository<Analytics>

3. **Infraestrutura** (5 interfaces)
   - ILogger
   - IDatabase
   - IEmailService
   - ISMSService
   - IExternalAPI

4. **Validação & Processamento** (3 interfaces)
   - IValidator<T>
   - IUnitOfWork
   - IEventBus

#### Arquivos a Criar

```
src/domain/interfaces/
├─ IAuthService.ts
├─ IUserService.ts
├─ IOrderService.ts
├─ IPaymentService.ts
├─ IAnalyticsService.ts
├─ INotificationService.ts
├─ IInventoryService.ts
├─ IRepository.ts
├─ ILogger.ts
├─ IValidator.ts
├─ IDatabase.ts
├─ IEmailService.ts
├─ ISMSService.ts
├─ IExternalAPI.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar IAuthService.ts
- [ ] Criar IUserService.ts
- [ ] Criar IOrderService.ts
- [ ] Criar IPaymentService.ts
- [ ] Criar IAnalyticsService.ts
- [ ] Criar INotificationService.ts
- [ ] Criar IInventoryService.ts
- [ ] Criar IRepository.ts (genérico)
- [ ] Criar interfaces de infraestrutura
- [ ] Criar arquivo index.ts com exports

#### Critério de Aceitação

- [x] Todas as 15+ interfaces criadas
- [x] Projeto compila sem erros
- [x] Interfaces bem documentadas
- [x] Exports estruturados
- [x] Padrão consistente entre interfaces

#### Dependências

- ATIVIDADE 1.4

---

### ATIVIDADE 1.6: Criar DTOs (Data Transfer Objects) 🟠

**Sprint**: 2
**Prioridade**: Alta
**Tempo Estimado**: 6 horas

#### Descrição

Definir DTOs para transferência de dados entre camadas.

#### Antipadrões Abordados

- Parâmetros sem significado (a, b, c, d, e)
- Falta de validação de entrada
- Exposição de dados internos

#### Código Atual

```javascript
execute(a, b, c, d, e) {
  // Impossível saber o que é cada parâmetro
}
```

#### Código Esperado

```typescript
// application/dto/auth.dto.ts
export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: UserResponse;
	expiresIn: number;
}

export interface UserResponse {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
}

// application/dto/order.dto.ts
export interface CreateOrderRequest {
	userId: string;
	items: OrderItemDTO[];
	shippingAddress: AddressDTO;
	paymentMethod: PaymentMethodDTO;
	notes?: string;
}

export interface OrderItemDTO {
	productId: string;
	quantity: number;
	price: number;
}

export interface OrderResponse {
	id: string;
	userId: string;
	items: OrderItemDTO[];
	total: number;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
}
```

#### DTOs a Criar

**Authentication**

- LoginRequest
- LoginResponse
- RefreshTokenRequest
- AuthResponse

**User**

- CreateUserRequest
- UpdateUserRequest
- UserResponse
- ListUsersRequest
- ListUsersResponse

**Order**

- CreateOrderRequest
- UpdateOrderRequest
- OrderResponse
- ListOrdersRequest
- ListOrdersResponse
- OrderItemDTO

**Payment**

- CreatePaymentRequest
- PaymentResponse
- ListPaymentsRequest
- ListPaymentsResponse

**Analytics**

- CreateAnalyticsRequest
- UpdateAnalyticsRequest
- AnalyticsResponse
- ListAnalyticsRequest
- ListAnalyticsResponse

**Notification**

- SendNotificationRequest
- NotificationResponse
- ListNotificationsRequest
- ListNotificationsResponse

#### Arquivos a Criar

```
src/application/dto/
├─ auth.dto.ts
├─ user.dto.ts
├─ order.dto.ts
├─ payment.dto.ts
├─ analytics.dto.ts
├─ notification.dto.ts
├─ common.dto.ts    (ListParams, PageResult, etc)
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar auth.dto.ts com interfaces completas
- [ ] Criar user.dto.ts com interfaces completas
- [ ] Criar order.dto.ts com interfaces completas
- [ ] Criar payment.dto.ts com interfaces completas
- [ ] Criar analytics.dto.ts com interfaces completas
- [ ] Criar notification.dto.ts com interfaces completas
- [ ] Criar common.dto.ts com tipos genéricos
- [ ] Criar arquivo index.ts com exports

#### Critério de Aceitação

- [x] Todos os DTOs criados
- [x] Interfaces bem documentadas
- [x] Tipos corretos em todos os DTOs
- [x] Exports estruturados
- [x] Nenhum parâmetro genérico (a, b, c)

#### Dependências

- ATIVIDADE 1.5

---

### ATIVIDADE 1.7: Criar Entidades de Domínio 🟠

**Sprint**: 2
**Prioridade**: Alta
**Tempo Estimado**: 6 horas

#### Descrição

Definir classes de entidades que representam conceitos de negócio.

#### Antipadrões Abordados

- Falta de estrutura clara de dados
- Violação de SRP
- Dados misturados com lógica

#### Código Atual

```javascript
let obj = {
	id: Math.random(),
	name: a,
	total: b,
	createdAt: new Date(),
	status: "OPEN",
};
```

#### Código Esperado

```typescript
// domain/entities/User.ts
export class User {
	private constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly name: string,
		public readonly passwordHash: string,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
		public readonly isActive: boolean = true,
	) {}

	static create(email: string, name: string, passwordHash: string): User {
		return new User(
			UUID.generate(),
			email,
			name,
			passwordHash,
			new Date(),
			new Date(),
			true,
		);
	}

	static hydrate(data: any): User {
		return new User(
			data.id,
			data.email,
			data.name,
			data.passwordHash,
			data.createdAt,
			data.updatedAt,
			data.isActive,
		);
	}
}

// domain/entities/Order.ts
export class Order {
	private constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly items: OrderItem[],
		public readonly total: Money,
		public readonly status: OrderStatus,
		public readonly shippingAddress: Address,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}

	static create(
		userId: string,
		items: OrderItem[],
		shippingAddress: Address,
	): Order {
		const total = Money.calculate(items);
		return new Order(
			UUID.generate(),
			userId,
			items,
			total,
			OrderStatus.PENDING,
			shippingAddress,
			new Date(),
			new Date(),
		);
	}

	canBeCancelled(): boolean {
		return this.status === OrderStatus.PENDING;
	}

	markAsProcessed(): void {
		this.status = OrderStatus.PROCESSING;
	}
}
```

#### Entidades a Criar

1. **User.ts** - Usuário do sistema
2. **Order.ts** - Pedido de compra
3. **Payment.ts** - Pagamento
4. **Analytics.ts** - Dados analíticos
5. **Notification.ts** - Notificação
6. **Inventory.ts** - Inventário/Estoque

#### Value Objects a Criar

1. **Money.ts** - Valor monetário
2. **Address.ts** - Endereço
3. **Email.ts** - Email validado
4. **Phone.ts** - Telefone validado

#### Enums a Criar

1. **OrderStatus.ts** - Estados de pedido
2. **PaymentStatus.ts** - Estados de pagamento
3. **NotificationType.ts** - Tipos de notificação

#### Arquivos a Criar

```
src/domain/entities/
├─ User.ts
├─ Order.ts
├─ Payment.ts
├─ Analytics.ts
├─ Notification.ts
├─ Inventory.ts
└─ index.ts

src/domain/valueObjects/
├─ Money.ts
├─ Address.ts
├─ Email.ts
├─ Phone.ts
└─ index.ts

src/domain/enums/
├─ OrderStatus.ts
├─ PaymentStatus.ts
├─ NotificationType.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar User.ts com métodos de negócio
- [ ] Criar Order.ts com lógica de pedido
- [ ] Criar Payment.ts com lógica de pagamento
- [ ] Criar Analytics.ts
- [ ] Criar Notification.ts
- [ ] Criar Inventory.ts
- [ ] Criar Value Objects (Money, Address, Email, Phone)
- [ ] Criar Enums
- [ ] Criar arquivos index.ts

#### Critério de Aceitação

- [x] Todas as entidades criadas
- [x] Value Objects implementados
- [x] Enums definidos
- [x] Lógica de negócio encapsulada
- [x] Projeto compila sem erros

#### Dependências

- ATIVIDADE 1.4

---

### ATIVIDADE 1.8: Criar Classes de Exceção 🟠

**Sprint**: 2
**Prioridade**: Alta
**Tempo Estimado**: 3 horas

#### Descrição

Definir exceções customizadas para tratamento de erro padronizado.

#### Antipadrões Abordados

- Falta de tratamento de erro
- Erros genéricos
- Sem diferenciação de tipos de erro

#### Código Atual

```javascript
// Sem tratamento de erro
execute(a, b, c, d, e) {
  let obj = { ... }
  this.logs.push(obj)
  return obj
}
```

#### Código Esperado

```typescript
// domain/exceptions/ApplicationError.ts
export abstract class ApplicationError extends Error {
	abstract statusCode: number;
	abstract message: string;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

// domain/exceptions/ValidationError.ts
export class ValidationError extends ApplicationError {
	statusCode = 400;

	constructor(public message: string) {
		super(message);
	}
}

// domain/exceptions/NotFoundError.ts
export class NotFoundError extends ApplicationError {
	statusCode = 404;

	constructor(resource: string) {
		super(`${resource} não encontrado`);
	}
}

// domain/exceptions/UnauthorizedError.ts
export class UnauthorizedError extends ApplicationError {
	statusCode = 401;

	constructor(message: string = "Não autorizado") {
		super(message);
	}
}

// domain/exceptions/ConflictError.ts
export class ConflictError extends ApplicationError {
	statusCode = 409;

	constructor(message: string) {
		super(message);
	}
}

// domain/exceptions/InternalError.ts
export class InternalError extends ApplicationError {
	statusCode = 500;

	constructor(message: string = "Erro interno do servidor") {
		super(message);
	}
}
```

#### Exceções a Criar

1. **ApplicationError** - Classe base
2. **ValidationError** - Validação falhou (400)
3. **NotFoundError** - Recurso não encontrado (404)
4. **UnauthorizedError** - Não autorizado (401)
5. **ForbiddenError** - Acesso proibido (403)
6. **ConflictError** - Conflito de dados (409)
7. **InternalError** - Erro interno (500)

#### Arquivos a Criar

```
src/domain/exceptions/
├─ ApplicationError.ts
├─ ValidationError.ts
├─ NotFoundError.ts
├─ UnauthorizedError.ts
├─ ForbiddenError.ts
├─ ConflictError.ts
├─ InternalError.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar ApplicationError.ts (classe base)
- [ ] Criar ValidationError.ts
- [ ] Criar NotFoundError.ts
- [ ] Criar UnauthorizedError.ts
- [ ] Criar ForbiddenError.ts
- [ ] Criar ConflictError.ts
- [ ] Criar InternalError.ts
- [ ] Criar arquivo index.ts

#### Critério de Aceitação

- [x] Todas as exceções criadas
- [x] Herança correta de ApplicationError
- [x] Status codes definidos
- [x] Mensagens claras
- [x] Projeto compila sem erros

#### Dependências

- ATIVIDADE 1.4

---

## 📅 FASE 2: CORE REFACTORING (Sprints 3-4, Semanas 5-8)

### ATIVIDADE 2.1: Refatorar AuthService (God Class / God Method) 🔴

**Sprint**: 3
**Prioridade**: Crítica
**Tempo Estimado**: 12 horas

#### Descrição

Refatorar AuthService (atualmente espalhado em 7 AuthManager duplicados).

#### Antipadrões Abordados

- God Class
- God Method
- Código duplicado (7 arquivos idênticos)
- Parâmetros sem significado
- Múltiplas responsabilidades
- If/Else Hell
- Falta de validação
- Sem tratamento de erro

#### Código Atual

```javascript
// src/auth/AuthManager1-7.js (7 arquivos idênticos)
class AuthManager1 {
	constructor() {
		this.list = [];
		this.logs = [];
		this.version = 1;
	}

	execute(a, b, c, d, e) {
		console.log("starting process");

		if (a) {
			console.log("a");
		} else {
			console.log("b");
		}

		if (b == 1) {
			console.log("1");
		} else if (b == 2) {
			console.log("2");
		} else {
			console.log("default");
		}

		let x = {
			id: Math.random(),
			name: a,
			total: b,
			createdAt: new Date(),
			status: "OPEN",
		};

		this.list.push(x);
		this.saveDatabase(x);
		this.sendEmail(x);
		this.sendSMS(x);

		return x;
	}
}

// Mesmo código em AuthManager2-7
```

#### Código Esperado

```typescript
// application/services/AuthService.ts
export class AuthService implements IAuthService {
	constructor(
		private userRepository: IUserRepository,
		private passwordService: IPasswordService,
		private tokenService: ITokenService,
		private emailService: IEmailService,
		private logger: ILogger,
	) {}

	async login(request: LoginRequest): Promise<LoginResponse> {
		this.logger.info("Iniciando login", { email: request.email });

		// Validar entrada
		this.validateLoginRequest(request);

		// Encontrar usuário
		const user = await this.userRepository.findByEmail(request.email);
		if (!user) {
			this.logger.warn("Usuário não encontrado", { email: request.email });
			throw new NotFoundError("Usuário");
		}

		// Verificar senha
		const isPasswordValid = await this.passwordService.compare(
			request.password,
			user.passwordHash,
		);
		if (!isPasswordValid) {
			this.logger.warn("Senha inválida", { email: request.email });
			throw new UnauthorizedError("Email ou senha inválida");
		}

		// Gerar token
		const token = this.tokenService.generate(user.id);

		// Enviar notificação
		await this.emailService.sendLoginNotification(user.email);

		this.logger.info("Login realizado com sucesso", { userId: user.id });

		return {
			token,
			user: this.mapUserToResponse(user),
			expiresIn: 3600,
		};
	}

	async register(request: RegisterRequest): Promise<UserResponse> {
		this.logger.info("Iniciando registro", { email: request.email });

		// Validar entrada
		this.validateRegisterRequest(request);

		// Verificar se email já existe
		const existingUser = await this.userRepository.findByEmail(request.email);
		if (existingUser) {
			throw new ConflictError("Email já registrado");
		}

		// Hash da senha
		const passwordHash = await this.passwordService.hash(request.password);

		// Criar usuário
		const user = User.create(request.email, request.name, passwordHash);
		const savedUser = await this.userRepository.create(user);

		// Enviar email de confirmação
		await this.emailService.sendConfirmationEmail(savedUser.email);

		this.logger.info("Usuário registrado com sucesso", {
			userId: savedUser.id,
		});

		return this.mapUserToResponse(savedUser);
	}

	async refreshToken(request: RefreshTokenRequest): Promise<LoginResponse> {
		// ... implementation
	}

	private validateLoginRequest(request: LoginRequest): void {
		if (!request.email || typeof request.email !== "string") {
			throw new ValidationError("Email é obrigatório e deve ser string");
		}
		if (!request.password || typeof request.password !== "string") {
			throw new ValidationError("Senha é obrigatória e deve ser string");
		}
		// ... mais validações
	}

	private validateRegisterRequest(request: RegisterRequest): void {
		if (!request.email || !this.isValidEmail(request.email)) {
			throw new ValidationError("Email inválido");
		}
		if (!request.password || request.password.length < 8) {
			throw new ValidationError("Senha deve ter no mínimo 8 caracteres");
		}
		// ... mais validações
	}

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	private mapUserToResponse(user: User): UserResponse {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
		};
	}
}

// domain/interfaces/IAuthService.ts
export interface IAuthService {
	login(request: LoginRequest): Promise<LoginResponse>;
	register(request: RegisterRequest): Promise<UserResponse>;
	refreshToken(request: RefreshTokenRequest): Promise<LoginResponse>;
	logout(userId: string): Promise<void>;
}
```

#### Arquivos Afetados

**A deletar**:

- `src/auth/AuthManager1.js` - `src/auth/AuthManager7.js`

**A criar**:

- `src/application/services/AuthService.ts`
- `src/domain/interfaces/IAuthService.ts` (já criado)
- `src/application/dto/auth.dto.ts` (já criado)
- `src/application/validators/AuthValidator.ts`
- `src/__tests__/unit/services/AuthService.test.ts`

**A atualizar**:

- `src/presentation/controllers/AuthController.ts`
- `src/presentation/routes/authRoutes.ts`

#### Tarefas Sub-atividades

- [ ] Analisar AuthManager1-7 completamente
- [ ] Criar AuthValidator.ts
- [ ] Criar AuthService.ts implementando IAuthService
- [ ] Extrair métodos private (validação, mapeamento, etc)
- [ ] Adicionar logging estruturado
- [ ] Adicionar tratamento de erro
- [ ] Criar testes unitários (80%+ coverage)
- [ ] Deletar AuthManager1-7.js
- [ ] Atualizar imports em todo projeto

#### Critério de Aceitação

- [x] AuthService implementa IAuthService
- [x] Todos os 7 AuthManager deletados
- [x] Métodos extraídos (validação, mapeamento)
- [x] Logging estruturado em todos os métodos
- [x] Tratamento de erro completo
- [x] 80%+ cobertura de testes
- [x] Projeto compila e roda sem erros
- [x] Código 100% TypeScript

#### Dependências

- ATIVIDADE 1.5 (Interfaces)
- ATIVIDADE 1.6 (DTOs)
- ATIVIDADE 1.7 (Entidades)
- ATIVIDADE 1.8 (Exceções)

---

### ATIVIDADE 2.2: Refatorar UserService 🔴

**Sprint**: 3
**Prioridade**: Crítica
**Tempo Estimado**: 10 horas

#### Descrição

Refatorar UserService seguindo padrão implementado em AuthService.

#### Antipadrões Abordados

- God Class
- God Method
- Código duplicado
- Parâmetros sem significado
- If/Else Hell
- Falta de validação
- Sem tratamento de erro

#### Código Atual

```javascript
// src/users/UsersManager1-7.js (7 arquivos idênticos - mesmo padrão ruim)
```

#### Código Esperado

```typescript
// application/services/UserService.ts
export class UserService implements IUserService {
	constructor(
		private userRepository: IUserRepository,
		private validator: IValidator<User>,
		private logger: ILogger,
	) {}

	async create(request: CreateUserRequest): Promise<UserResponse> {
		this.logger.info("Criando novo usuário", { email: request.email });

		this.validateCreateRequest(request);

		const existingUser = await this.userRepository.findByEmail(request.email);
		if (existingUser) {
			throw new ConflictError("Email já existe");
		}

		const user = User.create(request.email, request.name, request.passwordHash);
		const savedUser = await this.userRepository.create(user);

		this.logger.info("Usuário criado", { userId: savedUser.id });

		return this.mapToResponse(savedUser);
	}

	async findById(id: string): Promise<UserResponse | null> {
		if (!id) {
			throw new ValidationError("ID é obrigatório");
		}

		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundError("Usuário");
		}

		return this.mapToResponse(user);
	}

	async update(id: string, request: UpdateUserRequest): Promise<UserResponse> {
		if (!id) {
			throw new ValidationError("ID é obrigatório");
		}

		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundError("Usuário");
		}

		// Atualizar apenas campos fornecidos
		if (request.name) user.name = request.name;
		if (request.email) {
			const existingUser = await this.userRepository.findByEmail(request.email);
			if (existingUser && existingUser.id !== id) {
				throw new ConflictError("Email já existe");
			}
			user.email = request.email;
		}

		const updatedUser = await this.userRepository.update(id, user);
		this.logger.info("Usuário atualizado", { userId: id });

		return this.mapToResponse(updatedUser);
	}

	async delete(id: string): Promise<void> {
		if (!id) {
			throw new ValidationError("ID é obrigatório");
		}

		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundError("Usuário");
		}

		await this.userRepository.delete(id);
		this.logger.info("Usuário deletado", { userId: id });
	}

	async list(params: ListParams): Promise<ListUsersResponse> {
		const users = await this.userRepository.list(params);
		return {
			data: users.map((u) => this.mapToResponse(u)),
			total: users.length,
			page: params.page || 1,
			limit: params.limit || 10,
		};
	}

	private validateCreateRequest(request: CreateUserRequest): void {
		if (!request.email || !this.isValidEmail(request.email)) {
			throw new ValidationError("Email inválido");
		}
		if (!request.name || request.name.trim().length === 0) {
			throw new ValidationError("Nome é obrigatório");
		}
	}

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	private mapToResponse(user: User): UserResponse {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
```

#### Arquivos Afetados

**A deletar**:

- `src/users/UsersManager1-7.js`

**A criar**:

- `src/application/services/UserService.ts`
- `src/application/validators/UserValidator.ts`
- `src/infrastructure/repositories/UserRepository.ts`
- `src/__tests__/unit/services/UserService.test.ts`

#### Tarefas Sub-atividades

- [ ] Analisar UsersManager1-7
- [ ] Criar UserValidator.ts
- [ ] Criar UserService.ts implementando IUserService
- [ ] Criar UserRepository.ts implementando IUserRepository
- [ ] Adicionar logging estruturado
- [ ] Adicionar tratamento de erro
- [ ] Criar testes unitários (80%+ coverage)
- [ ] Deletar UsersManager1-7.js
- [ ] Atualizar imports

#### Critério de Aceitação

- [x] UserService implementa IUserService
- [x] Todos os 7 UsersManager deletados
- [x] Repository criado e funcionando
- [x] Logging estruturado
- [x] Tratamento de erro completo
- [x] 80%+ cobertura de testes
- [x] Projeto compila e roda

#### Dependências

- ATIVIDADE 2.1 (AuthService)

---

### ATIVIDADE 2.3: Refatorar OrderService 🔴

**Sprint**: 4
**Prioridade**: Crítica
**Tempo Estimado**: 14 horas

#### Descrição

Refatorar OrderService com lógica de negócio complexa.

#### Antipadrões Abordados

- God Class
- God Method
- Código duplicado
- Regras de negócio espalhadas
- Múltiplas responsabilidades
- Sem validação
- Sem tratamento de erro
- Falta de separação de camadas

#### Código Atual

```javascript
// src/orders/OrdersManager1-7.js (7 arquivos idênticos com lógica duplicada)
class OrdersManager1 {
	execute(a, b, c, d, e) {
		// Mistura: validação + criação + persistência + notificação
		// Sem separação de responsabilidades
	}
}
```

#### Código Esperado

```typescript
// application/services/OrderService.ts
export class OrderService implements IOrderService {
	constructor(
		private orderRepository: IOrderRepository,
		private inventoryService: IInventoryService,
		private paymentService: IPaymentService,
		private notificationService: INotificationService,
		private validator: IValidator<Order>,
		private logger: ILogger,
	) {}

	async create(request: CreateOrderRequest): Promise<OrderResponse> {
		this.logger.info("Criando novo pedido", { userId: request.userId });

		// 1. Validar entrada
		this.validateCreateRequest(request);

		// 2. Validar estoque
		await this.inventoryService.validateAvailability(request.items);

		// 3. Criar entidade de domínio
		const order = Order.create(
			request.userId,
			request.items,
			request.shippingAddress,
		);

		// 4. Processar pagamento
		const payment = await this.paymentService.process({
			orderId: order.id,
			amount: order.total,
			paymentMethod: request.paymentMethod,
		});

		if (payment.status !== PaymentStatus.APPROVED) {
			this.logger.warn("Pagamento não autorizado", { orderId: order.id });
			throw new ConflictError("Pagamento não foi autorizado");
		}

		// 5. Reservar estoque
		await this.inventoryService.reserve(request.items);

		// 6. Persistir
		const savedOrder = await this.orderRepository.create(order);

		// 7. Notificar
		await this.notificationService.orderCreated(savedOrder);

		this.logger.info("Pedido criado com sucesso", { orderId: savedOrder.id });

		return this.mapToResponse(savedOrder);
	}

	async cancel(id: string): Promise<OrderResponse> {
		this.logger.info("Cancelando pedido", { orderId: id });

		// Validar
		if (!id) {
			throw new ValidationError("ID é obrigatório");
		}

		// Buscar
		const order = await this.orderRepository.findById(id);
		if (!order) {
			throw new NotFoundError("Pedido");
		}

		// Verificar se pode cancelar
		if (!order.canBeCancelled()) {
			throw new ConflictError("Pedido não pode ser cancelado neste estado");
		}

		// Cancelar
		order.markAsCancelled();

		// Reverter pagamento
		await this.paymentService.refund(id);

		// Liberar estoque
		await this.inventoryService.release(order.items);

		// Persistir
		const updatedOrder = await this.orderRepository.update(id, order);

		// Notificar
		await this.notificationService.orderCancelled(updatedOrder);

		this.logger.info("Pedido cancelado", { orderId: id });

		return this.mapToResponse(updatedOrder);
	}

	private validateCreateRequest(request: CreateOrderRequest): void {
		if (!request.userId) {
			throw new ValidationError("ID do usuário é obrigatório");
		}
		if (!request.items || request.items.length === 0) {
			throw new ValidationError("Pedido deve conter ao menos um item");
		}
		if (!request.shippingAddress) {
			throw new ValidationError("Endereço de entrega é obrigatório");
		}
	}

	private mapToResponse(order: Order): OrderResponse {
		return {
			id: order.id,
			userId: order.userId,
			items: order.items,
			total: order.total,
			status: order.status,
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
		};
	}
}
```

#### Arquivos Afetados

**A deletar**:

- `src/orders/OrdersManager1-7.js`

**A criar**:

- `src/application/services/OrderService.ts`
- `src/infrastructure/repositories/OrderRepository.ts`
- `src/application/validators/OrderValidator.ts`
- `src/__tests__/unit/services/OrderService.test.ts`
- `src/__tests__/integration/services/OrderService.integration.test.ts`

#### Tarefas Sub-atividades

- [ ] Analisar OrdersManager1-7
- [ ] Criar OrderValidator.ts
- [ ] Criar OrderService.ts com toda lógica de negócio
- [ ] Criar OrderRepository.ts
- [ ] Implementar transações para múltiplas operações
- [ ] Adicionar logging estruturado
- [ ] Adicionar tratamento de erro
- [ ] Criar testes unitários
- [ ] Criar testes de integração
- [ ] Deletar OrdersManager1-7.js

#### Critério de Aceitação

- [x] OrderService implementa IOrderService
- [x] Lógica de pagamento integrada
- [x] Validação de estoque
- [x] Notificações enviadas
- [x] Transações seguras
- [x] 85%+ cobertura de testes
- [x] Projeto compila e roda

#### Dependências

- ATIVIDADE 2.2 (UserService)
- ATIVIDADE 2.1 (AuthService)

---

### ATIVIDADE 2.4: Refatorar PaymentService 🔴

**Sprint**: 4
**Prioridade**: Crítica
**Tempo Estimado**: 12 horas

#### Descrição

Refatorar PaymentService com segurança e validação.

#### Antipadrões Abordados

- God Class
- God Method
- Código duplicado
- Sem validação
- Sem tratamento de erro
- Sem logging adequado

#### Código Atual

```javascript
// src/payments/PaymentsManager1-7.js (7 arquivos idênticos)
```

#### Código Esperado

```typescript
// application/services/PaymentService.ts
export class PaymentService implements IPaymentService {
	constructor(
		private paymentRepository: IPaymentRepository,
		private paymentGateway: IPaymentGateway,
		private logger: ILogger,
	) {}

	async process(request: CreatePaymentRequest): Promise<PaymentResponse> {
		this.logger.info("Processando pagamento", {
			orderId: request.orderId,
			amount: request.amount,
		});

		// Validar
		this.validatePaymentRequest(request);

		// Chamar gateway de pagamento
		const gatewayResponse = await this.paymentGateway.authorize(request);

		if (!gatewayResponse.isSuccess) {
			this.logger.warn("Autorização de pagamento falhou", {
				orderId: request.orderId,
				reason: gatewayResponse.reason,
			});
			throw new ConflictError("Pagamento não autorizado");
		}

		// Criar entidade
		const payment = new Payment(
			UUID.generate(),
			request.orderId,
			request.amount,
			gatewayResponse.transactionId,
			PaymentStatus.APPROVED,
			new Date(),
		);

		// Persistir
		const savedPayment = await this.paymentRepository.create(payment);

		this.logger.info("Pagamento processado com sucesso", {
			paymentId: savedPayment.id,
			orderId: request.orderId,
		});

		return this.mapToResponse(savedPayment);
	}

	async refund(orderId: string): Promise<PaymentResponse> {
		this.logger.info("Reembolsando pagamento", { orderId });

		if (!orderId) {
			throw new ValidationError("ID do pedido é obrigatório");
		}

		// Buscar pagamento original
		const payment = await this.paymentRepository.findByOrderId(orderId);
		if (!payment) {
			throw new NotFoundError("Pagamento");
		}

		// Chamar refund no gateway
		const refundResponse = await this.paymentGateway.refund(
			payment.transactionId,
		);

		if (!refundResponse.isSuccess) {
			throw new ConflictError("Reembolso falhou no gateway");
		}

		// Atualizar status
		payment.markAsRefunded();
		const updatedPayment = await this.paymentRepository.update(
			payment.id,
			payment,
		);

		this.logger.info("Reembolso processado", { paymentId: payment.id });

		return this.mapToResponse(updatedPayment);
	}

	private validatePaymentRequest(request: CreatePaymentRequest): void {
		if (!request.orderId) {
			throw new ValidationError("ID do pedido é obrigatório");
		}
		if (!request.amount || request.amount <= 0) {
			throw new ValidationError("Valor deve ser maior que zero");
		}
		if (!request.paymentMethod) {
			throw new ValidationError("Método de pagamento é obrigatório");
		}
	}

	private mapToResponse(payment: Payment): PaymentResponse {
		return {
			id: payment.id,
			orderId: payment.orderId,
			amount: payment.amount,
			status: payment.status,
			transactionId: payment.transactionId,
			createdAt: payment.createdAt,
		};
	}
}
```

#### Arquivos Afetados

**A deletar**:

- `src/payments/PaymentsManager1-7.js`

**A criar**:

- `src/application/services/PaymentService.ts`
- `src/infrastructure/repositories/PaymentRepository.ts`
- `src/infrastructure/external/PaymentGateway.ts`
- `src/__tests__/unit/services/PaymentService.test.ts`

#### Tarefas Sub-atividades

- [ ] Analisar PaymentsManager1-7
- [ ] Criar PaymentValidator.ts
- [ ] Criar PaymentService.ts
- [ ] Criar PaymentRepository.ts
- [ ] Criar abstração para PaymentGateway
- [ ] Adicionar logging estruturado
- [ ] Adicionar tratamento de erro
- [ ] Criar testes com mocks
- [ ] Deletar PaymentsManager1-7.js

#### Critério de Aceitação

- [x] PaymentService implementa IPaymentService
- [x] Gateway de pagamento abstraído
- [x] Validação completa
- [x] Logging de transações
- [x] Testes com mocks (90%+ coverage)
- [x] Projeto compila

#### Dependências

- ATIVIDADE 2.3 (OrderService)

---

### ATIVIDADE 2.5: Refatorar AnalyticsService 🟠

**Sprint**: 4
**Prioridade**: Alta
**Tempo Estimado**: 10 horas

#### Descrição

Consolidar 7 AnalyticsManager em um único AnalyticsService.

#### Antipadrões Abordados

- God Class (7 classes idênticas)
- God Method
- Código duplicado
- Parâmetros sem significado
- If/Else Hell
- Múltiplas responsabilidades

#### Tarefas Sub-atividades

- [ ] Analisar AnalyticsManager1-7
- [ ] Criar AnalyticsValidator.ts
- [ ] Criar AnalyticsService.ts
- [ ] Criar AnalyticsRepository.ts
- [ ] Separar eventos analíticos
- [ ] Adicionar logging
- [ ] Criar testes
- [ ] Deletar AnalyticsManager1-7.js

#### Critério de Aceitação

- [x] AnalyticsService implementa IAnalyticsService
- [x] 7 managers consolidados
- [x] Validação de eventos
- [x] 80%+ cobertura

#### Dependências

- ATIVIDADE 2.4 (PaymentService)

---

### ATIVIDADE 2.6: Refatorar NotificationService 🟠

**Sprint**: 4
**Prioridade**: Alta
**Tempo Estimado**: 10 horas

#### Descrição

Consolidar 7 NotificationsManager em um único NotificationService.

#### Antipadrões Abordados

- God Class (7 classes idênticas)
- God Method
- Código duplicado
- Múltiplas responsabilidades

#### Tarefas Sub-atividades

- [ ] Analisar NotificationsManager1-7
- [ ] Criar NotificationValidator.ts
- [ ] Criar NotificationService.ts
- [ ] Abstrair canais (Email, SMS, Push)
- [ ] Criar NotificationRepository.ts
- [ ] Adicionar retry logic
- [ ] Criar testes
- [ ] Deletar NotificationsManager1-7.js

#### Critério de Aceitação

- [x] NotificationService implementa INotificationService
- [x] 7 managers consolidados
- [x] Múltiplos canais suportados
- [x] 80%+ cobertura

#### Dependências

- ATIVIDADE 2.5 (AnalyticsService)

---

## 📅 FASE 3: CAMADAS & PADRÕES (Sprint 5, Semanas 9-10)

### ATIVIDADE 3.1: Criar Controllers 🟠

**Sprint**: 5
**Prioridade**: Alta
**Tempo Estimado**: 12 horas

#### Descrição

Criar Controllers para expor serviços via HTTP.

#### Arquivos a Criar

```
src/presentation/controllers/
├─ AuthController.ts
├─ UserController.ts
├─ OrderController.ts
├─ PaymentController.ts
├─ AnalyticsController.ts
├─ NotificationController.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar AuthController.ts
- [ ] Criar UserController.ts
- [ ] Criar OrderController.ts
- [ ] Criar PaymentController.ts
- [ ] Criar AnalyticsController.ts
- [ ] Criar NotificationController.ts
- [ ] Criar arquivo index.ts
- [ ] Adicionar testes para controllers

#### Critério de Aceitação

- [x] Todos os controllers criados
- [x] Respostas HTTP corretas
- [x] Erros tratados apropriadamente
- [x] 80%+ cobertura

#### Dependências

- ATIVIDADE 2.1-2.6 (Services)

---

### ATIVIDADE 3.2: Criar Routes 🟠

**Sprint**: 5
**Prioridade**: Alta
**Tempo Estimado**: 8 horas

#### Descrição

Criar rotas Express para cada controller.

#### Arquivos a Criar

```
src/presentation/routes/
├─ authRoutes.ts
├─ userRoutes.ts
├─ orderRoutes.ts
├─ paymentRoutes.ts
├─ analyticsRoutes.ts
├─ notificationRoutes.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar authRoutes.ts
- [ ] Criar userRoutes.ts
- [ ] Criar orderRoutes.ts
- [ ] Criar paymentRoutes.ts
- [ ] Criar analyticsRoutes.ts
- [ ] Criar notificationRoutes.ts
- [ ] Criar arquivo index.ts
- [ ] Integrar em main.ts

#### Critério de Aceitação

- [x] Todas as rotas criadas
- [x] Integradas em Express
- [x] Endpoints documentados
- [x] Testes passam

#### Dependências

- ATIVIDADE 3.1 (Controllers)

---

### ATIVIDADE 3.3: Criar Middleware 🟠

**Sprint**: 5
**Prioridade**: Alta
**Tempo Estimado**: 10 horas

#### Descrição

Criar middleware para validação, autenticação e tratamento de erro.

#### Arquivos a Criar

```
src/presentation/middleware/
├─ errorHandler.ts
├─ validationHandler.ts
├─ authMiddleware.ts
├─ loggingMiddleware.ts
└─ index.ts
```

#### Tarefas Sub-atividades

- [ ] Criar errorHandler.ts
- [ ] Criar validationHandler.ts
- [ ] Criar authMiddleware.ts
- [ ] Criar loggingMiddleware.ts
- [ ] Integrar em Express
- [ ] Criar testes
- [ ] Documentar uso

#### Critério de Aceitação

- [x] Todos os middleware criados
- [x] Funcionam corretamente
- [x] Erros tratados globalmente
- [x] 80%+ cobertura

#### Dependências

- ATIVIDADE 3.1-3.2

---

## 📅 FASE 4: QUALIDADE & TESTES (Sprint 6, Semanas 11-12)

### ATIVIDADE 4.1: Completar Cobertura de Testes 🔴

**Sprint**: 6
**Prioridade**: Crítica
**Tempo Estimado**: 20 horas

#### Descrição

Completar testes para atingir 90%+ cobertura.

#### Tipos de Testes

- **Unit Tests**: 300+ testes
- **Integration Tests**: 50+ testes
- **E2E Tests**: 20+ testes

#### Tarefas Sub-atividades

- [ ] Adicionar testes unitários para services (60+ testes)
- [ ] Adicionar testes unitários para repositories (40+ testes)
- [ ] Adicionar testes unitários para validators (30+ testes)
- [ ] Adicionar testes unitários para controllers (80+ testes)
- [ ] Adicionar testes de integração (50+ testes)
- [ ] Adicionar testes E2E (20+ testes)
- [ ] Gerar relatório de cobertura
- [ ] Documentar estratégia de testes

#### Critério de Aceitação

- [x] 90%+ cobertura geral
- [x] 95%+ cobertura de services
- [x] 85%+ cobertura de controllers
- [x] Todos os testes passam
- [x] CI/CD configurado

#### Dependências

- ATIVIDADE 3.1-3.3

---

### ATIVIDADE 4.2: Documentação da Arquitetura 🟠

**Sprint**: 6
**Prioridade**: Alta
**Tempo Estimado**: 12 horas

#### Descrição

Criar documentação completa da arquitetura e guia de contribuição.

#### Documentos a Criar

- **ARCHITECTURE.md** - Visão geral arquitetural
- **API_DOCUMENTATION.md** - Documentação das APIs
- **CONTRIBUTION_GUIDE.md** - Guia para contribuidores
- **DECISIONS.md** - Architecture Decision Records (ADRs)
- **TESTING_STRATEGY.md** - Estratégia de testes
- **DEPLOYMENT_GUIDE.md** - Guia de deploy

#### Tarefas Sub-atividades

- [ ] Criar ARCHITECTURE.md
- [ ] Criar API_DOCUMENTATION.md
- [ ] Criar CONTRIBUTION_GUIDE.md
- [ ] Criar DECISIONS.md
- [ ] Criar TESTING_STRATEGY.md
- [ ] Criar DEPLOYMENT_GUIDE.md
- [ ] Atualizar README.md
- [ ] Revisar toda documentação

#### Critério de Aceitação

- [x] Documentação completa
- [x] Exemplos de código
- [x] Diagramas de arquitetura
- [x] Guia claro de contribuição
- [x] Sem erros ou ambiguidades

#### Dependências

- Todas as atividades anteriores

---

## 📊 Resumo de Tarefas por Sprint

### Sprint 1 (Semanas 1-2)

1. ATIVIDADE 1.1: Configurar TypeScript
2. ATIVIDADE 1.2: Configurar ESLint/Prettier
3. ATIVIDADE 1.3: Configurar Jest
4. ATIVIDADE 1.4: Criar Estrutura de Pastas

**Total**: 4 atividades, ~18 horas

---

### Sprint 2 (Semanas 3-4)

1. ATIVIDADE 1.5: Criar Interfaces
2. ATIVIDADE 1.6: Criar DTOs
3. ATIVIDADE 1.7: Criar Entidades
4. ATIVIDADE 1.8: Criar Exceções

**Total**: 4 atividades, ~23 horas

---

### Sprint 3 (Semanas 5-6)

1. ATIVIDADE 2.1: Refatorar AuthService
2. ATIVIDADE 2.2: Refatorar UserService

**Total**: 2 atividades, ~22 horas

---

### Sprint 4 (Semanas 7-8)

1. ATIVIDADE 2.3: Refatorar OrderService
2. ATIVIDADE 2.4: Refatorar PaymentService
3. ATIVIDADE 2.5: Refatorar AnalyticsService
4. ATIVIDADE 2.6: Refatorar NotificationService

**Total**: 4 atividades, ~42 horas

---

### Sprint 5 (Semanas 9-10)

1. ATIVIDADE 3.1: Criar Controllers
2. ATIVIDADE 3.2: Criar Routes
3. ATIVIDADE 3.3: Criar Middleware

**Total**: 3 atividades, ~30 horas

---

### Sprint 6 (Semanas 11-12)

1. ATIVIDADE 4.1: Completar Cobertura de Testes
2. ATIVIDADE 4.2: Documentação da Arquitetura

**Total**: 2 atividades, ~32 horas

---

## 🎯 Total Geral

- **Total de Atividades**: 28
- **Total de Horas**: ~167 horas
- **Timeline**: 12 semanas (6 sprints de 2 semanas)
- **Equipe Recomendada**: 2-3 desenvolvedores
- **Complexidade Geral**: Crítica
- **Impacto**: Transformação completa do projeto

---

## 📋 Próximas Ações

1. ✅ Revisar este documento
2. ⏳ Iniciar Sprint 1 com ATIVIDADE 1.1
3. ⏳ Criar board Kanban no GitHub Projects
4. ⏳ Adicionar tarefas ao board
5. ⏳ Começar implementação

---

**Versão**: 1.0
**Último atualizado**: 13 de Maio de 2026
**Status**: Pronto para executar
