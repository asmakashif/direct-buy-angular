import { TestBed } from '@angular/core/testing';

import { UniqueOrdersService } from './unique-orders.service';

describe('UniqueOrdersService', () => {
  let service: UniqueOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
