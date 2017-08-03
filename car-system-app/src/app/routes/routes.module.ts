import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CarsService } from '../services/cars.service';
import { OwnersService } from '../services/owners.service';
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
import { CreateOwnerComponent } from './owners/owner-create/create.owner.component';
import { CarEngineInfoPipe } from './cars/car-details/car.engine.info.pipe'

const routes: Routes = [
  { path: '', component: HomeComponent } ,
  { path: 'cars',
    children: [
      { path: 'all', component: AllCarsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateCarComponent },
      { path: 'details/:page/:id', component: CarDetailsComponent},
      { path: 'edit/:page/:id', component: EditCarComponent } 
    ]
  },
  { path: 'owners',
    children: [
      { path: 'all', component: AllOwnersComponent, pathMatch: 'full' },
      { path: 'create', component: CreateOwnerComponent},
      { path: ':page/:name/:id', component: OwnerDetailsComponent }
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
    CreateOwnerComponent,
    CarEngineInfoPipe
  ],
  imports: [HttpModule, CommonModule, RouterModule.forRoot(routes), FormsModule],
  providers: [CarsService, OwnersService, AuthService, ToastrService],
  exports: [RouterModule, NavbarComponent]
})
export class AppRoutesModule { }