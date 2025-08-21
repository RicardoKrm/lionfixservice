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

export default function ClientsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Gestión de Clientes (CRM)">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Listado de Clientes</CardTitle>
            <CardDescription>
              Aquí podrás ver y gestionar la información de tus clientes y el historial de sus vehículos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Próximamente: una tabla con todos tus clientes, con opciones de búsqueda, filtro y acceso rápido a su historial de servicios.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
