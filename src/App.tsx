// import './App.css';
import { Button } from './components/ui/button';
import { Home01Icon } from 'hugeicons-react';
import { Skeleton } from './components/ui/skeleton';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useParams,
} from 'react-router-dom';


import Dashboard from './pages/dashboard/dashboard';

import MyUpload from './pages/documents/my-upload';
import AddStudyMaterial from './pages/documents/add-study-material';

import { useEffect, useMemo } from 'react';
import FileDetailsPage from './pages/documents/details-page';
import { Home } from 'lucide-react';

const router = createBrowserRouter([
  // element: <DefaultLayout />,
  {
    id: 'root',
    path: '/',
    Component: Home,
    children: [
      { index: true, path: '/dashboard', Component: Home },
      {
        path: 'upload',
        // Component: MyUpload,
        children: [
          { index: true, Component: MyUpload },
          {
            path: 'view/:id',
            Component: FileDetailsPage,
          },

          { path: 'add-study-material', Component: AddStudyMaterial },
         
        ],
      },
      {
        path: 'sign',
        // Component: MyUpload,
        children: [
          { index: true, Component: AddStudyMaterial },
          {
            path: 'view/:id',
            Component: FileDetailsPage,
          },

          { path: 'add-study-material', Component: AddStudyMaterial },
          
        ],
      },

      // { path: 'home', element: <Home /> },
      // { path: '/', element: <Navigate to="/dashboard/home" /> },
    ],
  },
  
]);

function App() {
  const memoisedRouter = useMemo(() => router, []);

  return <RouterProvider router={memoisedRouter} />;
}

export default App;
