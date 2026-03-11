import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IncidentsService } from './incidents';

describe('IncidentsService', () => {
  let service: IncidentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncidentsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(IncidentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get incidents and map api response correctly', () => {
    const apiResponse = {
      success: true,
      data: [
        {
          Id: '4029AF0E-9785-428E-A3D6-6F9B658B1784',
          Title: 'Pago falla al confirmar',
          Description: 'Error 500 intermitente',
          Severity: 'HIGH',
          Status: 'OPEN',
          ServiceId: 'timeout-service',
          CreatedAt: '2026-03-11T06:45:53.861Z',
          UpdatedAt: '2026-03-11T06:58:13.076Z'
        }
      ],
      meta: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
        sort: 'createdAt_desc'
      }
    };

    let actualResult: any;

    service.getIncidents({
      page: 1,
      pageSize: 10,
      sort: 'createdAt_desc'
    }).subscribe((result) => {
      actualResult = result;
    });

    const req = httpMock.expectOne((request) => {
      return request.method === 'GET' &&
        request.url.includes('/incidents');
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('pageSize')).toBe('10');
    expect(req.request.params.get('sort')).toBe('createdAt_desc');

    req.flush(apiResponse);

    expect(actualResult).toBeTruthy();
    expect(actualResult.items.length).toBe(1);
    expect(actualResult.meta.total).toBe(1);

    expect(actualResult.items[0]).toEqual({
      id: '4029AF0E-9785-428E-A3D6-6F9B658B1784',
      title: 'Pago falla al confirmar',
      description: 'Error 500 intermitente',
      severity: 'HIGH',
      status: 'OPEN',
      serviceId: 'timeout-service',
      createdAt: '2026-03-11T06:45:53.861Z',
      updatedAt: '2026-03-11T06:58:13.076Z'
    });
  });
});