import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CarsService } from '../services/cars.service';
import { OwnersService } from '../services/owners.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from '../services/common/toastr.service';


import { HomeComponent } from './../routes/home/home.component';
import { CarDetailsComponent } from './cars/car-details/car.details.component';
import { AllCarsComponent } from './cars/all-cars/all.cars.component';
import { OwnerDetailsComponent } from './owners/owner-details/owner.details.component';
import { AllOwnersComponent } from './owners/all-owners/all.owners.component';
import { NavbarComponent } from './../nav/navbar.component';
import { CreateCarComponent } from './cars/car-create/create.car.component';
import { EditCarComponent } from './cars/car-edit/edit.car.component';
import { CommentComponent } from './cars/car-comment/create.comment.component'
import { CreateOwnerComponent } from './owners/owner-create/create.owner.component';
import { LoginComponent } from './users/user-login/login.component';
import { RegisterComponent } from './users/user-register/register.component';
import { ProfileComponent } from './users/user-profile/profile.component';
import { EditProfileComponent } from './users/user-edit/edit.profile.component';
import { LogoutComponent } from './users/user-logout/logout.component';
import { CarDateFormatPipe } from './cars/car-details/car.date.format.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent } ,
  { path: 'cars',
    children: [
      { path: 'all', component: AllCarsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateCarComponent },
      { path: 'details/:page/:id', component: CarDetailsComponent},
      { path: 'edit/:page/:id', component: EditCarComponent },
      { path: 'comments/:id', component: CommentComponent } 
    ]
  },
  { path: 'owners',
    children: [
      { path: 'all', component: AllOwnersComponent, pathMatch: 'full' },
      { path: 'create', component: CreateOwnerComponent},
      { path: ':page/:name/:id', component: OwnerDetailsComponent }
    ]
  },
  {
    path: 'users',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile/:name/:id', component: ProfileComponent },
      { path: 'profile/edit/:name/:id', component: EditProfileComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    CarDetailsComponent,
    AllCarsComponent,
    AllOwnersComponent,
    OwnerDetailsComponent,
    NavbarComponent,
    CreateCarComponent,
    EditCarComponent,
    CommentComponent,
    CreateOwnerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    LogoutComponent,
    CarDateFormatPipe
  ],
  imports: [HttpModule, CommonModule, RouterModule.forRoot(routes), FormsModule],
  providers: [CarsService, OwnersService, UserService, AuthService, ToastrService],
  exports: [RouterModule, NavbarComponent]
})
export class AppRoutesModule { }