export class CarModel {
  constructor(
    public id: string,
    public date: number,
    public make: string,
    public model: string,
    public image: string,
    public owner: string,
    public description: string,
    public engine: string,
    public price: string,
    public comments?: Array<object>
  ) { }
}