# Relaciones: Grupos, Estudiantes y Materias (Subjects)

## 1. CÓMO ESTÁN RELACIONADOS

### Modelo de Datos (Interfaces)

**Groups** (Grupos):

```typescript
// src/types/Groups.ts
export interface Groups {
  id: number
  nombre: string
  descripcion: string
  idUsuario: string
}
```

**IGroupsStudent** (Relación Grupo-Alumno - Tabla Pivote):

```typescript
// src/types/GroupsStudent.ts
export interface IGroupsStudent {
  id: number
  nombre: string
  descripcion: string
  idGrupo: number // FK a Groups
  idAlumno: number // FK a Students
}
```

**IGroupsSubjects** (Relación Grupo-Materia - Tabla Pivote):

```typescript
// src/types/GroupsSubjects.ts
export interface IGroupsSubjects {
  Id: number
  IdGrupo: number // FK a Groups
  IdMateria: number // FK a Subjects
}
```

### Relaciones

```
Groups (1) ----< (M) IGroupsStudent (M) >---- Students
Groups (1) ----< (M) IGroupsSubjects (M) >---- Subjects
```

---

## 2. COMPONENTES/VISTAS QUE MUESTRAN DETALLES DE GRUPOS

### A. Vista Principal de Grupos

- **Archivo**: [src/views/crud/GroupsView.vue](src/views/crud/GroupsView.vue)
- **Componente**: Wrapper simple que renderiza `GroupsList`

### B. Lista de Grupos

- **Archivo**: [src/components/crud/GroupsComponents/GroupsList.vue](src/components/crud/GroupsComponents/GroupsList.vue)
- **Funcionalidad**:
  - Muestra tabla de grupos
  - Permite crear, editar, eliminar grupos
  - Utiliza props desde `TableColumns.ts`
  - Usa `useGroupsStore` (Pinia)

### C. Vista Detalle: Gestión de Estudiantes en Grupo

- **Archivo**: [src/views/others/pruebas.vue](src/views/others/pruebas.vue)
- **Ruta**: `/groupStudents/:id` (nombre: "Grupo Alumno")
- **Funcionalidad**:
  - Muestra estudiantes DISPONIBLES (sin grupo)
  - Muestra estudiantes INSCRITOS (con grupo)
  - Permite añadir/quitar estudiantes del grupo
  - DataTables con selección múltiple
  - Información: nombreCompleto, email, matricula

### D. Vista Detalle: Gestión de Materias en Grupo

- **Archivo**: [src/views/others/GroupsSubjects.vue](src/views/others/GroupsSubjects.vue)
- **Ruta**: `/groupSubjects/:id` (nombre: "Grupos Materias")
- **Funcionalidad**:
  - Muestra materias DISPONIBLES (sin grupo)
  - Muestra materias AGREGADAS (con grupo)
  - Permite añadir/quitar materias del grupo
  - DataTables con selección múltiple
  - Información: nombre, descripcion

### E. Vista Calificaciones

- **Archivo**: [src/views/others/calificacion.vue](src/views/others/calificacion.vue)
- **Ruta**: `/groupCalifications/:id`
- **Funcionalidad**:
  - Carga estudiantes y materias del grupo
  - También carga unidades de cada materia
  - Para gestionar calificaciones

---

## 3. API ENDPOINTS/SERVICIOS

### A. Servicio: GroupsStudentServices

**Archivo**: [src/api/services/GroupsStudentServices.ts](src/api/services/GroupsStudentServices.ts)

#### Funciones Disponibles:

| Función                                 | Método HTTP | Endpoint                                   | Descripción                                         |
| --------------------------------------- | ----------- | ------------------------------------------ | --------------------------------------------------- |
| `GetGroupsStudent()`                    | GET         | `/GruposAlumnos`                           | Obtiene todas relaciones grupo-alumno               |
| `PostGroupsStudent()`                   | POST        | `/GruposAlumnos`                           | Crea nueva relación                                 |
| `GetGroupStudent(id)`                   | GET         | `/GruposAlumnos/{id}`                      | Obtiene relación específica                         |
| `PutGroupStudent()`                     | PUT         | `/GruposAlumnos/{id}`                      | Actualiza relación                                  |
| `DeleteGroupsStudent(id, IdStudents[])` | DELETE      | `/GruposAlumnos/DeleteAlumnosEnGrupo/{id}` | Elimina alumnos de grupo                            |
| **`GetAlumnoSinGrupo()`**               | GET         | `/GruposAlumnos/GetAlumnosSinGrupo`        | **Obtiene estudiantes SIN grupo** ✅                |
| **`GetAlumnoConGrupo(id)`**             | GET         | `/GruposAlumnos/GetAlumnosConGrupo/{id}`   | **Obtiene estudiantes CON grupo (por grupo_id)** ✅ |
| `PostAlumnosaGrupo(id, idAlumnos[])`    | POST        | `/GruposAlumnos/PostAlumnosaGrupo/{id}`    | Asigna alumnos a grupo                              |

