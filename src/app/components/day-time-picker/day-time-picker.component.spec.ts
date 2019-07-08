import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimePickerComponent } from './day-time-picker.component';

describe('DayTimePickerComponent', () => {
  let component: DayTimePickerComponent;
  let fixture: ComponentFixture<DayTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
