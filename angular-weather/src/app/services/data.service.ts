import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) {}

  getCurrentData(): Promise<any> {
    return this.http.get('http://localhost:3000/weather').toPromise();
  }

  getPlaceDetails(place: String): Promise<any> {
    return this.http.get('http://localhost:3000/weather/' + place).toPromise();
  }

  getCities(){
    return this.http.get('http://localhost:3000/place').map(response => response.json());
  }

}
