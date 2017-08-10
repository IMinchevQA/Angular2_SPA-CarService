import { Component } from '@angular/core';
import { CarActions } from '../../../actions/cars.actions';

@Component({
  templateUrl:  './create.car.component.html'
})
export class CreateCarComponent {    
  imageUrl: string = ''
  constructor (    
    private carsActions: CarActions
  ) { }
  createCar(formValues): void {
    this.carsActions.createCar(formValues);
  }
}
