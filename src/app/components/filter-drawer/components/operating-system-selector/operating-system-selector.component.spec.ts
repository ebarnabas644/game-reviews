import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingSystemSelectorComponent } from './operating-system-selector.component';

describe('OperatingSystemSelectorComponent', () => {
  let component: OperatingSystemSelectorComponent;
  let fixture: ComponentFixture<OperatingSystemSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingSystemSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingSystemSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
