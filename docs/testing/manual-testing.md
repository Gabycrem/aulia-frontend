# Testing manual - Aulia

Este documento sirve como checklist de pruebas manuales para validar el frontend integrado con backend.

La idea es ejecutar los casos por rol, marcar resultado y registrar observaciones.

## Datos de prueba

Completar antes de comenzar.

| Rol | Usuario | Password | Observaciones |
| --- | --- | --- | --- |
| Admin | admin | 123456 | Usuario administrador |
| Gabinete | gabinete | 123456 | Usuario de gabinete |
| Docente | docente | docente123 | Docente con alumnos/asignaciones |
| Alumno | alumno | 123456 | Alumno con curso asignado |

## Validaciones generales

Aplican a todos los casos:

- [X] Backend levantado.
- [X] Frontend levantado.
- [X] Base de datos con datos de prueba.
- [ ] No aparecen errores inesperados en consola.
- [X] Las pantallas cargan sin quedar en blanco.
- [X] Los mensajes de error/exito son entendibles.
- [X] El usuario no puede acceder a rutas de otro rol.

---

# 1. Login y sesion

## AUTH-01 - Login Admin

**Objetivo:** validar que Admin ingrese y sea redirigido a su dashboard.

**Precondiciones:**

- Usuario Admin activo.

**Pasos:**

1. Ir a Login.
2. Ingresar usuario y password de Admin.
3. Presionar Iniciar sesion.

**Resultado esperado:**

- [X] Redirige a dashboard Admin.
- [X] Header muestra rol Administrador.
- [X] Sidebar muestra opciones de Admin.
- [X] No hay errores en consola.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## AUTH-02 - Login Gabinete

**Resultado esperado:**

- [X] Redirige a dashboard Gabinete.
- [X] Header muestra rol Gabinete.
- [X] Sidebar muestra opciones de Gabinete.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## AUTH-03 - Login Docente

**Resultado esperado:**

- [X] Redirige a dashboard Docente.
- [X] Header muestra rol Docente.
- [X] Sidebar muestra opciones de Docente.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## AUTH-04 - Login Alumno

**Resultado esperado:**

- [X] Redirige a dashboard Alumno.
- [X] Header muestra rol Alumno/Estudiante segun definicion visual.
- [X] Sidebar muestra opciones de Alumno.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## AUTH-05 - Cerrar sesion

**Pasos:**

1. Loguearse con cualquier rol.
2. Presionar Cerrar Sesion.

**Resultado esperado:**

- [X] Borra sesion local.
- [X] Redirige a Login.
- [X] No permite volver al dashboard usando atras del navegador.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

---

# 2. Admin

## ADM-DASH-01 - Dashboard Admin con datos reales

**Objetivo:** validar que el dashboard no use mocks visibles.

**Pasos:**

1. Iniciar sesion como Admin.
2. Ir a Dashboard.

**Resultado esperado:**

- [X] Muestra metricas reales de alumnos, docentes, gabinete y cursos.
- [X] Las cards de gestion muestran datos reales o estado vacio correcto.
- [-] No se muestran datos mock.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- En Resumen adminitrativo, nos muestra 3 alumnos registrados (correcto), y 9 usuarios cargados(no hay más que 6) - Revisar de donde viene el 9.

## ADM-ALU-01 - Listar alumnos

**Pasos:**

1. Ir a Gestionar Alumnos.
2. Esperar carga de tabla.

**Resultado esperado:**

- [X] Se listan alumnos reales.
- [-] Se muestran nombre, curso, email/estado segun corresponda.
- [X] Busqueda/filtros funcionan.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- Email y Curso no están cargando datos reales. Corregir. 

## ADM-ALU-02 - Crear alumno

**Pasos:**

1. Ir a Gestionar Alumnos.
2. Presionar Nuevo alumno.
3. Completar datos de usuario.
4. Continuar a datos escolares.
5. Completar fecha, curso y consentimiento.
6. Guardar.

**Resultado esperado:**

- [X] Crea usuario.
- [X] Crea alumno asociado.
- [X] Vuelve al listado.
- [X] El alumno aparece en la tabla.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- Aprobado con observación: alta no atómica. Puede dejar usuarios Alumno huérfanos si se interrumpe el paso 2.
- No debe mostrarse mensaje de éxito al completar el paso 1. Para el usuario el alta aún no finalizó; solo debe avanzar al paso de datos escolares. 

## ADM-ALU-03 - Editar alumno

**Pasos:**

1. Ir a Gestionar Alumnos.
2. Seleccionar/editar un alumno existente.
3. Verificar datos precargados.
4. Modificar un dato de usuario.
5. Modificar un dato escolar.
6. Guardar.

**Resultado esperado:**

