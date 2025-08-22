
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
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { quotes as initialQuotes, clients, vehicles } from "@/lib/data";
import Link from "next/link";
import { getStatusVariant } from "@/lib/utils";
import { QuoteFormDialog } from "@/components/quote-form-dialog";
import type { Quote } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (data: Omit<Quote, 'id' | 'status' | 'date'>) => {
    const newQuote: Quote = {
      id: `COT-2024-${(quotes.length + 1).toString().padStart(3, '0')}`,
      date: new Date().toISOString(),
      status: 'Enviada',
      ...data,
    };
    setQuotes([newQuote, ...quotes]);
    toast({
      title: "Cotización Creada",
      description: `Se ha creado la cotización ${newQuote.id}.`,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Gestión de Cotizaciones">
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cotización
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6 overflow-y-auto">
        <Card className="bg-white/70 backdrop-blur-sm dark:bg-card/70">
          <CardHeader>
            <CardTitle>Listado de Cotizaciones</CardTitle>
            <CardDescription>
              Crea, envía y gestiona presupuestos para tus clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Cotización</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => {
                  const client = clients.find((c) => c.id === quote.clientId);
                  const vehicle = vehicles.find((v) => v.id === quote.vehicleId);
                  return (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{client?.name}</TableCell>
                      <TableCell>{vehicle ? `${vehicle.make} ${vehicle.model}` : 'N/A'}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                      <TableCell>${quote.total.toLocaleString('es-CL')}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(quote.status)}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/dashboard/finance/quotes/${quote.id}`} passHref>
                          <Button variant="outline" size="sm">
                            Ver <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <QuoteFormDialog 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
