
import { KpiCard } from "@/components/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Wrench, Clock, Users, Sparkles } from "lucide-react";


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Panel de Control</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Ingresos Totales"
          value="$45,231.89"
          description="+20.1% desde el mes pasado"
          icon={DollarSign}
        />
        <KpiCard
          title="Órdenes Activas"
          value="4"
          description="2 esperando repuestos"
          icon={Wrench}
        />
        <KpiCard
          title="Tiempo Prom. Reparación"
          value="3.5 Días"
          description="-5% desde el mes pasado"
          icon={Clock}
        />
        <KpiCard
          title="Nuevos Clientes"
          value="+23"
          description="+180.1% desde el mes pasado"
          icon={Users}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-foreground">¡Bienvenido a LionFix ERP!</CardTitle>
            <CardDescription>
              Tu centro de mando para gestionar todas las operaciones del taller.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-6">
            <p>
              Desde aquí puedes agendar citas, gestionar órdenes de trabajo, controlar
              tu inventario y comunicarte con tus clientes. Usa el menú de la
              izquierda para navegar por los diferentes módulos.
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-primary/90 text-primary-foreground relative overflow-hidden">
          <CardHeader>
            <CardTitle>Potencia Tu Productividad</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Nuestras herramientas de IA te ayudan a automatizar la comunicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Genera recordatorios de mantenimiento y notificaciones de servicio con un solo clic.
            </p>
          </CardContent>
           <div className="absolute -bottom-4 -right-4">
             <Sparkles className="w-36 h-36 text-accent/30" strokeWidth={1} />
          </div>
        </Card>
      </div>
    </div>
  );
}
