import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Veggie } from '../models/veggie';

@Component({
  selector: 'app-get-veggies',
  standalone: true,
  imports: [],
  templateUrl: './get-veggies.component.html',
  styleUrl: './get-veggies.component.css'
})
export class GetVeggiesComponent {
  veggies: Veggie[] = [];
  
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.veggies = this.dbService.getVeggies();
  }

}
