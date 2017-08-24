import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  currentData: any;

  constructor(
    private http: Http
  ) { }

  getCurrentData(): Promise<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts').toPromise();
  }

}
