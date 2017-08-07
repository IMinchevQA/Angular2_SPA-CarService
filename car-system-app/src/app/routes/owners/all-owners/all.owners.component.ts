import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';
import { ToastrService } from '../../../services/common/toastr.service';
import { OwnerModel } from '../../../models/owner.model';

@Component({
  selector: 'all-owners',
  templateUrl: './all.owners.component.html',
  styleUrls: ['./all.owners.component.css']
})
export class AllOwnersComponent implements OnInit {  
  
  owners: Array<OwnerModel>;
  page: number = 1;
  availableOwners: boolean = false;

  constructor(
    private ownersDataService: OwnersService,
    private toastrService: ToastrService,
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
      .then(response => {
        this.owners = response;
        if (this.owners.length > 0) {
          this.availableOwners = true;
        } else {
          this.availableOwners = false;
          this.toastrService.error('No owners available!')
        }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
  }
}

