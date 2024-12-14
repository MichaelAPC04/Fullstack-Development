import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Counter } from '../models/counter';
import { Driver } from '../models/driver';
import { Package } from '../models/package';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  constructor(private db: DatabaseService) { }

  Counter:Counter | null = null;
  driverLength: number = 0;
  packageLength: number = 0;

  ngOnInit() {
    this.db.getStats().subscribe((data: any) => {
      console.log(data);
      this.Counter = data;
    });

    this.db.getDriverLength().subscribe((data: any) => {
      console.log(data);
      this.driverLength = data;
    });

    this.db.getPackageLength().subscribe((data: any) => {
      console.log(data);
      this.packageLength = data;
    });
  }

}
