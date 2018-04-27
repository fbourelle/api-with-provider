import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

  apiUrl = 'https://randomuser.me/api/';

  constructor(public http: HttpClient) {

  }

  getPeople(query: string) {
    let people = new Promise(resolve => {
      this.http.get(this.apiUrl + query).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
    return people;
  }
}
