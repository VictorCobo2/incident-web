import { IncidentStatus, IncidentSeverity } from './incident.model';

export interface IncidentApiItem {
  Id: string;
  Title: string;
  Description: string;
  Severity: IncidentSeverity;
  Status: IncidentStatus;
  ServiceId: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IncidentsApiMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  sort: string;
}

export interface IncidentsApiResponse {
  success: boolean;
  data: IncidentApiItem[];
  meta: IncidentsApiMeta;
}

export interface IncidentFilters {
  status?: string;
  severity?: string;
  serviceId?: string;
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface IncidentsResult {
  items: import('./incident.model').Incident[];
  meta: IncidentsApiMeta;
}