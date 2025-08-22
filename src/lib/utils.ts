
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { QuoteStatus, WorkOrderStatus, NotificationStatus } from "@/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Status = WorkOrderStatus | QuoteStatus | NotificationStatus;

export const getStatusVariant = (status: Status): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Completado":
      case "Entregado":
      case "Aprobada":
      case "Enviada":
        return "default";
      case "En Reparación":
      case "Enviada":
      case "Programada":
        return "secondary";
      case "Esperando Repuestos":
      case "Rechazada":
      case "Fallida":
        return "destructive";
      case "Recibido":
      default:
        return "outline";
    }
  };
