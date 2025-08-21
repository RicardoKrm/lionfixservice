
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import type { WorkOrder, Vehicle, WorkOrderStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { clients, vehicles, parts as inventoryParts } from "@/lib/data";
import { Trash2, PlusCircle } from "lucide-react";
import { Separator } from "./ui/separator";

const partItemSchema = z.object({
  sku: z.string().min(1, "Debe seleccionar un repuesto."),
  name: z.string(),
  quantity: z.coerce.number().min(1, "La cantidad debe ser al menos 1."),
});

const workOrderSchema = z.object({
  clientId: z.string().min(1, "Debe seleccionar un cliente."),
  vehicleId: z.string().min(1, "Debe seleccionar un vehículo."),
  service: z.string().min(3, "La descripción del servicio es requerida."),
  technician: z.string().min(1, "Debe seleccionar un técnico."),
  status: z.custom<WorkOrderStatus>().optional(),
  notes: z.string().optional(),
  parts: z.array(partItemSchema).optional(),
});

type WorkOrderFormData = z.infer<typeof workOrderSchema>;

type WorkOrderFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<WorkOrder, "id" | "date" | "entryDate">) => void;
  workOrder?: WorkOrder | null;
};

export function WorkOrderFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  workOrder,
}: WorkOrderFormDialogProps) {
  const form = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      clientId: "",
      vehicleId: "",
      service: "",
      technician: "",
      notes: "",
      parts: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parts",
  });

  const selectedClientId = form.watch("clientId");

  const clientVehicles = useMemo(() => {
    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return [];
    return vehicles.filter(v => client.vehicleIds.includes(v.id));
  }, [selectedClientId]);


  useEffect(() => {
    if (isOpen) {
      if (workOrder) {
        form.reset({
          ...workOrder,
        });
      } else {
        form.reset({
          clientId: "",
          vehicleId: "",
          service: "",
          technician: "",
          notes: "",
          parts: [],
        });
      }
    }
  }, [workOrder, form, isOpen]);

  useEffect(() => {
      if(!workOrder) {
         form.setValue('vehicleId', '');
      }
  }, [selectedClientId, form, workOrder]);

  const handleFormSubmit = (data: WorkOrderFormData) => {
    const finalData = {
      ...data,
      status: workOrder?.status || 'Recibido',
      parts: data.parts || [],
    };
    onSubmit(finalData);
  };

  const handlePartSelection = (sku: string, index: number) => {
      const part = inventoryParts.find(p => p.sku === sku);
      if (part) {
          form.setValue(`parts.${index}.sku`, part.sku);
          form.setValue(`parts.${index}.name`, part.name);
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {workOrder ? "Editar Orden de Trabajo" : "Nueva Orden de Trabajo"}
          </DialogTitle>
          <DialogDescription>
            Complete los datos para registrar un nuevo trabajo en el taller.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cliente..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Vehículo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedClientId}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar vehículo..." />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {clientVehicles.map((vehicle: Vehicle) => (
                                <SelectItem key={vehicle.id} value={vehicle.id}>
                                    {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio a Realizar</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Mantención 20.000km, cambio de frenos..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Técnico Asignado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar técnico..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pedro Pascal">Pedro Pascal</SelectItem>
                      <SelectItem value="Ricardo Milos">Ricardo Milos</SelectItem>
                      <SelectItem value="Otro Técnico">Otro Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-2">
              <FormLabel>Repuestos y Materiales</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                   <FormField
                    control={form.control}
                    name={`parts.${index}.sku`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={(value) => {field.onChange(value); handlePartSelection(value, index)}} value={field.value}>
                           <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar repuesto..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {inventoryParts.map((part) => (
                                    <SelectItem key={part.sku} value={part.sku}>
                                        {part.name} ({part.sku})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`parts.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormControl>
                          <Input type="number" placeholder="Cant." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ sku: "", name: "", quantity: 1 })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Repuesto
              </Button>
            </div>

             <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Notas Adicionales</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Anotaciones internas sobre el trabajo, solicitudes del cliente, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">{workOrder ? "Guardar Cambios" : "Crear Orden"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
