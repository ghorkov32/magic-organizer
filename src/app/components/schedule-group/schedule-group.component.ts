import { Component, OnInit, Input } from '@angular/core';
import { ScheduleGroupModel } from 'src/app/models/schedule-group';

@Component({
  selector: 'app-schedule-group',
  templateUrl: './schedule-group.component.html',
  styleUrls: ['./schedule-group.component.scss']
})
export class ScheduleGroupComponent implements OnInit {

  @Input() scheduleGroup: ScheduleGroupModel;

  constructor() { }

  ngOnInit() {
  }

}
