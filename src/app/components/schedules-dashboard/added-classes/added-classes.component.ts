import { Component, OnInit }   from '@angular/core';
import { ScheduleGroupModel }  from 'src/app/models/schedule-group';
import { Select }              from '@ngxs/store';
import { SchedulesGroupState } from '../../../states/schedules/schedules.state';
import { Observable }          from 'rxjs';

@Component({
  selector: 'app-added-classes',
  templateUrl: './added-classes.component.html',
  styleUrls: ['./added-classes.component.scss']
})
export class AddedClassesComponent implements OnInit {

  @Select(SchedulesGroupState.getScheduleGroups)
  public addedClasses$: Observable<ScheduleGroupModel[]>;

  constructor() {
  }

  ngOnInit() {
  }

}
