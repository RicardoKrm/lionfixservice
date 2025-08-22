
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Wrench, CalendarCheck, CheckCircle, Users, ArrowRight, FileCheck, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart } from "recharts";
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

const receivedCount = workOrders.filter(wo => wo.status === 'Recibido' || wo.status === 'Esperando Aprobación').length;
const inProgressCount = workOrders.filter(wo => wo.status === 'En Reparación' || wo.status === 'Esperando Repuestos').length;
const completedCount = workOrders.filter(wo => wo.status === 'Completado').length;
const todayAppointments = calendarEvents.filter(event => isToday(new Date(event.start)));
const recentWorkOrders = workOrders
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 5);


export default function DashboardPage() {
    
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Panel de Control</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- Columna Principal --- */}
        <div className="lg:col-span-2 space-y-6">
           {/* --- Resumen de Flujo de Trabajo --- */}
           <Card>
                <CardHeader>
                    <CardTitle>Resumen del Flujo de Trabajo</CardTitle>
                    <CardDescription>Estado actual de las órdenes de trabajo en el taller.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card className="bg-muted/30 p-4">
                        <Clock className="h-8 w-8 mx-auto text-accent"/>
                        <p className="text-3xl font-bold mt-2">{receivedCount}</p>
                        <p className="text-sm text-muted-foreground">Recibidas</p>
                    </Card>
                     <Card className="bg-muted/30 p-4">
                        <Wrench className="h-8 w-8 mx-auto text-accent"/>
                        <p className="text-3xl font-bold mt-2">{inProgressCount}</p>
                        <p className="text-sm text-muted-foreground">En Reparación</p>
                    </Card>
                     <Card className="bg-muted/30 p-4">
                        <CheckCircle className="h-8 w-8 mx-auto text-accent"/>
                        <p className="text-3xl font-bold mt-2">{completedCount}</p>
                        <p className="text-sm text-muted-foreground">Listas para Entrega</p>
                    </Card>
                </CardContent>
                <CardFooter>
                     <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/work-orders">
                            Gestionar Todas las Órdenes <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardFooter>
           </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Órdenes de Trabajo Recientes</CardTitle>
                    <CardDescription>Un vistazo rápido a los últimos 5 trabajos ingresados al taller.</CardDescription>
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
                    <CardTitle>Agenda para Hoy</CardTitle>
                    <CardDescription>{format(new Date(), "eeee, dd 'de' MMMM", { locale: es })}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <CalendarCheck className="h-10 w-10 text-accent"/>
                        <div>
                             <p className="text-4xl font-bold">{todayAppointments.length}</p>
                             <p className="text-sm text-muted-foreground -mt-1">Citas Agendadas</p>
                        </div>
                    </div>
                    {todayAppointments.length > 0 ? (
                        <ul className="space-y-3 border-t pt-3">
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
                        <p className="text-sm text-muted-foreground text-center py-4 border-t">No hay citas programadas.</p>
                    )}
                </CardContent>
                 <CardFooter>
                     <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/calendar">
                            Ir al Calendario Completo
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Actividad de la Semana</CardTitle>
                    <CardDescription>OTs creadas vs. completadas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfigActivity} className="h-64 w-full">
                        <RechartsBarChart data={weeklyActivityData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} width={30} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="created" fill="var(--color-created)" radius={4} name="Creadas" />
                        <Bar dataKey="completed" fill="var(--color-completed)" radius={4} name="Completadas" />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    