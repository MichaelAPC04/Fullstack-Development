import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVeggieComponent } from './add-veggie/add-veggie.component';
import { DeleteVeggieComponent } from './delete-veggie/delete-veggie.component';
import { GetVeggiesComponent } from './get-veggies/get-veggies.component';

export const routes: Routes = [ // Add 'export' here
  { path: 'add-veggie', component: AddVeggieComponent },
  { path: 'delete-veggie', component: DeleteVeggieComponent },
  { path: 'get-veggies', component: GetVeggiesComponent },
  { path: '', redirectTo: '/add-veggie', pathMatch: 'full' },
  { path: '**', redirectTo: '/add-veggie' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }