import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { CarModel } from '../../../models/car.model';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  selector: 'car-details',
  templateUrl: './car.details.component.html',
  styleUrls: ['./car.details.component.css']
})
export class CarDetailsComponent implements OnInit {
  
  carDetails: CarModel;
  paramId: string;
  paramPage: string;

  constructor (
    private carsDataService: CarsService, 
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService) {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.paramPage = this.route.snapshot.paramMap.get('page');
    
  }
  
  ngOnInit(): void {
    this.carsDataService
      .getCarDetails(this.paramId)
      .then(car => {
        if (car.id) {
          this.carDetails = car;
        } else {
          this.toastr.error('No car available with this id!')
        }
      })
  }

  goBack() {
    this.router.navigate(['/cars/all'], { queryParams: { page: this.paramPage } });
  }
}