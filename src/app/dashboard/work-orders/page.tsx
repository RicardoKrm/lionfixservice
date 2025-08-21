import { DashboardHeader } from "@/components/dashboard-header";
import { WorkOrderTable } from "@/components/work-order-table";
import { workOrders, clients, vehicles } from "@/lib/data";

export default function WorkOrdersPage() {
  const enrichedWorkOrders = workOrders.map((wo) => ({
    ...wo,
    client: clients.find((c) => c.id === wo.clientId)!,
    vehicle: vehicles.find((v) => v.id === wo.vehicleId)!,
  }));

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Órdenes de Trabajo" />
      <main className="flex-1 p-6">
        <WorkOrderTable data={enrichedWorkOrders} />
      </main>
    </div>
  );
}
