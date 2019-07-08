export class ScheduleModel {
  UUID: string;
  dayOfTheWeek: number;
  dateFrom: Date;
  dateTo: Date;
  name: string;
  priority: number;

  constructor(UUID: string, dateFrom: Date, dateTo: Date,
              name: string, priority: number, dayOfTheWeek: number) {
    this.UUID = UUID;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.dayOfTheWeek = dayOfTheWeek;
    this.name = name;
    this.priority = priority;
  }
}
