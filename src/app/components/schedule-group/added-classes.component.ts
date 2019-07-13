import { Component, Input, OnInit } from '@angular/core';
import { ScheduleGroupModel }       from 'src/app/models/schedule-group';

@Component({
  selector: 'app-added-classes',
  templateUrl: './added-classes.component.html',
  styleUrls: ['./added-classes.component.scss']
})
export class AddedClassesComponent implements OnInit {

  @Input() scheduleGroup: ScheduleGroupModel;

  constructor() {
  }

  ngOnInit() {
  }

}
