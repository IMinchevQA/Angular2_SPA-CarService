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
    private toastrService: ToastrService,
    private route: ActivatedRoute, 
    private router: Router) {
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
          this.toastrService.error('No car available with this id!')
        }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
        if (err === 'Unauthorized') {
          this.router.navigate(['users/login']);
        }
      })
  }

  goBack() {
    this.router.navigate(['/cars/all'], { queryParams: { page: this.paramPage } });
  }
}