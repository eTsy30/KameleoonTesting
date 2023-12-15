import { Finalize } from '@pages/Finalize/Finalize'
import { Layout } from '@pages/Layout/Layout'
import { Main } from '@pages/Main/Main'
import { Results } from '@pages/Results/Results'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: 'results/:idTask', index: true, element: <Results /> },
      { path: 'finalize/:idTask', index: true, element: <Finalize /> },

      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
