import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './models/counter';

const API_URL = "http://localhost:8080/api/v2";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  addDriver(data: any) {
    return this.http.post(API_URL + '/addDriver', data, httpOptions);
  }

  getDrivers() {
    return this.http.get(API_URL + '/getDrivers');
  }

  deleteDriver(dId: string) {
    return this.http.delete(API_URL + '/removeDriver', {headers: httpOptions.headers, body: {_id: dId}});
  }

  updateDriver(dId: string, dLicense: string, dDepartment: string) {
    return this.http.put(API_URL + '/updateDriver', {id: dId, dLicense: dLicense, dDepartment: dDepartment}, httpOptions);
  }

  getDriverLength() {
    return this.http.get(API_URL + '/driverLength');
  }

  addPackage(data: any) {
    return this.http.post(API_URL + '/addPackage', data, httpOptions);
  }

  getPackages() {
    return this.http.get(API_URL + '/getPackage');
  }

  deletePackage(pId: string) {
    return this.http.delete(API_URL + '/removePackage', {headers: httpOptions.headers, body: {pId: pId}});
  }

  updatePackage(pId: string, pDest: string) {
    return this.http.put(API_URL + '/updatePackage', {id: pId, pDest: pDest}, httpOptions);
  }

  getPackageLength() {
    return this.http.get(API_URL + '/packageLength');
  }

  getStats() {
    return this.http.get<Counter>(API_URL + '/stats');
  }

}
