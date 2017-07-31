import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CarModel } from './car.model';
import 'rxjs/add/operator/toPromise';
const baseUrl: string = 'http://localhost:5000/cars'

@Injectable()

export class CarsData {  
  constructor (private http: Http) { }

  getSixCars(): Promise<Array<CarModel>> {
    let urlGetSixCars = `${baseUrl}/getSixCars`;
    return this.http
      .get(urlGetSixCars)
      .toPromise()
      .then(resp => {
        let resolveCars = JSON.parse(resp['_body']).map(car => {
          return castCarToCarModel(car);
        })
        return resolveCars;
      })
      .catch(err => {
        console.log(err);
        let arrErr = [];
        arrErr.push(new CarModel(null, null, null, null, null, null, null, null, null));
        return arrErr;
      })
  }

  getCars(page: number): Promise<Array<CarModel>> {
    let urlGetCars = `${baseUrl}/all?page=${page}`;
    return this.http
      .get(urlGetCars)
      .toPromise()
      .then(resp => {
        let resolveCars = JSON.parse(resp['_body']).map(car => {
          return castCarToCarModel(car);
        })
        return resolveCars;
      })
  }

  getCarDetails(id: string): Promise<CarModel> {
    let urlGetCarDetails = `${baseUrl}/details/${id}`;
    return this.http
    .get(urlGetCarDetails)
    .toPromise()
    .then(car => {
      return castCarToCarModel(JSON.parse(car['_body']));
    })
    .catch(err => {
      console.log(err);
      return new CarModel(null, null, null, null, null, null, null, null, null);
    })
  }
}

function castCarToCarModel (car) {
  let id = car['id'];
  let date = car['date'];
  let make = car['make'];
  let model = car['model'];          
  let image = car['image'];
  let owner = car['owner'];
  let description = car['description'];
  let engine = car['engine'];
  let price = car['price'];

  return new CarModel(id, date, make, model, image, owner, description, engine, price);
}
