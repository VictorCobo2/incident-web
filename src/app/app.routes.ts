import { Routes } from '@angular/router';
import { IncidentsPage } from './features/incidents/pages/incidents-page/incidents-page';
import { IncidentCreate } from './features/incidents/pages/incident-create/incident-create';
import { IncidentDetail } from './features/incidents/pages/incident-detail/incident-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'incidents',
    pathMatch: 'full',
  },
  {
    path: 'incidents',
    component: IncidentsPage,
  },
  {
    path: 'incidents/new',
    component: IncidentCreate,
  },
  {
    path: 'incidents/:id',
    component: IncidentDetail,
  },
  {
    path: '**',
    redirectTo: 'incidents',
  },
];
