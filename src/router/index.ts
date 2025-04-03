import { useAuthStore } from '@/stores/auth/AuthStore';
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import("@/views/landing/LandingView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/auth/LoginView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/auth/RegisterView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
    {
      path: '/password',
      name: 'password',
      component: () => import("@/views/auth/PasswordView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
    {
      path: '/profil',
      name: 'perfil',
      component: () => import("@/views/ProfilView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
     {
      path: '/:patchMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFoundView.vue'),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      },
    },

    //Rutas del Navbars
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/IndexView.vue'),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-chart-pie',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/courses',
      name: 'Cursos',
      component: () => import("@/views/crud/CoursesView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-th-large',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/persons',
      name: 'Personas',
      component: () => import('@/views/crud/PersonsView.vue'),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-user',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/students',
      name: 'Estudiantes',
      component: () => import("@/views/crud/StudentView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-users',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/periods',
      name: 'Periodos',
      component: () => import("@/views/crud/PeriodsView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-calendar-clock',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
        {
      path: '/subjects',
      name: 'Materias',
      component: () => import("@/views/crud/SubjectView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-book',
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/groups',
      name: 'Grupos',
      component: () => import("@/views/crud/GroupsView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: true,
        icon: 'pi pi-sitemap',
        roles: ["ADMIN", "SERVICIOS ESCOLARES", "PROFESOR"]
      }
    },

    // Rutas Hijas con Parametros.
    {
      path: '/groupStudents/:id',
      name: 'Grupo Alumno',
      component: () => import("@/views/others/pruebas.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: false,
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/subjectsunits/:id',
      name: 'a',
      component: () => import("@/components/crud/SubjectComponents/UnitsView.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: false,
        roles: ["ADMIN", "SERVICIOS ESCOLARES", "PROFESOR"]
      }
    },
    {
      path: '/groupSubjects/:id',
      name: 'Grupos Materias',
      component: () => import("@/views/others/GroupsSubjects.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: false,
        roles: ["ADMIN", "SERVICIOS ESCOLARES"]
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import("@/views/others/TestView.vue"),
    },
    {
      path: '/groupCalifications/:id',
      name: 'Grupos Calificaciones',
      component: () => import("@/views/others/calificacion.vue"),
      meta: {
        requiresAuth: true,
        MenuOnly: false,
        roles: ["ADMIN", "SERVICIOS ESCOLARES", "PROFESOR"]
      }
    }
  ],
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore();
  const verifyAuth = authStore.isAuthenticated();
  const publicRoutes = ['/', '/login', '/register', '/NotFound'];
  const requiresAuth = !publicRoutes.includes(to.path);
  const isFirstLoad = from.name === null;
  const userRole = authStore.auth.role;

  if (isFirstLoad && to.path === '/') {
    return next(verifyAuth ? '/dashboard' : '/login');
  }

  if (requiresAuth && !verifyAuth) {
    return next('/login');
  }

  if (verifyAuth && (to.name === 'login' || to.name === 'register')) {
    if(userRole === 'ADMIN' || userRole === 'SERVICIOS ESCOLARES')
      return next('/dashboard');
    else
      return next('/groups');
  }

  if (to.meta.requiresAuth && to.meta.roles) {
    if (!userRole || !to.meta.roles.includes(userRole)) {
      console.log('No tiene permisos para acceder a esta ruta');
      return next('/NotFound');
    }
  }

  next();
});


export default router
