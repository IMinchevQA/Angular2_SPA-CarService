import { Component, OnInit } from '@angular/core';
import { CarsData } from './../cars/cars.data';
import { CarModel } from './../cars/car.model';

@Component({
  selector: 'home',
  providers: [CarsData],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  cars: Array<CarModel>;
  constructor (private carsDataService: CarsData) { }
  
  ngOnInit(): void {
    this.carsDataService
      .getSixCars()
      .then(cars => {
        this.cars = cars.sort((car1, car2) => Number(car1.id) - Number(car2.id)); // cars sorted by id in ascending order due to the lack of date parameter
      })
  }
}