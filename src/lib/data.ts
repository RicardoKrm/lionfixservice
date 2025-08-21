
import type { Client, Vehicle, WorkOrder, Quote, CalendarEvent, Part } from '@/types';

export const vehicles: Vehicle[] = [
  { id: 'V001', licensePlate: 'ABCD-12', make: 'Toyota', model: 'Corolla', year: 2020, vin: '1234567890ABCDEFG' },
  { id: 'V002', licensePlate: 'EFGH-34', make: 'Honda', model: 'Civic', year: 2019, vin: '0987654321HGFEDCBA' },
  { id: 'V003', licensePlate: 'IJKL-56', make: 'Ford', model: 'Focus', year: 2021, vin: '5432109876GFEDCBAH' },
  { id: 'V004', licensePlate: 'MNOP-78', make: 'Chevrolet', model: 'Cruze', year: 2018, vin: '6789012345FEDCBAHG' },
  { id: 'V005', licensePlate: 'QRST-90', make: 'Toyota', model: 'RAV4', year: 2022, vin: 'ABC123DEF456GHI789' },
];

export const clients: Client[] = [
  { id: 'C001', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '+56912345678', vehicleIds: ['V001', 'V005'] },
  { id: 'C002', name: 'María Rodríguez', email: 'maria.r@example.com', phone: '+56987654321', vehicleIds: ['V002'] },
  { id: 'C003', name: 'Carlos Gómez', email: 'carlos.gomez@example.com', phone: '+56911223344', vehicleIds: ['V003'] },
  { id: 'C004', name: 'Ana Martínez', email: 'ana.martinez@example.com', phone: '+56955667788', vehicleIds: ['V004'] },
];

export const parts: Part[] = [
  { sku: "OIL-SYN-5W30", name: "Aceite Sintético 5W-30 (Litro)", stock: 50, location: "Estante A-1", alertThreshold: 10 },
  { sku: "FIL-TOY-COR-01", name: "Filtro de Aceite Toyota Corolla '19+", stock: 12, location: "Cajón B-3", alertThreshold: 5 },
  { sku: "PAD-HON-CIV-F", name: "Pastillas de Freno Delanteras Honda Civic", stock: 8, location: "Estante C-2", alertThreshold: 5 },
  { sku: "AC-FOR-FOC-03", name: "Compresor A/C Ford Focus", stock: 2, location: "Bodega", alertThreshold: 2 },
  { sku: "BULB-H4", name: "Ampolleta Halógena H4", stock: 25, location: "Cajón D-1", alertThreshold: 10 },
];

export const workOrders: WorkOrder[] = [
  {
    id: 'OT-2024-001',
    clientId: 'C001',
    vehicleId: 'V001',
    service: 'Mantención 10.000km',
    status: 'Completado',
    technician: 'Pedro Pascal',
    entryDate: '2024-07-15T09:00:00Z',
    completionDate: '2024-07-15T16:30:00Z',
    notes: 'Cambio de aceite y filtro completado. Se revisaron los niveles de fluidos y la presión de los neumáticos.',
    parts: [
      { name: 'Aceite Sintético 5W-30', sku: 'OIL-SYN-5W30', quantity: 5 },
      { name: 'Filtro de Aceite Toyota Corolla \'19+', sku: 'FIL-TOY-COR-01', quantity: 1 },
    ]
  },
  {
    id: 'OT-2024-002',
    clientId: 'C002',
    vehicleId: 'V002',
    service: 'Inspección y Reparación de Frenos',
    status: 'En Reparación',
    technician: 'Ricardo Milos',
    entryDate: '2024-07-20T11:00:00Z',
    notes: 'Cliente reporta ruido al frenar. Inspección inicial sugiere pastillas de freno desgastadas.',
    parts: [
        { name: 'Pastillas de Freno Delanteras Honda Civic', sku: 'PAD-HON-CIV-F', quantity: 2 }
    ]
  },
  {
    id: 'OT-2024-003',
    clientId: 'C003',
    vehicleId: 'V003',
    service: 'Diagnóstico Sistema A/C',
    status: 'Esperando Repuestos',
    technician: 'Pedro Pascal',
    entryDate: '2024-07-22T14:00:00Z',
    notes: 'A/C no enfría. Se detectó fuga en el compresor. Se ordenó compresor nuevo.',
    parts: [
        { name: 'Compresor A/C Ford Focus', sku: 'AC-FOR-FOC-03', quantity: 1 }
    ]
  },
  {
    id: 'OT-2024-004',
    clientId: 'C004',
    vehicleId: 'V004',
    service: 'Diagnóstico Luz Check Engine',
    status: 'Recibido',
    technician: 'Ricardo Milos',
    entryDate: '2024-07-25T10:30:00Z',
    notes: 'Luz de Check Engine encendida. Se realizará escaneo de diagnóstico.',
    parts: []
  },
   {
    id: 'OT-2024-005',
    clientId: 'C001',
    vehicleId: 'V005',
    service: 'Servicio de 5.000km',
    status: 'Recibido',
    technician: 'Pedro Pascal',
    entryDate: '2024-07-28T11:00:00Z',
    notes: 'Revisión inicial, mantención básica.',
    parts: []
  },
];

