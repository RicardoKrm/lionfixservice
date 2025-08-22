
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
import { User, Car, Calendar, FileText, CheckCircle, XCircle, Send, Printer, Wrench, Building, Flame } from "lucide-react";
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
            {status === 'Aprobada' && (
                <Button onClick={handleConvertToOT} variant="secondary">
                    <Wrench className="mr-2 h-4 w-4"/>
                    Convertir a OT
                </Button>
            )}
        </div>
      </DashboardHeader>
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="max-w-4xl mx-auto p-8 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                     <Flame className="h-12 w-12 text-accent" />
                     <div>
                        <h2 className="text-2xl font-bold">LionFix Service SPA</h2>
                        <p className="text-muted-foreground">Av. Siempreviva 742, Santiago</p>
                        <p className="text-muted-foreground">contacto@lionfix.cl</p>
                     </div>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-primary">COTIZACIÓN</h1>
                    <p className="text-muted-foreground font-mono">{quote.id}</p>
                    <Badge variant={getStatusVariant(status)} className="mt-2 text-base">{status}</Badge>
                </div>
            </div>
            <Separator className="my-6"/>
            {/* Client and Vehicle Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">CLIENTE</h3>
                    <p className="font-bold">{client.name}</p>
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">VEHÍCULO</h3>
                    <p><strong>Patente:</strong> <span className="font-mono uppercase">{vehicle.licensePlate}</span></p>
                    <p><strong>Marca/Modelo:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
                    <p><strong>VIN:</strong> <span className="font-mono">{vehicle.vin}</span></p>
                </div>
            </div>

            {/* Items Table */}
            <Card>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Descripción</TableHead>
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
            </Card>

            {/* Totals */}
            <div className="flex justify-end mt-6">
                <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${(quote.total / 1.19).toLocaleString('es-CL', {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (19%)</span>
                        <span>${(quote.total - quote.total / 1.19).toLocaleString('es-CL', {maximumFractionDigits: 0})}</span>
                    </div>
                    <Separator/>
                     <div className="flex justify-between font-bold text-2xl text-primary">
                        <span>TOTAL</span>
                        <span>${quote.total.toLocaleString('es-CL')}</span>
                    </div>
                </div>
            </div>

            <Separator className="my-8"/>

            {/* Actions */}
            {status === 'Enviada' && (
                 <Card className="bg-muted/50 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-lg">Acciones del Cliente</CardTitle>
                        <CardDescription>Simulación de la aprobación o rechazo por parte del cliente.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700"><CheckCircle className="mr-2"/> Aprobar Cotización</Button>
                        <Button onClick={handleReject} variant="destructive" className="w-full"><XCircle className="mr-2"/> Rechazar Cotización</Button>
                    </CardContent>
                </Card>
            )}

             {status === 'Aprobada' && (
                <div className="text-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                  <p className="text-green-300">El cliente ha aprobado el presupuesto.</p>
                </div>
              )}
               {status === 'Rechazada' && (
                <div className="text-center p-4 bg-destructive/20 border border-destructive/50 rounded-lg">
                    <p className="text-destructive">El cliente ha rechazado el presupuesto.</p>
                </div>
              )}
        </Card>
      </main>
    </div>
  );
}
