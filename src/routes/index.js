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
];

export default routes;
