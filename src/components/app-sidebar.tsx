import { Link, useLocation } from 'react-router-dom';

import { Routes } from '@/router.tsx';
import { Home, ListPlus } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export const AppSidebar = () => {
  const items = [
    {
      title: 'Home',
      to: Routes.HOME,
      icon: Home,
    },
    {
      title: 'New Todo',
      to: Routes.TODO,
      icon: ListPlus,
    },
  ];

  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const onCloseSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ToDo List</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.to}>
                    <SidebarMenuButton isActive={pathname === item.to} onClick={onCloseSidebar}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-start justify-center">
        <SidebarTrigger />
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};
