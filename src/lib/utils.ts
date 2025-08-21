
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { WorkOrder } from "@/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Status = WorkOrder['status'] | 'Aprobada' | 'Enviada' | 'Rechazada';

export const getStatusVariant = (status: Status) => {
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
