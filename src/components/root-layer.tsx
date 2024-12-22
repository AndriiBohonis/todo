import { Outlet } from 'react-router-dom';

import { AppSidebar } from '@/components/app-sidebar.tsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';

export const RootLayer = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="absolute left-4 top-4 md:hidden" />
      <main className="flex h-full w-full flex-col px-6">
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  );
};
