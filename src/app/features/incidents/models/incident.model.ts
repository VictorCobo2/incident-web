export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  serviceId: string;
  createdAt?: string;
  updatedAt?: string;
}