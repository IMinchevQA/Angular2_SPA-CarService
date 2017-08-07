import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CarModel } from '../../models/car.model';

@Component({
  selector: 'home',
  providers: [CarsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  cars: Array<CarModel>;
  constructor (private carsDataService: CarsService) { }
  
  ngOnInit(): void {
    this.carsDataService
      .getSixCars()
      .then(cars => {
        this.cars = cars.sort((car1, car2) => Number(car1.id) - Number(car2.id)); // cars sorted by id in ascending order due to the lack of date parameter
      })
  }
}