import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styles: [
    ''
  ]
})
export class ProfileComponent implements OnInit {
  defaultProfile: UserProfile = new UserProfile('http://www.bestfootball.fr/uploads/img/profile.png', '', 'Not set', 'Not set')
  profile: UserProfile
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit() {
    let name = this.auth.getUser().name;
    let id = this.route.snapshot.paramMap.get('id');
    this.userService
      .getProfileInfo(name, id)
      .then(response => {
        if (response.success) {
          this.profile = response.user;
          this.toastrService.success(response.message);   
        } else {
          let errorMessage = response.message || 'An error occured, please try login again!'
          this.toastrService.error(errorMessage);
        }
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
  }
}