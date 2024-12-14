import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  constructor(private db: DatabaseService, private router: Router) { }

  driver = {dId: "", dLicense: "", dDepartment: ""};

  updateDriverBydId(dId: string, dLicense: string, dDepartment: string) {
    this.db.updateDriver(dId, dLicense, dDepartment).subscribe({next: (data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getDrivers']);
    }, error: (err: any) => {
      console.error("Invalid data inputs:", err);
      this.router.navigate(['0001/apc/invalidData']);
    }
    });
  }

}
