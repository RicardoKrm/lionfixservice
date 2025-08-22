
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginAsAdmin = () => {
    router.push("/dashboard");
  };

  const handleLoginAsClient = () => {
    // In a real app, you'd go to a client-specific page
    router.push("/portal/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                     <Flame className="h-8 w-8" />
                 </div>
            </div>
          <CardTitle className="text-2xl">Bienvenido a LionFix ERP</CardTitle>
          <CardDescription>Seleccione un rol para continuar con la demostración.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleLoginAsAdmin} className="w-full" size="lg">
            Ingresar como Administrador
          </Button>
          <Button onClick={handleLoginAsClient} className="w-full" size="lg" variant="secondary">
            Ingresar como Cliente
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
