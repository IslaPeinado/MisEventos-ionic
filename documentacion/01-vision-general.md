# Vision general

## Descripcion

MisEventos es una aplicacion movil/web hecha con Ionic y Angular para gestionar eventos personales. Permite autenticacion de usuarios con Firebase, alta de eventos, consulta de listados, visualizacion de detalle y una seccion de perfil.

El proyecto parece orientado a un trabajo academico o portfolio. En `package.json` figura la descripcion `MisEventos - Isla Peinado Henriquez - DAM - 2023`.

## Stack principal

- Ionic 7
- Angular 15
- AngularFire 7
- Firebase Auth
- Firestore
- Firebase Realtime Database
- Firebase Storage
- Capacitor 4
- TypeScript 4.8

## Objetivo funcional actual

La aplicacion implementa estos bloques:

- Registro de usuarios con email y password.
- Inicio de sesion con email/password o Google.
- Gestion basica de eventos.
- Asociacion de regalos a un evento.
- Vista de perfil del usuario autenticado.
- Pantallas informativas: ayuda, informacion y terminos.

## Estado tecnico observado

El repositorio contiene la base funcional de la app, pero no esta completamente alineado en todas sus piezas. Durante la revision se detectaron varios puntos relevantes:

- Falta `node_modules` en el entorno actual, por lo que no se pudo compilar sin instalar dependencias.
- Existen rutas y enlaces que no coinciden entre si.
- La gestion de regalos usa dos enfoques distintos: subcoleccion en Firestore y array embebido dentro del evento.
- Las reglas de Firestore incluidas en el repo expiraban el 30 de julio de 2023.

Estos puntos no impiden documentar la arquitectura actual, pero si deben tenerse en cuenta antes de usar el proyecto en produccion.
