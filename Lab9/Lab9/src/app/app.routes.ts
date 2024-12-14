import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewComputerComponent } from './new-computer/new-computer.component';
import { ListComputersComponent } from './list-computers/list-computers.component';
import { ConversionComponent } from './conversion/conversion.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/new-computer', component: NewComputerComponent },
    { path: 'dashboard/list-computers', component: ListComputersComponent },
    { path: 'dashboard/conversion', component: ConversionComponent },
    { path: '**', redirectTo: 'dashboard' }
];
