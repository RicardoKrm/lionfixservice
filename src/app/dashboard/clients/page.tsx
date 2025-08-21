
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { clients as initialClients, vehicles } from "@/lib/data";
import type { Client, Vehicle } from "@/types";
import { ClientFormDialog } from "@/components/client-form-dialog";
import { useToast } from "@/hooks/use-toast";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleNewClient = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setIsAlertOpen(true);
  }

  const confirmDelete = () => {
    if (selectedClient) {
      // Logic to delete the client
      setClients(clients.filter(c => c.id !== selectedClient.id));
      toast({
        title: "Cliente Eliminado",
        description: `El cliente ${selectedClient.name} ha sido eliminado.`,
      })
    }
    setIsAlertOpen(false);
    setSelectedClient(null);
  }
  
  const handleFormSubmit = (data: Omit<Client, 'id' | 'vehicleId'> & { vehicleId?: string}) => {
    if (selectedClient) {
        // Edit existing client
        const updatedClients = clients.map(c => c.id === selectedClient.id ? { ...selectedClient, ...data } : c);
        setClients(updatedClients);
        toast({
          title: "Cliente Actualizado",
          description: "Los datos del cliente han sido actualizados.",
        })
    } else {
        // Create new client
        const newClient: Client = {
            id: `C${(clients.length + 1).toString().padStart(3, '0')}`,
            ...data,
            vehicleId: data.vehicleId || '' // Ensure vehicleId is not undefined
        };
        setClients([...clients, newClient]);
        toast({
          title: "Cliente Creado",
          description: "El nuevo cliente ha sido añadido a la lista.",
        })
    }
    setIsFormOpen(false);
    setSelectedClient(null);
  };


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Gestión de Clientes (CRM)">
        <Button onClick={handleNewClient}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Listado de Clientes</CardTitle>
            <CardDescription>
              Aquí podrás ver y gestionar la información de tus clientes y el historial de sus vehículos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Vehículo Principal</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => {
                  const vehicle = vehicles.find(v => v.id === client.vehicleId);
                  return (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        {vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClient(client)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClient(client)}>
                               <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

       <ClientFormDialog
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          client={selectedClient}
        />

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente al cliente
                    y toda su información asociada del sistema.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedClient(null)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
