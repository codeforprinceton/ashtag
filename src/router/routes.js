
export default [
  {
    path: '/',
    component: () => import('layouts/Default'),
    children: [
      { path: '/', component: () => import('pages/Login') },
      { path: '/login', component: () => import('pages/Login') },
      { path: '/hello', component: () => import('pages/Hello'), meta: {
          requiresAuth: true }},
      { path: '/tag', component: () => import('pages/Tag'), meta: {
          requiresAuth: true }},
      { path: '/identification', component: () => import('pages/Identification'),  meta: {
          requiresAuth: true }},
      { path: '/istree', component: () => import('pages/IsTree'),  meta: {
          requiresAuth: true }},
      { path: '/leaderboard', component: () => import('pages/Leaderboard'),  meta: {
          requiresAuth: true }},
      { path: '/profile', component: () => import('pages/Profile'),  meta: {
          requiresAuth: true }},
      { path: '/success', component: () => import('pages/Success'),  meta: {
          requiresAuth: true }},
      { path: '/nearbyTrees', component: () => import('pages/NearbyTrees') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
