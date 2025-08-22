
"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, DollarSign, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart } from "recharts";


const monthlyRevenueData = [
  { month: "Enero", revenue: 18600 },
  { month: "Febrero", revenue: 30500 },
  { month: "Marzo", revenue: 23700 },
  { month: "Abril", revenue: 17300 },
  { month: "Mayo", revenue: 20900 },
  { month: "Junio", revenue: 21400 },
];

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Reportes Financieros y KPIs" />
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Ingresos Mensuales
            </CardTitle>
            <CardDescription>
              Visualización de los ingresos brutos generados cada mes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <RechartsBarChart data={monthlyRevenueData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Placeholder Cards */}
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-primary" />
              Rentabilidad
            </CardTitle>
          </CardHeader>
           <CardContent>
             <p className="text-sm text-muted-foreground">Próximamente: Gráfico de ingresos vs. costos.</p>
           </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Tiempos Promedio
            </CardTitle>
          </CardHeader>
           <CardContent>
             <p className="text-sm text-muted-foreground">Próximamente: Tiempo promedio por tipo de servicio.</p>
           </CardContent>
        </Card>
      </main>
    </div>
  );
}
