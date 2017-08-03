import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  templateUrl:  './create.car.component.html'
})
export class CreateCarComponent {
  
  constructor (
    private carService: CarsService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }
  createCar(formValues): void {
     if (formValues.price < 1000) {
      this.toastr.error('Price cannot be lower than 1000USD');
    } else {
      formValues.owner = 'test owner';
      formValues.price = Number(formValues.price);
      this.carService
        .createCar(formValues)
        .then(data => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigate(['/cars/all']);      
          } else {
            this.toastr.error(data.message);
          }
        })
    }
  }
}
