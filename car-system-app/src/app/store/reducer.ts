import { IAppState, OwnersState } from '../store';
import { carTypes } from '../actions/cars.actions';
import { ownerTypes } from '../actions/owners.actions';

import { CarModel } from '../models/car.model';


const cars = [];
const owners = [];

const initialState: IAppState = {
  cars: [],
  car: new CarModel('', 0, '', '', '', '', '', '', '')
}

const ownersState: OwnersState = {
  owners: []
}

function getAllCars(state, action) { 
  return Object.assign({}, state, {
    cars: action.cars
  })  
}

function getSixCars(state, action) {
  let carsForSort = action.cars.slice(0);
  return Object.assign({}, state, {
    cars: carsForSort.sort(sortFunction('id'))
  })
}

function sortCars(state, action) {
    let sortCriteria = action.sortCriteria;
    let carsForSort = state.cars.slice(0);   
    return Object.assign({}, state, {
      cars: carsForSort.sort(sortFunction(sortCriteria))
    })
}

function getAllOwners(ownersState, action) {
  return Object.assign({}, ownersState, {
    owners: action.owners
  }); 
}

function getCarDetails(state, action) {
  return Object.assign({}, ownersState, {
    car: action.car
  })
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case carTypes.GET_ALL_CARS:
      return getAllCars(state, action);
    case carTypes.GET_HOME_CARS:
      return getSixCars(state, action);
    case carTypes.SORT_CARS:
      return sortCars(state, action);
    case carTypes.GET_CAR_DETAILS: 
      return getCarDetails(state, action);
    case ownerTypes.GET_ALL_OWNERS:   
      return getAllOwners(ownersState, action);      
    default: return state;
  }
}

let sortFunction = (sortCriteria: string) => ({
  'make': (car2, car1) => car2.make.localeCompare(car1.make),
  'owner': (car1, car2) => car2.owner.localeCompare(car1.owner),
  'date': (car1, car2) => car2.date - car1.date,
  'id': (car1, car2) => Number(car1.id) - Number(car2.id)
}[sortCriteria])


  
  // sortByMake() {
  //   this.cars.sort((car1, car2) => {
  //     return car2.make.localeCompare(car1.make);
  //   })
  // }

  // sortByOwner() {
  //   this.cars.sort((car1, car2) => {
  //     return car2.owner.localeCompare(car1.owner);
  //   })
  // }

  // sortByDate() {
  //   this.cars.sort((car1, car2) => {
  //     return car2.date - car1.date;
  //   })
  // }