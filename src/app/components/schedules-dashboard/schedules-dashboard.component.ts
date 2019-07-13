import { Component, OnInit }   from '@angular/core';
import { Observable }          from 'rxjs';
import { ScheduleGroupModel }  from 'src/app/models/schedule-group';
import { Select }              from '@ngxs/store';
import { SchedulesGroupState } from '../../states/schedules/schedules.state';

@Component({
  selector: 'app-schedules-dashboard',
  templateUrl: './schedules-dashboard.component.html',
  styleUrls: ['./schedules-dashboard.component.scss']
})
export class SchedulesDashboardComponent implements OnInit {

  @Select(SchedulesGroupState.getState)
  public scheduleGroups$: Observable<ScheduleGroupModel[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
