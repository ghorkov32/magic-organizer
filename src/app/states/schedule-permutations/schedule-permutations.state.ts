import { Action, Selector, State, StateContext }       from '@ngxs/store';
import { SelectSnapshot }                              from '@ngxs-labs/select-snapshot';
import { SchedulesGroupState }                         from '../schedules/schedules.state';
import { ScheduleGroupModel }                          from '../../models/schedule-group';
import { ClearEveryPermutation, GeneratePermutations } from './schedule-permutations.actions';
import { fromWorker }                                  from 'observable-webworker';
import { of }                                          from 'rxjs';

export interface SchedulePermutationsStateModel {
  items: ScheduleGroupModel[][];
  isProcessing: boolean;
}

@State<SchedulePermutationsStateModel>({
  name: 'schedulePermutations',
  defaults: {
    items: [],
    isProcessing: false
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

  @Selector()
  public static getIsProcessing(state: SchedulePermutationsStateModel) {
    return state.isProcessing;
  }

  @Action(GeneratePermutations)
  generatePermutations(ctx: StateContext<SchedulePermutationsStateModel>) {
    ctx.patchState({
      isProcessing: true
    });
    let scheduleGroups$ = of(this.scheduleGroups);
    fromWorker<any, any>(() => new Worker('src/app/workers/scheduler-worker.worker.ts', {type: 'module'}), scheduleGroups$)
      .subscribe(uniqueArray => {
        ctx.patchState({
          items: uniqueArray,
          isProcessing: false
        });
      });

  }

  @Action(ClearEveryPermutation)
  clearEveryPermutation(ctx: StateContext<SchedulePermutationsStateModel>) {
    ctx.patchState({
      items: []
    });
  }


}