- [X] Precarga nombre, apellido, usuario y email.
- [X] Precarga fecha, curso, consentimiento y estado.
- [X] Guarda cambios de usuario.
- [X] Guarda cambios de alumno.
- [X] No obliga a cambiar password.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- 

## ADM-DOC-01 - Listar docentes

**Resultado esperado:**

- [X] Lista solo usuarios con rol Docente.
- [X] Muestra cantidad de asignaciones.
- [X] Botones inferiores se habilitan al seleccionar registro.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## ADM-DOC-02 - Crear docente sin asignaciones

**Resultado esperado:**

- [X] Permite crear docente sin asignar curso/materia.
- [X] El docente aparece en listado.
- [X] Cantidad de asignaciones queda en 0.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## ADM-DOC-03 - Asignar curso y materia a docente

**Resultado esperado:**

- [X] Permite seleccionar curso.
- [X] Permite seleccionar materia.
- [X] Guarda asignacion.
- [X] La asignacion aparece en detalle/listado del docente.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## ADM-GAB-01 - Gestionar usuarios de gabinete

**Resultado esperado:**

- [X] Lista usuarios de gabinete reales.
- [X] Permite crear usuario de gabinete.
- [X] Permite editar datos.
- [X] Permite ver detalle.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## ADM-CONF-01 - Materias

**Resultado esperado:**

- [X] Lista materias reales.
- [X] Permite crear materia.
- [X] Permite buscar materia.
- [X] Permite activar/desactivar segun flujo implementado.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- Cuándo se elimina una materia de la lista, esta no se elimina de las asignaciones de los docentes, quedan ligados a un campo vacio. 

## ADM-CONF-02 - Cursos

**Resultado esperado:**

- [X] Lista cursos reales.
- [X] Permite crear curso.
- [X] Permite buscar curso.
- [-] Permite desactivar curso.
- [X] No rompe layout con botones.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- UX pendiente: reemplazar window.confirm por confirmación visual propia. 
- Bloqueado por CORS backend: PATCH no permitido en corsOptions.

## ADM-CONF-03 - Roles del sistema

**Resultado esperado:**

- [X] Lista roles reales.
- [X] La vista es solo lectura.
- [X] No ofrece acciones no implementadas.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

---

# 3. Alumno

## ALU-DASH-01 - Dashboard alumno

**Pasos:**

1. Iniciar sesion como Alumno.
2. Verificar dashboard.

**Resultado esperado:**

- [X] Muestra pregunta de check-in.
- [X] Muestra opciones emocionales.
- [X] Permite dejar materia vacia.
- [-] Permite comentario opcional.
- [X] Permite marcar solicitud de ayuda.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- El formulario exige comentario, pero el resultado esperado indica que debería ser opcional. Definir regla funcional y ajustar validación.

## ALU-CHK-01 - Guardar check-in

**Pasos:**

1. Seleccionar estado emocional.
2. Opcionalmente seleccionar materia.
3. Escribir comentario.
4. Guardar.

**Resultado esperado:**

- [ ] Guarda check-in.
- [ ] Muestra mensaje de exito.
- [ ] Limpia formulario o deja estado coherente.
- [ ] No duplica envios al presionar varias veces.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- Bloqueado por dependencia backend/front: el login no provee studentId/courseId para guardar check-in.

---

# 4. Docente

## DOC-DASH-01 - Dashboard docente

**Resultado esperado:**

- [X] Muestra metricas reales o valores coherentes.
- [X] Muestra alumnos asignados.
- [X] Muestra cursos/materias asignadas cuando el backend lo permita.
- [X] No aparecen datos mock.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- Esperando endpoints para metricas sobre Solicitudes enviadas y sus estados.

## DOC-ALU-01 - Mis alumnos

**Resultado esperado:**

- [X] Lista alumnos asignados al docente.
- [X] Filtro por curso funciona.
- [-] Filtro por materia funciona si hay datos disponibles.
- [X] Boton Solicitar intervencion navega con el alumno seleccionado.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- Esperando endpoint para materias asignadasa. 

## DOC-DER-01 - Solicitar intervencion desde Mis alumnos

**Pasos:**

1. Ir a Mis alumnos.
2. Presionar Solicitar intervencion en un alumno.
3. Completar categoria y descripcion.
4. Enviar.

**Resultado esperado:**

- [X] El alumno llega preseleccionado.
- [?] Guarda derivacion.
- [x] Muestra mensaje de exito.
- [x] Vuelve a Mis alumnos.
- [X] Gabinete puede ver la derivacion.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- No Actualiza intervenciones en el dashboard, ni solicitudes enviadas. 

## DOC-DER-02 - Solicitar intervencion desde Sidebar

**Pasos:**

1. Ir a Solicitar Intervencion desde menu.
2. Seleccionar alumno.
3. Completar categoria y descripcion.
4. Enviar.

