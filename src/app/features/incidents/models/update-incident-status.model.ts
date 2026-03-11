import { IncidentStatus } from './incident.model';

export interface UpdateIncidentStatusRequest {
  status: IncidentStatus;
}