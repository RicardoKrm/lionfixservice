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
          title="Ingresos del Mes"
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
        <Card className="col-span-4 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>¡Bienvenido a LionFix ERP!</CardTitle>
            <CardDescription className="text-card-foreground/80">
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
            <CardTitle>Potencia Tu Productividad con IA</CardTitle>
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
                <path d="M12.4853 3.48532L14.9623 5.96234L12.4853 8.43936L9.96987 5.96234L12.4853 3.48532Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.8888 5.68629L20.3658 8.16331L17.8888 10.6403L15.3734 8.16331L17.8888 5.68629Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.04336 5.68629L9.52038 8.16331L7.04336 10.6403L4.52794 8.16331L7.04336 5.68629Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.4853 10.8787L14.9623 13.3557L12.4853 15.8327L9.96987 13.3557L12.4853 10.8787Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.3305 14.5459L18.8075 17.0229L16.3305 19.5L13.8151 17.0229L16.3305 14.5459Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.64013 14.5459L11.1172 17.0229L8.64013 19.5L6.12471 17.0229L8.64013 14.5459Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>
      </div>
    </div>
  );
}
