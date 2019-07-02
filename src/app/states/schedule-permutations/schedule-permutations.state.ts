import { State, Selector } from '@ngxs/store';

export interface SchedulePermutationsStateModel {
    items: string[];
}

@State<SchedulePermutationsStateModel>({
    name: 'schedulePermutations',
    defaults: {
        items: []
    }
})
export class SchedulePermutationsState {

    @Selector()
    public static getState(state: SchedulePermutationsStateModel) {
        return state;
    }

}
