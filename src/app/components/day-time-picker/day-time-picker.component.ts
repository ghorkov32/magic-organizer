import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {Store} from '@ngxs/store';
import {ScheduleModel} from '../../models/schedule-model';
import {AddScheduleToCurrent} from '../../states/schedules/schedules.actions';
import {SchedulerService} from '../../services/scheduler.service';
import * as uuid from 'uuid';
import {CommonErrorStateMatcher} from '../../error-state-matchers/common-error-state-matcher.class';

const TimeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('startTime').value;
  const end = fg.get('endTime').value;
  return TimeFunctions.isTimeRangeValid(start, end) || fg.get('startTime').pristine || fg.get('endTime').pristine
    ? null
    : {range: true};
};

export class TimeFunctions {
  static getHours(time: string): number {
    return parseInt(time.substr(0, time.indexOf(':')), 10);
  }

  static getMinutes(time: string): number {
    return parseInt(time.substr(time.length - 2), 10);
  }

  static isTimeRangeValid(start: string, end: string): boolean {
    return start !==
           null &&
           end !==
           null &&
           (
             TimeFunctions.getHours(start) <
             TimeFunctions.getHours(end) ||
             (
               (
                 TimeFunctions.getHours(start) ===
                 TimeFunctions.getHours(end)
               ) &&
               (
                 TimeFunctions.getMinutes(start) <
                 TimeFunctions.getMinutes(end)
               )
             )
           );
  }

}

@Component({
  selector: 'app-day-time-picker',
  templateUrl: './day-time-picker.component.html',
  styleUrls: ['./day-time-picker.component.scss']
})
export class DayTimePickerComponent implements OnInit {
  public dayTimePickerForm: FormGroup;
  public errorStateMatcher: CommonErrorStateMatcher;
  private startTimeControl: AbstractControl;
  private endTimeControl: AbstractControl;

  constructor(public formBuilder: FormBuilder, private store: Store, private schedulerService: SchedulerService) {
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
    const selectedDoTW: Date = this.schedulerService.nextWeekdayDate(new Date(), dayOfTheWeekValue);
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


}
