
'use server';

export type VehicleData = {
  make: string;
  model: string;
  year: number;
  vin: string;
};

// This is a mock server action. In a real app, this would call an external API.
export async function lookupPlate(plate: string): Promise<VehicleData | null> {
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
