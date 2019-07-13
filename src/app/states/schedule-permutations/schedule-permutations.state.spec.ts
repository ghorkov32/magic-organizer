import { async, TestBed }                                            from '@angular/core/testing';
import { NgxsModule, Store }                                         from '@ngxs/store';
import { SchedulePermutationsState, SchedulePermutationsStateModel } from './schedule-permutations.state';

describe('SchedulePermutations state', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SchedulePermutationsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an empty state', () => {
    const actual = store.selectSnapshot(SchedulePermutationsState.getState);
    const expected: SchedulePermutationsStateModel = {
      items: []
    };
    expect(actual).toEqual(expected);
  });

});
