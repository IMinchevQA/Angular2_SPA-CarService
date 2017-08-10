import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from '../../../models/car.model';
import { Location } from '@angular/common'
import { CarsService } from '../../../services/cars.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';
import { CarActions } from '../../../actions/cars.actions';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

@Component({
  templateUrl: './eidt.car.component.html'
  // template: '<h1>CAR EDIT</h1>'
})
export class EditCarComponent {
  car = new CarModel('', 0, '', '', '', '', '', '', '', []);
  @select('car') carDetails: Observable<Array<CarModel>>;
  formCar: Object = {};
  paramId: string;
  paramPage: string;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private carActions: CarActions,
    private carsDataService: CarsService,
    private auth: AuthService,
    private location: Location,
    private toastrService: ToastrService
  ) {
      this.paramId = this.route.snapshot.paramMap.get('id');
      this.paramPage = this.route.snapshot.paramMap.get('page');    
   }

  ngOnInit(): void {
    this.carActions.getCarDetails(this.paramId);    
    this.carDetails.subscribe(result => {
      if (result !== undefined && result !== null) {
        Object.keys(result).forEach(key => {
        if (key !== undefined && key !== undefined) {
          this.formCar[key] = result[key]
        }
      })
      }
    }) 
  }

  editCar(formValues) {
    this.carActions.editCar(
      formValues, 
      this.paramId,      
      this.formCar['owner'], 
      this.formCar['comments'],
      this.paramPage)
  }

  goBack() {
    this.router.navigate([`/cars/details/${this.paramPage}/${this.paramId}`])
  }
}