import { State, Selector } from '@ngxs/store';
import { ScheduleGroupModel } from 'src/app/models/schedule-group';

export interface SchedulesStateModel {
    scheduleGroups: ScheduleGroupModel[];
}

@State<SchedulesStateModel>({
    name: 'schedules',
    defaults: {
        scheduleGroups: []
    }
})
export class SchedulesState {

    @Selector()
    public static getState(state: SchedulesStateModel) {
        return state;
    }

}
