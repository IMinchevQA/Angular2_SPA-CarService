import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { OwnerModel } from '../models/owner.model';
import { CarModel } from '../models/car.model';
import 'rxjs/add/operator/toPromise';

const baseUrl: string = 'http://localhost:5000/owners'

@Injectable()
export class OwnersService {
  constructor (
    private http: Http,
    private authService: AuthService) { }

  createOwner(formValues) {
    const url = `${baseUrl}/create`;
    let postOwner = JSON.stringify(formValues);
    return this.http
    .post(url, postOwner, { headers: this.authService.getHeaders() })
    .toPromise()
    .then(response => response.json())
    .catch(err => this.handleError(err))
  }

  getOwners(page: number): Promise<Array<OwnerModel>> {
    let urlGetOwners = `${baseUrl}/all?page=${page}`;
    return this.http
      .get(urlGetOwners, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(resp => {
        let resolveOwners = JSON.parse(resp['_body']).map(owner => {
          return castOwnerToOwnerModel(owner);
        })
        return resolveOwners
      })
      .catch(err => this.handleError(err))
  }

  getOwnerDetails (id: number, name: string): Promise<OwnerModel> {
    let urlGetOwnerDetails = `${baseUrl}/details/${name}/${id}`;
    return this.http
      .get(urlGetOwnerDetails, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(resp => {
        let resolveOwner = castOwnerToOwnerModel(JSON.parse(resp['_body']));
        return resolveOwner;
      })
      .catch(err => this.handleError(err))
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred!', error); // for demo purposes only
    return Promise.reject(error.message || error.statusText || error)
  }
}

function castOwnerToOwnerModel (owner: Object): OwnerModel {
  let id = owner['id'];
  let name = owner['name'];
  let image = owner['image'];
  let ownerCars: Array<CarModel> = owner['ownerCars'];

  return new OwnerModel(id, name, image, ownerCars);
}