**Resultado esperado:**

- [X] Permite seleccionar alumno.
- [?] Guarda derivacion.
- [X] Muestra mensaje de exito.
- [X] Vuelve a Dashboard docente.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## DOC-AGE-01 - Agenda docente

**Resultado esperado:**

- [X] Carga agenda docente.
- [X] Muestra estado vacio si no hay eventos.
- [X] No muestra errores por permisos.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

- No muestra eventos, porque no hay agendados aún, y todavía no permite carga manual de eventos. 

---

# 5. Gabinete

## GAB-DASH-01 - Dashboard gabinete

**Resultado esperado:**

- [X] Muestra metricas reales o estados vacios correctos.
- [X] Muestra derivaciones pendientes reales.
- [X] Actividad reciente no rompe layout.
- [X] Agenda de hoy no rompe layout.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## GAB-ALU-01 - Listado de alumnos/casos

**Resultado esperado:**

- [X] Lista derivaciones/casos reales.
- [X] Muestra alumno.
- [-] Muestra curso legible si backend lo devuelve.
- [X] Busqueda funciona.
- [X] Accion Ver abre detalle.
- [X] Accion Editar lleva a derivacion/gestion correspondiente.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## GAB-CASO-01 - Ver detalle del caso

**Resultado esperado:**

- [X] Muestra datos del alumno.
- [X] Muestra datos del legajo/caso.
- [X] Muestra intervenciones asociadas.
- [X] Permite registrar intervencion si corresponde.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## GAB-CASO-02 - Crear nuevo caso

**Pasos:**

1. Ir a Gabinete > Alumnos.
2. Presionar Nuevo caso.
3. Seleccionar alumno.
4. Guardar.

**Resultado esperado:**

- [X] Crea caso/legajo.
- [X] Navega al detalle del caso.
- [X] Si el alumno ya tiene caso, informa y permite verlo.

**Resultado obtenido:**

- [X] Aprobado
- [ ] Fallo

**Observaciones:**

-

## GAB-DER-01 - Ver derivaciones

**Resultado esperado:**

- [X] Lista derivaciones pendientes.
- [X] Permite seleccionar una derivacion.
- [X] Muestra detalle.
- [-] Permite aceptar/rechazar/pedir informacion segun flujo.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- Bloqueado por CORS backend: PATCH no permitido en corsOptions.
Las acciones usan PATCH según colección Postman y rutas backend. Falla por CORS, no por endpoint inexistente.

## GAB-ALERT-01 - Alertas

**Resultado esperado actual:**

- [ ] La pantalla no muestra derivaciones como alertas.
- [ ] Si no hay endpoint real, muestra estado pendiente/vacio claro.

**Resultado esperado futuro:**

- [ ] Lista alertas reales por patrones de check-in.

**Resultado obtenido:**

- [ ] Aprobado
- [ ] Fallo

**Observaciones:**

-

## GAB-INT-01 - Listar intervenciones

**Resultado esperado:**

- [X] Lista intervenciones reales del profesional.
- [X] Muestra fecha.
- [-] Muestra alumno/caso si el backend lo devuelve.
- [X] Estado vacio correcto si no hay intervenciones.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- No muestra el alumno.

## GAB-INT-02 - Registrar intervencion

**Pasos:**

1. Ir al detalle de un caso.
2. Presionar Registrar intervencion.
3. Completar titulo, tipo, descripcion y fecha/hora.
4. Guardar.

**Resultado esperado:**

- [x] Guarda intervencion.
- [x] Vuelve al detalle o listado segun flujo definido.
- [X] La intervencion aparece en detalle del caso.
- [-] La intervencion aparece en agenda si corresponde.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- Si se crea una intevención desde intervencioes del Sidebar, y se selecciona un alumno que no tiene legajo abierto, la intervención se crea pero el alumno no aparece en la tabla.
(Al registrar desde Sidebar, si el alumno no tenía legajo visible previamente, el flujo obtiene/crea legajo por backend. La intervención se guarda, pero la tabla no muestra alumno asociado porque la respuesta no viene enriquecida)

## GAB-AGE-01 - Agenda gabinete

**Resultado esperado:**

- [X] Muestra calendario.
- [-] Carga intervenciones del profesional.
- [X] Permite navegar meses.
- [X] Permite seleccionar dias.
- [X] Estado vacio correcto si no hay actividades.

**Resultado obtenido:**

- [ ] Aprobado
- [X] Fallo

**Observaciones:**

- La agenda detecta intervenciones en el día, pero no renderiza el detalle en la grilla horaria. Revisar mapeo fecha/hora o componente de agenda.
---

# 6. Pruebas de integracion Front/Back

