

"use client";

import { notFound, useRouter } from "next/navigation";
import { workOrders as initialWorkOrders, clients, vehicles, parts as inventory } from "@/lib/data";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Car, Wrench, Calendar, StickyNote, Package, Edit, Pencil, MessageSquarePlus, Clock, FileCheck, Upload, Download, FileText, Trash2 } from "lucide-react";
import { getStatusVariant } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WorkOrderFormDialog } from "@/components/work-order-form-dialog";
import { useToast } from "@/hooks/use-toast";
import type { WorkOrder, WorkOrderStatus, ServiceLogEntry } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ObdScannerTool } from "@/components/obd-scanner-tool";
import { SatisfactionSurveyTool } from "@/components/satisfaction-survey-tool";
import { WorkOrderStatusTracker } from "@/components/work-order-status-tracker";


export default function WorkOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newLogEntry, setNewLogEntry] = useState("");
  const [attachedFiles, setAttachedFiles] = useState(["Diagnostico_Inicial.pdf"]);


  const { toast } = useToast();
  const router = useRouter();

  const workOrder = workOrders.find((wo) => wo.id === params.id);

  if (!workOrder) {
    notFound();
  }
  
  const handleUpdateStatus = (newStatus: WorkOrderStatus) => {
    const updatedWorkOrders = workOrders.map(wo => 
      wo.id === workOrder.id ? { ...wo, status: newStatus } : wo
    );
    setWorkOrders(updatedWorkOrders);
    toast({
      title: "Estado Actualizado",
      description: `La orden de trabajo ahora está en estado: ${newStatus}.`
    })
  }

  const handleFormSubmit = (data: Omit<WorkOrder, 'id' | 'entryDate' | 'status' | 'serviceLog'>) => {
    const updatedWorkOrder = {
        ...workOrder,
        ...data,
        completionDate: data.status === 'Completado' || data.status === 'Entregado' ? new Date().toISOString() : workOrder.completionDate,
    };
    
    setWorkOrders(workOrders.map(wo => wo.id === workOrder.id ? updatedWorkOrder : wo));
    toast({
      title: "Orden de Trabajo Actualizada",
      description: `Se ha actualizado la orden ${workOrder.id}.`,
    });
    setIsFormOpen(false);
  };
  
  const handleAddLogEntry = () => {
    if (!newLogEntry.trim()) return;

    const entry: ServiceLogEntry = {
        timestamp: new Date().toISOString(),
        technician: "Ricardo Milos", // In a real app, this would come from the logged-in user
        entry: newLogEntry.trim(),
    };

    const updatedWorkOrders = workOrders.map(wo => 
      wo.id === workOrder.id ? { ...wo, serviceLog: [...wo.serviceLog, entry] } : wo
    );
    setWorkOrders(updatedWorkOrders);
    setNewLogEntry(""); // Clear the textarea
    toast({
      title: "Entrada Agregada",
      description: "Se ha añadido una nueva entrada a la bitácora de servicio.",
    });
  };
  
  const handleSurveySubmit = (rating: number, comment: string) => {
    const updatedWorkOrders = workOrders.map(wo => 
      wo.id === workOrder.id ? { ...wo, satisfactionRating: rating, satisfactionComment: comment } : wo
    );
    setWorkOrders(updatedWorkOrders);
  };
  
   const handleUploadFile = () => {
    toast({
      title: "Adjuntar Archivo (Simulación)",
      description: "En una aplicación real, aquí se abriría un diálogo para subir un archivo.",
    });
    const newFileName = `Evidencia_${Date.now()}.jpg`;
    setAttachedFiles([...attachedFiles, newFileName]);
  };

  const handleDownloadFile = (fileName: string) => {
    toast({
      title: "Descarga Iniciada (Simulación)",
      description: `Se está descargando el archivo: ${fileName}.`,
    });
  };


  const client = clients.find((c) => c.id === workOrder.clientId);
  const vehicle = vehicles.find((v) => v.id === workOrder.vehicleId);

  if (!client || !vehicle) {
    // Handle cases where related data might be missing
    return <div>Error: Datos de Cliente o Vehículo no encontrados.</div>;
  }

  return (
    <>
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title={`Orden de Trabajo: ${workOrder.id}`}>
         <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                   <Pencil className="mr-2 h-4 w-4" />
                   Cambiar Estado
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleUpdateStatus('Recibido')}>Recibido</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus('Esperando Aprobación')}>Esperando Aprobación</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus('En Reparación')}>En Reparación</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus('Esperando Repuestos')}>Esperando Repuestos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus('Completado')}>Completado</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus('Entregado')}>Entregado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setIsFormOpen(true)} variant="secondary">
                <Edit className="mr-2 h-4 w-4" />
                Editar Orden
            </Button>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* --- Main Info & Status Tracker --- */}
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl">{workOrder.service}</CardTitle>
                        <CardDescription>Técnico Asignado: {workOrder.technician}</CardDescription>
                    </div>
                     <div className="flex items-center gap-4 text-sm">
                        <div>
                            <p className="font-semibold">Ingreso:</p>
                            <p className="text-muted-foreground">{new Date(workOrder.entryDate).toLocaleString()}</p>
                        </div>
                        {workOrder.completionDate && (
                            <div>
                                <p className="font-semibold">Finalización:</p>
                                <p className="text-muted-foreground">{new Date(workOrder.completionDate).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                 <WorkOrderStatusTracker currentStatus={workOrder.status} />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

             {/* --- Left Column: Details & Tools --- */}
             <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center"><User className="mr-2"/> Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Nombre:</strong> {client.name}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>Teléfono:</strong> {client.phone}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle className="flex items-center"><Car className="mr-2"/> Vehículo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Patente:</strong> <span className="font-mono uppercase">{vehicle.licensePlate}</span></p>
                        <p><strong>Marca / Modelo:</strong> {vehicle.make} {vehicle.model}</p>
                        <p><strong>Año:</strong> {vehicle.year}</p>
                        <p><strong>VIN:</strong> <span className="font-mono">{vehicle.vin}</span></p>
                        <p><strong>N° Motor:</strong> <span className="font-mono">{vehicle.motorNumber}</span></p>
                    </CardContent>
                </Card>
                
                <ObdScannerTool onScan={(code) => setNewLogEntry(`Código OBD-II: ${code}`)} />
                {workOrder.status === 'Entregado' && (
                  <SatisfactionSurveyTool workOrder={workOrder} onSurveySubmit={handleSurveySubmit} />
                )}
             </div>

            {/* --- Right Column: Logs, Parts, Files --- */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><StickyNote className="mr-2"/> Bitácora de Diagnóstico y Servicio</CardTitle>
                        <CardDescription>Registro cronológico de todas las acciones y observaciones.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                            {workOrder.serviceLog.map((log, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-accent rounded-full p-1.5 text-accent-foreground">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div className="flex-grow w-px bg-border my-1"></div>
                                    </div>
                                    <div className="w-full pb-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-sm">{log.technician}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{log.entry}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-col gap-2 pt-4 border-t">
                            <Textarea 
                                placeholder="Añadir nueva entrada a la bitácora..."
                                value={newLogEntry}
                                onChange={(e) => setNewLogEntry(e.target.value)}
                                rows={3}
                            />
                            <Button onClick={handleAddLogEntry} size="sm" className="self-end" variant="secondary">
                                <MessageSquarePlus className="mr-2 h-4 w-4" />
                                Agregar Entrada
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Package className="mr-2"/> Repuestos y Materiales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre del Repuesto</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="text-right">Cantidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workOrder.parts.length > 0 ? workOrder.parts.map(part => (
                                    <TableRow key={part.sku}>
                                        <TableCell className="font-medium">{part.name}</TableCell>
                                        <TableCell className="font-mono">{part.sku}</TableCell>
                                        <TableCell className="text-right">{part.quantity}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground h-24">No se registraron repuestos para esta orden.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Documentos Adjuntos y Evidencias</CardTitle>
                    <CardDescription>
                        Gestione los archivos asociados a esta Orden de Trabajo.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ul className="space-y-3">
                        {attachedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground"/>
                                <span className="font-medium">{file}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadFile(file)}>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                            </Button>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                    <CardFooter>
                    <Button variant="outline" onClick={handleUploadFile}>
                        <Upload className="mr-2 h-4 w-4" />
                        Adjuntar Nuevo Documento
                    </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </main>
    </div>
    <WorkOrderFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        workOrder={workOrder}
      />
    </>
  );
}

    