import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  constructor(private db: DatabaseService, private router: Router) { }

  driver = {dId: ""};

  deleteDriverBydId(dId: string) {
    this.db.deleteDriver(dId).subscribe({next: (data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getDrivers']);
    }, error: (err: any) => {
      console.error("Invalid data inputs:", err);
      this.router.navigate(['0001/apc/invalidData']);
    }
    });
  }
  

}
