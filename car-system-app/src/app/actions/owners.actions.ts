import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { OwnersState } from '../store';
import { CarModel } from '../models/car.model';
import { OwnersService } from '../services/owners.service';
import { ToastrService } from '../services/common/toastr.service';
import { Router } from '@angular/router';


@Injectable()
export class OwnersActions {
  constructor (
    private ngRedux: NgRedux<OwnersState>,
    private router: Router,
    private ownersService: OwnersService,
    private toastrService: ToastrService) { }  

  getOwners(page: number) {
    this.ownersService
    .getOwners(page)
    .subscribe(
      owners => {
        this.ngRedux.dispatch({
          type: ownerTypes.GET_ALL_OWNERS,
          owners
          })
        },
      err => {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      }
    )
  // .then(response => {
  //   this.owners = response;
  //   if (this.owners.length > 0) {
  //     this.availableOwners = true;
  //   } else {
  //     this.availableOwners = false;
  //     this.toastrService.error('No owners available!')
  //   }
  // })
  // .catch(err=> {
  //   this.toastrService.error(err || 'Sorry but unknown failure occured!');
  // })

  }
}

export const ownerTypes = {
    GET_ALL_OWNERS: 'GET_ALL_OWNERS'
  }