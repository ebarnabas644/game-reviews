import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGameGridItemComponent } from './featured-game-grid-item.component';

describe('FeaturedGameGridItemComponent', () => {
  let component: FeaturedGameGridItemComponent;
  let fixture: ComponentFixture<FeaturedGameGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedGameGridItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedGameGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
