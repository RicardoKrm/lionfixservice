import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function QuotesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Gestión de Cotizaciones">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cotización
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Listado de Cotizaciones</CardTitle>
            <CardDescription>
              Crea, envía y gestiona presupuestos para tus clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Próximamente: una tabla con todas tus cotizaciones, su estado (enviada, aprobada, rechazada) y opciones para convertirlas en Órdenes de Trabajo.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
