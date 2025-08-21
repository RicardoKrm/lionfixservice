
"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { WorkOrderCard } from "@/components/work-order-card";
import { workOrders as initialWorkOrders, clients, vehicles, parts as initialParts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { EnrichedWorkOrder, WorkOrder, Part } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { WorkOrderFormDialog } from "@/components/work-order-form-dialog";

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [inventory, setInventory] = useState<Part[]>(initialParts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const { toast } = useToast();

  const handleNewOrder = () => {
    setSelectedWorkOrder(null);
    setIsFormOpen(true);
  };
  
  const enrichedWorkOrders: EnrichedWorkOrder[] = workOrders
    .map((wo) => ({
      ...wo,
      client: clients.find((c) => c.id === wo.clientId)!,
      vehicle: vehicles.find((v) => v.id === wo.vehicleId)!,
    }))
    .sort(
      (a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
  
  const handleFormSubmit = (data: Omit<WorkOrder, 'id' | 'entryDate' | 'status'>) => {
      // Create new work order
      const newWorkOrder: WorkOrder = {
        id: `OT-2024-${(workOrders.length + 1).toString().padStart(3, '0')}`,
        entryDate: new Date().toISOString(),
        status: 'Recibido',
        ...data,
      };
      
      // Deduct parts from inventory
      const newInventory = [...inventory];
      let updateSuccessful = true;
      
      newWorkOrder.parts.forEach(partUsed => {
          const inventoryPartIndex = newInventory.findIndex(p => p.sku === partUsed.sku);
          if (inventoryPartIndex !== -1) {
              const inventoryPart = newInventory[inventoryPartIndex];
              if (inventoryPart.stock >= partUsed.quantity) {
                  newInventory[inventoryPartIndex] = { ...inventoryPart, stock: inventoryPart.stock - partUsed.quantity };
              } else {
                  toast({
                      variant: "destructive",
                      title: "Error de Stock",
                      description: `No hay suficiente stock para ${partUsed.name}. Stock disponible: ${inventoryPart.stock}.`,
                  });
                  updateSuccessful = false;
              }
          } else {
              toast({
                  variant: "destructive",
                  title: "Error de Repuesto",
                  description: `El repuesto con SKU ${partUsed.sku} no se encontró en el inventario.`,
              });
              updateSuccessful = false;
          }
      });

      if (!updateSuccessful) {
          return; // Stop if there was a stock issue
      }

      setWorkOrders([newWorkOrder, ...workOrders]);
      setInventory(newInventory); // Update inventory state

      toast({
        title: "Orden de Trabajo Creada",
        description: `Se ha creado la orden ${newWorkOrder.id} y se ha actualizado el stock.`,
      });
    
      setIsFormOpen(false);
  };


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Órdenes de Trabajo">
        <Button onClick={handleNewOrder}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Orden
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrichedWorkOrders.map((wo) => (
            <WorkOrderCard key={wo.id} workOrder={wo} />
          ))}
        </div>
      </main>
      <WorkOrderFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        workOrder={null} // Always for creation in this view
      />
    </div>
  );
}
