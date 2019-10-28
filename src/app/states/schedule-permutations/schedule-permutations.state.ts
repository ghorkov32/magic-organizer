import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SelectSnapshot }                        from '@ngxs-labs/select-snapshot';
import { SchedulesGroupState }                   from '../schedules/schedules.state';
import { ScheduleGroupModel }                    from '../../models/schedule-group';
import { GeneratePermutations }                  from './schedule-permutations.actions';

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
  @SelectSnapshot(SchedulesGroupState.getScheduleGroups)
  scheduleGroups: ScheduleGroupModel[];

  @Selector()
  public static getState(state: SchedulePermutationsStateModel) {
    return state;
  }

  @Action(GeneratePermutations)
  generatePermutations(ctx: StateContext<SchedulePermutationsStateModel>) {
    let items = [];
    let initialComparation = this.combinations(this.scheduleGroups);

    // If no classes step on each other, it's a perfect fit and there's no need to calculate more
    if (initialComparation.length === this.scheduleGroups.length) {
      items.push(initialComparation);
      ctx.patchState({
        items: items
      });
      return;
    }

    //Calculate the rest of the possibilities
    for (let i = 0; i < this.scheduleGroups.length; i++) {
      for (let i = 0; i < this.scheduleGroups.length; i++) {
        this.scheduleGroups.unshift(this.scheduleGroups.pop());
        let schedulesToCompare = this.scheduleGroups.slice(0, this.scheduleGroups.length - i);
        items.push(this.combinations(schedulesToCompare));
      }
    }
    items.sort((a, b) => b.length - a.length);
    console.log(items);
    ctx.patchState({
      items: items
    });

  }

  combinations(array: ScheduleGroupModel[]): ScheduleGroupModel[] {
    return array.filter((e: ScheduleGroupModel, i) =>
      array.findIndex(a => ScheduleGroupModel.equals(a, e)) === i);
  }


}
