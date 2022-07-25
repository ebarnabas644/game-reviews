import { TestBed } from '@angular/core/testing';

import { DesktopModeService } from './desktop-mode.service';

describe('DesktopModeService', () => {
  let service: DesktopModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesktopModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
