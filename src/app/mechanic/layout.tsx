
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Home,
  Wrench,
  Calendar,
  LogOut,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LOGGED_IN_MECHANIC = 'Ricardo Milos';

function MechanicSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-sidebar-primary flex items-center justify-center rounded-lg">
             <Flame className="text-sidebar-primary-foreground" />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-sidebar-foreground">
              Portal Mecánico
            </h2>
            <p className="text-sm text-sidebar-foreground/70">LionFix</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/mechanic/dashboard" passHref>
              <SidebarMenuButton
                isActive={isActive("/mechanic/dashboard")}
                tooltip="Mis Tareas"
              >
                <Wrench />
                <span>Mis Tareas</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/mechanic/dashboard" passHref>
               <SidebarMenuButton
                isActive={false}
                tooltip="Calendario"
              >
                <Calendar />
                <span>Calendario</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Perfil">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Mecánico" />
                    <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-sidebar-foreground">{LOGGED_IN_MECHANIC}</span>
                    <span className="text-xs text-sidebar-foreground/70">Mecánico</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Cerrar Sesión" onClick={handleLogout}>
              <LogOut />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


export default function MechanicPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MechanicSidebar />
      <SidebarInset>
            {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
