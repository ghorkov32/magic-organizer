import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ScheduleFormState, ScheduleFormStateModel } from './schedule-form.state';

describe('ScheduleForm state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([ScheduleFormState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(ScheduleFormState.getState);
        const expected: ScheduleFormStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
