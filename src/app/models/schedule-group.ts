import { ScheduleModel } from './schedule-model';

export class ScheduleGroupModel {

  public name = '';
  public schedules: ScheduleModel[];
  public UUID: string = '';

  constructor(schedules: ScheduleModel[]) {
    this.schedules = schedules;
  }

  addSchedule(schedule: ScheduleModel) {
    this.schedules.push(schedule);
  }

  removeSchedule(index: number) {
    this.schedules.splice(index, 1);
  }

  static equals(obj1: ScheduleGroupModel, obj2: ScheduleGroupModel): boolean {
    for (const schedule of obj1.schedules) {
      if (obj2.schedules.filter(scheduleB => ScheduleModel.equals(schedule, scheduleB)).length > 0) {
        return true;
      }
    }
    return obj1.name === obj2.name;
  }
}
