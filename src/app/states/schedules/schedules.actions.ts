import { ScheduleGroupModel } from 'src/app/models/schedule-group';
import { ScheduleModel }      from 'src/app/models/schedule-model';

export class AddScheduleGroup {
  public static readonly type = '[SchedulesGroups] Add group';

  constructor(public payload: ScheduleGroupModel) {
  }
}

export class AddScheduleToCurrent {
  public static readonly type = '[SchedulesGroups] Add schedule';

  constructor(public schedule: ScheduleModel) {
  }
}

export class RemoveScheduleGroup {
  public static readonly type = '[SchedulesGroups] Remove group';

  constructor(public index: number) {
  }
}

export class RemoveScheduleFromCurrent {
  public static readonly type = '[SchedulesGroups] Remove schedule';

  constructor(public index: number) {
  }
}

export class ClearCurrentSchedule {
  public static readonly type = '[SchedulesGroups] Clear current schedule';

  constructor() {
  }
}

export class AddCurrentScheduleToGroup {
  public static readonly type = '[SchedulesGroups] Add current schedule to group';

  constructor(public className: string) {
  }
}
