
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, FileText, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { quotes, clients, vehicles } from "@/lib/data";
import Link from "next/link";
import { getStatusVariant } from "@/lib/utils";

export default function QuotesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Gestión de Cotizaciones">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cotización
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
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
    </div>
  );
}
