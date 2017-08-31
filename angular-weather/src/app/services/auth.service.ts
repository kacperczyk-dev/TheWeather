import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  register(user: User) {
    return this.http.post('http://localhost:3000/auth/register', user).toPromise();
  }
}
