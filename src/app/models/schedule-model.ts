export class ScheduleModel {
  UUID: string;
  dayOfTheWeek: number;
  dateFrom: Date;
  dateTo: Date;
  name: string;
  priority: number;
  color: string;

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

}
