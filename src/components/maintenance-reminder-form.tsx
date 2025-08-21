"use client";

import { generateMaintenanceReminder } from "@/ai/flows/maintenance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { clients, vehicles } from "@/lib/data";
import { Bot, Send } from "lucide-react";
import { useMemo, useState } from "react";

export function MaintenanceReminderForm() {
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const selectedClient = useMemo(() => clients.find(c => c.id === selectedClientId), [selectedClientId]);
  const selectedVehicle = useMemo(() => vehicles.find(v => v.id === selectedClient?.vehicleId), [selectedClient]);

  const handleGenerate = async () => {
    if (!selectedClient || !selectedVehicle) {
        toast({
            variant: "destructive",
            title: "Selección Requerida",
            description: "Por favor, seleccione un cliente primero.",
        });
        return;
    }
    setIsLoading(true);
    setMessage(''); // Clear previous message
    try {
      const result = await generateMaintenanceReminder({
        customerName: selectedClient.name,
        vehicle: `${selectedVehicle.make} ${selectedVehicle.model}`,
        lastServiceDate: "hace aproximadamente 6 meses", // Mock data for the prompt
      });
      setMessage(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo generar el recordatorio. Intente de nuevo.",
      });
    }
    setIsLoading(false);
  };

  const handleSend = () => {
    if (!message || !selectedClient) return;
    setIsLoading(true);
    // Simulate sending action
    setTimeout(() => {
      toast({
        title: "¡Recordatorio Enviado!",
        description: `El mensaje ha sido enviado a ${selectedClient.name} a través de sus canales de contacto.`,
      });
      setIsLoading(false);
      setMessage('');
      setSelectedClientId('');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-sm dark:bg-card">
        <CardHeader>
            <CardTitle>Recordatorios de Mantenimiento con IA</CardTitle>
            <CardDescription>
                Seleccione un cliente para que nuestra IA redacte un mensaje de recordatorio personalizado y profesional.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="client-select">Cliente y Vehículo</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                    <SelectTrigger id="client-select">
                        <SelectValue placeholder="Seleccione un cliente..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Clientes Registrados</SelectLabel>
                            {clients.map(client => (
                                <SelectItem key={client.id} value={client.id}>
                                    {client.name} - ({vehicles.find(v => v.id === client.vehicleId)?.licensePlate})
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="reminder-message">Mensaje Generado</Label>
                <Textarea
                    id="reminder-message"
                    placeholder="El recordatorio generado por la IA aparecerá aquí..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={8}
                    readOnly={isLoading}
                />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleGenerate} disabled={isLoading || !selectedClientId}>
                <Bot className="mr-2 h-4 w-4" />
                {isLoading && !message ? 'Generando...' : 'Generar Mensaje'}
            </Button>
            <Button onClick={handleSend} disabled={isLoading || !message}>
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? 'Enviando...' : 'Enviar Recordatorio'}
            </Button>
        </CardFooter>
    </Card>
  )
}
