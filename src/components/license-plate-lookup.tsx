"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VehicleData = {
  make: string;
  model: string;
  year: number;
  vin: string;
};

// This is a mock server action. In a real app, this would call an external API.
async function lookupPlate(plate: string): Promise<VehicleData | null> {
    "use server"
    const mockData: { [key: string]: VehicleData } = {
      "ABCD-12": { make: "Toyota", model: "Corolla", year: 2020, vin: "1234567890ABCDEFG" },
      "EFGH-34": { make: "Honda", model: "Civic", year: 2019, vin: "0987654321HGFEDCBA" },
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const upperCasePlate = plate.toUpperCase();
    if (mockData[upperCasePlate]) {
      return mockData[upperCasePlate];
    }
    return null;
}


export function LicensePlateLookup() {
  const [plate, setPlate] = useState("");
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLookup = async () => {
    if (!plate) return;
    setIsLoading(true);
    setVehicleData(null);
    const data = await lookupPlate(plate);
    setIsLoading(false);
    if (data) {
      setVehicleData(data);
    } else {
      toast({
        variant: "destructive",
        title: "No Encontrado",
        description: `No se encontraron datos para la patente: ${plate}`,
      });
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm dark:bg-card">
      <CardHeader>
        <CardTitle>Búsqueda por Patente</CardTitle>
        <CardDescription>
          Ingrese una patente para buscar datos del vehículo desde una fuente externa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="ej: ABCD-12"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="font-mono uppercase"
          />
          <Button type="submit" onClick={handleLookup} disabled={isLoading}>
            {isLoading ? "Buscando..." : <><Search className="mr-2 h-4 w-4" /> Buscar</>}
          </Button>
        </div>
        {vehicleData && (
          <div className="mt-4 rounded-lg border bg-background/50 p-4 text-sm">
            <h4 className="font-semibold">Detalles del Vehículo:</h4>
            <p><strong>Marca:</strong> {vehicleData.make}</p>
            <p><strong>Modelo:</strong> {vehicleData.model}</p>
            <p><strong>Año:</strong> {vehicleData.year}</p>
            <p><strong>VIN:</strong> <span className="font-code">{vehicleData.vin}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
