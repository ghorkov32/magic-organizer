import { of, Subscription }                                from 'rxjs';
import { delay, map, repeat }                              from 'rxjs/operators';
import { AddCurrentScheduleToGroup, AddScheduleToCurrent } from '../../../../states/schedules/schedules.actions';
import { ScheduleModel }                                   from '../../../../models/schedule-model';
import * as uuid                                           from 'uuid';
import { Store }                                           from '@ngxs/store';

export class ScheduleAdderTestingTool {


  /**
   * THIS CODE SHOULD NOT ENTER IN A PRODUCTION BUILD
   * TODO: REMOVE/COMMENT AFTER TESTING
   */

  public classNames = [
    'History of Neoliberalism',
    'Biology of the rich',
    'Math to meet ends month',
    'Marxism 101',
    'Private property defacing',
    'Riot preparation'
  ];
  classSub: Subscription;

  constructor(private store: Store) {

  }


  setUpTestCases() {
    this.classSub = of(true)
      .pipe(delay(1000), map(res => this.createRandomClass(Math.floor(Math.random() * 3))))
      .pipe(repeat(5))
      .subscribe(res => {
        if (res) {
          let className = this.classNames[Math.floor(Math.random()
                                                     * this.classNames.length)];
          this.store.dispatch(new AddCurrentScheduleToGroup(className));
        }
      });

  }

  createRandomClass(scheduleAmount: number) {
    for (let i = 0; i <= scheduleAmount; i++) {
      this.store.dispatch(new AddScheduleToCurrent(this.createRandomSchedule()));
    }
    return true;
  }

  createRandomSchedule(): ScheduleModel {
    let nextMondayDate = new Date();
    nextMondayDate.setDate(nextMondayDate.getDate() + (
      1 + 7 - nextMondayDate.getDay()
    ) % 7);
    let endMondayDate = new Date(nextMondayDate.getTime());
    endMondayDate.setDate(endMondayDate.getDate() + (
                          nextMondayDate.getDay() + 6
    ));

    let dates = this.randomDateStartEnd(nextMondayDate, endMondayDate);

    const uuidForSchedule: string = uuid.v4();
    const dateStart = dates[0];
    const dateEnd = dates[1];

    dateStart.setMinutes(0);
    dateEnd.setMinutes(0);
    dateStart.setSeconds(0);
    dateEnd.setSeconds(0);


    const scheduleModel = new ScheduleModel(
      uuidForSchedule,
      dateStart,
      dateEnd,
      dateStart.getDay()
    );
    return scheduleModel
  }

  randomDateStartEnd(start, end): Date[] {
    let dates: Date[] = [];
    let startHour, endHour;
    startHour = 0;
    endHour = 21;
    var date = new Date(+start + Math.random() * (
      end - start
    ));
    var hour = startHour + Math.random() * (
      endHour - startHour
    ) | 0;
    date.setHours(hour);
    dates.push(date);
    let endDate = new Date(date.getTime());
    endDate.setHours(date.getHours() + 2);
    dates.push(endDate);
    return dates;
  }


}
