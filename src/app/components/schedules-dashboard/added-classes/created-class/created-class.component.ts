import { Component, Input, OnInit } from '@angular/core';
import { ScheduleGroupModel }       from '../../../../models/schedule-group';
import { Store }                    from '@ngxs/store';
import { RemoveScheduleGroup }      from '../../../../states/schedules/schedules.actions';

@Component({
  selector: 'app-created-class',
  templateUrl: './created-class.component.html',
  styleUrls: ['./created-class.component.scss']
})
export class CreatedClassComponent implements OnInit {
  private _createdClass: ScheduleGroupModel;

  @Input()
  private index: number;
  locale: string = window.location.href.match('\/([a-z][a-z])\/') ?
    window.location.href.match('\/([a-z][a-z])\/')[1] :
    'en';

  get createdClass(): ScheduleGroupModel {
    return this._createdClass;
  }

  @Input()
  set createdClass(value: ScheduleGroupModel) {
    this._createdClass = value;
  }

  constructor(private store: Store) {
  }

  ngOnInit() {

  }

  remove() {
    this.store.dispatch(new RemoveScheduleGroup(this.createdClass.UUID));
  }
}
