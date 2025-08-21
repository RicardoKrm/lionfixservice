
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
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PartFormDialog } from "@/components/part-form-dialog";
import type { Part } from "@/types";
import { useToast } from "@/hooks/use-toast";


const initialInventory: Part[] = [
  { sku: "OIL-SYN-5W30", name: "Aceite Sintético 5W-30 (Litro)", stock: 50, location: "Estante A-1", alertThreshold: 10 },
  { sku: "FIL-TOY-COR-01", name: "Filtro de Aceite Toyota Corolla '19+", stock: 12, location: "Cajón B-3", alertThreshold: 5 },
  { sku: "PAD-HON-CIV-F", name: "Pastillas de Freno Delanteras Honda Civic", stock: 4, location: "Estante C-2", alertThreshold: 5 },
  { sku: "AC-FOR-FOC-03", name: "Compresor A/C Ford Focus", stock: 1, location: "Bodega", alertThreshold: 2 },
  { sku: "BULB-H4", name: "Ampolleta Halógena H4", stock: 25, location: "Cajón D-1", alertThreshold: 10 },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Part[]>(initialInventory);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleNewPart = () => {
    setSelectedPart(null);
    setIsFormOpen(true);
  };

  const handleEditPart = (part: Part) => {
    setSelectedPart(part);
    setIsFormOpen(true);
  };

  const handleDeletePart = (part: Part) => {
    setSelectedPart(part);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPart) {
      setInventory(inventory.filter((p) => p.sku !== selectedPart.sku));
      toast({
        title: "Repuesto Eliminado",
        description: `El repuesto ${selectedPart.name} ha sido eliminado.`,
      });
    }
    setIsAlertOpen(false);
    setSelectedPart(null);
  };

  const handleFormSubmit = (data: Part) => {
    if (selectedPart) {
      // Edit existing part
      const updatedInventory = inventory.map((p) =>
        p.sku === selectedPart.sku ? { ...p, ...data } : p
      );
      setInventory(updatedInventory);
      toast({
        title: "Repuesto Actualizado",
        description: "Los datos del repuesto han sido actualizados.",
      });
    } else {
      // Create new part
      // Check if SKU already exists
      if (inventory.some(p => p.sku === data.sku)) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "El SKU ya existe. Por favor, use uno diferente.",
        });
        return;
      }
      setInventory([...inventory, data]);
      toast({
        title: "Repuesto Creado",
        description: "El nuevo repuesto ha sido añadido al inventario.",
      });
    }
    setIsFormOpen(false);
    setSelectedPart(null);
  };

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Control de Inventario">
        <Button onClick={handleNewPart}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Repuesto
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Repuestos e Insumos</CardTitle>
            <CardDescription>
              Controla tu stock en tiempo real, define alertas y gestiona tus
              productos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nombre del Producto</TableHead>
                  <TableHead>Stock Actual</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.stock <= item.alertThreshold ? "destructive" : "outline"}
                      >
                        {item.stock} unidades
                      </Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPart(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeletePart(item)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <PartFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        part={selectedPart}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el repuesto del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedPart(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
