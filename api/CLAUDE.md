# Gal Churras — Backend

App de entrega de kits de churrasco. Este repositório é o **backend**.

## Stack

- Java 21, Spring Boot 3.3
- Spring Web, Spring Data JPA, Bean Validation, Spring Security (JWT)
- PostgreSQL 16 + Flyway
- Lombok
- Build: Maven

## Arquitetura

**Monólito modular.** Um único projeto Spring Boot, mas cada contexto de
negócio vive em seu próprio pacote sob `com.galchurras`, com fronteiras claras.
Módulos existentes: `catalog` (kits) e `identity` (auth/usuários). Compartilhado: `common`.

### Padrão obrigatório de um módulo

Sempre siga esta estrutura ao criar/editar um módulo (use `catalog` e `identity`
como referência):

```
com.galchurras.<modulo>
├── domain/        # entidades JPA (estendem common.domain.BaseEntity)
├── repository/    # interfaces Spring Data
├── service/       # regra de negócio, anotada com @Transactional
└── web/           # @RestController + dto/ (DTOs são records)
```

## Convenções (NÃO violar)

- **Schema é do Flyway**, nunca do Hibernate. `ddl-auto` fica em `validate`.
  Toda mudança de tabela é uma migration nova em `src/main/resources/db/migration/`
  (`V{n}__descricao.sql`), incrementando o número. Nunca editar uma migration já aplicada.
- **DTOs são `record`**, com validação Bean Validation (`@NotBlank`, `@Valid`, etc.).
  Entidades nunca são expostas direto no controller.
- **Entidades** usam Lombok (`@Getter/@Setter/@NoArgsConstructor`) e estendem `BaseEntity`
  (timestamps automáticos). IDs são `Long` com `GenerationType.IDENTITY`.
- **Fronteira de módulos:** `common` NÃO pode depender de módulos de negócio.
  Cada módulo trata suas próprias exceções (ex.: `IdentityExceptionHandler`),
  sem importar classes de outro módulo.
- **Segurança:** senhas com BCrypt, nunca em texto puro. JWT via OAuth2 Resource Server
  (Nimbus), sem libs extras. Segredo do JWT só via env `JWT_SECRET` em produção.
- Dinheiro é `BigDecimal`. Nunca `double`/`float`.

## Comandos

```bash
docker compose up -d          # sobe o Postgres
mvn spring-boot:run           # roda a aplicação (porta 8080)
mvn test                      # roda os testes
```

## Perfis de usuário

`CLIENTE`, `ENTREGADOR`, `ACOUGUE` (enum `identity.domain.Role`). As rotas são
protegidas por padrão; controle de acesso por perfil fica em `SecurityConfig`.