import { IncidentSeverity } from './incident.model';

export interface CreateIncidentRequest {
  title: string;
  description: string;
  severity: string;
  serviceId: string;
}