import React from 'react';

const routes = [
  {
    path: '/',
    component: React.lazy(() => import('../pages/home/Home')),
    exact: true
  },
  {
    path: '/demo',
    component: React.lazy(() => import('../pages/demo/Demo')),
    exact: true
  },
  {
    path: '/demo2',
    component: React.lazy(() => import('../pages/demo2/Demo')),
    exact: true
  },
  {
    path: '/demo3',
    component: React.lazy(() => import('../pages/demo3/Demo')),
    exact: true
  },
  {
    path: '/demo4',
    component: React.lazy(() => import('../pages/demo4/Demo')),
    exact: true
  },
];

export default routes;
