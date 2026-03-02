# Rutas, pantallas y flujos

## Mapa de rutas

| Ruta | Acceso | Descripcion |
|---|---|---|
| `/` | publico | redirige a `/login` |
| `/login` | publico | inicio de sesion |
| `/register` | publico | alta de usuario |
| `/terminosycondiciones` | autenticado | terminos y condiciones |
| `/informacion` | autenticado | informacion general |
| `/ayuda` | autenticado | ayuda |
| `/inicio/list-evento` | autenticado | lista de eventos |
| `/inicio/one-evento/:idEvento` | parcialmente protegido por contexto, no por guard en la ruta | detalle del evento |
| `/inicio/add-evento` | autenticado | creacion de evento |
| `/inicio/perfil` | autenticado | perfil del usuario |

## Flujo de autenticacion

### Login

Componente: `src/app/features/auth/login/login.component.ts`

Funciones principales:

- valida email y password con `ReactiveForms`
- llama a `userService.login(...)`
- redirige a `/inicio/list-evento`
- muestra `ToastController` con feedback
- permite login con Google mediante popup

### Registro

Componente: `src/app/features/auth/register/register.component.ts`

Funciones principales:

- crea formulario reactivo
- exige aceptar terminos
- permite asociar `displayName`
- sube una imagen a Firebase Storage
- llama a `userService.register(...)`
- redirige a `/inicio/list-evento`

## Flujo de eventos

### Listado

Componente: `src/app/features/eventos/list-evento/list-evento.component.ts`

Comportamiento:

- solicita eventos desde `EventoService`
- pinta una lista con titulo, lugar, fecha y hora
- filtra localmente usando `ion-searchbar`
- navega al detalle al pulsar un item

### Alta de evento

Componente: `src/app/features/eventos/add-evento/add-evento.component.ts`

Comportamiento:

- usa un formulario reactivo para los datos del evento
- permite subir imagen del evento a Storage
- abre un modal para agregar regalos al evento antes de guardarlo
- almacena los regalos en un array local `regalos`
- al enviar, asigna `fotoEvento` y `regalos` al objeto final

### Detalle de evento

Componente: `src/app/features/eventos/one-evento/one-evento.component.ts`

Comportamiento:

- lee `idEvento` desde la ruta
- obtiene el documento de Firestore
- muestra datos principales del evento
- lista regalos si el evento contiene la propiedad `regalos`
- permite borrar el evento actual

## Flujo de perfil

Componente: `src/app/features/profile/perfil/perfil.component.ts`

Comportamiento:

- recupera datos del usuario autenticado desde Firebase Auth
- intenta leer imagenes del usuario en Firebase Storage
- muestra nombre, email y foto
- expone toggles de ajustes visuales no persistidos
- ofrece acceso a ayuda, informacion, ajustes y logout

## Navegacion inferior

Componente: `src/app/shared/layout/tab-menu/tab-menu.component.html`

La barra inferior muestra accesos a:

- `list-evento`
- `add-evento`
- `perfil`

## Pantallas informativas

Existen modulos para:

- `ayuda`
- `informacion`
- `terminos`

Son componentes simples, orientados a contenido estatico.
