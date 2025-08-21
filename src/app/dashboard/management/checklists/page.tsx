
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateChecklistDialog } from "@/components/checklist-dialog";

const sampleChecklists = [
  { id: "CHK-001", type: "Recepción", vehicle: "ABCD-12", date: "2024-07-28", completed: true },
  { id: "CHK-002", type: "Entrega", vehicle: "EFGH-34", date: "2024-07-29", completed: true },
  { id: "CHK-003", type: "Recepción", vehicle: "IJKL-56", date: "2024-07-30", completed: false },
];


export default function ChecklistsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Checklists de Vehículos">
        <CreateChecklistDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Checklist
          </Button>
        </CreateChecklistDialog>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Vehículo (Patente)</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleChecklists.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell className="font-medium">{checklist.id}</TableCell>
                    <TableCell>{checklist.type}</TableCell>
                    <TableCell className="font-mono">{checklist.vehicle}</TableCell>
                    <TableCell>{checklist.date}</TableCell>
                    <TableCell>
                      <Badge variant={checklist.completed ? "default" : "secondary"}>
                        {checklist.completed ? "Completado" : "Pendiente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <CreateChecklistDialog checklist={checklist}>
                         <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                       </CreateChecklistDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
