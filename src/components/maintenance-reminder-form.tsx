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
  const clientVehicles = useMemo(() => {
      if (!selectedClient) return [];
      return vehicles.filter(v => selectedClient.vehicleIds.includes(v.id));
  },[selectedClient]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');

  const handleGenerate = async () => {
    const selectedVehicle = clientVehicles.find(v => v.id === selectedVehicleId);
    if (!selectedClient || !selectedVehicle) {
        toast({
            variant: "destructive",
            title: "Selección Requerida",
            description: "Por favor, seleccione un cliente y un vehículo primero.",
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
      setSelectedVehicleId('');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-sm dark:bg-card/70">
        <CardHeader>
            <CardTitle>Recordatorios de Mantenimiento con IA</CardTitle>
            <CardDescription>
                Seleccione un cliente para que nuestra IA redacte un mensaje de recordatorio personalizado y profesional.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="client-select">Cliente</Label>
                    <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                        <SelectTrigger id="client-select">
                            <SelectValue placeholder="Seleccione un cliente..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Clientes Registrados</SelectLabel>
                                {clients.map(client => (
                                    <SelectItem key={client.id} value={client.id}>
                                        {client.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="vehicle-select">Vehículo</Label>
                    <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId} disabled={!selectedClientId}>
                        <SelectTrigger id="vehicle-select">
                            <SelectValue placeholder="Seleccione un vehículo..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Vehículos del Cliente</SelectLabel>
                                {clientVehicles.map(vehicle => (
                                    <SelectItem key={vehicle.id} value={vehicle.id}>
                                       {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
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
            <Button variant="outline" onClick={handleGenerate} disabled={isLoading || !selectedClientId || !selectedVehicleId}>
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
