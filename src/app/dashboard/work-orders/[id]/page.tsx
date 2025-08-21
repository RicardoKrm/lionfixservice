import { notFound } from "next/navigation";
import { clients, vehicles, workOrders } from "@/lib/data";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Car, Wrench, Calendar, StickyNote, Package } from "lucide-react";
import { LicensePlateLookup } from "@/components/license-plate-lookup";
import { ServiceNotificationTool } from "@/components/service-notification-tool";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getStatusVariant = (status: (typeof workOrders)[0]["status"]) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "default";
      case "In Repair":
        return "secondary";
      case "Awaiting Parts":
        return "destructive";
      case "Received":
      default:
        return "outline";
    }
  };
  

export default function WorkOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const workOrder = workOrders.find((wo) => wo.id === params.id);

  if (!workOrder) {
    notFound();
  }

  const client = clients.find((c) => c.id === workOrder.clientId);
  const vehicle = vehicles.find((v) => v.id === workOrder.vehicleId);

  if (!client || !vehicle) {
    // Handle cases where related data might be missing
    return <div>Error: Client or Vehicle data not found.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title={`Work Order: ${workOrder.id}`} />
      <main className="flex-1 p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Wrench className="h-5 w-5 mr-3 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{workOrder.service}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-accent" />
                    <div>
                        <p className="text-sm text-muted-foreground">Technician</p>
                        <p className="font-medium">{workOrder.technician}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={getStatusVariant(workOrder.status)}>{workOrder.status}</Badge>
                </div>
              </div>
              <Separator />
               <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-accent" />
                    <div>
                        <p className="text-sm text-muted-foreground">Entry Date</p>
                        <p className="font-medium">{new Date(workOrder.entryDate).toLocaleString()}</p>
                    </div>
                </div>
                 {workOrder.completionDate && <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-accent" />
                    <div>
                        <p className="text-sm text-muted-foreground">Completion Date</p>
                        <p className="font-medium">{new Date(workOrder.completionDate).toLocaleString()}</p>
                    </div>
                </div>}
              </div>
              {workOrder.notes && <>
                <Separator />
                <div className="flex items-start">
                    <StickyNote className="h-5 w-5 mr-3 mt-1 text-accent" />
                    <div>
                        <p className="text-sm text-muted-foreground">Notes</p>
                        <p className="font-medium whitespace-pre-wrap">{workOrder.notes}</p>
                    </div>
                </div>
              </>}
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
            <CardHeader>
                <CardTitle className="flex items-center"><Package className="mr-2"/> Parts & Materials Used</CardTitle>
                <CardDescription>Trazabilidad de repuestos y materiales utilizados en esta orden.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Part Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workOrder.parts.length > 0 ? workOrder.parts.map(part => (
                            <TableRow key={part.sku}>
                                <TableCell className="font-medium">{part.name}</TableCell>
                                <TableCell className="font-code">{part.sku}</TableCell>
                                <TableCell className="text-right">{part.quantity}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">No parts recorded for this order.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>

          <LicensePlateLookup />
        </div>
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
            <CardHeader>
              <CardTitle className="flex items-center"><User className="mr-2"/> Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Name:</strong> {client.name}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Phone:</strong> {client.phone}</p>
            </CardContent>
          </Card>
           <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
            <CardHeader>
              <CardTitle className="flex items-center"><Car className="mr-2"/> Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>License Plate:</strong> <span className="font-mono uppercase">{vehicle.licensePlate}</span></p>
                <p><strong>Make:</strong> {vehicle.make}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
                <p><strong>VIN:</strong> <span className="font-code">{vehicle.vin}</span></p>
            </CardContent>
          </Card>
          <ServiceNotificationTool workOrder={workOrder} client={client} vehicle={vehicle} />
        </div>
      </main>
    </div>
  );
}
