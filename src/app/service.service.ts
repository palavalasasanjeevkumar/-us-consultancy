import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   public Url = 'http://localhost:6001/';
  constructor(private _http: HttpClient) { }
  
  addRegForm(obj) {
    console.log("postpayment",obj);
    return this._http.post(this.Url + 'insertData', obj)
  }
}
