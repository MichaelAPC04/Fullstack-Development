import { APP_ID, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Double } from 'mongodb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'apc0001Lab7';

  inputName:string = '';
  inputPrice:number=0;
  inputCalories:number=0;

  fruit = new Fruit('', 0 , 0);

  fruits:Fruit[] = [];

  addFruit(){
    this.fruit = new Fruit(this.inputName, this.inputPrice, this.inputCalories);
    this.fruits.push(this.fruit);
    this.inputName = "";
    this.inputPrice = 0;
    this.inputCalories = 0;
  }

}

class Fruit{
  name: string;
  price: number;
  calories: number;
  constructor(aName: string, aPrice: number, aCalories: number){
    this.name = aName;
    this.price = aPrice;
    this.calories = aCalories;
  }

}
