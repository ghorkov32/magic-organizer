import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesDashboardComponent } from './schedules-dashboard.component';

describe('SchedulesDashboardComponent', () => {
  let component: SchedulesDashboardComponent;
  let fixture: ComponentFixture<SchedulesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulesDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
