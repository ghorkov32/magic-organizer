import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store }                              from '@ngxs/store';
import { ScheduleModel }                      from '../../../../models/schedule-model';
import { AddScheduleToCurrent }               from '../../../../states/schedules/schedules.actions';
import * as uuid                              from 'uuid';
import { CommonErrorStateMatcher }            from '../../../../error-state-matchers/common-error-state-matcher.class';
import { TimeFunctions, TimeRangeValidator }  from '../../../../common/time-functions';


@Component({
  selector: 'app-day-time-picker',
  templateUrl: './day-time-picker.component.html',
  styleUrls: ['./day-time-picker.component.scss']
})
export class DayTimePickerComponent implements OnInit {
  public dayTimePickerForm: FormGroup;
  public errorStateMatcher: CommonErrorStateMatcher;

  constructor(private store: Store) {
    this.errorStateMatcher = new CommonErrorStateMatcher();
  }

  ngOnInit() {
    this.dayTimePickerForm = new FormGroup({
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      dayOfTheWeek: new FormControl('', [Validators.required])
    });
    this.dayTimePickerForm.setValidators(TimeRangeValidator);
  }

  submit() {
    this.store.dispatch(new AddScheduleToCurrent(this.createScheduleFromForm()));
    this.clear();
  }

  clear() {
    this.dayTimePickerForm.reset();
  }

  private createScheduleFromForm(): ScheduleModel {
    const startTimeValue = this.dayTimePickerForm.get('startTime').value;
    const endTimeValue = this.dayTimePickerForm.get('endTime').value;
    const dayOfTheWeekValue = this.dayTimePickerForm.get('dayOfTheWeek').value;
    const uuidForSchedule: string = uuid.v4();
    const selectedDoTW: Date = TimeFunctions.nextWeekdayDate(new Date(), dayOfTheWeekValue);
    const dateStart = new Date(selectedDoTW.getTime());
    const dateEnd = new Date(selectedDoTW.getTime());

    dateStart.setHours(TimeFunctions.getHours(startTimeValue));
    dateStart.setMinutes(TimeFunctions.getMinutes(startTimeValue));
    dateStart.setSeconds(0);
    dateEnd.setHours(TimeFunctions.getHours(endTimeValue));
    dateEnd.setMinutes(TimeFunctions.getMinutes(endTimeValue));
    dateEnd.setSeconds(0);

    return new ScheduleModel(
      uuidForSchedule,
      dateStart,
      dateEnd,
      dayOfTheWeekValue
    );
  }

  /**
   * Uncomment for testing
   */
  /*  setUpTestCases() {
      let tool = new ScheduleAdderTestingTool(this.store);
      tool.setUpTestCases();
    }*/
}
