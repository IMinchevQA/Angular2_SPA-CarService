import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  templateUrl:  './create.car.component.html'
})
export class CreateCarComponent {
  
  constructor (
    private carService: CarsService,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  createCar(formValues): void {
    if (formValues.price < 1000) {
      this.toastrService.error('Price cannot be lower than 1000USD');
    } else {
      formValues.owner = 'test owner';
      formValues.price = Number(formValues.price);
      this.carService
        .createCar(formValues)
        .then(data => {
          if (data.success) {
            this.toastrService.success(data.message);
            this.router.navigate(['/cars/all']);      
          } else {
            this.toastrService.error(data.message);
          }
        })
        .catch(err=> {
          this.toastrService.error(err || 'Sorry but unknown failure occured!');    
          if (err === 'Unauthorized') {
            this.router.navigate(['users/login']);
          }     
        })
    }
  }
}
