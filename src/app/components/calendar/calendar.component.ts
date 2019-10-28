import { Component, OnInit }         from '@angular/core';
import { Select }                    from '@ngxs/store';
import { Observable }                from 'rxjs';
import { SchedulePermutationsState } from '../../states/schedule-permutations/schedule-permutations.state';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Select(SchedulePermutationsState)
  public schedulePermutations$: Observable<any[]>;

  public stringifiedPermutations: string;

  constructor() {
  }

  ngOnInit() {
    this.schedulePermutations$.subscribe(res => this.stringifiedPermutations = JSON.stringify((
      res as any
    ).items));
  }


}
