import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSearchComponent } from './system-search.component';

describe('SystemSearchComponent', () => {
  let component: SystemSearchComponent;
  let fixture: ComponentFixture<SystemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
