import { ScheduleModel } from './schedule-model';

export class ScheduleGroupModel {
  schedules: ScheduleModel[];

  constructor(schedules: ScheduleModel[]) {
    this.schedules = schedules;
  }

  addSchedule(schedule: ScheduleModel) {
    this.schedules.push(schedule);
  }

  removeSchedule(index: number) {
    this.schedules.splice(index, 1);
  }
}
