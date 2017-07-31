import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnersData } from '../owners.data';
import { OwnerModel } from '../owner.model';

@Component({
  selector: 'all-owners',
  providers: [OwnersData],
  templateUrl: './all.owners.component.html',
  styleUrls: ['./all.owners.component.css']
})
export class AllOwnersComponent implements OnInit {  
  
  owners: Array<OwnerModel>;
  page: number = 1;
  availableOwners: boolean = false;

  constructor(
    private ownersDataService: OwnersData,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams.page ? (this.route.snapshot.queryParams.page > 0 ? this.route.snapshot.queryParams.page : 1) : 1;
    this.router.navigate(['/owners/all'], { queryParams: { page: this.page } });
    this.getOwners(this.page);
  }

  goToPrevPage() {
    if (this.page === 1) {
      alert('There is no previous page to show you!');
      return;   
    }
    this.router.navigate(['/owners/all'], { queryParams: { page: --this.page } });
    this.getOwners(this.page);
  }

  goToNextPage(): void {
    if (this.owners.length === 0) {
      alert('Тhere are no more owners to show you');
      return;
    }
    this.router.navigate(['/owners/all'], { queryParams: { page: ++this.page } })
    this.getOwners(this.page);
  }

  getOwners(page: number): void{
    this.ownersDataService
      .getOwners(this.page)
      .then(owners => {
        this.owners = owners;
        if (this.owners.length > 0) {
          this.availableOwners = true;
        } else {
          this.availableOwners = false;
        }
      })
  }
}
