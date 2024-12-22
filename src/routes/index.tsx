import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { lazy } from 'react';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Kubernetes = lazy(() => import('@/pages/tools/Kubernetes'));
const Jenkins = lazy(() => import('@/pages/tools/Jenkins'));
const GitHub = lazy(() => import('@/pages/tools/GitHub'));
const Prometheus = lazy(() => import('@/pages/tools/Prometheus'));
const Settings = lazy(() => import('@/pages/Settings'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'kubernetes/*',
        element: <Kubernetes />,
      },
      {
        path: 'jenkins/*',
        element: <Jenkins />,
      },
      {
        path: 'github/*',
        element: <GitHub />,
      },
      {
        path: 'prometheus/*',
        element: <Prometheus />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);