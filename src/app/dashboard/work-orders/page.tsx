import { DashboardHeader } from "@/components/dashboard-header";
import { WorkOrderCard } from "@/components/work-order-card";
import { workOrders, clients, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { EnrichedWorkOrder } from "@/types";

export default function WorkOrdersPage() {
  const enrichedWorkOrders: EnrichedWorkOrder[] = workOrders.map((wo) => ({
    ...wo,
    client: clients.find((c) => c.id === wo.clientId)!,
    vehicle: vehicles.find((v) => v.id === wo.vehicleId)!,
  })).sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime());

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Órdenes de Trabajo">
         <Button>
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
    </div>
  );
}
