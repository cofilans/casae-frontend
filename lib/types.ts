export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  units?: Unit[];
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  monthlyRentChf: number;
  doorAccessCode: string;
  createdAt: string;
  updatedAt: string;
  property?: Property;
  tenants?: Tenant[];
  tickets?: Ticket[];
}

export interface Tenant {
  id: string;
  unitId: string;
  firstName: string;
  lastName: string;
  email: string;
  personalPhone: string;
  salaryChf: number;
  createdAt: string;
  updatedAt: string;
  unit?: Unit;
  tickets?: Ticket[];
}

export interface Ticket {
  id: string;
  tenantId: string;
  unitId: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  preferredTimeslot?: string;
  createdAt: string;
  updatedAt: string;
  tenant?: Tenant;
  unit?: Unit;
}
