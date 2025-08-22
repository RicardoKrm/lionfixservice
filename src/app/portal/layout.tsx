
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
  Car,
  FileText,
  LogOut,
  ShieldCheck,
  Briefcase,
  History,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clients } from "@/lib/data";

// Simulamos que el cliente logueado es 'C001'
const LOGGED_IN_CLIENT_ID = 'C001';

function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const client = clients.find(c => c.id === LOGGED_IN_CLIENT_ID);

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
             <ShieldCheck className="text-sidebar-primary-foreground" />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-sidebar-foreground">
              Portal Cliente
            </h2>
            <p className="text-sm text-sidebar-foreground/70">LionFix</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/portal/dashboard" passHref>
              <SidebarMenuButton
                isActive={isActive("/portal/dashboard")}
                tooltip="Inicio"
              >
                <Home />
                <span>Inicio</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/portal/vehicles" passHref>
              <SidebarMenuButton
                isActive={isActive("/portal/vehicles")}
                tooltip="Mis Vehículos"
              >
                <Car />
                <span>Mis Vehículos</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/portal/contracts" passHref>
              <SidebarMenuButton
                isActive={isActive("/portal/contracts")}
                tooltip="Mis Contratos"
              >
                <Briefcase />
                <span>Mis Contratos</span>
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
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Usuario" />
                    <AvatarFallback>{client?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-sidebar-foreground">{client?.name}</span>
                    <span className="text-xs text-sidebar-foreground/70">Cliente</span>
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


export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientSidebar />
      <SidebarInset>
            {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
