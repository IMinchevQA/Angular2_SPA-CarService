import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/IAppState';
import { CarModel } from '../models/car.model';
import { OwnerModel } from '../models/owner.model';
import { CarsService } from '../services/cars.service';
import { ToastrService } from '../services/common/toastr.service';
import { AuthService } from '../services/auth.service';
 
import { Router } from '@angular/router';


@Injectable()
export class CarActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private authService: AuthService,
    private carsService: CarsService,
    private toastrService: ToastrService) { }  

  
  getSixCars() {
    this.carsService
      .getSixCars()
      .subscribe(
        cars => {
          this.ngRedux.dispatch({
            type: carTypes.GET_HOME_CARS,
            cars
          })
        },
        err => {
          this.toastrService.error(err);
      })
  }
  getCars(page: number) {
    this.carsService
      .getCars(page) 
      .subscribe(
        cars => {
          this.ngRedux.dispatch({
            type: carTypes.GET_ALL_CARS,
            cars
          })
        },
        err => {
          this.toastrService.error(err || 'Sorry but unknown failure occured!');
        }
      )
  };

  sortCars (sortCriteria: string) {
    this.ngRedux.dispatch({
      type: carTypes.SORT_CARS,
      sortCriteria
    })
  };

  getCarDetails(id: string) {
    this.carsService
      .getCarDetails(id)
      .subscribe (
        car => {
          this.ngRedux.dispatch({
            type: carTypes.GET_CAR_DETAILS,
            car
          })
        },
        err => {
          this.toastrService.error(err || 'Sorry but unknown failure occured!');
          if (err === 'Unauthorized') {
            this.router.navigate(['users/login']);
          }
        }
      )
  }

  createCar(formValues: FormData) {
    if (formValues['price'] < 1000) {
      this.toastrService.error('Price cannot be lower than 1000USD');
    } else {
      //feature for selecting owners must be added
      formValues['owner'] = 'test owner';
      formValues['price'] = Number(formValues['price']);
      this.carsService
        .createCar(formValues)
        .subscribe(
          response => {
            this.toastrService.success(response['message']);
            this.router.navigate(['/cars/all']);
          }, 
          err => {
            this.toastrService.error(err || 'Sorry but unknown failure occured!');    
            if (err === 'Unauthorized') {
              this.router.navigate(['users/login']);
            }     
          }
        )
    }    
  }

  editCar(formValues: FormData, carId: string, owner: OwnerModel, comments: Array<Object>, page: string) {
    [formValues['id'], formValues['owner'], formValues['comments']] = [carId, owner, comments];       
    console.log(comments)
    this.carsService
      .updateCar(formValues)
      .subscribe(
        response => {
          this.toastrService.success(response['message']);
          this.router.navigate([`/cars/details/${page}/${carId}`]); 
        },
        err => {
          this.toastrService.error(err || 'Sorry but unknown failure occured!');
        }
      )
  }

  addComment(formValues: FormData, id: string, page: string) {
    const author = this.authService.getUser().name;
    formValues['author'] = author;
    this.carsService
      .addComment(formValues, id)
      .subscribe(
        response => {
        this.toastrService.success(response['message']);
        this.router.navigate([`cars/details/${page}/${id}`]);
      },
      err=> {
          console.log(err)
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
        if (err === 'Unauthorized') {
          this.router.navigate(['users/login']);
        }
      })  
  }
}

export const carTypes = {
    GET_ALL_CARS: 'GET_ALL_CARS',
    GET_HOME_CARS: 'GET_HOME_CARS',
    SORT_CARS: 'SORT_CARS',
    GET_CAR_DETAILS: 'GET_CAR_DETAILS'
  }
