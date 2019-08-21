export default [
  {
    path: '/',
    component: '../layouts/',
    routes: [
      { path: '/', redirect: '/index' },
      { path: '/index', component: './index' },
      {
        path: '/login',
        component: './Login/loginLayout',
        routes: [
          { path: '/login', redirect: '/login/signin' },
          { path: '/login/signin', component: './Login/signIn' },
          { path: '/login/signup', component: './Login/signUp' },
        ]
      },

    ]
  }
]