import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {

  package: Package = new Package();

  constructor(private db: DatabaseService, private router: Router) { }

  addPackage() {
    this.db.addPackage(this.package).pipe(catchError((error) => {
      console.log("Invalid data inputs:", error);
      this.router.navigate(['0001/apc/invalidData']);
      return throwError(error);
    })).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getPackages']);
    });
  }

}
