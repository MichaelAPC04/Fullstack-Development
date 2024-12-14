import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {

  constructor(private db: DatabaseService, private router: Router) { }

  package = {pId: "", pDest: ""};

  updatePackageBypId(pId: string, pDest: string) {
    this.db.updatePackage(pId, pDest).subscribe({next: (data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getPackages']);
    }, error: (err: any) => {
      console.error("Invalid data inputs:", err);
      this.router.navigate(['0001/apc/invalidData']);
    }
    });
  }

}
