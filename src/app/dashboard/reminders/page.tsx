
"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { clients, vehicles } from "@/lib/data";
import type { Client, Vehicle } from "@/types";
import { Bot, Send, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateMaintenanceReminder } from "@/ai/flows/maintenance";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


// Simulación de recordatorios que el sistema detectaría automáticamente.
const upcomingReminders = [
  {
    clientId: "C001",
    vehicleId: "V001",
    type: "Mantención 20.000km",
    dueDate: "2024-08-15",
    lastServiceDate: "hace 6 meses",
  },
  {
    clientId: "C002",
    vehicleId: "V002",
    type: "Revisión de Frenos",
    dueDate: "2024-08-20",
    lastServiceDate: "hace 1 año",
  },
  {
    clientId: "C003",
    vehicleId: "V003",
    type: "Vencimiento Garantía A/C",
    dueDate: "2024-09-01",
    lastServiceDate: "hace 11 meses",
  },
];

type Reminder = (typeof upcomingReminders)[0] & {
  client: Client;
  vehicle: Vehicle;
};

export default function RemindersPage() {
  const [reminders] = useState<Reminder[]>(() =>
    upcomingReminders.map((r) => ({
      ...r,
      client: clients.find((c) => c.id === r.clientId)!,
      vehicle: vehicles.find((v) => v.id === r.vehicleId)!,
    }))
  );

  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const { toast } = useToast();

  const handleGenerateClick = async (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setGeneratedMessage("");
    setIsLoading(true);

    try {
      const result = await generateMaintenanceReminder({
        customerName: reminder.client.name,
        vehicle: `${reminder.vehicle.make} ${reminder.vehicle.model}`,
        lastServiceDate: reminder.lastServiceDate,
      });
      setGeneratedMessage(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo generar el recordatorio. Intente de nuevo.",
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSend = (channel: 'WhatsApp' | 'Email') => {
    if (!selectedReminder) return;
    toast({
        title: "Envío Simulado",
        description: `El recordatorio para ${selectedReminder.client.name} ha sido enviado a la cola de ${channel}.`
    });
    // Aquí iría la lógica de backend para enviar realmente el mensaje
    setSelectedReminder(null);
    setGeneratedMessage("");
  }


  return (
    <>
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Panel de Recordatorios Automáticos" />
      <main className="flex-1 p-6 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Recordatorios Pendientes</CardTitle>
            <CardDescription>
              El sistema ha detectado los siguientes recordatorios basados en el historial de servicio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Tipo de Recordatorio</TableHead>
                  <TableHead>Fecha Próxima</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.map((reminder) => (
                  <TableRow key={`${reminder.clientId}-${reminder.vehicleId}`}>
                    <TableCell className="font-medium">{reminder.client.name}</TableCell>
                    <TableCell>{`${reminder.vehicle.make} ${reminder.vehicle.model}`}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{reminder.type}</Badge>
                    </TableCell>
                    <TableCell>{new Date(reminder.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="sm" onClick={() => handleGenerateClick(reminder)}>
                        <Bot className="mr-2 h-4 w-4" />
                        Generar Mensaje
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>

    <Dialog open={!!selectedReminder} onOpenChange={(isOpen) => !isOpen && setSelectedReminder(null)}>
        <DialogContent className="sm:max-w-xl">
             <DialogHeader>
                <DialogTitle>Previsualización del Mensaje</DialogTitle>
                <DialogDescription>
                    Revisa el mensaje generado por la IA antes de enviarlo a {selectedReminder?.client.name}.
                </DialogDescription>
             </DialogHeader>
             <div className="py-4 space-y-4">
                <Label htmlFor="message-preview">Mensaje a Enviar:</Label>
                <Textarea
                    id="message-preview"
                    value={isLoading ? "Generando..." : generatedMessage}
                    readOnly={isLoading}
                    rows={10}
                />
             </div>
             <DialogFooter className="justify-between sm:justify-between">
                <div className="text-sm text-muted-foreground">
                    Enviar a través de:
                </div>
                <div className="flex gap-2">
                     <Button variant="outline" onClick={() => handleSend('WhatsApp')} disabled={isLoading || !generatedMessage}>
                        <MessageSquare className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
                    </Button>
                    <Button variant="outline" onClick={() => handleSend('Email')} disabled={isLoading || !generatedMessage}>
                        <Mail className="mr-2 h-4 w-4" /> Email
                    </Button>
                </div>
             </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
