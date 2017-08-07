import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';

import { Router } from '@angular/router';
@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  constructor (
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  login(formValues) {
    this.userService
      .login(formValues) 
      .then(response => {
        if (response.success) {
          this.authService.saveUser(response.user)
          this.authService.authenticateUser(response.token)
          this.toastrService.success(response.message)
          this.router.navigate(['cars/all'])
        } else {
          let errorMessage = response.message || 'An error occured, please try login again!'
          this.toastrService.error(errorMessage)
        }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
  }
}