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
  dayTimePickerFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.startTimeControl = new FormControl();
    this.endTimeControl = new FormControl();
    this.dayOfTheWeekControl = new FormControl();
    this.dayTimePickerFormGroup = this.formBuilder.group({
      starTime: this.startTimeControl,
      endtime: this.endTimeControl,
      dayOfTheWeek: this.dayOfTheWeekControl
    });
  }

}
