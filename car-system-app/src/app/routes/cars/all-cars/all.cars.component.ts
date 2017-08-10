import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from '../../../models/car.model';
import { CarActions } from '../../../actions/cars.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { store } from '../../../store';

@Component({
  selector: 'all-cars',
  templateUrl: './all.cars.component.html',
  styleUrls: ['./all.cars.component.css']
})
export class AllCarsComponent implements OnInit {
  @select('cars') cars: Observable<Array<CarModel>>;
  page: number = 1;
  availableCars: boolean = false;
  length: number;
  constructor(
    private carActions: CarActions,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit() {
    this.page = this.route.snapshot.queryParams.page ? (this.route.snapshot.queryParams.page > 0 ? this.route.snapshot.queryParams.page : 1) : 1;
    this.router.navigate(['/cars/all'], { queryParams: { page: this.page } });
    this.carActions.getCars(this.page);
    this.cars.subscribe(result => result ? this.length = result.length : this.length = 0)
  }

  goToNextPage(): void {
    if (this.length === 0) {
      alert('Тhere are no more cars to show you');
      return;
    }
    this.router.navigate(['/cars/all'], { queryParams: { page: ++this.page } })
    this.carActions.getCars(this.page);
  }

  goToPrevPage() {
    if (this.page === 1) {
      alert('There is no previous page to show you!');
      return;   
    }
    this.router.navigate(['/cars/all'], { queryParams: { page: --this.page } });
    this.carActions.getCars(this.page);
  }

  sortCars (sortCriteria: string) {
    this.carActions.sortCars(sortCriteria);
  }
}