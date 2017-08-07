import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { AuthService } from '../services/auth.service';
import { CarModel } from '../models/car.model';
import { CommentModel } from '../models/comment.model';
import 'rxjs/add/operator/toPromise';
const baseUrl: string = 'http://localhost:5000/cars'

@Injectable()

export class CarsService
 {
  constructor (
    private http: Http,
    private authService: AuthService) { }

  updateCar(formValues) {
    const idEditCar = formValues.id;    
    const urlEditCar = `${baseUrl}/edit/${idEditCar}`;
    let postCar = JSON.stringify(formValues);
    return this.http
      .put(urlEditCar, postCar, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(response => response.json())
      .catch(err => this.handleError(err));
  }

  createCar(formValues: FormData) {
    const urlCreateCar = `${baseUrl}/create`
    let postCar = JSON.stringify(formValues);
    return this.http
    .post(urlCreateCar, postCar, { headers: this.authService.getHeaders() })
    .toPromise()
    .then(response => response.json())
    .catch(err => this.handleError(err))
  }

  getSixCars(): Promise<Array<CarModel>> {
    let urlGetSixCars = `${baseUrl}/getSixCars`;
    return this.http
      .get(urlGetSixCars, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(resp => {
        let resolveCars = JSON.parse(resp['_body']).map(car => {
          return castCarToCarModel(car);
        })        
        return resolveCars;
      })
      .catch(err => err => this.handleError(err))
  }

  getCars(page: number): Promise<Array<CarModel>> {
    let urlGetCars = `${baseUrl}/all?page=${page}`;
    return this.http
      .get(urlGetCars, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(resp => {
        let resolveCars = JSON.parse(resp['_body']).map(car => {
          return castCarToCarModel(car);
        })
        return resolveCars;
      })
      .catch(err => this.handleError(err))
  }

  getCarDetails(id: string): Promise<CarModel> {
    let urlGetCarDetails = `${baseUrl}/details/${id}`;
    return this.http
    .get(urlGetCarDetails, { headers: this.authService.getHeaders() })
    .toPromise()
    .then(car => {
      return castCarToCarModel(JSON.parse(car['_body']));
    })
    .catch(err => this.handleError(err))
  }
  
  createComment(commentBody: FormData, carId: string): Promise<CommentModel[]> {
    const urlCreateComment = `${baseUrl}/comments/${carId}`;
    let postComment = JSON.stringify(commentBody);
    return this.http
      .post(urlCreateComment, postComment, { headers: this.authService.getHeaders() })
      .toPromise()
      .then(resp => resp.json())
      .catch(err => this.handleError(err))
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred!', error); // for demo purposes only
    return Promise.reject(error.message || error.statusText || error)
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
