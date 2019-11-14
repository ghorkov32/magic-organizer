import { Component, Input, OnInit }                      from '@angular/core';
import { ScheduleGroupModel }                            from '../../../../models/schedule-group';
import { Subject }                                       from 'rxjs';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  @Input()
  public startDate: Date;
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
          //cssClass: string,
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

}
