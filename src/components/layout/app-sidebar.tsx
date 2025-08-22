
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Home,
  Wrench,
  Calendar,
  Send,
  Settings,
  UserCircle,
  Car,
  ClipboardCheck,
  ShieldCheck,
  Users,
  Package,
  LineChart,
  FileDigit,
  BarChart,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
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
              LionFix
            </h2>
            <p className="text-sm text-sidebar-foreground/70">Cloud ERP</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" passHref>
              <SidebarMenuButton
                isActive={pathname === "/dashboard"}
                tooltip="Panel de Control"
              >
                <Home />
                <span>Panel de Control</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/work-orders" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/work-orders")}
                tooltip="Órdenes de Trabajo"
              >
                <Wrench />
                <span>Órdenes de Trabajo</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/calendar" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/calendar")}
                tooltip="Calendario"
              >
                <Calendar />
                <span>Calendario</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/dashboard/clients" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/clients")}
                tooltip="Clientes"
              >
                <Users />
                <span>Clientes</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/dashboard/inventory" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/inventory")}
                tooltip="Inventario"
              >
                <Package />
                <span>Inventario</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FileDigit />
              <span>Finanzas</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
               <SidebarMenuSubItem>
                 <Link href="/dashboard/finance/quotes" passHref>
                  <SidebarMenuSubButton isActive={isActive("/dashboard/finance/quotes")}>Cotizaciones</SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                 <Link href="/dashboard/finance/reports" passHref>
                  <SidebarMenuSubButton isActive={isActive("/dashboard/finance/reports")}>Reportes y KPIs</SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <ClipboardCheck />
              <span>Gestión y Comms</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                 <Link href="/dashboard/management/checklists" passHref>
                  <SidebarMenuSubButton isActive={isActive("/dashboard/management/checklists")}>Checklists</SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
               <SidebarMenuSubItem>
                <Link href="/dashboard/management/iso9001" passHref>
                  <SidebarMenuSubButton isActive={isActive("/dashboard/management/iso9001")}>Norma ISO 9001</SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <Link href="/dashboard/reminders" passHref>
                  <SidebarMenuSubButton isActive={isActive("/dashboard/reminders")}>Recordatorios IA</SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Ajustes">
              <Settings />
              <span>Ajustes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Perfil">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Usuario" />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-sidebar-foreground">Juan Pérez</span>
                    <span className="text-xs text-sidebar-foreground/70">Admin</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
