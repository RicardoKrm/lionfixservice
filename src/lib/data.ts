import type { Client, Vehicle, WorkOrder } from '@/types';

export const vehicles: Vehicle[] = [
  { id: 'V001', licensePlate: 'ABCD-12', make: 'Toyota', model: 'Corolla', year: 2020, vin: '1234567890ABCDEFG' },
  { id: 'V002', licensePlate: 'EFGH-34', make: 'Honda', model: 'Civic', year: 2019, vin: '0987654321HGFEDCBA' },
  { id: 'V003', licensePlate: 'IJKL-56', make: 'Ford', model: 'Focus', year: 2021, vin: '5432109876GFEDCBAH' },
  { id: 'V004', licensePlate: 'MNOP-78', make: 'Chevrolet', model: 'Cruze', year: 2018, vin: '6789012345FEDCBAHG' },
];

export const clients: Client[] = [
  { id: 'C001', name: 'Juan Perez', email: 'juan.perez@example.com', phone: '+56912345678', vehicleId: 'V001' },
  { id: 'C002', name: 'Maria Rodriguez', email: 'maria.r@example.com', phone: '+56987654321', vehicleId: 'V002' },
  { id: 'C003', name: 'Carlos Gomez', email: 'carlos.gomez@example.com', phone: '+56911223344', vehicleId: 'V003' },
  { id: 'C004', name: 'Ana Martinez', email: 'ana.martinez@example.com', phone: '+56955667788', vehicleId: 'V004' },
];

export const workOrders: WorkOrder[] = [
  {
    id: 'OT-2024-001',
    clientId: 'C001',
    vehicleId: 'V001',
    service: '10,000km Maintenance',
    status: 'Completed',
    technician: 'Pedro Pascal',
    entryDate: '2024-07-15T09:00:00Z',
    completionDate: '2024-07-15T16:30:00Z',
    notes: 'Oil change and filter replacement completed. Checked fluid levels and tire pressure.',
    parts: [
      { name: 'Synthetic Oil 5W-30', sku: 'OIL-SYN-5W30', quantity: 5 },
      { name: 'Oil Filter', sku: 'FIL-TOY-COR-01', quantity: 1 },
    ]
  },
  {
    id: 'OT-2024-002',
    clientId: 'C002',
    vehicleId: 'V002',
    service: 'Brake Inspection and Repair',
    status: 'In Repair',
    technician: 'Ricardo Milos',
    entryDate: '2024-07-20T11:00:00Z',
    notes: 'Customer reports grinding noise when braking. Initial inspection suggests worn brake pads.',
    parts: [
        { name: 'Front Brake Pads', sku: 'PAD-HON-CIV-F', quantity: 2 }
    ]
  },
  {
    id: 'OT-2024-003',
    clientId: 'C003',
    vehicleId: 'V003',
    service: 'A/C System Diagnosis',
    status: 'Awaiting Parts',
    technician: 'Pedro Pascal',
    entryDate: '2024-07-22T14:00:00Z',
    notes: 'A/C not blowing cold. Leak detected in the compressor. New compressor ordered.',
    parts: [
        { name: 'A/C Compressor', sku: 'AC-FOR-FOC-03', quantity: 1 }
    ]
  },
  {
    id: 'OT-2024-004',
    clientId: 'C004',
    vehicleId: 'V004',
    service: 'Check Engine Light Diagnosis',
    status: 'Received',
    technician: 'Ricardo Milos',
    entryDate: '2024-07-25T10:30:00Z',
    notes: 'Check engine light is on. Will perform diagnostic scan.',
    parts: []
  },
];

export const calendarEvents = [
    { id: 'E001', start: '2024-07-26T09:00:00', end: '2024-07-26T11:00:00', title: 'OT-2024-005: 20,000km Service', vehicle: 'ZZ-YY-99', technician: 'Pedro Pascal', workstation: 1 },
    { id: 'E002', start: '2024-07-26T10:00:00', end: '2024-07-26T12:00:00', title: 'Diagnostic', vehicle: 'XW-VU-87', technician: 'Ricardo Milos', workstation: 2 },
    { id: 'E003', start: '2024-07-26T11:30:00', end: '2024-07-26T13:00:00', title: 'Tire Rotation', vehicle: 'AB-CD-12', technician: 'Pedro Pascal', workstation: 1 },
    { id: 'E004', start: '2024-07-26T14:00:00', end: '2024-07-26T17:00:00', title: 'Engine Overhaul', vehicle: 'PQ-RS-34', technician: 'Ricardo Milos', workstation: 3 },
  ];
