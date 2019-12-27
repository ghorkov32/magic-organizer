import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScheduleGroupModel }                         from '../../../models/schedule-group';
import { Select }                                     from '@ngxs/store';
import { SchedulePermutationsState }                  from '../../../states/schedule-permutations/schedule-permutations.state';
import { Observable }                                 from 'rxjs';
import { map }                                        from 'rxjs/operators';

@Component({
  selector: 'app-calendars-list',
  templateUrl: './calendars-list.component.html',
  styleUrls: ['./calendars-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarsListComponent implements OnInit {


  @Select(SchedulePermutationsState.getScheduledPermutations)
  public schedulePermutations$: Observable<ScheduleGroupModel[][]>;

  @Select(SchedulePermutationsState.getIsProcessing)
  public isProcessing$: Observable<boolean>;

  public viewDate = new Date();
  public endViewDate = new Date();

  public hourStartArray: number[] = [];
  public hourEndArray: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.isProcessing$.pipe(map(res => console.log(res)));
    this.viewDate.setDate(this.viewDate.getDate() + 1);
    this.schedulePermutations$.subscribe(res => {
        res.forEach(scheduleGroupArray => {
          let fromHours = scheduleGroupArray
            .map(scheduleGroup =>
              scheduleGroup.schedules.map(schedule => schedule.dateFrom.getHours()));
          let toHours = scheduleGroupArray
            .map(scheduleGroup =>
              scheduleGroup.schedules.map(schedule => schedule.dateFrom.getHours()));
          console.log(fromHours);
          console.log(toHours)
        })
      }
    );
    // Getting next monday
    this.viewDate.setDate(this.viewDate.getDate() + (
      1 + 7 - this.viewDate.getDay()
    ) % 7);
    this.viewDate.setHours(0);
    this.viewDate.setMinutes(0);
    this.viewDate.setSeconds(0);
    this.endViewDate = new Date(this.viewDate.getTime());
    this.endViewDate.setDate(this.viewDate.getDate() + 7);
  }

}
