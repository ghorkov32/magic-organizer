import { Component, Input, OnInit }  from '@angular/core';
import { ScheduleModel }             from 'src/app/models/schedule-model';
import { Store }                     from '@ngxs/store';
import { RemoveScheduleFromCurrent } from '../../../states/schedules/schedules.actions';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: ScheduleModel;
  @Input() index: number;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  remove() {
    this.store.dispatch(new RemoveScheduleFromCurrent(this.index));
  }
}
