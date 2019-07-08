import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-day-time-picker',
  templateUrl: './day-time-picker.component.html',
  styleUrls: ['./day-time-picker.component.scss']
})
export class DayTimePickerComponent implements OnInit {

  startTimeControl: FormControl;
  endTimeControl: FormControl;
  dayOfTheWeekControl: FormControl;
  public form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.startTimeControl = new FormControl();
    this.endTimeControl = new FormControl();
    this.dayOfTheWeekControl = new FormControl();
    this.form = new FormGroup({
      startTime: new FormControl(''),
      endTime:  new FormControl(''),
      dayOfTheWeek:  new FormControl('')
    });
  }

}
