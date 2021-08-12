
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/usuarios', component: () => import('pages/Usuarios.vue') },
      { path: '/docentes', component: () => import('pages/Docentes.vue') },
      { path: '/cursos', component: () => import('pages/Cursos.vue') },
      { path: '/horarios', component: () => import('pages/Horarios.vue') },
      { path: '/tableros/:id', component: () => import('pages/Tableros.vue'), props: route => ({ query: route.query.q }) },
      { path: '/silabus', component: () => import('pages/Silabus.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/ayuda', component: () => import('pages/Ayuda.vue') },
 
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/docente/agregar', component: () => import('pages/Docente/AddDocente.vue') },
  { path: '/curso/agregar', component: () => import('pages/Curso/AddCurso.vue') },
  { path: '/horario/agregar', component: () => import('pages/Horario/AddHorario.vue') },
  { path: '/cursos/:id', component: () => import('pages/Curso/DetailCurso.vue'), name:'detalleCurso',props: route => ({ query: route.query.q }) },
  { path: '/silabus/agregar', component: () => import('pages/Silabus/AddSilabus.vue') },
  { path: '/:catchAll(.*)*', component: () => import('pages/Error404.vue') }
  
]

export default routes
