import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';
import { PackageWeightPipe } from '../package-weight.pipe';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [PackageWeightPipe],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css'
})
export class PackageListComponent {

  constructor(private db: DatabaseService) { }

  Package:Package[] = [];
  socket: any;
  distanceOutput: string[] = [];

  ngOnInit() {
    this.socket = io();
    this.db.getPackages().subscribe((data: any) => {
      console.log(data);
      this.Package = data;
    });

    this.socket.on('distanceResult', (data: {distance: string, idx: number}) => {
      console.log('Result:', data.distance);
      this.distanceOutput[data.idx] = data.distance;
    });
  }

  deletePackage(pId: string) {
    this.db.deletePackage(pId).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  calculateDistance(pDest: string, idx: number) {
    this.socket.emit('calculateDistance', {pDest, idx});
  }

}
