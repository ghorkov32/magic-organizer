import { Component, OnInit }                  from '@angular/core';
import { Select, Store }                      from '@ngxs/store';
import { SchedulesGroupState }                from '../../../states/schedules/schedules.state';
import { ScheduleGroupModel }                 from '../../../models/schedule-group';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable }                         from 'rxjs';
import { ClearCurrentSchedule }               from '../../../states/schedules/schedules.actions';

@Component({
  selector: 'app-schedule-adder',
  templateUrl: './schedule-adder.component.html',
  styleUrls: ['./schedule-adder.component.scss']
})
export class ScheduleAdderComponent implements OnInit {

  @Select(SchedulesGroupState.getCurrentSchedule)
  currentSchedule$: Observable<ScheduleGroupModel>;

  scheduleAdderForm: FormGroup;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.scheduleAdderForm = new FormGroup({
      className: new FormControl('', [Validators.required]),
      //priority: new FormControl('', [Validators.required]),
    });
  }

  submit() {

  }

  clear() {
    this.store.dispatch(new ClearCurrentSchedule());
    this.scheduleAdderForm.reset();
  }
}
