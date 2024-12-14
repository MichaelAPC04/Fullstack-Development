import { Component } from '@angular/core';
import { pc } from '../../models/pc';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-list-computers',
  standalone: true,
  imports: [],
  templateUrl: './list-computers.component.html',
  styleUrl: './list-computers.component.css'
})
export class ListComputersComponent {

  constructor(private db: DatabaseService) { }

  pc:pc[] = [];

  ngOnInit() {
    this.db.listComputers().subscribe((data: any) => {
      this.pc = data;
    });
  }

}
