import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { DriverCapitalisePipe } from '../driver-capitalise.pipe';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [DriverCapitalisePipe],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent {

  constructor(private db: DatabaseService) { }

  Driver:Driver[] = [];
  driverSelect: Boolean = false;
  getDriver: Driver = new Driver();

  ngOnInit() {
    this.db.getDrivers().subscribe((data: any) => {
      console.log(data);
      this.Driver = data;
    });
  }

  deleteDriver(dId: string) {
    this.db.deleteDriver(dId).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  listPackages(driver: Driver) {
    this.driverSelect = true;
    this.getDriver = {
      ...driver,
      dAssignedPackages: [].concat(...driver.dAssignedPackages)
    };
  }

}
