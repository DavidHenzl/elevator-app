export interface ElevatorDetails {
  id: number;
  address: string;
  type: string;
  model: string;
  lastService: string;
  status: string;
  installationDate: string;
  manufacturer: string;
  capacityKg: number;
  maxPersons: number;
  numberOfStops: number;
  maintenanceCompany: string;
  maintenanceContact: {
    name: string;
    phone: string;
    email: string;
  };
  notes: string;
}