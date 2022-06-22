import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGameGridComponent } from './featured-game-grid.component';

describe('FeaturedGameGridComponent', () => {
  let component: FeaturedGameGridComponent;
  let fixture: ComponentFixture<FeaturedGameGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedGameGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedGameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
