import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

class Car{
  maker:string;
  model:string;
  constructor(aMaker:string, aModel:string){
    this.maker = aMaker;
    this.model = aModel;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'Welcome to the Week 8 App';

  inputMaker:string = '';
  inputModel:string = '';
  car = new Car('', '');

  fleet:Car[] = [];

  // constructor(){
  //   this.fleet.push(new Car('Toyota', 'Corolla'));
  //   this.fleet.push(new Car('Honda', 'Civic'));
  //   this.fleet.push(new Car('Ford', 'Focus'));
  // }

  counter:number = 0;

  getUnitCode(){
    return 'Test_Unit';
  }

  incrementCounter(){
    this.counter++;
  }

  addCarToFleet(){
    //this.fleet.push(new Car(this.inputMaker, this.inputModel));
    this.car = new Car('', '');
    this.fleet.push(this.car);
  }

  removeLastCar(){
    this.fleet.splice(this.fleet.length - 1, 1);

}
}
