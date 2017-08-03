import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class CarDateFormatPipe implements PipeTransform {
  transform(date) {
     return new Date(date) + ' - formated by car.date.format.pipe.ts';
  }
}