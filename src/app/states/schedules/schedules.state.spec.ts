import { async, TestBed }                                from '@angular/core/testing';
import { NgxsModule, Store }                             from '@ngxs/store';
import { SchedulesGroupState, SchedulesGroupStateModel } from './schedules.state';

describe('Schedules state', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SchedulesGroupState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(SchedulesGroupState.getState);
    const expected: SchedulesGroupStateModel = {
      scheduleGroups: []
    };
    expect(actual).toEqual(expected);
  });

});
