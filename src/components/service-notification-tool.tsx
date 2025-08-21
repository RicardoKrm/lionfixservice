"use client";

import { generateServiceNotification } from "@/ai/flows/notifications";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Client, Vehicle, WorkOrder } from "@/types";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

type ServiceNotificationToolProps = {
  workOrder: WorkOrder;
  client: Client;
  vehicle: Vehicle;
};

export function ServiceNotificationTool({
  workOrder,
  client,
  vehicle,
}: ServiceNotificationToolProps) {
  const [status, setStatus] = useState(workOrder.status);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateServiceNotification({
        customerName: client.name,
        vehicle: `${vehicle.make} ${vehicle.model}`,
        serviceType: workOrder.service,
        status: status,
      });
      setMessage(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar la notificación.",
      });
    }
    setIsLoading(false);
  };

  const handleSend = () => {
    if (!message) return;
    setIsLoading(true);
    // Simulate sending
    setTimeout(() => {
      toast({
        title: "¡Notificación Enviada!",
        description: `Mensaje enviado a ${client.name} a ${client.email}`,
      });
      setIsLoading(false);
      setMessage("");
    }, 1000);
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
      <CardHeader>
        <CardTitle>Notificaciones de Servicio</CardTitle>
        <CardDescription>
          Genere y envíe actualizaciones de estado al cliente usando IA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status-select">Seleccione Estado a Notificar</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status-select" className="w-[180px]">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Repair">En Reparación</SelectItem>
              <SelectItem value="Awaiting Parts">Esperando Repuestos</SelectItem>
              <SelectItem value="Completed">Completado</SelectItem>
              <SelectItem value="Delivered">Entregado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
            id="message"
            placeholder="El mensaje generado aparecerá aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleGenerate} disabled={isLoading}>
          <Bot className="mr-2 h-4 w-4" />
          {isLoading ? "Generando..." : "Generar Mensaje"}
        </Button>
        <Button onClick={handleSend} disabled={!message || isLoading}>
          <Send className="mr-2 h-4 w-4" />
          {isLoading ? "Enviando..." : "Enviar Notificación"}
        </Button>
      </CardFooter>
    </Card>
  );
}