## INT-01 - Alta completa Admin Alumno + Login Alumno + Check-in

**Flujo:**

1. Admin crea alumno.
2. Admin verifica que aparece en listado.
3. Cerrar sesion.
4. Login con usuario alumno.
5. Alumno guarda check-in.

**Resultado esperado:**

- [X] Usuario creado.
- [X] Alumno creado.
- [X] Login alumno funciona.
- [-] Check-in se guarda correctamente.

## INT-02 - Admin crea docente + asignacion + Docente ve alumnos

**Flujo:**

1. Admin crea docente.
2. Admin asigna curso/materia.
3. Cerrar sesion.
4. Login docente.
5. Ir a Mis alumnos.

**Resultado esperado:**

- [X] Docente puede iniciar sesion.
- [X] Ve alumnos asignados.
- [-] Ve curso/materia si backend lo devuelve.

## INT-03 - Docente solicita derivacion + Gabinete la gestiona

**Flujo:**

1. Login docente.
2. Solicitar intervencion sobre alumno.
3. Cerrar sesion.
4. Login gabinete.
5. Ir a Derivaciones.
6. Ver derivacion.
7. Aceptar o gestionar.

**Resultado esperado:**

- [X] Derivacion se crea.
- [X] Gabinete la ve.
- [-] Se puede gestionar segun acciones disponibles.

## INT-04 - Gabinete crea caso + registra intervencion + agenda

**Flujo:**

1. Login gabinete.
2. Crear caso o abrir caso existente.
3. Registrar intervencion.
4. Ir a Agenda.

**Resultado esperado:**

- [X] Caso existe.
- [X] Intervencion se guarda.
- [X] Intervencion aparece en detalle.
- [-] Intervencion aparece en agenda si hay fecha compatible.

---

# 7. Casos negativos

## NEG-01 - Login incorrecto
**Resultado esperado:**

- [X] Muestra error claro.
- [X] No inicia sesion.
- [X] No redirige a dashboard.

## NEG-02 - Token vencido
**Resultado esperado:**

- [X] Limpia sesion.
- [X] Redirige a Login.
- [X] No deja navegar rutas privadas.

**Notas:**El front detecta token vencido al recargar o navegar a rutas privadas. No hay logout automático en tiempo real sin interacción.

## NEG-03 - Permiso insuficiente 403
**Resultado esperado:**

- [-] Muestra mensaje claro.
- [X] No rompe pantalla.
- [X] No muestra datos sensibles.

**Notas:** No muestra ningún tipo de mensajes intentando ingresar a una ruta no autorizada. Solo recarga página actual. 

## NEG-04 - Entidad inexistente 404
**Resultado esperado:**

- [X] Muestra estado "No se encontro".
- [X] Permite volver.
- [X] No rompe consola.
****Notas:** Quedó aviso básico, mejorar diseño.


## NEG-05 - Formularios incompletos
**Resultado esperado:**

- [X] No envia datos invalidos.
- [X] Muestra campos requeridos.
- [X] Mantiene datos ya escritos.

## NEG-06 - Crear caso para alumno que ya tiene caso
**Resultado esperado:**

- [X] No duplica caso.
- [X] Muestra mensaje claro.
- [X] Permite ir al caso existente.

## NEG-07 - Backend apagado

**Resultado esperado:**

- [X] Muestra error de carga.
- [X] No queda pantalla en blanco.
- [X] Permite reintentar o volver.

Fallo UX: con backend apagado las pantallas muestran "Failed to fetch". Conviene normalizar errores de red en apiRequest para mostrar un mensaje claro de servidor no disponible.

#### Aprobado luego de normalizar errores de red en apiRequest. Muestra mensaje claro de servidor no disponible.

---

# 8. Responsive basico

Estado: Pendiente.

La aplicación todavía no cuenta con implementación responsive completa.  
Estos casos quedan fuera del testing actual y deberán validarse cuando se aborde la adaptación mobile/tablet.

Validar en desktop y mobile cuando corresponda:

- [ ] Sidebar mobile abre/cierra.
- [ ] Tablas no rompen layout.
- [ ] Formularios no se desbordan.
- [ ] Botones principales siguen visibles.
- [ ] Cards no se pisan.
- [ ] Textos no quedan cortados.

---

# 9. Cierre antes de entrega

Antes de entregar:

- [ ] Ejecutar todos los casos criticos.
- [X] Ejecutar `npm run build`.
- [ ] Revisar consola sin errores importantes.
- [X] Confirmar que no quedan mocks visibles en pantallas integradas.
- [X] Confirmar que los pendientes al back estan documentados.
- [ ] Confirmar que manuales de usuario estan actualizados.

## Nota

Los pendientes detectados que dependen del backend fueron registrados en el documento compartido de pedidos al backend.