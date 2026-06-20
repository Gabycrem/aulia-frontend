# Acceso y Cierre de Sesion

[Volver al indice](./index.md)

## Iniciar sesion

![Login](./assets/login.png)

1. Abrir la aplicacion.
2. Ingresar usuario.
3. Ingresar contrasena.
4. Presionar **Iniciar sesion**.

## Resultado esperado

Si los datos son correctos, Aulia redirige automaticamente al panel correspondiente:

| Rol | Pantalla inicial |
| --- | --- |
| Administrador | Dashboard administrador |
| Docente | Dashboard docente |
| Gabinete | Dashboard gabinete |
| Alumno | Dashboard alumno |
| Directivo | Dashboard directivo |

## Si los datos son incorrectos

El sistema muestra un mensaje de error y permanece en la pantalla de login.

## Cerrar sesion

1. Ir al menu lateral.
2. Presionar el boton de cierre de sesion.
3. El sistema vuelve al login.

## Sesion vencida

Si la sesion vence, el sistema debe impedir el acceso a rutas privadas y volver al login.

Anterior: [Convenciones](./00-convenciones.md)  
Siguiente: [Navegacion general](./02-navegacion.md)
