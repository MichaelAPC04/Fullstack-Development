import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatsComponent } from './stats/stats.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { PackageListComponent } from './package-list/package-list.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { IndexComponent } from './index/index.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { UpdatePackageComponent } from './update-package/update-package.component';

export const routes: Routes = [
    { path: '', redirectTo: '0001/apc', pathMatch: 'full' },
    { path: '0001/apc', component: IndexComponent },
    { path: '0001/apc/addDriver', component: AddDriverComponent },
    { path: '0001/apc/getDrivers', component: DriverListComponent },
    { path: '0001/apc/removeDriver', component: DeleteDriverComponent },
    { path: '0001/apc/updateDriver', component: UpdateDriverComponent },
    { path: '0001/apc/addPackage', component: AddPackageComponent },
    { path: '0001/apc/getPackages', component: PackageListComponent },
    { path: '0001/apc/removePackage', component: DeletePackageComponent },
    { path: '0001/apc/updatePackage', component: UpdatePackageComponent },
    { path: '0001/apc/stats', component: StatsComponent },
    { path: '0001/apc/invalidData', component: InvalidDataComponent },
    { path : '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }