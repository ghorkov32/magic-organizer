import * as _ from 'underscore';

declare var palette: any;

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
  static nextWeekdayDate(date: Date, dayInWeek: number) {
    const ret = new Date(date || new Date());
    ret.setDate(ret.getDate() + (
                dayInWeek - 1 - ret.getDay() + 7
    ) % 7 + 1);
    return ret;
  }

  static getColorsArray(size: number): string[] {
    let name = 'mpn65';
    let scheme = palette.listSchemes(name)[0];
    const args = Array.prototype.slice.call(arguments, 1);
    args[0] = size;
    return scheme.apply(scheme, args);
  }
}
