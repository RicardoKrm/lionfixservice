
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, User, HardHat, Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center pb-4">
            <div className="flex justify-center items-center mb-4">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                     <Flame className="h-10 w-10" />
                 </div>
            </div>
          <CardTitle className="text-3xl">Bienvenido a LionFix Cloud ERP</CardTitle>
          <CardDescription className="text-lg">Una solución integral para la gestión de talleres mecánicos modernos.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6 text-center">
            
            {/* Vista Administrador */}
            <div className="flex flex-col">
                 <Card className="flex-grow">
                    <CardHeader>
                        <User className="mx-auto h-8 w-8 text-accent"/>
                        <CardTitle>Administrador</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push("/dashboard")} className="w-full" size="lg">
                            Ingresar
                        </Button>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground pt-4">
                        Acceso a todos los módulos: OTs, Finanzas, CRM, Inventario, Reportes, Configuración y más.
                    </CardFooter>
                </Card>
            </div>
            
            {/* Vista Mecánico */}
            <div className="flex flex-col">
                <Card className="flex-grow">
                    <CardHeader>
                        <HardHat className="mx-auto h-8 w-8 text-accent"/>
                        <CardTitle>Mecánico</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Button onClick={() => router.push("/mechanic/dashboard")} className="w-full" size="lg" variant="secondary">
                            Ingresar
                        </Button>
                    </CardContent>
                     <CardFooter className="text-sm text-muted-foreground pt-4">
                        Vista enfocada en la productividad: Órdenes de Trabajo asignadas y Calendario del taller.
                    </CardFooter>
                </Card>
            </div>

            {/* Vista Cliente */}
             <div className="flex flex-col">
                <Card className="flex-grow">
                    <CardHeader>
                        <Building className="mx-auto h-8 w-8 text-accent"/>
                        <CardTitle>Cliente / Flota</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push("/portal/dashboard")} className="w-full" size="lg" variant="secondary">
                            Ingresar
                        </Button>
                    </CardContent>
                     <CardFooter className="text-sm text-muted-foreground pt-4">
                        Portal de autogestión: revise cotizaciones, historial de servicios y contratos de su flota.
                    </CardFooter>
                </Card>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
