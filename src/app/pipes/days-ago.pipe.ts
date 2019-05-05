import { Pipe, PipeTransform } from '@angular/core';
//import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any { // 06-01-2017 | daysAgo
    return null;//distanceInWordsToNow(new Date(value), { addSuffix: true });;
  }

}
