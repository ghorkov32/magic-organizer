import { Action, Selector, State, StateContext }       from '@ngxs/store';
import { SelectSnapshot }                              from '@ngxs-labs/select-snapshot';
import { SchedulesGroupState }                         from '../schedules/schedules.state';
import { ScheduleGroupModel }                          from '../../models/schedule-group';
import { ClearEveryPermutation, GeneratePermutations } from './schedule-permutations.actions';

export interface SchedulePermutationsStateModel {
  items: ScheduleGroupModel[][];
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

  @Selector()
  public static getScheduledPermutations(state: SchedulePermutationsStateModel) {
    return state.items;
  }

  @Action(GeneratePermutations)
  generatePermutations(ctx: StateContext<SchedulePermutationsStateModel>) {
    var t0 = performance.now();
    let items = [];
    let initialComparation = this.combinations(this.scheduleGroups);
    initialComparation.sort((a, b) => {
      if (a.UUID < b.UUID) {
        return -1;
      }
      if (a.UUID > b.UUID) {
        return 1;
      }
      return 0;
    });

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
        const combination = this.combinations(schedulesToCompare);
        combination.sort((a, b) => {
          if (a.UUID < b.UUID) {
            return -1;
          }
          if (a.UUID > b.UUID) {
            return 1;
          }
          return 0;
        });
        items.push(combination);
      }
    }
    items.sort((a, b) => b.length - a.length);
    const uniqueArray = items.filter((combination, index) => {
      const _combination = JSON.stringify(combination);
      return index === items.findIndex(obj => {
        return JSON.stringify(obj) === _combination;
      });
    });


    var t1 = performance.now();
    console.log('Call to generatePermutations took ' + (
      t1 - t0
    ) + ' milliseconds.');
    ctx.patchState({
      items: uniqueArray
    });

  }

  @Action(ClearEveryPermutation)
  clearEveryPermutation(ctx: StateContext<SchedulePermutationsStateModel>) {
    ctx.patchState({
      items: []
    });
  }

  combinations(array: ScheduleGroupModel[]): ScheduleGroupModel[] {
    return array.filter((e: ScheduleGroupModel, i) =>
      array.findIndex(a => ScheduleGroupModel.equals(a, e)) === i);
  }

}
