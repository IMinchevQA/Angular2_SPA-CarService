import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsData } from './../cars.data';
import { CarModel } from './../car.model';

@Component({
  selector: 'car-details',
  providers: [CarsData],
  templateUrl: './car.details.component.html',
  styleUrls: ['./car.details.component.css']
})
export class CarDetailsComponent implements OnInit {
  
  carDetails: CarModel;
  paramId: string;

  constructor (private carsDataService: CarsData, private route: ActivatedRoute) {
    this.paramId = this.route.snapshot.paramMap.get('id');
  }

  
  ngOnInit(): void {
    this.carsDataService
      .getCarDetails(this.paramId)
      .then(car => {
        this.carDetails = car;
      })
  }
}