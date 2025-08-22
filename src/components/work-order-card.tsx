
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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export function WorkOrderCard({ workOrder }: { workOrder: EnrichedWorkOrder }) {
  const [platePrefix, plateSuffix] = workOrder.vehicle.licensePlate.split('-');

  return (
    <Card className="flex flex-col group overflow-hidden">
      <CardHeader className="p-4 bg-muted/30">
        <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col items-start gap-1">
                <Badge variant={getStatusVariant(workOrder.status)} className="text-xs">{workOrder.status}</Badge>
                <Badge variant="secondary" className="text-xs">{workOrder.type}</Badge>
            </div>
            <div className="text-right">
                <div className="font-mono text-base uppercase bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md leading-none">
                    {platePrefix}-<br/>{plateSuffix}
                </div>
                 <p className="text-xs text-muted-foreground mt-1">{format(new Date(workOrder.entryDate), "dd-MM-yyyy")}</p>
            </div>
        </div>
        <CardTitle className="text-xl font-bold pt-2">{workOrder.id}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden">
             <Image 
                src={`https://placehold.co/600x400.png`}
                alt={`${workOrder.vehicle.make} ${workOrder.vehicle.model}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={`${workOrder.vehicle.make} ${workOrder.vehicle.model}`}
             />
        </div>
        <div>
            <h3 className="font-bold text-lg">{workOrder.vehicle.make} {workOrder.vehicle.model}</h3>
            <p className="text-sm text-muted-foreground">Cliente: {workOrder.client.name}</p>
        </div>
        <div className="flex items-start gap-2 pt-2">
            <Wrench className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium">{workOrder.service}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/dashboard/work-orders/${workOrder.id}`} className="w-full">
            <Button className="w-full" variant="secondary">
                Ver Detalles
                <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
