import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor() { }

  /**
   * Returns the cartesian product of an array of arrays
   */
  cartesianProductOf() {
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
  nextWeekdayDate(date: Date, dayInWeek: number) {
    const ret = new Date(date || new Date());
    ret.setDate(ret.getDate() + (dayInWeek - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
  }

}
