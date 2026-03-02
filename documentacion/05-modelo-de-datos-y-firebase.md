# Modelo de datos y Firebase

## Interface `EventoInterface`

Archivo: `src/interface/evento.interface.ts`

Campos:

- `idEvento?: string`
- `anfitrionId?: string`
- `invitadoId?: string`
- `fotoEvento?: string | null`
- `tituloEvento: string`
- `descripcionEvento: string`
- `lugarEvento: string`
- `diaEvento: string`
- `horaEvento: string`
- `regalos?: Tregalo[]`

## Interface `RegaloInterface`

Archivo: `src/interface/regalo.interface.ts`

Campos:

- `idRegalo?: string`
- `fotoRegalo?: string`
- `nombreRegalo: string`
- `descripcionRegalo: string`
- `tallaRegalo: string`
- `precioRegalo: string`
- `idEvento: string`

Tambien existe el tipo `Tregalo`, usado para regalos embebidos en el evento:

- `fotoRegalo?: string`
- `nombreRegalo: string`
- `descripcionRegalo: string`
- `precioRegalo: string`

## Interface `UserInterface`

Archivo: `src/interface/user.interface.ts`

Campos:

- `usuarioId?: string`
- `nombreUser: string`
- `apellidoUser: string`
- `emailUser: string`
- `passwordUser: string`
- `imagenUser: string`
- `idEvento: string`

Nota: esta interfaz no parece estar conectada a una persistencia real en el codigo revisado. La gestion de usuarios se apoya directamente en Firebase Auth.

## Estructura de persistencia observada

### Eventos

Coleccion Firestore:

```text
eventos/{idEvento}
```

Documento esperado:

```json
{
  "anfitrionId": "uid-del-usuario",
  "fotoEvento": "https://...",
  "tituloEvento": "Cumpleanos",
  "descripcionEvento": "Cena con amigos",
  "lugarEvento": "Madrid",
  "diaEvento": "2026-03-15",
  "horaEvento": "21:00",
  "regalos": [
    {
      "fotoRegalo": "https://...",
      "nombreRegalo": "Libro",
      "descripcionRegalo": "Edicion especial",
      "precioRegalo": "25"
    }
  ]
}
```

### Regalos en subcoleccion

El servicio tambien contempla esta estructura:

```text
eventos/{idEvento}/regalos/{idRegalo}
```

Esto introduce dos modelos paralelos:

- regalos embebidos en el documento del evento
- regalos en subcoleccion independiente

Actualmente ambos enfoques conviven en el codigo.

## Firebase configurado

La configuracion de desarrollo se encuentra en `src/environments/environment.ts`.

Servicios activados:

- Firestore
- Realtime Database
- Auth
- Storage

## Reglas incluidas en el repositorio

Archivo: `firestore.rules`

Observacion importante:

- las reglas incluidas permiten lectura y escritura total solo hasta el 30 de julio de 2023
- despues de esa fecha, las peticiones quedan denegadas

Por tanto, para que la app funcione hoy, es necesario actualizar las reglas en Firebase.

## Storage

Usos observados:

- `imagenes/{file.name}` para imagenes subidas desde registro y eventos
- `users/{uid}/profile.jpg` y `users/{uid}` en perfil

No hay una estrategia unica de nombres de archivo y carpetas. Conviene unificarla.
