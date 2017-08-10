import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutesModule } from './routes/routes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { AuthService } from './services/auth.service';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { store, IAppState } from './store'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    NgReduxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store)
  }
  
}
