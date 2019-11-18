import { Component, OnInit }   from '@angular/core';
import { ScheduleGroupModel }  from 'src/app/models/schedule-group';
import { Select, Store }       from '@ngxs/store';
import { SchedulesGroupState } from '../../../states/schedules/schedules.state';
import { Observable }          from 'rxjs';
import {
  ClearEveryPermutation,
  GeneratePermutations
}                              from '../../../states/schedule-permutations/schedule-permutations.actions';
import { ClearEverySchedule }  from '../../../states/schedules/schedules.actions';

@Component({
  selector: 'app-added-classes',
  templateUrl: './added-classes.component.html',
  styleUrls: ['./added-classes.component.scss']
})
export class AddedClassesComponent implements OnInit {

  @Select(SchedulesGroupState.getScheduleGroups)
  public addedClasses$: Observable<ScheduleGroupModel[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    //this.addedClasses$.subscribe(res => console.log(JSON.stringify(res)));
  }

  calculate() {
    this.store.dispatch(new GeneratePermutations());
  }

  clearAll() {
    //TODO: Implement popup to confirm
    this.store.dispatch(new ClearEveryPermutation());
    this.store.dispatch(new ClearEverySchedule());
  }
}
