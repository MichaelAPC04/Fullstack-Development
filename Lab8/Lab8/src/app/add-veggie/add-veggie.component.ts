import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-veggie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-veggie.component.html',
  styleUrl: './add-veggie.component.css'
})
export class AddVeggieComponent {
  name: string = "";
  cost: number = 0;
  vID: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { }

  addVeggie() {
    this.dbService.addVeggie(this.name, this.cost);
    this.router.navigate(['/get-veggies']);
  }

}
