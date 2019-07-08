import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleModel } from 'src/app/models/schedule-model';
import { ScheduleGroupModel } from 'src/app/models/schedule-group';

@Component({
  selector: 'app-schedules-dashboard',
  templateUrl: './schedules-dashboard.component.html',
  styleUrls: ['./schedules-dashboard.component.scss']
})
export class SchedulesDashboardComponent implements OnInit {

  public schedules$: Observable<ScheduleGroupModel[]>;

  constructor() { }

  ngOnInit() {
  }

}
