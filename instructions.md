Course notes: https://hendrixer.github.io/API-design-v4/lessons/route-handlers/validating-inputs

Install prisma
npm i prisma prisma/client --save

Initialize Prisma with: npx prisma init

To do migrations run
npx prisma migrate dev --name init

to format your prisma file and models, run:
npx prisma format

<!-- Database Schemas -->

model User {
id String @id @default(uuid())
createdAt DateTime @default(now())
username String @unique
password String
products Product[]
}

model Product {
id String @id @default(uuid())
createdAt DateTime @default(now())
name String
belongToId String
belongsTo User @relation(fields: [belongToId], references: [id])
updates Update[]
updateId String
}

enum UPDATE_STATUS {
inprogress
shipped
deprecated
}

model Update {
id String @id @default(uuid())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
title String
body String
status UPDATE_STATUS @default(inprogress)
version String?
asset String?
productId String
product Product @relation(fields: [productId], references: [id])
updatePoints UpdatePoints[]
}

model UpdatePoints {
id String @id @default(uuid())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

name String
description String

updateId String
belongToUpdate Update @relation(fields: [updateId], references: [id])
}

<!-- Env -->

JWT_SECRET="my_cookies"

<!--  -->
