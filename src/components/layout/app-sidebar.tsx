
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  Wrench,
  Calendar,
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
  Briefcase,
  BookCheck,
  ChevronDown,
  FileText,
  Send,
  History,
  HardHat,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Para las rutas con sub-rutas dinámicas como /contracts/[id],
    // queremos que el item principal se mantenga activo.
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
             <span className="px-2 text-xs font-medium text-sidebar-foreground/70">VISTA ADMINISTRADOR</span>
          </SidebarMenuItem>
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
            <Link href="/dashboard/finance/quotes" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/finance/quotes")}
                tooltip="Cotizaciones"
              >
                <FileDigit />
                <span>Cotizaciones</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/dashboard/finance/reports" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/finance/reports")}
                tooltip="Reportes y KPIs"
              >
                <BarChart />
                <span>Reportes y KPIs</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/dashboard/management/checklists" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/management/checklists")}
                tooltip="Checklists"
              >
                <ClipboardCheck />
                <span>Checklists</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/dashboard/management/contracts" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/management/contracts")}
                tooltip="Contratos de Flota"
              >
                <Briefcase />
                <span>Contratos de Flota</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/management/iso9001" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/management/iso9001")}
                tooltip="Norma ISO 9001"
              >
                <ShieldCheck />
                <span>Norma ISO 9001</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/reminders" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/reminders")}
                tooltip="Recordatorios IA"
              >
                <Send />
                <span>Recordatorios IA</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/settings/maintenance-plans" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/settings/maintenance-plans")}
                tooltip="Planes de Mantenimiento"
              >
                <BookCheck />
                <span>Planes de Mantenimiento</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <SidebarSeparator className="my-4"/>

        <SidebarMenu>
             <SidebarMenuItem>
                <span className="px-2 text-xs font-medium text-sidebar-foreground/70">VISTA CLIENTE</span>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/portal/dashboard" passHref>
                <SidebarMenuButton
                    isActive={isActive("/portal/dashboard")}
                    tooltip="Inicio Cliente"
                >
                    <UserCircle />
                    <span>Inicio Cliente</span>
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

        <SidebarSeparator className="my-4"/>

        <SidebarMenu>
            <SidebarMenuItem>
                <span className="px-2 text-xs font-medium text-sidebar-foreground/70">VISTA MECÁNICO</span>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/mechanic/dashboard" passHref>
                <SidebarMenuButton
                    isActive={isActive("/mechanic/dashboard")}
                    tooltip="Mis Tareas"
                >
                    <HardHat />
                    <span>Mis Tareas</span>
                </SidebarMenuButton>
                </Link>
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
