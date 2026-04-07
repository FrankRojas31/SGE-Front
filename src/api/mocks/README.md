# Sistema de Mockeo - SGE-Front

Esta documentación explica cómo funciona el sistema de mockeo implementado en SGE-Front y cómo usarlo.

## ¿Qué es el Mockeo?

El mockeo es un sistema que permite simular datos de la API sin necesidad de un servidor backend funcionando. Es útil para:

- Desarrollo sin dependencias del backend
- Testing de componentes de forma aislada
- Prototipado rápido
- Debugging de la UI sin esperar respuestas del servidor

## Estructura

```
src/api/
├── config/
│   └── mock.config.ts           # Configuración global de mockeo
├── mocks/
│   ├── mockHelper.ts            # Funciones auxiliares para mockeo
│   ├── CoursesService.mock.ts
│   ├── GroupsService.mock.ts
│   ├── StudentsServices.mock.ts
│   ├── SubjectsServices.mock.ts
│   ├── PeriodsServices.mock.ts
│   ├── PersonsServices.mock.ts
│   ├── SchoolYearServices.mock.ts
│   ├── GroupsStudentServices.mock.ts
│   ├── GroupsSubjectsServices.mock.ts
│   ├── unitService.mock.ts
│   ├── UserService.mock.ts
│   └── CalificationService.mock.ts
└── services/
    ├── CoursesService.ts        # Servicios modificados con soporte a mockeo
    ├── GroupsService.ts
    ├── StudentsServices.ts
    └── ... (otros servicios)
```

## Activación del Mockeo

### Opción 1: Variable de Entorno (Recomendado)

En tu archivo `.env` o `.env.local`:

```env
VITE_USE_MOCK=true
```

Después, reinicia el servidor de desarrollo.

### Opción 2: Modificar `src/api/config/mock.config.ts`

```typescript
export const USE_MOCK = true // Cambia a true para activar
```

### Opción 3: Durante la Ejecución (Developer Tools)

En la consola del navegador:

```javascript
import { setMockEnabled } from '@/api/config/mock.config'
setMockEnabled(true) // Activa el mockeo
setMockEnabled(false) // Desactiva el mockeo
```

## Datos Mockeados Disponibles

### Cursos (Courses)

- 5 cursos de ejemplo (Matemáticas, Lenguaje, Ciencias, Historia, Educación Física)

### Grupos (Groups)

- 5 grupos de ejemplo con diferentes años y secciones

### Estudiantes (Students)

- 5 estudiantes con información de matrícula y cursos

### Materias (Subjects)

- 8 asignaturas de ejemplo

### Períodos (Periods)

- 4 períodos académicos con diferentes estados

### Personas (Persons)

- 5 personas con datos personales

### Años Escolares (SchoolYear)

- 4 años escolares

### Usuarios (Users)

- 5 usuarios con diferentes roles (ADMIN, PROFESOR, COORDINADOR, TUTOR)

### Calificaciones (Califications)

- 8 calificaciones de ejemplo

## Cómo Funcionan los Mocks

Cada servicio ha sido modificado para verificar si el mokeo está habilitado:

```typescript
export async function GetCourses() {
  if (isMockEnabled()) return GetCoursesMock();  // Usa mock

  return await GenericRequest<Courses[]>(...);  // Usa API real
}
```

Cuando el mockeo está **habilitado**:

1. Se evita la llamada al servidor
2. Se simula un delay de red (~300ms)
3. Se devuelven datos de ejemplo en la estructura esperada

Cuando el mockeo está **deshabilitado**:

1. Se hace una llamada real a `GenericRequest`
2. Se contacta el servidor backend normalmente

## Agregando Nuevos Mocks

Para agregar un mock a un servicio nuevo:

### 1. Crear el archivo de mock

`src/api/mocks/MiServicio.mock.ts`:

```typescript
import type { MiTipo } from '@/types/MiTipo';
import { mockResponse } from './mockHelper';
import type { ResponseHelper } from '@/types/ResponseHelper';

const mockData: MiTipo[] = [
  { id: 1, nombre: 'Ejemplo 1', ... },
  { id: 2, nombre: 'Ejemplo 2', ... }
];

export async function GetMisDatosMock(): Promise<ResponseHelper<MiTipo[]>> {
  return mockResponse(mockData);
}

export async function PostMiDatoMock(dato: MiTipo): Promise<ResponseHelper<MiTipo>> {
  const newDato: MiTipo = {
    ...dato,
    id: Math.max(...mockData.map(d => d.id), 0) + 1
  };
  mockData.push(newDato);
  return mockResponse(newDato);
}

// ... otras funciones CRUD
```

### 2. Modificar el servicio

`src/api/services/MiServicio.ts`:

```typescript
import { isMockEnabled } from '../config/mock.config'
import { GetMisDatosMock, PostMiDatoMock } from '../mocks/MiServicio.mock'

export async function GetMisDatos() {
  if (isMockEnabled()) return GetMisDatosMock()

  return await GenericRequest<MiTipo[]>({
    url: 'mi-endpoint',
    method: 'GET',
    authToken: AuthUser(),
  })
}

export async function PostMiDato(dato: MiTipo) {
  if (isMockEnabled()) return PostMiDatoMock(dato)

  return await GenericRequest<MiTipo>({
    url: 'mi-endpoint',
    method: 'POST',
    data: dato,
    authToken: AuthUser(),
  })
}
```

## Características de los Mocks

### Simulación de Delay

Todos los mocks simulan un delay de ~300ms para imitar el tiempo de respuesta del servidor:

```typescript
// En mockHelper.ts
export const simulateNetworkDelay = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
}
```

### Estructura de Respuesta

Los mocks devuelven la misma estructura que el servidor:

```typescript
{
  success: true,
  message: 'Mock data',
  data: [...] // Tu datos
}
```

### Persistencia

Los cambios en los datos mockeados persisten durante la sesión actual:

```typescript
// Si agregar un curso mientras el mockeo está activo
PostCourse(newCourse) // Se agrega a mockCoursesData
GetCourses() // Incluirá el nuevo curso
```

## Debugging

### Ver si el mockeo está activo

En la consola del navegador:

```javascript
import { isMockEnabled } from '@/api/config/mock.config'
console.log('Mockeo activo:', isMockEnabled())
```

### Toggling durante desarrollo

```javascript
import { setMockEnabled, isMockEnabled } from '@/api/config/mock.config'

// Alternar mockeo
setMockEnabled(!isMockEnabled())
```

## Notas Importantes

1. **El mockeo está deshabilitado por defecto** para mantener un flujo de desarrollo normal.

2. **Los mocks usan datos realistas** pero simulados. No son datos de prueba reales de la escuela.

3. **El almacenamiento de mocks es temporal**. Se reinicia cada vez que recargas la página o que reconstruyes la aplicación.

4. **Los stores continúan funcionando normalmente** sin cambios. Consumen los servicios de la misma forma, independientemente de si usan mocks o datos reales.

5. **Para endpoints especiales** (como `GetGroupsInPeriodActive`), hemos implementado lógica específica en el mock para devolver datos apropiados.

## Mantenimiento

- Cuando agregues nuevos servicios, recuerda crear su correspondiente archivo `.mock.ts`
- Mantén los datos de mock actualizados según evolucione la aplicación
- Actualiza esta documentación cuando hagas cambios significativos

---

**Última actualización:** Abril 2026
**Versión:** 1.0
