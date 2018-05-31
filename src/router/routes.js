
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '/', component: () => import('pages/login') },
      { path: '/login', component: () => import('pages/login') },
      { path: '/hello', component: () => import('pages/hello')}, // , meta: {
         // requiresAuth: true }},
      { path: '/tag', component: () => import('pages/tag'), meta: {
          requiresAuth: true }},
      { path: '/identification', component: () => import('pages/Identification'),  meta: {
          requiresAuth: true }},
      { path: '/success', component: () => import('pages/success')}, //,  meta: {
          //requiresAuth: true }}
      { path: '/nearbyTrees', component: () => import('pages/nearbyTrees') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
