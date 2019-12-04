export default [
  {
    path: '/',
    component: '../layouts/',
    routes: [
      { path: '/', redirect: '/index' },
      { path: '/index', component: './index' },
      {
        path: '/user',
        component: './User/LoginLayout',
        routes: [
          { path: '/user/login', component: './User/Login' },
          { path: '/user/register', component: './User/Register' },
        ]
      },
    ]
  }
]