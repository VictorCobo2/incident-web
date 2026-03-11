export interface IncidentApiItem {
  Id: string;
  Title: string;
  Description: string;
  Severity: string;
  Status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  ServiceId?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface IncidentsApiResponse {
  success: boolean;
  data: IncidentApiItem[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    sort: string;
  };
}