
"use client";

import { KpiCard } from "@/components/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench, CalendarCheck, CheckCircle, Users, ArrowRight } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart, PieChart, Pie, Cell, Tooltip } from "recharts";
import { workOrders, calendarEvents } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { es } from 'date-fns/locale';

// --- Datos Simulados para el Dashboard ---

// Gráfico de Actividad Semanal
const weeklyActivityData = [
  { day: "Lun", created: 4, completed: 2 },
  { day: "Mar", created: 3, completed: 5 },
  { day: "Mié", created: 6, completed: 4 },
  { day: "Jue", created: 5, completed: 5 },
  { day: "Vie", created: 7, completed: 6 },
  { day: "Sáb", created: 2, completed: 3 },
];
const chartConfigActivity = {
  created: { label: "Creadas", color: "hsl(var(--chart-2))" },
  completed: { label: "Completadas", color: "hsl(var(--chart-1))" }
};

// Gráfico de Estado de Órdenes de Trabajo (OTs)
const workOrderStatusData = [
  { name: 'Recibido', value: workOrders.filter(wo => wo.status === 'Recibido').length, fill: "hsl(var(--muted-foreground))" },
  { name: 'En Reparación', value: workOrders.filter(wo => wo.status === 'En Reparación').length, fill: "hsl(var(--chart-2))" },
  { name: 'Esperando Repuestos', value: workOrders.filter(wo => wo.status === 'Esperando Repuestos').length, fill: "hsl(var(--destructive))" },
  { name: 'Completado', value: workOrders.filter(wo => wo.status === 'Completado').length, fill: "hsl(var(--chart-1))" },
];


export default function DashboardPage() {
    
  const recentWorkOrders = workOrders
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 5);
  const todayAppointments = calendarEvents.filter(event => isToday(new Date(event.start)));

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Panel de Control</h1>
      </div>
      
      {/* --- Fila de KPIs --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
            title="Órdenes Activas" 
            value={workOrders.filter(wo => wo.status === 'En Reparación' || wo.status === 'Esperando Repuestos').length.toString()} 
            description="En progreso o esperando repuestos" 
            icon={Wrench}
            href="/dashboard/work-orders"
        />
        <KpiCard 
            title="Citas para Hoy" 
            value={todayAppointments.length.toString()} 
            description="Agendado en el calendario" 
            icon={CalendarCheck}
            href="/dashboard/calendar"
        />
        <KpiCard 
            title="OTs para Entrega" 
            value={workOrders.filter(wo => wo.status === 'Completado').length.toString()} 
            description="Listas para ser retiradas" 
            icon={CheckCircle} 
            href="/dashboard/work-orders"
        />
        <KpiCard 
            title="Nuevos Clientes (Mes)" 
            value="+23" 
            description="+180.1% vs mes anterior" 
            icon={Users}
            href="/dashboard/clients"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Columna Principal (Gráficos) --- */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Actividad de la Semana</CardTitle>
                <CardDescription>Órdenes de trabajo creadas vs. completadas en los últimos días.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfigActivity} className="h-64 w-full">
                        <RechartsBarChart data={weeklyActivityData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="created" fill="var(--color-created)" radius={4} name="Creadas" />
                        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} name="Completadas" />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Órdenes de Trabajo Recientes</CardTitle>
                    <CardDescription>
                    Un vistazo rápido a los últimos trabajos ingresados al taller.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>OT</TableHead>
                        <TableHead>Vehículo</TableHead>
                        <TableHead>Servicio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentWorkOrders.map((wo) => (
                        <TableRow key={wo.id}>
                            <TableCell className="font-medium">{wo.id}</TableCell>
                            <TableCell>{wo.vehicleId}</TableCell>
                            <TableCell>{wo.service}</TableCell>
                            <TableCell>
                            <Badge variant={getStatusVariant(wo.status)}>{wo.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/dashboard/work-orders/${wo.id}`}>Ver</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
        {/* --- Columna Secundaria --- */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Estado Actual de OTs</CardTitle>
                <CardDescription>Distribución de todos los trabajos activos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                                <Pie data={workOrderStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} stroke="hsl(var(--border))">
                                    {workOrderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <ChartLegend content={<ChartLegendContent layout="vertical" align="right" verticalAlign="middle" />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Agenda para Hoy</CardTitle>
                    <CardDescription>{format(new Date(), "eeee, dd 'de' MMMM", { locale: es })}</CardDescription>
                </CardHeader>
                <CardContent>
                    {todayAppointments.length > 0 ? (
                        <ul className="space-y-3">
                            {todayAppointments.map(event => (
                                <li key={event.id} className="flex items-center justify-between text-sm">
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-muted-foreground">{event.vehicle}</p>
                                    </div>
                                    <Badge variant="outline">
                                        {format(new Date(event.start), "HH:mm")}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No hay citas programadas para hoy.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
