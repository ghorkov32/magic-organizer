import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScheduleGroupModel }                         from '../../../models/schedule-group';
import { Select }                                     from '@ngxs/store';
import { SchedulePermutationsState }                  from '../../../states/schedule-permutations/schedule-permutations.state';
import { Observable }                                 from 'rxjs';

@Component({
  selector: 'app-calendars-list',
  templateUrl: './calendars-list.component.html',
  styleUrls: ['./calendars-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarsListComponent implements OnInit {


  @Select(SchedulePermutationsState.getScheduledPermutations)
  public schedulePermutations$: Observable<ScheduleGroupModel[][]>;

  public viewDate = new Date();

  constructor() {
  }

  ngOnInit() {
    this.schedulePermutations$.subscribe(res => console.log(res));
    this.viewDate.setDate(this.viewDate.getDate() + (
      1 + 7 - this.viewDate.getDay()
    ) % 7);
  }

}
