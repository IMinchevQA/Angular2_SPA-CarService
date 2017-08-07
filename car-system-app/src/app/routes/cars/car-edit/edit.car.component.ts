import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from '../../../models/car.model';
import { Location } from '@angular/common'
import { CarsService } from '../../../services/cars.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  templateUrl: './eidt.car.component.html'
})
export class EditCarComponent {
  car = new CarModel('', 0, '', '', '', '', '', '', '', []);
  paramId: string;
  paramPage: string;
  constructor (
    private carsDataService: CarsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private location: Location,
    private toastrService: ToastrService
  ) {
      this.paramId = this.route.snapshot.paramMap.get('id');
      this.paramPage = this.route.snapshot.paramMap.get('page');    
   }

  ngOnInit(): void {
    this.carsDataService
      .getCarDetails(this.paramId)
      .then(car => {
        if (car.id) {
          this.car = car;
        } else {
          this.toastrService.error('No car available with this id!')
        }
      })
  }

  editCar(formValues) {
    if (formValues.price < 1000) {
      this.toastrService.error('Price cannot be lower than 1000USD');
    } else {
      formValues.id = this.car.id;
      formValues.owner = this.car.owner;
      this.carsDataService
      .updateCar(formValues)
      .then(data => {
        if (data.success) {
            this.toastrService.success(data.message);
            this.router.navigate([`/cars/details/${this.paramPage}/${this.paramId}`]);      
          } else {
            this.toastrService.error(data.message);
          }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
    }
  }

  goBack() {
    this.router.navigate([`/cars/details/${this.paramPage}/${this.paramId}`])
  }

  validatePrice(price) {
      console.log('here')
  }
}