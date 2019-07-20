import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ScheduleGroupModel }                    from 'src/app/models/schedule-group';
import {
  AddCurrentScheduleToGroup,
  AddScheduleToCurrent,
  ClearCurrentSchedule,
  RemoveScheduleFromCurrent
}                                                from './schedules.actions';
import { TimeFunctions }                         from '../../common/time-functions';

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

  /**
   * Adds a schedule to current class
   *
   * @param ctx       state context
   * @param payload   schedule to add
   */
  @Action(AddScheduleToCurrent)
  addScheduleToCurrent(ctx: StateContext<SchedulesGroupStateModel>, {schedule}: AddScheduleToCurrent) {
    const currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    currentScheduleToAdd.addSchedule(schedule);
    ctx.patchState({
      currentSchedule: currentScheduleToAdd
    });

  }

  /**
   * Removes a schedule from current class
   *
   * @param ctx   state context
   * @param index index of schedule to remove
   */
  @Action(RemoveScheduleFromCurrent)
  removeScheduleFromCurrent(ctx: StateContext<SchedulesGroupStateModel>, index: number) {
    const currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    currentScheduleToAdd.removeSchedule(index);
    ctx.patchState({
      currentSchedule: currentScheduleToAdd
    });

  }

  /**
   * Clears the current schedule
   * @param ctx state context
   */
  @Action(ClearCurrentSchedule)
  clearCurrentSchedule(ctx: StateContext<SchedulesGroupStateModel>) {
    let currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    currentScheduleToAdd.schedules.splice(0, currentScheduleToAdd.schedules.length);
    ctx.patchState({
      currentSchedule: currentScheduleToAdd
    });

  }

  /**
   * Sets the name of the class for each schedule, clears current schedule and patchs the state
   * adding the new class
   * @param ctx         state context
   * @param className   name of the class
   */
  @Action(AddCurrentScheduleToGroup)
  addCurrentScheduleToGroup(ctx: StateContext<SchedulesGroupStateModel>, className: string) {
    let currentSchedule: ScheduleGroupModel = ctx.getState().currentSchedule;
    let colors = TimeFunctions.getColorsArray(ctx.getState().scheduleGroups.length + 1);
    let index = 0;
    currentSchedule.schedules.forEach(schedule => {
      schedule.setName(className);
      schedule.color = colors[index++];
    });
    let scheduleGroups: ScheduleGroupModel[] = ctx.getState().scheduleGroups;
    scheduleGroups.push(currentSchedule);
    this.clearCurrentSchedule(ctx);
    ctx.patchState({
      scheduleGroups: scheduleGroups
    });

  }


}
