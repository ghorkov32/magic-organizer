export class ScheduleModel {
  UUID: string;
  dayOfTheWeek: number;
  dateFrom: Date;
  dateTo: Date;
  name: string;
  priority: number;
  color: string;
  parentUUID: string;

  constructor(UUID: string, dateFrom: Date, dateTo: Date,
              dayOfTheWeek: number) {
    this.UUID = UUID;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.dayOfTheWeek = dayOfTheWeek;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPriority(priority: number) {
    this.priority = priority;
  }

  static dateRangeOverlaps(that: ScheduleModel, obj: ScheduleModel) {
    if (that.dayOfTheWeek !== obj.dayOfTheWeek) return false;
    if (that.dateFrom === obj.dateTo || that.dateTo === obj.dateFrom) return false;
    if (that.dateFrom <= obj.dateFrom && obj.dateFrom <= that.dateTo) return true; // b starts in a
    if (that.dateFrom <= obj.dateTo && obj.dateTo <= that.dateTo) return true; // b ends in a
    if (obj.dateFrom < that.dateFrom && that.dateTo < obj.dateTo) return true; // a in b
    return false;
  }

  static equals(obj1: ScheduleModel, obj2: ScheduleModel): boolean {
    return obj1.UUID === obj2.UUID || ScheduleModel.dateRangeOverlaps(obj1, obj2);
  }

}
