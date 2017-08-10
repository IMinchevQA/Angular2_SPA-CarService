import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/common/toastr.service';
import { CarModel } from '../../models/car.model';
import { CarActions } from '../../actions/cars.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  @select('cars') cars: Observable<Array<CarModel>>;
  constructor (
    private carActions: CarActions) { }
  
  ngOnInit(): void {
    this.carActions.getSixCars()
  }
}