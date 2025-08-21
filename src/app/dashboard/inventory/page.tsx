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

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Control de Inventario">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Repuesto
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Repuestos e Insumos</CardTitle>
            <CardDescription>
              Controla tu stock en tiempo real, define alertas y gestiona tus productos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Próximamente: una tabla detallada con tu inventario, incluyendo SKU, stock actual, alertas de reposición y más.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
