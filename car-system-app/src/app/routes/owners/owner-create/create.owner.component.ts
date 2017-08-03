import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwnersService } from '../../../services/owners.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  templateUrl:  './create.owner.component.html'
})
export class CreateOwnerComponent {
  
  constructor (
    private ownerDataService: OwnersService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }
  createOwner(formValues): void {
      this.ownerDataService
        .createOwner(formValues)
        .then(data => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigate(['/owners/all']);      
          } else {
            this.toastr.error(data.message);
          }
        })
    }
}

