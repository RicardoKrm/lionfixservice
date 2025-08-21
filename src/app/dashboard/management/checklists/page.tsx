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

export default function ChecklistsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Checklists de Vehículos">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Checklist
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Checklists</CardTitle>
            <CardDescription>
              Crea y gestiona checklists para la recepción y entrega de vehículos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Aquí podrás ver una tabla con los checklists existentes, crear nuevos a partir de plantillas y asociarlos a las órdenes de trabajo.
            </p>
            {/* Table or list of checklists will go here */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
