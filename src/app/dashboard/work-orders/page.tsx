"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { WorkOrderCard } from "@/components/work-order-card";
import { workOrders as initialWorkOrders, clients, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { EnrichedWorkOrder, WorkOrder } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { WorkOrderFormDialog } from "@/components/work-order-form-dialog";

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

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
    const newWorkOrder: WorkOrder = {
      id: `OT-2024-${(workOrders.length + 1).toString().padStart(3, '0')}`,
      entryDate: new Date().toISOString(),
      status: 'Recibido',
      ...data,
    };
    setWorkOrders([newWorkOrder, ...workOrders]);
    toast({
      title: "Orden de Trabajo Creada",
      description: `Se ha creado la orden ${newWorkOrder.id}.`,
    });
    setIsFormOpen(false);
  };


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Órdenes de Trabajo">
        <Button onClick={() => setIsFormOpen(true)}>
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
      />
    </div>
  );
}
