import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OwnerModel } from '../models/owner.model';
import { CarModel } from '../models/car.model';
import 'rxjs/add/operator/toPromise';

const baseUrl: string = 'http://localhost:5000/owners'

@Injectable()
export class OwnersService {
  private headers = new Headers({
    "Content-Type": "application/json"
  })
  constructor (private http: Http) { }

  createOwner(formValues) {
    const url = `${baseUrl}/create`
    console.log(url)
    let postCar = JSON.stringify(formValues);
    return this.http
    .post(url, postCar, { headers: this.headers })
    .toPromise()
    .then(response => response.json())
    .catch(err => this.handleError)
  }

  getOwners(page: number): Promise<Array<OwnerModel>> {
    let urlGetOwners = `${baseUrl}/all?page=${page}`;
    return this.http
      .get(urlGetOwners)
      .toPromise()
      .then(resp => {
        let resolveOwners = JSON.parse(resp['_body']).map(owner => {
          return castOwnerToOwnerModel(owner);
        })
        return resolveOwners
      })
      .catch(err => {
        console.log(err);
        let arrErr = [];
        arrErr.push(new OwnerModel(null, null, null, null));
        return arrErr;
      })
  }

  getOwnerDetails (id: number, name: string): Promise<OwnerModel> {
    let urlGetOwnerDetails = `${baseUrl}/details/${name}/${id}`;
    return this.http
      .get(urlGetOwnerDetails)
      .toPromise()
      .then(resp => {
        let resolveOwner = castOwnerToOwnerModel(JSON.parse(resp['_body']));
        return resolveOwner;
      })
      .catch(err => {
        console.log(err)
        return new OwnerModel(null, null, null, null);
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error)
  }
}

function castOwnerToOwnerModel (owner: Object): OwnerModel {
  let id = owner['id'];
  let name = owner['name'];
  let image = owner['image'];
  let ownerCars: Array<CarModel> = owner['ownerCars'];

  return new OwnerModel(id, name, image, ownerCars);
}