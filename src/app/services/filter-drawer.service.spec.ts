import { TestBed } from '@angular/core/testing';

import { FilterDrawerService } from './filter-drawer.service';

describe('FilterDrawerService', () => {
  let service: FilterDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
