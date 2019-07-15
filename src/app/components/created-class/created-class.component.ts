import { Component, Input, OnInit } from '@angular/core';
import { ScheduleGroupModel }       from '../../models/schedule-group';

@Component({
  selector: 'app-created-class',
  templateUrl: './created-class.component.html',
  styleUrls: ['./created-class.component.scss']
})
export class CreatedClassComponent implements OnInit {

  @Input()
  public createdClass: ScheduleGroupModel;

  constructor() {
  }

  ngOnInit() {
  }

}