### B. Servicio: GroupsSubjectsServices

**Archivo**: [src/api/services/GroupsSubjectsServices.ts](src/api/services/GroupsSubjectsServices.ts)

#### Funciones Disponibles:

| Función                                 | Método HTTP | Endpoint                                 | Descripción                                      |
| --------------------------------------- | ----------- | ---------------------------------------- | ------------------------------------------------ |
| `GetGroupsSubjects()`                   | GET         | `/MateriaGrupo`                          | Obtiene todas relaciones                         |
| `PostGroupsSubjects()`                  | POST        | `/MateriaGrupo`                          | Crea nueva relación                              |
| `GetGroupSubjects(id)`                  | GET         | `/MateriaGrupo/{id}`                     | Obtiene relación específica                      |
| `PutGroupSubjects()`                    | PUT         | `/MateriaGrupo/{id}`                     | Actualiza relación                               |
| `DeleteGroupsSubjects(id)`              | DELETE      | `/MateriaGrupo/{id}`                     | Elimina relación                                 |
| **`GetMateriasConGrupos(id)`**          | GET         | `/MateriaGrupo/GetMateriaDeGrupo/{id}`   | **Obtiene materias CON grupo (por grupo_id)** ✅ |
| **`GetMateriasSinGrupo(id)`**           | GET         | `/MateriaGrupo/GetMateriaNoEnGrupo/{id}` | **Obtiene materias SIN grupo (por grupo_id)** ✅ |
| `PostMateriasaGrupos(id, IdMaterias[])` | POST        | `/MateriaGrupo/PostMateriaAGrupo/{id}`   | Asigna materias a grupo                          |
| `DeleteGroupsSubject(id, IdMaterias[])` | DELETE      | -                                        | Elimina materias de grupo                        |

### C. Servicio: UnitService

**Archivo**: [src/api/services/unitService.ts](src/api/services/unitService.ts)

- **`GetUnidadesDeGrupo(id)`** ✅ - Obtiene unidades de un grupo
- **Endpoint**: `/GetUnidadesDeGrupo/{id}`

---

## 4. PINIA STORES

### A. GroupsStudentStore

**Archivo**: [src/stores/GroupsStudentStore.ts](src/stores/GroupsStudentStore.ts)

```typescript
export const useGroupsStudentStore = defineStore('GroupsStudent', () => {
  // Estado
  const groupsStudentList = ref<IGroupsStudent[]>([])
  const groupStudent = ref<IGroupsStudent>({})

  // Funciones
  GetStoreGroupsStudent() // Obtiene todas relaciones
  PostStoreGroupsStudent(groupStudent) // Crea relación
  GetStoreGroupStudent(id) // Obtiene por ID
  PutStoreGroupStudent(groupStudent) // Actualiza
  DeleteStoreGroupsStudent(id, idStudents) // Elimina
  GetStoreGroupsStudentsWhithoutGroup() // 📌 Sin grupo
  GetStoreGroupsStudentsWhithGroup(id) // 📌 Con grupo (por grupo_id)
  PostStoreAlumnosaGrupo(id, idAlumnos) // Asigna alumnos
})
```

### B. GroupsSubjectsStore

**Archivo**: [src/stores/GroupsSubjectsStore.ts](src/stores/GroupsSubjectsStore.ts)

```typescript
export const useGroupsSubjectStore = defineStore('GroupsSubjects', () => {
  // Estado
  const groupsSubjectsList = ref<IGroupsSubjects[]>([])
  const groupsSubjects = ref<IGroupsSubjects>({})

  // Funciones
  GetStoreGroupSubjects() // Obtiene todas relaciones
  PostStoreGroupsSubjects(groupsSubjects) // Crea relación
  GetStoreGroupSubject(id) // Obtiene por ID
  PutStoreGroupsSubjects(groupsSubjects) // Actualiza
  DeleteStoreGroupsSubjects(id, IdMateria) // Elimina
  GetStoreGroupsSubjectsWithoutGroup(id) // 📌 Sin grupo (por grupo_id)
  GetStoreGroupsSubjectsWithGroup(id) // 📌 Con grupo (por grupo_id)
  PostStoreMateriasaGrupo(id, IdMaterias) // Asigna materias
})
```

### C. GroupsStore

**Archivo**: [src/stores/GroupsStore.ts](src/stores/GroupsStore.ts)

```typescript
export const useGroupsStore = defineStore('Groups', () => {
  GetStoreGroups() // Obtiene todos grupos
  GetStoreGroup(id) // Obtiene grupo por ID
  PostStoreGroup() // Crea grupo
  PutStoreGroup() // Actualiza grupo
  DeleteStoreGroup(id) // Elimina grupo
})
```

---

## 5. FLUJO DE DATOS - EJEMPLO (Pruebas.vue)

