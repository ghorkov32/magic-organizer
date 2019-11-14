import { Component, OnInit }    from '@angular/core';
import { ScheduleGroupModel }   from 'src/app/models/schedule-group';
import { Select, Store }        from '@ngxs/store';
import { SchedulesGroupState }  from '../../../states/schedules/schedules.state';
import { Observable }           from 'rxjs';
import { GeneratePermutations } from '../../../states/schedule-permutations/schedule-permutations.actions';

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
}
