import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../services/user.service';
import { AuthService } from "../../../services/auth.service";
import { ToastrService } from '../../../services/common/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../../models/user.model';

@Component({
  templateUrl: './edit.profile.component.html'
})

export class EditProfileComponent implements OnInit {

  defaultProfile: UserProfile = new UserProfile('http://www.bestfootball.fr/uploads/img/profile.png', '', '', '')
  profile: UserProfile = this.defaultProfile
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  ngOnInit() {
    let name = this.authService.getUser().name;
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.getProfileInfo(name, id)
      .then(response => {
        this.profile = response.user;
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  editProfile(formValues: FormData) {
    let name = this.authService.getUser().name;
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.updateUser(formValues, name, id)
      .then(response => {
        this.authService.setName(this.profile.name);
        this.toastrService.success('Your profile was edited successfully.');
        this.router.navigate([`users/profile/${this.profile.name}/${id}`]);
      })
      .catch(err=> {
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
      })
  }
}