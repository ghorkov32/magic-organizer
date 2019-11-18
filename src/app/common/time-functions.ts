import * as _                     from 'underscore';
import { FormGroup, ValidatorFn } from '@angular/forms';

export class TimeFunctions {
  static getHours(time: string): number {
    return parseInt(time.substr(0, time.indexOf(':')), 10);
  }

  static getMinutes(time: string): number {
    return parseInt(time.substr(time.length - 2), 10);
  }

  static isTimeRangeValid(start: string, end: string): boolean {
    return start !==
           null &&
           end !==
           null &&
           (
             TimeFunctions.getHours(start) <
             TimeFunctions.getHours(end) ||
             (
               (
                 TimeFunctions.getHours(start) ===
                 TimeFunctions.getHours(end)
               ) &&
               (
                 TimeFunctions.getMinutes(start) <
                 TimeFunctions.getMinutes(end)
               )
             )
           );
  }

  /**
   * Returns the cartesian product of an array of arrays
   */
  static cartesianProductOf() {
    return _.reduce(arguments, (a, b) => {
      return _.flatten(_.map(a, (x) => {
        return _.map(b, (y) => {
          return x.concat([y]);
        });
      }), true);
    }, [[]]);
  }

  /**
   * params
   * date [JS Date()]
   * day_in_week [int] 1 (Mon) - 7 (Sun)
   */
  static nextWeekdayDate(date: Date, dayInWeek: number): Date {
    const ret = new Date(date || new Date());
    ret.setDate(ret.getDate() + (
                dayInWeek - 1 - ret.getDay() + 7
    ) % 7 + 1);
    return ret;
  }

}

export const TimeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('startTime').value;
  const end = fg.get('endTime').value;
  return TimeFunctions.isTimeRangeValid(start, end) || fg.get('startTime').pristine || fg.get('endTime').pristine
    ? null
    : {range: true};
};
