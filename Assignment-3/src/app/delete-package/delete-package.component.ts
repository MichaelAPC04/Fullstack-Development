import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  constructor(private db: DatabaseService, private router: Router) { }

  package = {pId: ""};

  deletePackageBypId(pId: string) {
    this.db.deletePackage(pId).subscribe({next: (data: any) => {
      console.log(data);
      this.router.navigate(['0001/apc/getPackages']);
    }, error: (err: any) => {
      console.error("Invalid data inputs:", err);
      this.router.navigate(['0001/apc/invalidData']);
    }
    });
  }

}
