import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { CarModel } from '../models/car.model';
import 'rxjs/add/operator/toPromise';
const baseUrl: string = 'http://localhost:5000/cars'

@Injectable()

export class CarsService
 {
   private headers = new Headers({
    "Content-Type": "application/json"
  })
  constructor (private http: Http) { }

  updateCar(formValues) {
    const idEditCar = formValues.id;    
    const url = `${baseUrl}/edit/${idEditCar}`;
    let postCar = JSON.stringify(formValues);
    return this.http
      .post(url, postCar, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(err => this.handleError);
  }

  createCar(formValues) {
    const url = `${baseUrl}/create`
    let postCar = JSON.stringify(formValues);
    return this.http
    .post(url, postCar, { headers: this.headers })
    .toPromise()
    .then(response => response.json())
    .catch(err => this.handleError)
  }

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error)
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
