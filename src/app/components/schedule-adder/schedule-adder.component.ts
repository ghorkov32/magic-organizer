import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {SchedulesGroupState} from '../../states/schedules/schedules.state';
import {ScheduleGroupModel} from '../../models/schedule-group';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-schedule-adder',
  templateUrl: './schedule-adder.component.html',
  styleUrls: ['./schedule-adder.component.scss']
})
export class ScheduleAdderComponent implements OnInit {

  @Select(SchedulesGroupState.getCurrentSchedule)
  currentSchedule: ScheduleGroupModel;

  scheduleAdderForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.scheduleAdderForm = new FormGroup({
      className: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
    });
  }

}
