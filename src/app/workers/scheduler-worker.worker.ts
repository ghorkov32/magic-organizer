/// <reference lib="webworker" />
import { DoWork, ObservableWorker } from 'observable-webworker';
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';
import { ScheduleGroupModel }       from '../models/schedule-group';

@ObservableWorker()
export class ScheduleWorker implements DoWork<string, string> {
  public work(input$: Observable<any>): Observable<any> {


    return input$.pipe(
      map(scheduleGroups => {
        let items = [];
        // Create initial comparation
        let initialComparation = this.combinations(scheduleGroups);
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
        if (initialComparation.length === scheduleGroups.length) {
          items.push(initialComparation);
          return items;
        }

        //Calculate the rest of the possibilities
        for (let i = 0; i < scheduleGroups.length; i++) {
          for (let i = 0; i < scheduleGroups.length; i++) {
            scheduleGroups.unshift(scheduleGroups.pop());
            let schedulesToCompare = scheduleGroups.slice(0, scheduleGroups.length - i);
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
        return items.filter((combination, index) => {
          const _combination = JSON.stringify(combination);
          return index === items.findIndex(obj => {
            return JSON.stringify(obj) === _combination;
          });
        });
      }),
    );
  }

  combinations(array: ScheduleGroupModel[]): ScheduleGroupModel[] {
    return array.filter((e: ScheduleGroupModel, i) =>
      array.findIndex(a => ScheduleGroupModel.equals(a, e)) === i);
  }
}

