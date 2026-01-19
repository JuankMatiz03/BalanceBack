BalanceBack – Backend (Monolítico)

Backend desarrollado en Node.js + TypeScript, arquitectura monolítica, usando Prisma ORM, PostgreSQL, JWT y Docker.

Requisitos

Node.js v18+

npm v9+

Docker + Docker Compose

PostgreSQL (vía Docker)

Instalación
1 Clonar repositorio

cd BalanceBack

2️ Instalar dependencias

npm install


🐘 Base de Datos (PostgreSQL con Docker)

Desde la raíz del proyecto:
docker compose up -d

Esto levanta un contenedor PostgreSQL en segundo plano.

Configuración por defecto:

User: postgres
Password: postgres
Database: balance_db
Port: 5433


⚙️ Variables de Entorno

Crear archivo .env en la raíz del proyecto:

DATABASE_URL="postgresql://postgres:postgres@localhost:5433/auth_db"
JWT_SECRET=super-secret-key
PORT=3001

Prisma – Migraciones

npx prisma generate
npx prisma migrate dev --name init

Genera el cliente de Prisma
Crea las tablas en PostgreSQL

npm run dev

Ejecutar el proyecto

Autenticación

Registro de usuarios con email y contraseña encriptada

Login que retorna JWT

Rutas protegidas mediante middleware de autenticación

Arquitectura

Arquitectura limpia (Clean Architecture)

Separación por capas:

Domain

Application (UseCases)

Infrastructure

Prisma ORM

PostgreSQL

JWT
