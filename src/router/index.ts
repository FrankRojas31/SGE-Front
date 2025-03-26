import { createRouter, createWebHistory } from 'vue-router'

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
        icon: 'pi pi-chart-pie'
      }
    },
    {
      path: '/persons',
      name: 'Personas',
      component: () => import('@/views/crud/PersonsView.vue'),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-user'
      }
    },
    {
      path: '/teachers',
      name: 'Profesores',
      component: () => import("@/views/crud/TeachersView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-users'
      }
    },
    {
      path: '/students',
      name: 'Estudiantes',
      component: () => import("@/views/crud/StudentView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-users'
      }
    },
    {
      path: '/periods',
      name: 'Periodos',
      component: () => import("@/views/crud/PeriodsView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-calendar-clock'
      }
    },
        {
      path: '/subjects',
      name: 'Materias',
      component: () => import("@/views/crud/SubjectView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-book'
      }
    },
    {
      path: '/groups',
      name: 'Grupos',
      component: () => import("@/views/crud/GroupsView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-sitemap'
      }
    },
    {
      path: '/courses',
      name: 'Cursos',
      component: () => import("@/views/crud/CoursesView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: true,
        icon: 'pi pi-th-large'
      }
    },

    // Rutas Hijas con Parametros.
    {
      path: '/groupStudents/:id',
      name: 'Grupo Alumno',
      component: () => import("@/views/others/pruebas.vue")
    },
    {
      path: '/subjectsunits/:id',
      name: 'a',
      component: () => import("@/components/crud/SubjectComponents/UnitsView.vue"),
      meta: {
        requiresAuth: false,
        MenuOnly: false,
      }
    },
    {
      path: '/groupSubjects/:id',
      name: 'Grupos Materias',
      component: () => import("@/views/others/pruebas.vue"),
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   const verifyAuth = true; // Check if user is authenticated
//   const publicRoutes = ['/login', '/register', '/NotFound'];
//   const requiresAuth = !publicRoutes.includes(to.path);
//   const isFirstLoad = from.name === null; // More reliable way to detect first load

//   // Handle first page load scenario
//   if (isFirstLoad && to.path === '/') {
//     return next(verifyAuth ? '/dashboard' : '/login');
//   }

//   // Redirect unauthorized users trying to access protected routes
//   if (requiresAuth && !verifyAuth) {
//     return next('/login'); // Is a Example of the Login.
//   }

//   // Prevent authenticated users from accessing login/register pages
//   if (verifyAuth && (to.name === 'login' || to.name === 'register')) {
//     return next('/dashboard'); // Is a Example of the Dashboard
//   }

//   // Allow normal navigation if none of the above conditions were met
//   next();
// });


export default router
