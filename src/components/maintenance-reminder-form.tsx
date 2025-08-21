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
            title: "Selection Required",
            description: "Please select a client first.",
        });
        return;
    }
    setIsLoading(true);
    try {
      const result = await generateMaintenanceReminder({
        customerName: selectedClient.name,
        vehicle: `${selectedVehicle.make} ${selectedVehicle.model}`,
        lastServiceDate: "approximately 6 months ago", // Mock data
      });
      setMessage(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate reminder message.",
      });
    }
    setIsLoading(false);
  };

  const handleSend = () => {
    if (!message || !selectedClient) return;
    setIsLoading(true);
    // Simulate sending
    setTimeout(() => {
      toast({
        title: "Reminder Sent!",
        description: `Maintenance reminder sent to ${selectedClient.name} at ${selectedClient.email}`,
      });
      setIsLoading(false);
      setMessage('');
      setSelectedClientId('');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-sm dark:bg-card">
        <CardHeader>
            <CardTitle>AI-Powered Maintenance Reminders</CardTitle>
            <CardDescription>
                Select a client to generate a personalized reminder message using AI.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="client-select">Client</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                    <SelectTrigger id="client-select">
                        <SelectValue placeholder="Select a client..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Clients</SelectLabel>
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
                <Label htmlFor="reminder-message">Generated Message</Label>
                <Textarea
                    id="reminder-message"
                    placeholder="Generated reminder will appear here..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={8}
                />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleGenerate} disabled={isLoading || !selectedClientId}>
                <Bot className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Message'}
            </Button>
            <Button onClick={handleSend} disabled={isLoading || !message}>
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? 'Sending...' : 'Send Reminder'}
            </Button>
        </CardFooter>
    </Card>
  )
}
