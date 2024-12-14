import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pc } from '../../models/pc';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-computer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-computer.component.html',
  styleUrl: './new-computer.component.css'
})
export class NewComputerComponent {

  computer: pc = new pc();

  constructor(private db: DatabaseService, private router: Router) { }

  addComputer() {
    this.db.newComputer(this.computer).subscribe((data: any) => {
      console.log(data);
    });
    this.router.navigate(['dashboard/list-computers']);
  }

  

}
