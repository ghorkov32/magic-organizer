import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfTheWeek'
})
export class DayOfTheWeekPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value.toString()) {
      case '0':
        return 'Sunday';
      case '1':
        return 'Monday';
      case '2':
        return 'Tuesday';
      case '3':
        return 'Wednesday';
      case '4':
        return 'Thursday';
      case '5':
        return 'Friday';
      case '6':
        return 'Saturday';
      case '7':
        return 'Sunday';
    }
  }

}
