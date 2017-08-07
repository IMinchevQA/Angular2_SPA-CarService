import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
@Component({
  template: ''
})

export class LogoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() {
    this.auth.deauthenticateUser();
    this.auth.removeUser();
    this.router.navigate(['cars/all']);
  }
}