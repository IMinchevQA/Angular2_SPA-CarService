import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnersService } from './../../../services/owners.service';
import { CarsService } from '../../../services/cars.service';
import { ToastrService } from '../../../services/common/toastr.service';
import { OwnerModel } from '../../../models/owner.model';
import { CarModel } from '../../../models/car.model';

@Component({
  selector: 'owner-details',
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
    private ownersDataService: OwnersService,
    private carsDataService: CarsService,
    private toastrService: ToastrService,
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
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
        if (err === 'Unauthorized') {
          this.router.navigate(['users/login']);
        }
      })
  }
  goBack() {
    this.router.navigate(['/owners/all'], { queryParams: { page: this.paramPage } });
  }
}