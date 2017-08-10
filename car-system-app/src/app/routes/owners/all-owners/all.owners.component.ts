import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';
import { ToastrService } from '../../../services/common/toastr.service';
import { OwnerModel } from '../../../models/owner.model';
import { OwnersActions } from '../../../actions/owners.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { store } from '../../../store';

@Component({
  selector: 'all-owners',
  templateUrl: './all.owners.component.html',
  styleUrls: ['./all.owners.component.css']
})
export class AllOwnersComponent implements OnInit {  
  @select('owners') owners: Observable<Array<OwnerModel>>;  
  page: number = 1;
  ownersLength: number;

  constructor(
    private ownersActions: OwnersActions,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams.page ? (this.route.snapshot.queryParams.page > 0 ? this.route.snapshot.queryParams.page : 1) : 1;
    this.router.navigate(['/owners/all'], { queryParams: { page: this.page } });
    this.ownersActions.getOwners(this.page);    
    this.owners.subscribe(result =>
      result ? 
        this.ownersLength = result.length : 
        this.ownersLength = 0
      )
  }

  goToNextPage(): void {
    if (this.ownersLength === 0) {
      alert('Тhere are no more owners to show you');
      return;
    }
    this.router.navigate(['/owners/all'], { queryParams: { page: ++this.page } })
    this.ownersActions.getOwners(this.page);
  }

  goToPrevPage() {
    if (this.page === 1) {
      alert('There is no previous page to show you!');
      return;   
    }
    this.router.navigate(['/owners/all'], { queryParams: { page: --this.page } });
    this.ownersActions.getOwners(this.page);
  }


  // getOwners(page: number): void{
  //   this.ownersDataService
  //     .getOwners(this.page)
  //     .then(response => {
  //       this.owners = response;
  //       if (this.owners.length > 0) {
  //         this.availableOwners = true;
  //       } else {
  //         this.availableOwners = false;
  //         this.toastrService.error('No owners available!')
  //       }
  //     })
  //     .catch(err=> {
  //       this.toastrService.error(err || 'Sorry but unknown failure occured!');
  //     })
  // }
}

