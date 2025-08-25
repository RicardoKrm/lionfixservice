
'use server';

export type VehicleData = {
  make: string;
  model: string;
  year: number;
  vin: string;
  motorNumber: string;
};

// This is a mock function that simulates calling an external vehicle data API.
// In a real application, this function would be replaced with a call to a real external service.
async function getMockVehicleData(plate: string): Promise<VehicleData | null> {
    const mockData: { [key: string]: VehicleData } = {
      "ABCD-12": { make: "Toyota", model: "Corolla", year: 2020, vin: "1234567890ABCDEFG", motorNumber: "1NZ-FE-12345" },
      "EFGH-34": { make: "Honda", model: "Civic", year: 2019, vin: "0987654321HGFEDCBA", motorNumber: "R18Z1-67890" },
    };
    
    const upperCasePlate = plate.toUpperCase();
    if (mockData[upperCasePlate]) {
      return mockData[upperCasePlate];
    }
    return null;
}

/**
 * Looks up vehicle data by its license plate.
 * This Server Action is ready to be connected to a real database or external API.
 * @param plate The license plate to look up.
 * @returns VehicleData if found, otherwise null.
 */
export async function lookupPlate(plate: string): Promise<VehicleData | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real-world scenario, you would replace this mock call
    // with a call to your database or an external API.
    // For example:
    // const response = await fetch(`https://api.vehicleregistry.cl/v1/plates/${plate}`);
    // const data = await response.json();
    // return data;
    
    const data = await getMockVehicleData(plate);
    return data;
}
