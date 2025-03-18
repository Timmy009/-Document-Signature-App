import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from './pages/dashboard/dashboard';
import Home from './pages/dashboard';
import MyUpload from './pages/documents/my-upload';
import AddStudyMaterial from './pages/documents/add-study-material';
import { AuthProvider } from './context/auth-provider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from './components/ui/sonner';
import AppendSignaturePage from './pages/signature/append-signature';

import FileDetailsPage from './pages/documents/details-page';

import ProfilePage from './pages/profile';
import AddSignature from './pages/signature/add-document';
import SignaturePage from './pages/signature/signature-page';
import { ThemeProvider } from './../ThemeProvider'

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    // element: <DefaultLayout />,
    {
      id: 'root',
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, path: '/dashboard', element: <Home /> },
        { index: true, path: '/profile', element: <ProfilePage /> },
        {
          path: 'upload',
          // element: MyUpload,
          children: [
            { index: true, element: <MyUpload /> },

            { path: 'add-study-material', element: <AddStudyMaterial /> },
            
            { path: 'view/:id', element: <FileDetailsPage /> },
           
          ],
        },
        {
          path: 'sign',
          // element: MyUpload,
          children: [
            { index: true, element: <AddStudyMaterial />  },

            { path: 'signature', element: <SignaturePage /> },
            
            { path: 'signed', element: <AppendSignaturePage /> },
           
          ],
        },

        // { path: 'home', element: <Home /> },
        // { path: '/', element: <Navigate to="/dashboard/home" /> },
      ],
    },
   
    
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <DndProvider backend={HTML5Backend}>
      {/* TODO: move sidebar provider back to dashboard */}
      <AuthProvider>
      <ThemeProvider> 
        <Toaster />
        <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </DndProvider>
  </QueryClientProvider>
  // </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
