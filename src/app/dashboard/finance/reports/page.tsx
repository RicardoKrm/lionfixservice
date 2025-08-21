import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Reportes Financieros y KPIs" />
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-6 w-6 text-primary" />
              Panel de Indicadores Clave
            </CardTitle>
            <CardDescription>
              Visualiza el rendimiento de tu taller con reportes de ingresos, costos y eficiencia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Próximamente: gráficos y tarjetas con los KPIs más importantes para tu negocio, como ingresos vs. egresos, tiempo promedio de reparación, y rentabilidad por servicio.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
