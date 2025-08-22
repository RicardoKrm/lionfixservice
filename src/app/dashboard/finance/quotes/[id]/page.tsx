
"use client";

import { notFound } from "next/navigation";
import { clients, vehicles, quotes } from "@/lib/data";
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
import { User, Car, Calendar, FileText, CheckCircle, XCircle, Send, Printer, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getStatusVariant } from "@/lib/utils";
import { useState } from "react";
import type { QuoteStatus } from "@/types";

export default function QuoteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const quote = quotes.find((q) => q.id === params.id);
  const { toast } = useToast();
  
  // Local state to manage the status for simulation purposes
  const [status, setStatus] = useState<QuoteStatus>(quote?.status || 'Enviada');


  if (!quote) {
    notFound();
  }
  
  const client = clients.find((c) => c.id === quote.clientId);
  const vehicle = vehicles.find((v) => v.id === quote.vehicleId);

  const handleApprove = () => {
    setStatus("Aprobada");
    toast({
      title: "Cotización Aprobada",
      description: "La cotización ha sido marcada como aprobada. Puede proceder a crear la Orden de Trabajo.",
    });
  }

  const handleReject = () => {
    setStatus("Rechazada");
    toast({
      variant: "destructive",
      title: "Cotización Rechazada",
      description: "La cotización ha sido marcada como rechazada.",
    });
  }
  
  const handleSend = () => {
    toast({
      title: "Cotización Enviada",
      description: `La cotización ${quote.id} ha sido enviada a ${client?.email}.`,
    });
  }
  
  const handleConvertToOT = () => {
    toast({
      title: "Orden de Trabajo Creada (Simulación)",
      description: `Se ha generado la OT-2024-005 a partir de la cotización ${quote.id}.`,
    });
  }

  if (!client || !vehicle) {
    return <div>Error: Datos de Cliente o Vehículo no encontrados.</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title={`Cotización: ${quote.id}`}>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSend}><Send className="mr-2 h-4 w-4"/> Enviar por Email</Button>
            <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Imprimir / PDF</Button>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-6 grid md:grid-cols-3 gap-6 overflow-y-auto">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
            <CardHeader>
              <CardTitle>Detalles de la Cotización</CardTitle>
              <CardDescription>
                Resumen de los servicios y repuestos cotizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-center">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unitario</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.description}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice.toLocaleString('es-CL')}</TableCell>
                      <TableCell className="text-right font-semibold">${item.total.toLocaleString('es-CL')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-4"/>
              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${(quote.total / 1.19).toLocaleString('es-CL', {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (19%)</span>
                        <span>${(quote.total - quote.total / 1.19).toLocaleString('es-CL', {maximumFractionDigits: 0})}</span>
                    </div>
                    <Separator/>
                     <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${quote.total.toLocaleString('es-CL')}</span>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
            <CardHeader>
                <CardTitle>Acciones del Cliente</CardTitle>
                <CardDescription>Simulación de la aprobación o rechazo por parte del cliente.</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
                <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700"><CheckCircle className="mr-2"/> Aprobar</Button>
                <Button onClick={handleReject} variant="destructive" className="w-full"><XCircle className="mr-2"/> Rechazar</Button>
            </CardFooter>
          </Card>
          
           <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Estado</CardTitle>
              <Badge variant={getStatusVariant(status)} className="text-base">{status}</Badge>
            </CardHeader>
            <CardContent>
              {status === 'Aprobada' && (
                <div className="space-y-4">
                  <p className="text-sm text-green-600 dark:text-green-400">El cliente ha aprobado el presupuesto.</p>
                  <Button className="w-full" onClick={handleConvertToOT}>
                    <Wrench className="mr-2 h-4 w-4"/>
                    Convertir a Orden de Trabajo
                  </Button>
                </div>
              )}
               {status === 'Rechazada' && (
                <p className="text-sm text-destructive">El cliente ha rechazado el presupuesto.</p>
              )}
               {status === 'Enviada' && (
                <p className="text-sm text-muted-foreground">Esperando la respuesta del cliente.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
            <CardHeader>
              <CardTitle className="flex items-center"><User className="mr-2"/> Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Nombre:</strong> {client.name}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Teléfono:</strong> {client.phone}</p>
            </CardContent>
          </Card>
           <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
            <CardHeader>
              <CardTitle className="flex items-center"><Car className="mr-2"/> Vehículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><strong>Patente:</strong> <span className="font-mono uppercase">{vehicle.licensePlate}</span></p>
                <p><strong>Marca:</strong> {vehicle.make}</p>
                <p><strong>Modelo:</strong> {vehicle.model}</p>
                 <p><strong>VIN:</strong> <span className="font-code">{vehicle.vin}</span></p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
