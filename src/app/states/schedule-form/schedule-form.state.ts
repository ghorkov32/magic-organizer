import {State, Selector, Action, StateContext, Store} from '@ngxs/store';
import {SubmitScheduleForClass} from './schedule-form.actions';
import {AddScheduleToCurrent} from '../schedules/schedules.actions';
import {ScheduleModel} from '../../models/schedule-model';
import * as uuid from 'uuid';
import {SchedulerService} from '../../services/scheduler.service';


@State<any>({
  name: 'scheduleForm',
  defaults: {
    timepickerForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})

export class ScheduleFormState {

  constructor(private store: Store, private schedulerService: SchedulerService) {
  }

  @Selector()
  public static getState(state: any) {
    return state;
  }

  @Action(SubmitScheduleForClass)
  submitScheduleForClass({setState, getState}: StateContext<ScheduleFormState>) {
    // @ts-ignore
    const timepickerForm = getState().scheduleForm.timepickerForm.model;
    const uuidForSchedule: string = uuid.v4();
    const selectedDoTW: Date = this.schedulerService.nextWeekdayDate(new Date(), timepickerForm.dayOfTheWeek);
    const dateStart = new Date(selectedDoTW.getTime());
    const dateEnd = new Date(selectedDoTW.getTime());
    // tslint:disable-next-line:radix
    dateStart.setHours(parseInt(timepickerForm.model.startTime.substr(0, timepickerForm.model.startTime.indexOf(':'))));
    dateStart.setMinutes(parseInt(timepickerForm.model.startTime.substr(timepickerForm.model.startTime.length - 2)));
    dateEnd.setHours(parseInt(timepickerForm.model.endTime.substr(0, timepickerForm.model.endTime.indexOf(':'))));
    dateEnd.setMinutes(parseInt(timepickerForm.model.endTime.substr(timepickerForm.model.endTime.length - 2)));

    const schedule: ScheduleModel = new ScheduleModel(
      uuidForSchedule,
      dateStart,
      dateEnd,
      timepickerForm.name,
      timepickerForm.priority,
      timepickerForm.dayOfTheWeek
    );
    this.store.dispatch(new AddScheduleToCurrent(schedule));

  }
}
