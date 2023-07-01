import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private register_url = 'http://localhost:8080/applicant/register';
  private download_url = 'http://localhost:8080/applicant/downloadFile';
  private getAll_url = 'http://localhost:8080/applicant/getAll';
  private hire_url = 'http://localhost:8080/applicant/hire';

  constructor(private http: HttpClient) { }

  register(user) {
    let queryParams = {};
        queryParams = {
            observe: 'response',
            params: new HttpParams(),
            responseType: 'text'
        };

    return this.http.post(this.register_url, user, queryParams);
  }

  download(dto){
    let json = JSON.stringify(dto)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.post(this.download_url, json, options);
  }

  getAll(){
    return this.http.get(this.getAll_url);
  }

  hire(dto){
    let json = JSON.stringify(dto)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers, responseType: 'text' as 'json' };
    return this.http.post(this.hire_url, json, options);
  }
  
}
