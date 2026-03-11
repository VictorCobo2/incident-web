import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  IncidentFilters,
  IncidentsApiResponse,
  IncidentsResult,
} from '../models/incident-api.model';
import { CreateIncidentRequest } from '../models/create-incident.model';
import { IncidentDetailResponse } from '../models/incident-detail.model';
import { UpdateIncidentStatusRequest } from '../models/update-incident-status.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getIncidents(filters: IncidentFilters): Observable<IncidentsResult> {
    let params = new HttpParams();

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.severity) {
      params = params.set('severity', filters.severity);
    }

    if (filters.serviceId) {
      params = params.set('serviceId', filters.serviceId);
    }

    if (filters.q) {
      params = params.set('q', filters.q);
    }

    if (filters.page) {
      params = params.set('page', filters.page);
    }

    if (filters.pageSize) {
      params = params.set('pageSize', filters.pageSize);
    }

    if (filters.sort) {
      params = params.set('sort', filters.sort);
    }

    return this.http.get<IncidentsApiResponse>(`${this.apiUrl}/incidents`, { params }).pipe(
      map((response) => ({
        items: response.data.map((item) => ({
          id: item.Id,
          title: item.Title,
          description: item.Description,
          severity: item.Severity,
          status: item.Status,
          serviceId: item.ServiceId,
          createdAt: item.CreatedAt,
          updatedAt: item.UpdatedAt,
        })),
        meta: response.meta,
      })),
    );
  }

  createIncident(payload: CreateIncidentRequest) {
    return this.http.post(`${this.apiUrl}/incidents`, payload);
  }

  getIncidentById(id: string) {
    return this.http.get<IncidentDetailResponse>(`${this.apiUrl}/incidents/${id}`).pipe(
      map((response) => ({
        incident: {
          id: response.data.incident.Id,
          title: response.data.incident.Title,
          description: response.data.incident.Description,
          severity: response.data.incident.Severity,
          status: response.data.incident.Status,
          serviceId: response.data.incident.ServiceId,
          createdAt: response.data.incident.CreatedAt,
          updatedAt: response.data.incident.UpdatedAt,
        },
        timeline: response.data.timeline,
      })),
    );
  }

  updateIncidentStatus(id: string, payload: UpdateIncidentStatusRequest) {
    return this.http.patch(`${this.apiUrl}/incidents/${id}/status`, payload);
  }
}
