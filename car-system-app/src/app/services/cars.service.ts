import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { AuthService } from '../services/auth.service';
import { CarModel } from '../models/car.model';
import { CommentModel } from '../models/comment.model';
import { Observable } from 'rxjs/Rx';
import './rxjs-operators.js';
const baseUrl: string = 'http://localhost:5000/cars'

@Injectable()

export class CarsService
 {
  constructor (
    private http: Http,
    private authService: AuthService) { }

  updateCar(carData: FormData): Observable<CarModel> {
    const idEditCar = carData['id'];    
    const urlEditCar = `${baseUrl}/edit/${idEditCar}`;
    let postCar = JSON.stringify(carData);
    return this.http
      .put(urlEditCar, postCar, { headers: this.authService.getHeaders() })
      .map(resp => {
        let parsedResp = JSON.parse(resp['_body'])
        if (parsedResp.success === true) {
          return {
            message: parsedResp.message,
            car: castCarToCarModel(parsedResp.payload)
          }
        }
        throw new Error(parsedResp.message);
      })
      .catch(err => this.handleError(err));
  }

  createCar(formValues: FormData): Observable<CarModel> {
    const urlCreateCar = `${baseUrl}/create`
    let postCar = JSON.stringify(formValues);
    return this.http
    .post(urlCreateCar, postCar, { headers: this.authService.getHeaders() })
    .map(resp => {
      debugger;
      let parsedResp = JSON.parse(resp['_body'])
        if (parsedResp.success === true) {
          return {
            message: parsedResp.message,
            car: castCarToCarModel(parsedResp.payload)
          }
        }
        throw new Error(parsedResp.message);
      })
    .catch(err => this.handleError(err))
  }

  getSixCars(): Observable<Array<CarModel>> {
    let urlGetSixCars = `${baseUrl}/getSixCars`;
    return this.http
      .get(urlGetSixCars, { headers: this.authService.getHeaders() })
      .map(resp => {
        let parsedResp = JSON.parse(resp['_body'])
        if (parsedResp.success === true) {
          let resolveCars = JSON.parse(resp['_body']).payload.map(car => castCarToCarModel(car))
          return resolveCars;
        }
        throw new Error(parsedResp.message);    
      })
      .catch(err => this.handleError(err))
  }

  getCars(page: number): Observable<Array<CarModel>> {
    let urlGetCars = `${baseUrl}/all?page=${page}`;
    return this.http
      .get(urlGetCars, { headers: this.authService.getHeaders() })
      .map(resp => {
        let parsedResp = JSON.parse(resp['_body'])
        if (parsedResp.success === true) {
          let resolveCars = JSON.parse(resp['_body']).payload.map(car => castCarToCarModel(car))
          return resolveCars;
        }
        throw new Error(parsedResp.message);        
      })
      .catch(err => this.handleError(err))
  }

  getCarDetails(id: string): Observable<CarModel> {
    let urlGetCarDetails = `${baseUrl}/details/${id}`;
    return this.http
      .get(urlGetCarDetails, { headers: this.authService.getHeaders() })
      .map(resp => {
        let parsedResp = JSON.parse(resp['_body'])
        if (parsedResp.success === true) {
          return castCarToCarModel(parsedResp.payload)
        }
        throw new Error(parsedResp.message);
      })
      .catch(err => this.handleError(err))
  }
  
  addComment(commentBody: FormData, carId: string): Observable<CommentModel[]> {
    const urlCreateComment = `${baseUrl}/comments/${carId}`;
    let postComment = JSON.stringify(commentBody);
    return this.http
      .post(urlCreateComment, postComment, { headers: this.authService.getHeaders() })
      .map(resp => resp.json())
      .catch(err => this.handleError(err))
  }
  private handleError(error: any): Promise<any> {
    // console.error('An error occurred!', error); // for demo purposes only
    let unknownErrorMessage = ('Error - connection refused, or some other problem occured!')
    let message = error.message || error.statusText || unknownErrorMessage;
    return Promise.reject(message);
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
  let comments = car['comments'];
  return new CarModel(id, date, make, model, image, owner, description, engine, price, comments);
}
