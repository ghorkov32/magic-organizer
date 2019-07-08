import { State, Selector } from '@ngxs/store';
import { ScheduleGroupModel } from 'src/app/models/schedule-group';

export interface SchedulesGroupStateModel {
    scheduleGroups: ScheduleGroupModel[];
}

@State<SchedulesGroupStateModel>({
    name: 'schedules',
    defaults: {
        scheduleGroups: []
    }
})
export class SchedulesGroupState {

    @Selector()
    public static getState(state: SchedulesGroupStateModel) {
        return state;
    }

}
