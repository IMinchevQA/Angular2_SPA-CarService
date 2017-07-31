import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './../routes/home/home.component';
import { CarDetailsComponent } from './cars/car-details/car.details.component';
import { AllCarsComponent } from './cars/all-cars/all.cars.component';
import { OwnerDetailsComponent } from './owners/owner-details/owner.details.component';
import { AllOwnersComponent } from './owners/all-owners/all.owners.component';

const routes: Routes = [
  { path: '', component: HomeComponent } ,
  { path: 'cars',
    children: [
      { path: 'all', component: AllCarsComponent, pathMatch: 'full' },
      { path: 'details/:id', component: CarDetailsComponent}
    ]
  },
  { path: 'owners',
    children: [
      { path: 'all', component: AllOwnersComponent, pathMatch: 'full' },
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
    OwnerDetailsComponent
  ],
  imports: [HttpModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }