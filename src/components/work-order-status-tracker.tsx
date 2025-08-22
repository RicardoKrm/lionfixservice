
"use client";

import { CheckCircle, Clock, Package, Wrench, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkOrderStatus } from "@/types";

const statuses: { name: WorkOrderStatus, icon: React.ElementType }[] = [
  { name: "Recibido", icon: Clock },
  { name: "En Reparación", icon: Wrench },
  { name: "Esperando Repuestos", icon: Package },
  { name: "Completado", icon: CheckCircle },
  { name: "Entregado", icon: Car },
];

type WorkOrderStatusTrackerProps = {
  currentStatus: WorkOrderStatus;
};

export function WorkOrderStatusTracker({ currentStatus }: WorkOrderStatusTrackerProps) {
  const currentIndex = statuses.findIndex(s => s.name === currentStatus);

  return (
    <div className="flex items-center w-full">
      {statuses.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={status.name} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                  isCompleted ? "bg-primary text-primary-foreground" :
                  isActive ? "bg-accent text-accent-foreground" :
                  "bg-muted text-muted-foreground"
                )}
              >
                <status.icon className="h-5 w-5" />
              </div>
              <p
                className={cn(
                  "text-xs mt-2 text-center transition-colors duration-300",
                   isCompleted || isActive ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                {status.name}
              </p>
            </div>
            {index < statuses.length - 1 && (
              <div className={cn(
                "flex-1 h-1 transition-colors duration-300 -mx-1",
                isCompleted ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
