import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Veggie } from '../models/veggie';

@Component({
  selector: 'app-delete-veggie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-veggie.component.html',
  styleUrl: './delete-veggie.component.css'
})
export class DeleteVeggieComponent {
  veggies: Veggie[] = [];
  vID: string = "";

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.veggies = this.dbService.getVeggies();
  }

  deleteVeggie() {
    this.dbService.deleteVeggie(this.vID);
  }

}
