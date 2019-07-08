import { State, Selector } from '@ngxs/store';

export interface ScheduleFormStateModel {
    items: string[];
}

@State<ScheduleFormStateModel>({
    name: 'scheduleForm',
    defaults: {
        items: []
    }
})
export class ScheduleFormState {

    @Selector()
    public static getState(state: ScheduleFormStateModel) {
        return state;
    }

}
