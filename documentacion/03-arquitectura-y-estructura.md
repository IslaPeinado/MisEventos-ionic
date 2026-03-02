# Arquitectura y estructura

## Estructura principal

```text
src/
  app/
    Components/
    home/
    app.module.ts
    app-routing.module.ts
  environments/
  interface/
  services/
  assets/
  theme/
```

## Modulo raiz

El punto de entrada funcional es `src/app/app.module.ts`.

Responsabilidades:

- Inicializar Ionic.
- Registrar el enrutado principal.
- Inicializar Firebase.
- Declarar `AppComponent` y `TabMenuComponent`.

## Enrutado principal

`src/app/app-routing.module.ts` define:

- redireccion inicial a `/login`
- rutas publicas: `login`, `register`
- rutas protegidas con `@angular/fire/auth-guard`:
  - `terminosycondiciones`
  - `informacion`
  - `ayuda`
  - `inicio/list-evento`
  - `inicio/add-evento`
  - `inicio/perfil`
- detalle de evento: `inicio/one-evento/:idEvento`

La seccion `inicio` usa `TabMenuComponent` como contenedor visual.

## Componentes principales

- `login`: autenticacion con email/password y Google.
- `register`: registro, aceptacion de terminos y subida de imagen.
- `list-evento`: listado y busqueda de eventos.
- `one-evento`: detalle de un evento y borrado.
- `add-evento`: alta de evento y carga de regalos dentro de un modal.
- `perfil`: datos basicos del usuario y cierre de sesion.
- `info`, `ayuda`, `terminos`: contenido informativo.
- `ajustes`: modulo presente, pero no integrado en el routing principal.
- `add-regalo`: componente presente, pero no integrado en la navegacion actual.
- `home`: pagina generada por Ionic, actualmente residual y sin uso real en el flujo principal.

## Servicios

### `UserService`

Ubicacion: `src/services/user.service.ts`

Responsabilidades:

- escuchar cambios de autenticacion
- registrar usuarios
- iniciar sesion
- iniciar sesion con Google
- cerrar sesion
- actualizar perfil, email y password

Expone un `BehaviorSubject<User | null>` para el usuario autenticado actual.

### `EventoService`

Ubicacion: `src/services/evento.service.ts`

Responsabilidades implementadas:

- crear eventos
- obtener lista de eventos
- obtener evento por id
- eliminar evento
- crear regalo en subcoleccion
- obtener regalo por id
- eliminar regalo

Tambien contiene codigo comentado relacionado con Firebase Storage.

## Interfaces de dominio

Ubicacion: `src/interface/`

- `evento.interface.ts`
- `regalo.interface.ts`
- `user.interface.ts`

Definen el shape esperado para eventos, regalos y usuarios a nivel de TypeScript.

## Persistencia

El proyecto mezcla varios servicios de Firebase:

- Firestore para eventos y regalos.
- Auth para usuarios.
- Storage para imagenes de perfil, eventos o regalos.
- Realtime Database esta configurado, aunque no se aprecia uso directo en los componentes revisados.
