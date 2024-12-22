import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { RootLayer } from '@/components/root-layer.tsx';
import { HomePage } from '@/pages/home.page.tsx';
import { NewTodoPage } from '@/pages/new-todo.page.tsx';

export enum Routes {
  HOME = '/',
  TODO = 'todo',
  VIEW_TODO = 'todo/:id',
}

const routes: RouteObject[] = [
  {
    path: Routes.HOME,
    element: <RootLayer />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: Routes.TODO,
        element: <NewTodoPage />,
      },
      {
        path: Routes.VIEW_TODO,
        element: <NewTodoPage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
