
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { QuoteStatus, WorkOrderStatus } from "@/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Status = WorkOrderStatus | QuoteStatus;

export const getStatusVariant = (status: Status): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Completado":
      case "Entregado":
      case "Aprobada":
        return "default";
      case "En Reparación":
      case "Enviada":
        return "secondary";
      case "Esperando Repuestos":
      case "Rechazada":
        return "destructive";
      case "Recibido":
      default:
        return "outline";
    }
  };
