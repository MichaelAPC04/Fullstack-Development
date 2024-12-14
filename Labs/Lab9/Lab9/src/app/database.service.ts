import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  newComputer(pc: any){
    return this.http.post(API_URL + '/api/pcs', pc, httpOptions);
  }

  listComputers(){
    return this.http.get(API_URL + '/api/pcs');
  }

  // conversion(kb: number){
  //   return this.http.post(API_URL + '/conversion', {kb: kb}, httpOptions);
  // }

}
