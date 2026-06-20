# AULIA Frontend

Frontend oficial de **AULIA**, una plataforma académica orientada al acompañamiento socioemocional y la gestión educativa para equipos de orientación escolar.

La aplicación permite administrar usuarios y datos escolares, registrar check-ins emocionales, solicitar intervenciones docentes y gestionar derivaciones, legajos e intervenciones desde el equipo de gabinete.

---

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Lucide React
- JavaScript (ES6+)
- CSS

---

## Requisitos

- Node.js
- npm

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Gabycrem/aulia-frontend.git
```

Ingresar a la carpeta:

```bash
cd aulia-frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar entorno de desarrollo:

```bash
npm run dev
```

---

## Scripts disponibles

```bash
npm run dev
```

Inicia el entorno local de desarrollo.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Permite previsualizar localmente el build generado.

---

## Variables de entorno

El frontend consume la API del backend mediante la URL configurada en el proyecto.

Para entorno local, revisar la configuración de API correspondiente antes de ejecutar la aplicación.

---

## Funcionalidades principales

### Administrador

- Gestión de alumnos.
- Gestión de docentes.
- Gestión de integrantes de gabinete.
- Gestión de cursos.
- Gestión de materias.
- Consulta de roles.

### Docente

- Consulta de alumnos asignados.
- Solicitud de intervención para alumnos.
- Seguimiento de solicitudes enviadas.

### Gabinete

- Visualización de derivaciones.
- Gestión de casos o legajos.
- Registro de intervenciones.
- Consulta de métricas operativas.

### Alumno

- Registro de check-in emocional diario.
- Solicitud de contacto con gabinete.

### Directivo

- Acceso al panel correspondiente al rol.

---

## Documentación

La documentación funcional del sistema se encuentra en:

[Manual de usuario](./docs/user-manual/index.md)

Incluye el manual de usuario modular por rol y los flujos principales del MVP.

---

## Convenciones del proyecto

- Arquitectura modular por páginas, componentes, hooks, servicios y mappers.
- Componentes reutilizables.
- CSS separado de JSX.
- Uso de variables globales para estilos y colores.
- Integración con backend mediante servicios centralizados.
- Flujo de trabajo basado en ramas protegidas y pull requests.

---

## Estado del proyecto

Versión MVP integrada con backend desplegado.

---

## Equipo

Proyecto desarrollado como trabajo académico integrador para la carrera de Desarrollo de Software.

- Nazarena Macre
- Andrea Purriños
- Martín Lemberger