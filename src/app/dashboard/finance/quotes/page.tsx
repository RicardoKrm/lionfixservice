
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
import { PlusCircle, ArrowRight, FileDigit, Car, User } from "lucide-react";
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
  
  const sortedQuotes = quotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Gestión de Cotizaciones">
        <Button onClick={() => setIsFormOpen(true)} variant="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cotización
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedQuotes.map((quote) => {
            const client = clients.find((c) => c.id === quote.clientId);
            const vehicle = vehicles.find((v) => v.id === quote.vehicleId);
            return (
              <Card key={quote.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                     <CardTitle className="flex items-center gap-2">
                        <FileDigit className="text-accent"/>
                        {quote.id}
                    </CardTitle>
                    <Badge variant={getStatusVariant(quote.status)}>
                        {quote.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(quote.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground"/>
                        <span className="font-medium">{client?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground"/>
                        <span>{vehicle ? `${vehicle.make} ${vehicle.model}` : 'N/A'}</span>
                    </div>
                     <div className="pt-2">
                        <p className="text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">${quote.total.toLocaleString('es-CL')}</p>
                    </div>
                </CardContent>
                 <CardFooter className="bg-muted/50 p-3">
                    <Link href={`/dashboard/finance/quotes/${quote.id}`} passHref className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                            Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
      <QuoteFormDialog 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
