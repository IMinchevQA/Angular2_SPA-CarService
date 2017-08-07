import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { ToastrService } from '../../../services/common/toastr.service';
import { CarModel } from '../../../models/car.model';

@Component({
  selector: 'all-cars',
  // providers: [CarsService],
  templateUrl: './all.cars.component.html',
  styleUrls: ['./all.cars.component.css']
})
export class AllCarsComponent implements OnInit {
  cars: Array<CarModel>;
  page: number = 1;
  availableCars: boolean = false;
  
  constructor(
    private carsDataService: CarsService,
    private toastrService: ToastrService,
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
      .then(response => {
        this.cars = response;
        if (this.cars.length > 0) {
          this.availableCars = true;
        } else {
          this.availableCars = false;
        }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
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