import { BehaviorSubject, catchError, combineLatest, debounceTime, map, of, startWith, switchMap, tap } from 'rxjs';
import { IncidentList } from '../../components/incident-list/incident-list';
import { IncidentsApiMeta } from '../../models/incident-api.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IncidentsService } from '../../services/incidents';
import { Incident } from '../../models/incident.model';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface IncidentsViewModel {
  loading: boolean;
  incidents: Incident[];
  meta: IncidentsApiMeta | null;
  errorMessage: string;
}

@Component({
  selector: 'app-incidents-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IncidentList, RouterLink],
  templateUrl: './incidents-page.html',
  styleUrl: './incidents-page.scss'
})
export class IncidentsPage {
  private readonly fb = inject(FormBuilder);
  private readonly incidentsService = inject(IncidentsService);

  readonly page$ = new BehaviorSubject<number>(1);

  readonly filterForm = this.fb.group({
    status: [''],
    severity: [''],
    serviceId: [''],
    q: [''],
    pageSize: [10],
    sort: ['createdAt_desc']
  });

  readonly filters$ = this.filterForm.valueChanges.pipe(
    startWith(this.filterForm.getRawValue()),
    debounceTime(300),
    tap(() => this.page$.next(1))
  );

  readonly vm$ = combineLatest([
    this.filters$,
    this.page$
  ]).pipe(
    switchMap(([formValue, page]) =>
      this.incidentsService.getIncidents({
        status: formValue.status || undefined,
        severity: formValue.severity || undefined,
        serviceId: formValue.serviceId || undefined,
        q: formValue.q || undefined,
        page,
        pageSize: Number(formValue.pageSize) || 10,
        sort: formValue.sort || 'createdAt_desc'
      }).pipe(
        map((result): IncidentsViewModel => ({
          loading: false,
          incidents: result.items,
          meta: result.meta,
          errorMessage: ''
        })),
        startWith({
          loading: true,
          incidents: [],
          meta: null,
          errorMessage: ''
        }),
        catchError((error) => {
          console.error('Error loading incidents', error);

          return of({
            loading: false,
            incidents: [],
            meta: null,
            errorMessage: 'No fue posible cargar los incidentes.'
          });
        })
      )
    )
  );

  clearFilters(): void {
    this.filterForm.reset({
      status: '',
      severity: '',
      serviceId: '',
      q: '',
      pageSize: 10,
      sort: 'createdAt_desc'
    });
  }

  goToPage(page: number, totalPages: number): void {
    if (page < 1 || page > totalPages) {
      return;
    }

    this.page$.next(page);
  }

  getPages(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
}