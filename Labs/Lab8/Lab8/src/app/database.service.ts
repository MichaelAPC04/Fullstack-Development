import { Injectable } from '@angular/core';
import { Veggie } from './models/veggie';

const veggies: Veggie[] = [];

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  addVeggie(name: string, cost: number) {
    let veggie = new Veggie();
    veggie.name = name;
    veggie.cost = cost;
    veggies.push(veggie);
  }

  getVeggies() {
    return veggies;
  }

  deleteVeggie(vID: string) {
    for (let i = 0; i < veggies.length; i++) {
      if (veggies[i].vID === vID) {
        veggies.splice(i, 1);
        break;
      }
    }
  }

}
