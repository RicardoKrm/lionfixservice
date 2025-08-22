import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EnrichedWorkOrder } from "@/types";
import { Wrench, ArrowRight } from "lucide-react";
import { getStatusVariant } from "@/lib/utils";


export function WorkOrderCard({ workOrder }: { workOrder: EnrichedWorkOrder }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant={getStatusVariant(workOrder.status)}>{workOrder.status}</Badge>
            <CardTitle className="mt-2 text-primary">{workOrder.id}</CardTitle>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg uppercase tracking-wider bg-secondary text-secondary-foreground px-3 py-1 rounded-md">
              {workOrder.vehicle.licensePlate}
            </div>
             <p className="text-sm text-muted-foreground">{new Date(workOrder.entryDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
             <Image 
                src={`https://placehold.co/600x400.png`}
                alt={`${workOrder.vehicle.make} ${workOrder.vehicle.model}`}
                fill
                className="object-cover"
                data-ai-hint={`${workOrder.vehicle.make} ${workOrder.vehicle.model}`}
             />
        </div>
        <div>
            <h3 className="font-bold text-lg">{workOrder.vehicle.make} {workOrder.vehicle.model}</h3>
            <p className="text-sm text-muted-foreground">Cliente: {workOrder.client.name}</p>
        </div>
        <Separator />
        <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-accent" />
            <p className="text-sm font-medium truncate">{workOrder.service}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/work-orders/${workOrder.id}`} className="w-full">
            <Button className="w-full">
                Ver Detalles
                <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
