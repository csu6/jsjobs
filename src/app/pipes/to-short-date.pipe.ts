import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
   
    if(value.toLowerCase() === 'asap') {
      return 'Dès que possible';
    } else if(value.indexOf('-') > -1) {
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t'); // 2017-12-22T10:23Z
      
      let year, month, day;
      [year, month, day] = fullDate.toLowerCase().split('-'); // ['2017', '12', '22']

      return `${day}/${month}/${year}`;
    } else {
      return '--';
    }
  }

}
