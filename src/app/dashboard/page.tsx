
"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HardHat } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Panel de Control" />
      <main className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <HardHat className="h-12 w-12 text-accent" />
                </div>
                <CardTitle>Próximamente: Un Panel de Control Rediseñado</CardTitle>
                <CardDescription>
                    Este espacio está siendo preparado para una nueva experiencia de visualización y gestión.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Estamos trabajando en una nueva interfaz que te permitirá tener una visión aún más clara y potente de tu taller. ¡Gracias por tu paciencia!</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
