import { CarModel } from '../models/car.model';
export interface IAppState {
  cars: CarModel[],
  car: CarModel
}