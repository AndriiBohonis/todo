import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/core/contexts/theme-provider.tsx';
import Router from '@/router.tsx';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
};

export default App;
