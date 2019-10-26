import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ScheduleGroupModel }                    from 'src/app/models/schedule-group';
import {
  AddCurrentScheduleToGroup,
  AddScheduleToCurrent,
  ClearCurrentSchedule,
  RemoveScheduleFromCurrent,
  RemoveScheduleGroup
}                                                from './schedules.actions';

import * as palette from 'google-palette/palette'

export interface SchedulesGroupStateModel {
  scheduleGroups: ScheduleGroupModel[];
  currentSchedule: ScheduleGroupModel;
  scheduleGroupCount: number;
}

@State<SchedulesGroupStateModel>({
  name: 'schedules',
  defaults: {
    scheduleGroups: [],
    currentSchedule: new ScheduleGroupModel([]),
    scheduleGroupCount: 0
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
   * Generates an array of colors according to a predefined size
   * @param size    Size of the array
   */
  static getColorsArray(size: number): string[] {
    let name = 'mpn65';
    let scheme = palette.listSchemes(name)[0];
    const args = Array.prototype.slice.call(arguments, 1);
    args[0] = size;
    return scheme.apply(scheme, args);
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
    ctx.patchState({
      currentSchedule: new ScheduleGroupModel([])
    });

  }

  /**
   * Adds a schedule to current class
   *
   * @param ctx       state context
   * @param payload   schedule to add
   */
  @Action(AddScheduleToCurrent)
  addScheduleToCurrent(ctx: StateContext<SchedulesGroupStateModel>, {schedule}: AddScheduleToCurrent) {
    let currentScheduleToAdd: ScheduleGroupModel = ctx.getState().currentSchedule;
    if (currentScheduleToAdd.addSchedule == null) currentScheduleToAdd = new ScheduleGroupModel([]);
    currentScheduleToAdd.addSchedule(schedule);
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
  addCurrentScheduleToGroup(ctx: StateContext<SchedulesGroupStateModel>, className: any) {
    let currentSchedule: ScheduleGroupModel = Object.assign({}, ctx.getState().currentSchedule);
    let scheduleGroupCount: number = ctx.getState().scheduleGroupCount;
    scheduleGroupCount++;
    let colors = SchedulesGroupState.getColorsArray(scheduleGroupCount);
    currentSchedule.schedules.forEach(schedule => {
      schedule.setName(className.className);
      schedule.color = colors[scheduleGroupCount - 1];
    });
    let scheduleGroups: ScheduleGroupModel[] = ctx.getState().scheduleGroups;
    scheduleGroups.push(currentSchedule);
    this.clearCurrentSchedule(ctx);
    ctx.patchState({
      scheduleGroups: scheduleGroups,
      scheduleGroupCount: scheduleGroupCount
    });

  }

  /**
   * Removes a class from added classes
   * @param ctx
   * @param index
   */
  @Action(RemoveScheduleGroup)
  removeScheduleGroup(ctx: StateContext<SchedulesGroupStateModel>, index: number) {
    let currentScheduleGroup: ScheduleGroupModel[] = Object.assign([], ctx.getState().scheduleGroups);
    (
      currentScheduleGroup as Array<ScheduleGroupModel>
    ).splice(index, 1);
    ctx.patchState({
      scheduleGroups: currentScheduleGroup
    });
  }

}
