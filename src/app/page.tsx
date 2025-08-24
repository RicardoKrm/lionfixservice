
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, User, HardHat, Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl bg-card border-border">
        <CardHeader className="text-center pb-8 pt-10">
            <div className="flex justify-center items-center mb-4">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
                     <ShieldCheck className="h-10 w-10" />
                 </div>
            </div>
          <CardTitle className="text-4xl font-bold text-primary">Bienvenido a LionFix Cloud ERP</CardTitle>
          <CardDescription className="text-xl text-muted-foreground mt-2">
              Seleccione un rol para explorar la vista correspondiente del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-8 text-center p-8">
            
            {/* Vista Administrador */}
            <div className="flex flex-col">
                 <Card className="flex-grow flex flex-col bg-card/50 border-primary border-2 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                    <CardHeader>
                        <User className="mx-auto h-12 w-12 text-primary mb-2"/>
                        <CardTitle className="text-2xl">Administrador</CardTitle>
                        <CardDescription>Acceso completo al sistema</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow text-left space-y-2 text-muted-foreground">
                        <p><strong>Módulos Visibles:</strong></p>
                        <ul className="list-disc list-inside text-sm">
                            <li>Panel de Control (KPIs)</li>
                            <li>Órdenes de Trabajo (Todas)</li>
                            <li>Calendario y Clientes (CRM)</li>
                            <li>Inventario y Compras</li>
                            <li>Finanzas (Cotizaciones, Reportes)</li>
                            <li>Gestión (Checklists, Contratos)</li>
                            <li>Configuración del Sistema</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button onClick={() => router.push("/dashboard")} className="w-full" size="lg">
                            Explorar Vista Administrador
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Vista Mecánico */}
            <div className="flex flex-col">
                <Card className="flex-grow flex flex-col bg-card/50 hover:shadow-xl hover:border-muted-foreground/50 transition-all duration-300">
                    <CardHeader>
                        <HardHat className="mx-auto h-12 w-12 text-accent mb-2"/>
                        <CardTitle className="text-2xl">Mecánico</CardTitle>
                         <CardDescription>Enfocado en la productividad</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow text-left space-y-2 text-muted-foreground">
                        <p><strong>Módulos Visibles:</strong></p>
                        <ul className="list-disc list-inside text-sm">
                            <li>Mis Tareas (OTs Asignadas)</li>
                            <li>Calendario del Taller</li>
                            <li>Checklists de Vehículos</li>
                        </ul>
                    </CardContent>
                     <CardFooter className="p-4">
                         <Button onClick={() => router.push("/mechanic/dashboard")} className="w-full" size="lg" variant="secondary">
                            Explorar Vista Mecánico
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Vista Cliente */}
             <div className="flex flex-col">
                <Card className="flex-grow flex flex-col bg-card/50 hover:shadow-xl hover:border-muted-foreground/50 transition-all duration-300">
                    <CardHeader>
                        <Building className="mx-auto h-12 w-12 text-accent mb-2"/>
                        <CardTitle className="text-2xl">Cliente / Flota</CardTitle>
                        <CardDescription>Portal de autogestión</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow text-left space-y-2 text-muted-foreground">
                       <p><strong>Módulos Visibles:</strong></p>
                        <ul className="list-disc list-inside text-sm">
                            <li>Mis Vehículos</li>
                            <li>Historial de Servicios</li>
                            <li>Mis Cotizaciones</li>
                            <li>Mis Contratos de Flota</li>
                        </ul>
                    </CardContent>
                     <CardFooter className="p-4">
                        <Button onClick={() => router.push("/portal/dashboard")} className="w-full" size="lg" variant="secondary">
                            Explorar Vista Cliente
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
