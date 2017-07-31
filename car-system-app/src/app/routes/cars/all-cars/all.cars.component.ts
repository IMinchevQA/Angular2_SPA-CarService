import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsData } from '../cars.data';
import { CarModel } from '../car.model';

@Component({
  selector: 'all-cars',
  providers: [CarsData],
  templateUrl: './all.cars.component.html',
  styleUrls: ['./all.cars.component.css']
})
export class AllCarsComponent implements OnInit {
  cars: Array<CarModel>;
  page: number = 1;
  availableCars: boolean = false;
  
  constructor(
    private carsDataService: CarsData,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams.page ? (this.route.snapshot.queryParams.page > 0 ? this.route.snapshot.queryParams.page : 1) : 1;
    this.router.navigate(['/cars/all'], { queryParams: { page: this.page } });
    this.getCars(this.page);
  }

  goToPrevPage() {
    if (this.page === 1) {
      alert('There is no previous page to show you!');
      return;   
    }
    this.router.navigate(['/cars/all'], { queryParams: { page: --this.page } });
    this.getCars(this.page);
  }

  goToNextPage(): void {
    if (this.cars.length === 0) {
      alert('Тhere are no more cars to show you');
      return;
    }
    this.router.navigate(['/cars/all'], { queryParams: { page: ++this.page } })
    this.getCars(this.page);
  }

  getCars(page: number): void {
    this.carsDataService
      .getCars(this.page)
      .then(cars => {
        this.cars = cars;
        if (this.cars.length > 0) {
          this.availableCars = true;
        } else {
          this.availableCars = false;
        }
      })
  }

  sortByMake() {
    this.cars.sort((car1, car2) => {
      return car2.make.localeCompare(car1.make);
    })
  }

  sortByOwner() {
    this.cars.sort((car1, car2) => {
      return car2.owner.localeCompare(car1.owner);
    })
  }

  sortByDate() {
    this.cars.sort((car1, car2) => {
      return car2.date - car1.date;
    })
  }
}