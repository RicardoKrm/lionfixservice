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
import type { WorkOrder } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { clients, vehicles } from "@/lib/data";
import { Trash2, PlusCircle } from "lucide-react";
import { Separator } from "./ui/separator";

const partItemSchema = z.object({
  sku: z.string().min(1, "Debe seleccionar un repuesto."),
  name: z.string(),
  quantity: z.coerce.number().min(1, "La cantidad debe ser al menos 1."),
});

const workOrderSchema = z.object({
  clientId: z.string().min(1, "Debe seleccionar un cliente."),
  vehicleId: z.string(),
  service: z.string().min(3, "La descripción del servicio es requerida."),
  technician: z.string().min(1, "Debe seleccionar un técnico."),
  notes: z.string().optional(),
  parts: z.array(partItemSchema).optional(),
});

type WorkOrderFormData = Omit<z.infer<typeof workOrderSchema>, "vehicleId">;

type WorkOrderFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<WorkOrder, "id" | "date" | "status" | "entryDate">) => void;
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
  const selectedVehicle = useMemo(
    () =>
      vehicles.find(
        (v) => v.id === clients.find((c) => c.id === selectedClientId)?.vehicleId
      ),
    [selectedClientId]
  );

  useEffect(() => {
    if (isOpen) {
      if (workOrder) {
        form.reset({
          ...workOrder,
        });
      } else {
        form.reset({
          clientId: "",
          service: "",
          technician: "",
          notes: "",
          parts: [],
        });
      }
    }
  }, [workOrder, form, isOpen]);

  const handleFormSubmit = (data: WorkOrderFormData) => {
    if (!selectedVehicle) return;
    const finalData = {
      ...data,
      vehicleId: selectedVehicle.id,
      parts: data.parts || [],
    };
    onSubmit(finalData);
  };

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
                      defaultValue={field.value}
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
              <FormItem>
                <FormLabel>Vehículo</FormLabel>
                <Input
                  value={
                    selectedVehicle
                      ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.licensePlate})`
                      : "Seleccione un cliente"
                  }
                  disabled
                />
              </FormItem>
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
                    defaultValue={field.value}
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
                  {/* Future implementation: Select with inventory parts */}
                  <FormField
                    control={form.control}
                    name={`parts.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Nombre del repuesto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`parts.${index}.sku`}
                    render={({ field }) => (
                      <FormItem className="w-40">
                        <FormControl>
                          <Input placeholder="SKU" {...field} />
                        </FormControl>
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
              <Button type="submit">Guardar Orden</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
