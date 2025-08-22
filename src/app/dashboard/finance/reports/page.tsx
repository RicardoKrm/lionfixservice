
"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, DollarSign, Clock, Users, FileDown } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart } from "recharts";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const monthlyRevenueData = [
  { month: "Ene", revenue: 18600, costs: 12000 },
  { month: "Feb", revenue: 30500, costs: 18000 },
  { month: "Mar", revenue: 23700, costs: 15000 },
  { month: "Abr", revenue: 17300, costs: 11000 },
  { month: "May", revenue: 20900, costs: 13500 },
  { month: "Jun", revenue: 21400, costs: 14000 },
  { month: "Jul", revenue: 28400, costs: 17000 },
];

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  costs: {
    label: "Costos",
     color: "hsl(var(--chart-2))",
  }
};

export default function ReportsPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
        title: "Exportación en Progreso",
        description: "Se está generando el reporte en formato CSV (Simulación)."
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Reportes Financieros y KPIs">
        <Button onClick={handleExport} variant="outline">
          <FileDown className="mr-2 h-4 w-4"/>
          Exportar a CSV
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-3">
             <KpiCard
                title="Ingresos del Mes (Jul)"
                value="$28,400"
                description="+15% vs Jun"
                icon={DollarSign}
            />
            <KpiCard
                title="Costos del Mes (Jul)"
                value="$17,000"
                description="+12% vs Jun (Simulado)"
                icon={DollarSign}
            />
            <KpiCard
                title="Beneficio Neto (Jul)"
                value="$11,400"
                description="+20% vs Jun (Simulado)"
                icon={DollarSign}
            />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
          {/* Revenue Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-accent" />
                Ingresos vs. Costos Mensuales
              </CardTitle>
              <CardDescription>
                Comparativa de ingresos brutos y costos operativos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <RechartsBarChart data={monthlyRevenueData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="costs" fill="var(--color-costs)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 space-y-6">
              {/* Placeholder Cards */}
               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-accent" />
                    Rentabilidad por Servicio
                  </CardTitle>
                </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">Próximamente: Gráfico que desglosa la rentabilidad de cada tipo de servicio (ej: Mantención, Frenos, A/C).</p>
                 </CardContent>
              </Card>

               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-accent" />
                    Eficiencia de Técnicos
                  </CardTitle>
                </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">Próximamente: Horas facturadas vs. horas trabajadas por cada técnico.</p>
                 </CardContent>
              </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
