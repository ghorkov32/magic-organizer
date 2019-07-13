import { Action, Selector, State, StateContext }           from '@ngxs/store';
import { ScheduleGroupModel }                              from 'src/app/models/schedule-group';
import { AddScheduleToCurrent, RemoveScheduleFromCurrent } from './schedules.actions';

export interface SchedulesGroupStateModel {
  scheduleGroups: ScheduleGroupModel[];
  currentSchedule: ScheduleGroupModel;
}

@State<SchedulesGroupStateModel>({
  name: 'schedules',
  defaults: {
    scheduleGroups: [],
    currentSchedule: new ScheduleGroupModel([])
  }
})
export class SchedulesGroupState {

  @Selector()
  public static getState(state: SchedulesGroupStateModel) {
    return state;
  }
  @Selector()
  public static getScheduleGroups(state: SchedulesGroupStateModel) {
    return state.scheduleGroups;
  }
  @Selector()
  public static getCurrentSchedule(state: SchedulesGroupStateModel) {
    return state.currentSchedule;
  }

  @Action(AddScheduleToCurrent)
  addScheduleToCurrent(ctx: StateContext<SchedulesGroupStateModel>, {payload}: AddScheduleToCurrent) {
    const currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    currentScheduleToAdd.addSchedule(payload);
    ctx.patchState({
      currentSchedule: currentScheduleToAdd
    });

  }

  @Action(RemoveScheduleFromCurrent)
  removeScheduleFromCurrent(ctx: StateContext<SchedulesGroupStateModel>, payload: number) {
    const currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    currentScheduleToAdd.removeSchedule(payload);
    ctx.patchState({
      currentSchedule: currentScheduleToAdd
    });

  }
}
