import { KpiCard } from "@/components/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Wrench, Clock, Users } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Panel de Control</h2>
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
        <Card className="col-span-4 bg-white/70 backdrop-blur-sm dark:bg-card">
          <CardHeader>
            <CardTitle className="text-primary">¡Bienvenido a LionFix ERP!</CardTitle>
            <CardDescription>
              Tu centro de mando para gestionar todas las operaciones del taller.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
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
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent/30">
                <path d="M14.4 6.00002L12 1.33334L9.6 6.00002L4.92666 8.40002L9.6 10.8L12 15.4667L14.4 10.8L19.0733 8.40002L14.4 6.00002Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.7998 14.4L5.33313 12L3.86646 14.4L1.46646 15.8733L3.86646 17.3467L5.33313 19.7467L6.7998 17.3467L9.1998 15.8733L6.7998 14.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>
      </div>
    </div>
  );
}
