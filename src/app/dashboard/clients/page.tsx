
"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Edit, Trash2, Car, Wrench } from "lucide-react";
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

import { clients as initialClients, vehicles, workOrders } from "@/lib/data";
import type { Client, Vehicle } from "@/types";
import { ClientFormDialog } from "@/components/client-form-dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
  
  const handleFormSubmit = (data: Omit<Client, 'id' | 'vehicleIds'>) => {
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
            vehicleIds: [] // Un nuevo cliente empieza sin vehículos
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
      <main className="flex-1 p-6 space-y-6">
        <Card>
           <CardHeader>
            <CardTitle>Listado de Clientes</CardTitle>
            <CardDescription>
              Aquí podrás ver y gestionar la información de tus clientes y el historial de sus vehículos.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {clients.map((client) => {
            const clientVehicles = vehicles.filter(v => client.vehicleIds.includes(v.id));
            const clientWorkOrders = workOrders.filter(wo => wo.clientId === client.id);
            
            return (
              <Card key={client.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{client.name}</CardTitle>
                      <CardDescription>{client.email} - {client.phone}</CardDescription>
                    </div>
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
                          Editar Cliente
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClient(client)}>
                           <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar Cliente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Car className="h-5 w-5 text-primary"/> Vehículos ({clientVehicles.length})</h4>
                    <div className="space-y-2">
                    {clientVehicles.length > 0 ? clientVehicles.map(vehicle => (
                      <div key={vehicle.id} className="text-sm p-2 rounded-md border bg-muted/50">
                        <p className="font-semibold">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                        <p className="font-mono text-muted-foreground uppercase">{vehicle.licensePlate}</p>
                      </div>
                    )) : <p className="text-sm text-muted-foreground">No hay vehículos registrados.</p>}
                    </div>
                  </div>
                   <Separator />
                   <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Wrench className="h-5 w-5 text-primary"/> Historial de Trabajos ({clientWorkOrders.length})</h4>
                     <div className="space-y-2">
                       {clientWorkOrders.length > 0 ? clientWorkOrders.map(wo => (
                         <Link key={wo.id} href={`/dashboard/work-orders/${wo.id}`} passHref>
                           <div className="text-sm p-2 rounded-md border bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                              <p className="font-semibold">{wo.id} - <span className="font-normal">{wo.service}</span></p>
                              <p className="text-muted-foreground">{new Date(wo.entryDate).toLocaleDateString()}</p>
                           </div>
                         </Link>
                       )) : <p className="text-sm text-muted-foreground">No hay órdenes de trabajo.</p>}
                     </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
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

    