import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'engineInfo'
})
export class CarEngineInfoPipe implements PipeTransform {
  transform() {
     return 'Some pipe engine info'.toUpperCase();
  }
}