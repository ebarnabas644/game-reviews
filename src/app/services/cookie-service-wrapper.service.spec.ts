import { TestBed } from '@angular/core/testing';

import { CookieServiceWrapperService } from './cookie-service-wrapper.service';

describe('CookieServiceWrapperService', () => {
  let service: CookieServiceWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieServiceWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
