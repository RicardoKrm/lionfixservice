"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Wrench,
  Calendar,
  Send,
  Settings,
  UserCircle,
  Car,
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
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 bg-primary flex items-center justify-center">
            <Car className="h-6 w-6 text-primary-foreground" />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              LionFix
            </h2>
            <p className="text-xs text-sidebar-foreground/70">Cloud ERP</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" passHref>
              <SidebarMenuButton
                isActive={pathname === "/dashboard"}
                tooltip="Dashboard"
              >
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/work-orders" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/work-orders")}
                tooltip="Work Orders"
              >
                <Wrench />
                <span>Work Orders</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/calendar" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/calendar")}
                tooltip="Calendar"
              >
                <Calendar />
                <span>Calendar</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/dashboard/reminders" passHref>
              <SidebarMenuButton
                isActive={isActive("/dashboard/reminders")}
                tooltip="Reminders"
              >
                <Send />
                <span>Maintenance Reminders</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile">
              <UserCircle />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
