export type Vehicle = {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  vin: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleId: string;
};

export type WorkOrder = {
  id: string;
  clientId: string;
  vehicleId: string;
  service: string;
  status: 'Recibido' | 'En Reparación' | 'Esperando Repuestos' | 'Completado' | 'Entregado';
  technician: string;
  entryDate: string;
  completionDate?: string;
  notes?: string;
  parts: { name: string; sku: string; quantity: number }[];
};

export type EnrichedWorkOrder = WorkOrder & {
  client: Client;
  vehicle: Vehicle;
};

export type QuoteStatus = 'Enviada' | 'Aprobada' | 'Rechazada';

export type QuoteItem = {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export type Quote = {
    id: string;
    clientId: string;
    vehicleId: string;
    date: string;
    items: QuoteItem[];
    total: number;
    status: QuoteStatus;
}
