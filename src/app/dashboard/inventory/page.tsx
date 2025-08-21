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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sampleInventory = [
  { sku: "OIL-SYN-5W30", name: "Aceite Sintético 5W-30 (Litro)", stock: 50, location: "Estante A-1", alert: false },
  { sku: "FIL-TOY-COR-01", name: "Filtro de Aceite Toyota Corolla '19+", stock: 12, location: "Cajón B-3", alert: false },
  { sku: "PAD-HON-CIV-F", name: "Pastillas de Freno Delanteras Honda Civic", stock: 4, location: "Estante C-2", alert: true },
  { sku: "AC-FOR-FOC-03", name: "Compresor A/C Ford Focus", stock: 1, location: "Bodega", alert: false },
  { sku: "BULB-H4", name: "Ampolleta Halógena H4", stock: 25, location: "Cajón D-1", alert: false },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Control de Inventario">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Repuesto
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Repuestos e Insumos</CardTitle>
            <CardDescription>
              Controla tu stock en tiempo real, define alertas y gestiona tus productos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Nombre del Producto</TableHead>
                  <TableHead>Stock Actual</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleInventory.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                        <Badge variant={item.alert ? "destructive" : "outline"}>
                           {item.stock} unidades
                        </Badge>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
