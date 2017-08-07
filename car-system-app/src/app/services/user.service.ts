import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private baseUrl = 'http://localhost:5000';
  
  constructor(
    private authService: AuthService,
    private http: Http) { }
    register (formValues: UserModel) {
      const registerUrl = `${this.baseUrl}/auth/signup`;
      let postUser = JSON.stringify(formValues);
      return this.http
        .post(registerUrl, postUser,  { headers: this.authService.getHeaders() })
        .toPromise()
        .then(response => {
          console.log(response.json());
          return response.json();
        })
        .catch(err => this.handleError(err))
    }
  
    login (formValues: UserModel) {
      let loginUrl = `${this.baseUrl}/auth/login`;
      let postUser = JSON.stringify(formValues);
      return this.http
        .post(loginUrl, postUser, { headers: this.authService.getHeaders() })
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError(err))
    }
  
    getProfileInfo (name: string, id: string) {
      let getProfileUrl = `${this.baseUrl}/users/profile/${name}/${id}`;
      return this.http
        .get(getProfileUrl, { headers: this.authService.getHeaders()})
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError(err))
    }
  
    updateUser (formValues: FormData, name: string, id: string) {
      let updateUserUrl = `${this.baseUrl}/users/profile/edit/${name}/${id}`;
      let putUser = JSON.stringify(formValues);
      return this.http
        .put(updateUserUrl, putUser, { headers: this.authService.getHeaders() })
        .toPromise()
        .then(user => user.json())
        .catch(err => this.handleError(err))
    }
  
     private handleError(error: any): Promise<any> {
      console.error('An error occurred!', error); // for demo purposes only
      return Promise.reject(error.message || error.statusText || error)
    }
}
