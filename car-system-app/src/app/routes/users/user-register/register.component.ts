import { Component } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from '../../../services/common/toastr.service';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  isUserRegistered: boolean = false;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  register(formValues) {
    this.userService
      .register(formValues)
      .then(response => {
        if (response.success) {
          this.isUserRegistered = true
          this.toastrService.success(response.message);
          this.router.navigate(['users/login']);
        } else {
          let errorMessage = response.message || 'Something is wrong, please try to register again!'
          this.toastrService.error(errorMessage);
        }
      })
      .catch(err => {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
  }
}