export const calendarEvents: CalendarEvent[] = [
    { id: 'E001', start: '2024-07-26T09:00:00', end: '2024-07-26T11:00:00', title: 'OT-2024-005: Mantención 20.000km', vehicle: 'ZZ-YY-99', technician: 'Pedro Pascal', workstation: 1 },
    { id: 'E002', start: '2024-07-26T10:00:00', end: '2024-07-26T12:00:00', title: 'Diagnóstico', vehicle: 'XW-VU-87', technician: 'Ricardo Milos', workstation: 2 },
    { id: 'E003', start: '2024-07-26T11:30:00', end: '2024-07-26T13:00:00', title: 'Rotación Neumáticos', vehicle: 'AB-CD-12', technician: 'Pedro Pascal', workstation: 1 },
    { id: 'E004', start: '2024-07-26T14:00:00', end: '2024-07-26T17:00:00', title: 'Ajuste de Motor', vehicle: 'PQ-RS-34', technician: 'Ricardo Milos', workstation: 3 },
  ];

export const quotes: Quote[] = [
  {
    id: 'COT-2024-001',
    clientId: 'C002',
    vehicleId: 'V002',
    date: '2024-07-21T10:00:00Z',
    items: [
      { description: 'Cambio de pastillas de freno delanteras', quantity: 1, unitPrice: 80000, total: 80000 },
      { description: 'Rectificación de discos delanteros', quantity: 2, unitPrice: 15000, total: 30000 },
      { description: 'Mano de obra', quantity: 2, unitPrice: 25000, total: 50000 },
    ],
    total: 160000,
    status: 'Aprobada',
  },
  {
    id: 'COT-2024-002',
    clientId: 'C003',
    vehicleId: 'V003',
    date: '2024-07-23T11:30:00Z',
    items: [
      { description: 'Cambio de compresor de A/C', quantity: 1, unitPrice: 250000, total: 250000 },
      { description: 'Carga de gas refrigerante', quantity: 1, unitPrice: 40000, total: 40000 },
      { description: 'Mano de obra', quantity: 3, unitPrice: 25000, total: 75000 },
    ],
    total: 365000,
    status: 'Enviada',
  },
    {
    id: 'COT-2024-003',
    clientId: 'C001',
    vehicleId: 'V001',
    date: '2024-07-25T15:00:00Z',
    items: [
      { description: 'Cambio de neumáticos (4)', quantity: 4, unitPrice: 75000, total: 300000 },
      { description: 'Alineación y balanceo', quantity: 1, unitPrice: 35000, total: 35000 },
    ],
    total: 335000,
    status: 'Rechazada',
  },
];
