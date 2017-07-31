import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnersData } from './../owners.data';
import { OwnerModel } from './../owner.model';
import { CarsData } from './../../cars/cars.data';
import { CarModel } from './../../cars/car.model';

@Component({
  selector: 'owner-details',
  providers: [OwnersData,CarsData],
  templateUrl: './owner.details.component.html',
  styleUrls: ['./owner.details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  
  ownerDetails: OwnerModel;
  cars: Array<CarModel>  
  pageNumber: string;
  paramId: string;
  paramName: string;
  paramPage: number;

  constructor (
    private ownersDataService: OwnersData,
    private carsDataService: CarsData,
    private router: Router, 
    private route: ActivatedRoute) {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.paramName = this.route.snapshot.paramMap.get('name'); 
    this.paramPage = (+this.route.snapshot.paramMap.get('page')) || 1
  }

  
  ngOnInit(): void {
    this.ownersDataService
      .getOwnerDetails(+this.paramId, this.paramName)
      .then(owner => {
        this.ownerDetails = owner;
        console.log(this.ownerDetails.ownerCars);
      })
  }
  goBack() {
    this.router.navigate(['/owners/all'], { queryParams: { page: this.paramPage } });
  }
}