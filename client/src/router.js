import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/new',
          name: 'new-repo',
          component: () => import(/* webpackChunkName: "form" */ './views/RepoForm.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/auth') {
    if (from.fullPath === '/login') {
      next();
    } else {
      alertify.error('Forbidden');
      next('/');
    }
  }
  if (to.fullPath === '/login' || to.fullPath === '/auth') {
    if (localStorage.getItem('token')) {
      alertify.error("You've already logged in");
      next('/');
    } else {
      next();
    }
  } else if (!localStorage.getItem('token') && to.fullPath === '/') {
    alertify.error('Please login first');
    next('/login');
  } else {
    next();
  }
});

export default router;
