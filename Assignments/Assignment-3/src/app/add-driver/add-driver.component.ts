import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private db: DatabaseService, private router: Router) { }

  addDriver() {
    this.db.addDriver(this.driver).pipe(catchError((error) => {
      console.log("Invalid data inputs:", error);
      this.router.navigate(['0001/apc/invalidData']);
      return throwError(error);
    })).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getDrivers']);
    });
  }

}
