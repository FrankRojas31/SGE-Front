# Sistema de Gestión Escolar (SGE)

## 1. Introducción

En numerosas instituciones educativas, la gestión de estudiantes, cursos y calificaciones se lleva a cabo de manera manual o mediante sistemas con limitaciones operativas. Esto genera diversas problemáticas, tales como:

- **Errores en el registro de calificaciones**, derivados de fallas humanas o falta de automatización.
- **Falta de acceso centralizado a la información**, lo que dificulta la consulta y actualización en tiempo real.
- **Complejidad en la administración de usuarios y permisos**, afectando la seguridad y el control del sistema.
- **Ausencia de reportes automáticos y herramientas de exportación de datos**, limitando el análisis y la toma de decisiones basada en información precisa.

El Sistema de Gestión Escolar (SGE) busca solucionar estos problemas proporcionando una plataforma digital moderna, eficiente y segura para la administración académica y administrativa.

---

## 2. Equipo de Desarrollo

**Equipo #6:**

- _JuanSSalmeron_ **Juan de Dios Salmerón Rivera** _22393224_ (Líder del equipo)
- _SACPA_ **William Joel Chávez López** _20393144_
- _GabrieLag00_ **Gabriel David Lizama Gómez** _22393278_
- _alsaem5_ **Saúl García López** _21393194_
- _FrankRojas31_ **Francisco Emmanuel Rojas Cerón** _22393186_

---

## 3. Tecnologías y Librerías Utilizadas (Frontend)

- **Vue.js 3** con Composition API para el desarrollo de la interfaz de usuario.
- **TailwindCSS** para el diseño y estilizado moderno.
- **PrimeVue** para componentes visuales avanzados.
- **Pinia** para la gestión eficiente del estado de la aplicación.
- **VeeValidate y Yup** para la validación de formularios.
- **Axios** para la comunicación con la API.

---

## 4. Instalación y Ejecución del Proyecto (Frontend)

### **Requisitos Previos**

Antes de comenzar, asegúrese de tener instalados:

- **Node.js** (v16 o superior)
- **Administrador de paquetes npm o yarn**

### **Pasos para Ejecutar el Proyecto**

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/JuanSSalmeron/SGE-Front
   ```

2. **Acceder al directorio del proyecto:**

   ```bash
   cd SGE
   ```

3. **Instalar dependencias del frontend:**

   ```bash
   npm install
   ```

4. **Ejecutar el entorno de desarrollo:**
   ```bash
   npm run dev
   ```

Una vez completados estos pasos, el frontend estará listo para su uso en el entorno de desarrollo.

---

## 5. Sistema de Mockeo

Para facilitar el desarrollo sin depender del servidor backend, SGE-Front incluye un sistema de mockeo integrado que permite simular datos de API.

### Activando el Mockeo

**Opción 1: Variable de Entorno (Recomendado)**

```bash
VITE_USE_MOCK=true npm run dev
```

**Opción 2: En `.env` o `.env.local`**

```env
VITE_USE_MOCK=true
```

### Datos Mockeados Disponibles

El sistema incluye datos simulados para:

- Cursos/Asignaturas
- Grupos/Clases
- Estudiantes
- Períodos académicos
- Personas
- Usuarios
- Calificaciones
- Y más...

### Documentación Completa

Para información detallada sobre el sistema de mockeo, consulta:

```
src/api/mocks/README.md
```

Aquí encontrarás:

- Cómo agregar nuevos mocks
- Estructura de datos
- Debugging
- Mantener datos realistas

---

## 6. Conclusión

El módulo frontend del Sistema de Gestión Escolar (SGE) está diseñado con tecnologías modernas como Vue.js 3 y TailwindCSS, permitiendo una experiencia de usuario optimizada y un desarrollo eficiente. La implementación de herramientas como PrimeVue, Pinia y Axios facilita la gestión del estado y la comunicación con la API, asegurando una interfaz dinámica y funcional.
