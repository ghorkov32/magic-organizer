export class ScheduleModel {
  UUID: string;
  dayOfTheWeek: number;
  dateStringFrom: string;
  dateStringTo: string;
  dateFrom: Date;
  dateTo: Date;
  name: string;
  priority: number;

  constructor(UUID: string, dateStringFrom: string, dateStringTo: string, name: string, priority: number, dayOfTheWeek: number) {
    this.UUID = UUID;
    this.dateStringFrom = dateStringFrom;
    this.dateStringTo = dateStringTo;
    this.dayOfTheWeek = dayOfTheWeek;
    this.name = name;
    this.priority = priority;
  }
}
