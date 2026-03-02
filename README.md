# MisEventos

Aplicacion de gestion de eventos desarrollada con Ionic, Angular y Firebase, con autenticacion de usuarios, creacion de eventos y gestion de regalos.

## About

MisEventos es una app orientada a la organizacion de eventos personales. Permite a los usuarios registrarse, iniciar sesion, crear eventos, consultar su listado y asociar regalos a cada evento.

## Stack

- Ionic 7
- Angular 15
- TypeScript
- Firebase Auth
- Firestore
- Firebase Storage
- Capacitor 4

## Funcionalidades

- Registro de usuarios con email y password
- Inicio de sesion con email/password y Google
- Creacion de eventos
- Listado y detalle de eventos
- Gestion de regalos dentro de cada evento
- Perfil de usuario
- Pantallas informativas de ayuda, informacion y terminos

## Estructura del proyecto

La aplicacion esta organizada en una estructura por responsabilidades:

```text
src/app/
  core/
    models/
    services/
  features/
    auth/
    content/
    eventos/
    home/
    profile/
  shared/
    layout/
```

Documentacion ampliada:

- [documentacion/README.md](./documentacion/README.md)
- [documentacion/03-arquitectura-y-estructura.md](./documentacion/03-arquitectura-y-estructura.md)

## Instalacion

Clona el repositorio e instala dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm start
```

Genera la build:

```bash
npm run build
```

Ejecuta tests:

```bash
npm test
```

## Configuracion

La app utiliza Firebase y toma su configuracion desde:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Antes de usar el proyecto, conviene revisar:

- credenciales del proyecto Firebase
- reglas de Firestore
- configuracion de Storage


## Estado actual

El proyecto ha sido reorganizado para mejorar su comprension interna, pero todavia tiene algunas incidencias tecnicas pendientes, documentadas en:

- [documentacion/06-incidencias-y-mejoras.md](./documentacion/06-incidencias-y-mejoras.md)

## Topics recomendados

`ionic`, `angular`, `firebase`, `angularfire`, `capacitor`, `typescript`, `event-management`, `mobile-app`, `pwa`, `firestore`

## Autor

Proyecto de portfolio / DAM desarrollado por Isla Peinado Henriquez.
