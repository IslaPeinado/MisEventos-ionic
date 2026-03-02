# Instalacion y ejecucion

## Requisitos

- Node.js en version LTS compatible con Angular 15.
- npm.
- Ionic CLI opcional para algunos flujos de trabajo.
- Cuenta y proyecto de Firebase.

## Instalacion

Desde la raiz del proyecto:

```powershell
npm install
```

## Arranque en desarrollo

```powershell
npm start
```

Esto ejecuta `ng serve` segun el script definido en `package.json`.

## Compilacion

```powershell
npm run build
```

La salida de compilacion se genera en `www`, segun `angular.json`.

## Tests

```powershell
npm test
```

## Lint

```powershell
npm run lint
```

## Configuracion Firebase

La app toma la configuracion principal desde:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Servicios inicializados en `src/app/app.module.ts`:

- `provideFirebaseApp`
- `provideDatabase`
- `provideFirestore`
- `provideAuth`
- `provideStorage`

## Estado comprobado en este entorno

Al revisar el proyecto en este equipo:

- `npm run build` fallo porque no estaban instaladas las dependencias.
- Angular informo tambien de uso de Node `v25.2.1`, una version impar no LTS.

Error principal observado:

```text
Could not find the '@angular-devkit/build-angular:browser' builder's node package.
```

## Secuencia recomendada de puesta en marcha

1. Instalar dependencias con `npm install`.
2. Usar Node LTS.
3. Verificar credenciales y reglas de Firebase.
4. Ejecutar `npm start`.
5. Corregir las incidencias funcionales listadas en `06-incidencias-y-mejoras.md` antes de publicar.