```
pruebas.vue (Gestión Estudiantes)
│
├─ onMounted()
│  ├─ fetchGroup(groupId)
│  │  └─ GetGroup(id) → groups.value
│  │
│  └─ fetchStudents(groupId)
│     ├─ GetStoreGroupsStudentsWhithoutGroup()
│     │  └─ GetAlumnoSinGrupo()
│     │     └─ API: GET /GruposAlumnos/GetAlumnosSinGrupo
│     │        → availableStudentsList
│     │
│     └─ GetStoreGroupsStudentsWhithGroup(groupId)
│        └─ GetAlumnoConGrupo(groupId)
│           └─ API: GET /GruposAlumnos/GetAlumnosConGrupo/{groupId}
│              → enrolledStudentsList
│
├─ addToGroup()
│  └─ PostStoreAlumnosaGrupo(groupId, selectedIds[])
│     └─ API: POST /GruposAlumnos/PostAlumnosaGrupo/{groupId}
│
└─ removeFromGroup()
   └─ DeleteStoreGroupsStudent(groupId, selectedIds[])
      └─ API: DELETE /GruposAlumnos/DeleteAlumnosEnGrupo/{groupId}
```

---

## 6. FLUJO DE DATOS - EJEMPLO (GroupsSubjects.vue)

```
GroupsSubjects.vue (Gestión Materias)
│
├─ onMounted()
│  ├─ fetchGroup(groupId)
│  │  └─ GetGroup(id) → group.value
│  │
│  └─ fetchSubjects(groupId)
│     ├─ GetStoreGroupsSubjectsWithoutGroup(groupId)
│     │  └─ GetMateriasSinGrupo(groupId)
│     │     └─ API: GET /MateriaGrupo/GetMateriaNoEnGrupo/{groupId}
│     │        → availableSubjectsList
│     │
│     └─ GetStoreGroupsSubjectsWithGroup(groupId)
│        └─ GetMateriasConGrupos(groupId)
│           └─ API: GET /MateriaGrupo/GetMateriaDeGrupo/{groupId}
│              → enrolledSubjectsList
│
├─ addToGroup()
│  └─ PostStoreMateriasaGrupo(groupId, selectedIds[])
│     └─ API: POST /MateriaGrupo/PostMateriaAGrupo/{groupId}
│
└─ removeFromGroup()
   └─ DeleteStoreGroupsSubjects(groupId, selectedIds[])
      └─ API: DELETE /MateriaGrupo/{groupId}
```

---

## 7. RESUMEN - ENDPOINTS ENCONTRADOS ✅

### Coinciden con búsqueda:

- ✅ **GetAlumnosConGrupo** → `GetAlumnoConGrupo(id)` en GroupsStudentServices
- ✅ **GetMateriasConGrupos** → `GetMateriasConGrupos(id)` en GroupsSubjectsServices
- ✅ **GetUnidadesDeGrupo** → En unitService.ts (para obtener unidades)

### Endpoints Equivalentes Encontrados:

- 📌 `GetAlumnosSinGrupo` - Estudiantes sin grupo
- 📌 `GetMateriaNoEnGrupo` - Materias sin grupo
- 📌 `PostAlumnosaGrupo` - Asignar estudiantes
- 📌 `PostMateriaAGrupo` - Asignar materias
- 📌 `DeleteAlumnosEnGrupo` - Desasignar estudiantes

---

## 8. RUTAS EN EL ROUTER

**Archivo**: [src/router/index.ts](src/router/index.ts)

| Ruta                      | Nombre                | Componente         | Roles                                |
| ------------------------- | --------------------- | ------------------ | ------------------------------------ |
| `/groups`                 | Grupos                | GroupsView.vue     | ADMIN, SERVICIOS ESCOLARES, PROFESOR |
| `/groupStudents/:id`      | Grupo Alumno          | pruebas.vue        | ADMIN, SERVICIOS ESCOLARES           |
| `/groupSubjects/:id`      | Grupos Materias       | GroupsSubjects.vue | ADMIN, SERVICIOS ESCOLARES           |
| `/groupCalifications/:id` | Grupos Calificaciones | calificacion.vue   | -                                    |

---

## 9. HELPERS RELACIONADOS

**Archivo**: [src/utils/helpers.ts](src/utils/helpers.ts)

```typescript
export const GetGroup = async (id: number) => {
  const groupStore = useGroupsStore()
  return await groupStore.GetStoreGroup(id)
}

export const GetGroups = async () => {
  const groupStore = useGroupsStore()
  return await groupStore.GetStoreGroups()
}
```

---

## CONCLUSIÓN

La aplicación usa una arquitectura de **tablas pivote** (junction tables):

- `IGroupsStudent` → Vincula Groups con Students
- `IGroupsSubjects` → Vincula Groups con Subjects

Todos los datos se gestionan a través de **Pinia Stores** que llaman a servicios API, con soporte para **mocks** en desarrollo. Las vistas permiten gestionar estas relaciones de forma intuitiva con tablas de arrastrar y soltar (DataTables de PrimeVue).
