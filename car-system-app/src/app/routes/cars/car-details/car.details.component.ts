import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarModel } from '../../../models/car.model';
import { CarActions } from '../../../actions/cars.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { store } from '../../../store';

@Component({
  selector: 'car-details',
  templateUrl: './car.details.component.html',
  styleUrls: ['./car.details.component.css']
})
export class CarDetailsComponent implements OnInit {
  @select('car') carDetails: Observable<CarModel>;
  paramId: string;
  paramPage: string;

  constructor (
    private carActions: CarActions,
    private route: ActivatedRoute, 
    private router: Router) {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.paramPage = this.route.snapshot.paramMap.get('page');    
  }
  
  ngOnInit(): void {
    this.carActions.getCarDetails(this.paramId)

  }

  goBack() {
    this.router.navigate(['/cars/all'], { queryParams: { page: this.paramPage } });
  }
}