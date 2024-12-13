import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaySearchComponent } from './holiday-search.component';

describe('HolidaySearchComponent', () => {
  let component: HolidaySearchComponent;
  let fixture: ComponentFixture<HolidaySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
