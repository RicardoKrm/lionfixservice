
"use client";

import { useState } from "react";
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
import { ChecklistDialog } from "@/components/checklist-dialog";
import type { Checklist } from "@/types";

const initialChecklists: Checklist[] = [
  { id: "CHK-001", type: "Recepción", vehiclePlate: "ABCD-12", date: "2024-07-28", completed: true, notes: "Cliente deja cargador de teléfono.", images: [], checkedItems: { "Luces Delanteras": true, "Nivel de Combustible": true } },
  { id: "CHK-002", type: "Entrega", vehiclePlate: "EFGH-34", date: "2024-07-29", completed: true, notes: "Vehículo se entrega lavado.", images: [], checkedItems: { "Carrocería (Rayones/Abolladuras)": true } },
  { id: "CHK-003", type: "Recepción", vehiclePlate: "IJKL-56", date: "2024-07-30", completed: false, notes: "Revisar rayón en puerta trasera derecha.", images: [], checkedItems: {} },
];


export default function ChecklistsPage() {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);

  const handleNew = () => {
    setSelectedChecklist(null);
    setIsDialogOpen(true);
  }

  const handleEdit = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setIsDialogOpen(true);
  }

  const handleSave = (data: Checklist) => {
    if (selectedChecklist && data.id) {
        setChecklists(checklists.map(c => c.id === data.id ? data : c));
    } else {
        const newChecklist = { ...data, id: `CHK-${(checklists.length + 1).toString().padStart(3, '0')}`};
        setChecklists([...checklists, newChecklist]);
    }
    setIsDialogOpen(false);
  }


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Checklists de Vehículos">
          <Button onClick={handleNew}>
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
                {checklists.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell className="font-medium">{checklist.id}</TableCell>
                    <TableCell>{checklist.type}</TableCell>
                    <TableCell className="font-mono">{checklist.vehiclePlate}</TableCell>
                    <TableCell>{checklist.date}</TableCell>
                    <TableCell>
                      <Badge variant={checklist.completed ? "default" : "secondary"}>
                        {checklist.completed ? "Completado" : "Pendiente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="outline" size="sm" onClick={() => handleEdit(checklist)}>
                          Ver / Editar
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <ChecklistDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        checklist={selectedChecklist}
        onSave={handleSave}
       />
    </div>
  );
}
