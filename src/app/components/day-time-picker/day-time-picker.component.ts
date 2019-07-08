import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Store} from "@ngxs/store";
import {SubmitScheduleForClass} from "../../states/schedule-form/schedule-form.actions";

@Component({
  selector: 'app-day-time-picker',
  templateUrl: './day-time-picker.component.html',
  styleUrls: ['./day-time-picker.component.scss']
})
export class DayTimePickerComponent implements OnInit {

  public dayTimePickerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit() {
    this.dayTimePickerForm = new FormGroup({
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      dayOfTheWeek: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.store.dispatch(new SubmitScheduleForClass());
    this.clear();
  }

  clear() {
    this.dayTimePickerForm.setValue({});
    this.dayTimePickerForm.markAsPristine();
  }
}
