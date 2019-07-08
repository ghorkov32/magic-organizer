import { ScheduleGroupModel } from 'src/app/models/schedule-group';
import { ScheduleModel } from 'src/app/models/schedule-model';

export class AddScheduleGroup {
  public static readonly type = '[SchedulesGroups] Add group';
  constructor(public payload: ScheduleGroupModel) { }
}

export class AddSchedule {
  public static readonly type = '[SchedulesGroups] Add schedule';
  constructor(public payload: ScheduleModel) { }
}

export class RemoveScheduleGroup {
  public static readonly type = '[SchedulesGroups] Remove group';
  constructor(public groupIndex: number) { }
}

export class RemoveSchedule {
  public static readonly type = '[SchedulesGroups] Remove schedule';
  constructor(public group: ScheduleGroupModel, public scheduleIndex: ScheduleModel) { }
}
