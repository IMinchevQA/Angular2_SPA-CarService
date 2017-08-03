import { CarModel } from '../models/car.model';

export class OwnerModel {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public ownerCars?: Array<CarModel>)
  { }
}