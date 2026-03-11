import { Incident } from './incident.model';

export interface TimelineEvent {
  incidentId: string;
  eventType: string;
  payload: {
    previousStatus: string | null;
    newStatus: string;
  };
  createdAt: string;
}

export interface IncidentDetailResponse {
  success: boolean;
  data: {
    incident: {
      Id: string;
      Title: string;
      Description: string;
      Severity: string;
      Status: string;
      ServiceId: string;
      CreatedAt: string;
      UpdatedAt: string;
    };
    timeline: TimelineEvent[];
  };
}

export interface IncidentDetail {
  incident: Incident;
  timeline: TimelineEvent[];
}