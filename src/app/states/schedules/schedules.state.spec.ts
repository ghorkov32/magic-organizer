import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SchedulesState, SchedulesStateModel } from './schedules.state';

describe('Schedules state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([SchedulesState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(SchedulesState.getState);
        const expected: SchedulesStateModel = {
            scheduleGroups: []
        };
        expect(actual).toEqual(expected);
    });

});
