import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Incident } from '../../models/incident.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, NgClass, DatePipe, RouterLink],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.scss'
})
export class IncidentList {
  @Input({ required: true }) incidents: Incident[] = [];

  trackByIncidentId(index: number, incident: Incident): string {
    return incident.id;
  }

  getStatusBadgeClass(status: Incident['status']): string {
    switch (status) {
      case 'OPEN':
        return 'bg-danger-subtle text-danger';
      case 'IN_PROGRESS':
        return 'bg-warning-subtle text-warning';
      case 'RESOLVED':
        return 'bg-success-subtle text-success';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  getSeverityBadgeClass(severity: Incident['severity']): string {
    switch (severity) {
      case 'HIGH':
        return 'bg-danger text-white';
      case 'MEDIUM':
        return 'bg-warning text-dark';
      case 'LOW':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  }
}