## Description

Example repository
of using [class-validator's](https://github.com/typestack/class-validator) [validation groups](https://github.com/typestack/class-validator#validation-groups) in DTOs with [Nest](https://github.com/nestjs/nest).

To use validation groups, you need to:
1. create [AppValidationPipe](src/app.validation-pipe.ts)
2. create [DtoWithGroups](src/app.dto.ts)
3. use `AppValidationPipe` in project [bootstrap](src/main.ts) function
4. inherit your DTO from `DtoWithGroups` ([example](src/products/dto/create-product.dto.ts))
5. define `getGroups` method in your DTO class ([example](src/products/dto/create-product.dto.ts))

Unfortunately, you need to repeat the `getGroups` method in a DTO class that inherits from a class that derives from
`DtoWithGroups` (like in a [UpdateProductDto](src/products/dto/update-product.dto.ts)).
Therefore, a logic for defining DTO groups is moved to [a separate function](src/products/products.helper.ts).

The implementation idea comes from [this answer](https://stackoverflow.com/a/73375688) on stackoverflow.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Swagger is available at `http://localhost:3000/docs`.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
