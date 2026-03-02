# Incidencias y mejoras

## Incidencias detectadas

### 1. Metodo inexistente en `EventoService`

En `list-evento.component.ts` se llama a:

```ts
this.eventoService.getEventosAnfitrion()
```

Ese metodo no existe en `src/services/evento.service.ts` revisado. Esto provocaria error de compilacion o de tipos en un entorno completo.

## 2. Ruta enlazada pero no registrada

En `perfil.component.html` existe un enlace a:

```text
/ajustes
```

Sin embargo, `app-routing.module.ts` no declara ninguna ruta `/ajustes`.

## 3. Inconsistencia en el modelo de regalos

El codigo usa dos enfoques a la vez:

- `add-evento` guarda regalos dentro del array `regalos` del evento.
- `EventoService.addRegalo` crea documentos en `eventos/{idEvento}/regalos`.

La vista `one-evento` solo renderiza `evento.regalos`, por lo que los regalos guardados como subcoleccion no aparecerian ahi.

## 4. Navegacion dudosa en `AddRegaloComponent`

Tras guardar un regalo, el componente navega a:

```text
/home
```

Esa ruta no forma parte del flujo principal definido en `app-routing.module.ts`.

## 5. Parametros de metodo no alineados

En `add-evento.component.ts` se invoca:

```ts
this.eventoService.addEvento(this.formEvento.value, this.formEvento.value.regalos)
```

Pero `EventoService.addEvento` solo recibe un parametro `evento`.

## 6. Reglas de Firestore expiradas

Las reglas incluidas dejaron de permitir acceso despues del 30 de julio de 2023.

## 7. Dependencias no instaladas en el entorno revisado

No fue posible compilar porque faltan paquetes de `node_modules`.

## 8. Version de Node poco adecuada para este proyecto

En el entorno revisado se detecto Node `v25.2.1`, y Angular emitio advertencia por tratarse de una version impar no LTS.

## 9. Paginas residuales o parcialmente integradas

Existen modulos/componentes presentes pero no claramente integrados en el flujo principal:

- `home`
- `add-regalo`
- `ajustes`

## Mejoras recomendadas

### Corto plazo

- instalar dependencias y validar compilacion real
- corregir el contrato de `EventoService`
- registrar o eliminar rutas no usadas
- elegir un solo modelo de persistencia para regalos
- actualizar reglas de Firestore

### Medio plazo

- separar logica de Storage en un servicio dedicado
- tipar mejor los formularios reactivos
- unificar nombres de propiedades de regalo, por ejemplo `fotoRegalo` frente a `imagenRegalo`
- persistir ajustes de perfil o eliminarlos de la UI si son solo visuales
- eliminar codigo comentado y elementos no utilizados

### Largo plazo

- anadir tests unitarios reales para servicios y componentes criticos
- incorporar control de autorizacion por propietario del evento
- documentar despliegue de web y empaquetado movil con Capacitor
