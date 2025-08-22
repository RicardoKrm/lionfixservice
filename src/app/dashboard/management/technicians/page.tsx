
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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, User, Calendar, MoreHorizontal } from "lucide-react";
import { technicians as initialTechnicians } from "@/lib/data";
import type { Technician } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";


export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(initialTechnicians);
  const { toast } = useToast();

  const handleNewTechnician = () => {
    // Logic to open a form dialog would go here
    toast({ title: "Acción no implementada", description: "El formulario para añadir técnicos aún no está disponible."})
  };
  
  const handleAddExtraHours = (techId: string) => {
    // Logic to open a dialog to add hours
    toast({ title: "Acción no implementada", description: `Aquí se abriría un modal para añadir horas a ${techId}.`})
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <DashboardHeader title="Gestión de Técnicos">
        <Button onClick={handleNewTechnician} variant="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Técnico
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Card>
           <CardHeader>
            <CardTitle>Equipo de Mecánicos</CardTitle>
            <CardDescription>
              Administre la información, especialidades y carga de trabajo de su equipo técnico.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((tech) => (
            <Card key={tech.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="mechanic portrait" />
                            <AvatarFallback>{tech.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                             <CardTitle>{tech.name}</CardTitle>
                             <CardDescription>ID: {tech.id}</CardDescription>
                        </div>
                    </div>
                     <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                    <h4 className="text-sm font-semibold mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-2">
                        {tech.specialties.map(spec => (
                            <Badge key={spec} variant="secondary">{spec}</Badge>
                        ))}
                    </div>
                </div>
                 <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Miembro desde: {new Date(tech.hireDate).toLocaleDateString()}</span>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-semibold">Horas Extra (Mes)</h4>
                        <span className="text-sm font-medium">{tech.extraHoursThisMonth} / {tech.maxExtraHours} hrs</span>
                    </div>
                    <Progress value={(tech.extraHoursThisMonth / tech.maxExtraHours) * 100} />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                 <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4"/> Ver Perfil Completo
                 </Button>
                  <Button variant="secondary" className="w-full" onClick={() => handleAddExtraHours(tech.id)}>
                    Añadir Horas
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
