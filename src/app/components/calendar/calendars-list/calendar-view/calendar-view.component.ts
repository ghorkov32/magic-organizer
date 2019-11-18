import { Component, Input, OnInit, ViewEncapsulation }   from '@angular/core';
import { ScheduleGroupModel }                            from '../../../../models/schedule-group';
import { Subject }                                       from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  encapsulation: ViewEncapsulation.None, // hack to get the styles to apply locally
  styles: [
      `
          .my-custom-class span {
              color: #ff3d7f !important;
          }
    `
  ]
})
export class CalendarViewComponent implements OnInit {
  @Input()
  public startDate: Date;
  @Input()
  public endDate: Date;
  refresh: Subject<any> = new Subject();
  public mappedSchedule: CalendarEvent[] = [];

  constructor() {
  }

  private _schedule: ScheduleGroupModel[];

  get schedule(): ScheduleGroupModel[] {
    return this._schedule;
  }

  @Input('schedule')
  set schedule(value: ScheduleGroupModel[]) {
    this._schedule = value;
    let mapped: CalendarEvent[] = [];
    this.schedule.forEach(schedGroup => {
      mapped.push(...schedGroup.schedules.map(schedToMap => {
        return {
          // actions: EventAction[];
          // allDay: boolean;
          color: {
            primary: schedToMap.color,
            secondary: schedToMap.color
          },
          cssClass: 'my-custom-class',
          draggable: false,
          end: new Date(schedToMap.dateTo),
          id: schedToMap.UUID,
          // meta: any;
          // resizable: { beforeStart?: boolean; afterEnd?: boolean };
          start: new Date(schedToMap.dateFrom),
          title: schedToMap.name,
        }
      }))
    });
    this.mappedSchedule = mapped;
    this.refresh.next();
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  ngOnInit() {
  }

  fixDate(date: Date): Date {
    if (date > this.startDate && date < this.endDate) {
      return date;
    } else {
      if (date < this.startDate) {
        date.setDate(date.getDate() + (
                     date.getDay() + 7
        ));
        return date;
      } else {
        date.setDate(date.getDate() + (
          date.getDay() - 7
        ));
        return date;
      }
    }
  }

}
