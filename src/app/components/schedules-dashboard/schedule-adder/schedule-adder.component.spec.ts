import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAdderComponent } from './schedule-adder.component';

describe('ScheduleAdderComponent', () => {
  let component: ScheduleAdderComponent;
  let fixture: ComponentFixture<ScheduleAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleAdderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
