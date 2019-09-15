import { Component, Input, OnInit } from '@angular/core';
import { ScheduleGroupModel }       from '../../../../models/schedule-group';

@Component({
  selector: 'app-created-class',
  templateUrl: './created-class.component.html',
  styleUrls: ['./created-class.component.scss']
})
export class CreatedClassComponent implements OnInit {
  private _createdClass: ScheduleGroupModel;

  get createdClass(): ScheduleGroupModel {
    return this._createdClass;
  }

  @Input()
  set createdClass(value: ScheduleGroupModel) {
    console.log(JSON.stringify(value));
    this._createdClass = value;
  }

  constructor() {
  }

  ngOnInit() {

  }

}
