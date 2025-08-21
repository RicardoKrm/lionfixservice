

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
  vehicleIds: string[];
};

export type Part = {
  sku: string;
  name: string;
  stock: number;
  location: string;
  alertThreshold: number;
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

export type CalendarEvent = {
  id: string;
  start: string;
  end: string;
  title: string;
  vehicle: string;
  technician: string;
  workstation: number;
};

export type Checklist = {
  id: string;
  type: 'Recepción' | 'Entrega';
  vehiclePlate: string;
  date: string;
  completed: boolean;
  notes: string;
  images: string[];
  checkedItems: { [key: string]: boolean };
};
