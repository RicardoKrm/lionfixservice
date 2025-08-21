"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { WorkOrder, Client, Vehicle } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EnrichedWorkOrder = WorkOrder & {
  client: Client;
  vehicle: Vehicle;
};

const getStatusVariant = (status: EnrichedWorkOrder["status"]) => {
  switch (status) {
    case "Completado":
    case "Entregado":
      return "default";
    case "En Reparación":
      return "secondary";
    case "Esperando Repuestos":
      return "destructive";
    case "Recibido":
    default:
      return "outline";
  }
};

const columns: ColumnDef<EnrichedWorkOrder>[] = [
  {
    accessorKey: "id",
    header: "ID Orden",
    cell: ({ row }) => (
      <Link href={`/dashboard/work-orders/${row.getValue("id")}`}>
        <div className="font-medium text-primary hover:underline">{row.getValue("id")}</div>
      </Link>
    ),
  },
  {
    accessorKey: "client.name",
    header: "Cliente",
    cell: ({ row }) => <div>{row.original.client.name}</div>,
  },
  {
    accessorKey: "vehicle.licensePlate",
    header: "Patente",
    cell: ({ row }) => (
      <div className="font-mono uppercase">{row.original.vehicle.licensePlate}</div>
    ),
  },
  {
    accessorKey: "service",
    header: "Servicio",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "technician",
    header: "Técnico",
  },
  {
    accessorKey: "entryDate",
    header: "Fecha Ingreso",
    cell: ({ row }) => {
      const date = new Date(row.getValue("entryDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const workOrder = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(workOrder.id)}
            >
              Copiar ID de Orden
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/work-orders/${workOrder.id}`}>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Marcar como Completada</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function WorkOrderTable({ data }: { data: EnrichedWorkOrder[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Órdenes de Trabajo</CardTitle>
                <CardDescription>Visualiza y gestiona todas las órdenes de trabajo del taller.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Input
                placeholder="Filtrar por cliente..."
                value={(table.getColumn("client.name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("client.name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Orden
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    );
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No hay resultados.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
            </div>
            <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Anterior
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Siguiente
            </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
