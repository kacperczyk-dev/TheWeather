import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthService {
  authenticated = new BehaviorSubject(false);

  constructor (
    private http: Http,
    public flashMessagesService: FlashMessagesService
  ) { }

  register(user: User) :Promise<any> {
    return this.http.post('http://localhost:3000/auth/register', user).toPromise().then((res) => {
       let token = res.headers.get('x-auth');
       let user = new User(res.json().fullName, res.json().email);
       if(token && user){
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.authenticated.next(true);      
       }
       return res;
    });
  }

  login(user: User) :Promise<any> {
    return this.http.post('http://localhost:3000/auth/login', user).toPromise().then((res) => {
       let token = res.headers.get('x-auth');
       let user = new User(res.json().fullName, res.json().email);
       if(token && user){
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.authenticated.next(true);          
       }
      return res;     
    });
  }

  logout() {  
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('x-auth', token);
    this.http.delete('http://localhost:3000/auth/logout', {
      headers: headers
    }).toPromise().then((res) => {
      this.flashMessagesService.show('You have been logged out', {
        cssClass: 'alert-success', 
        timeout: 3000 
      })
    }).catch((err) => {
      this.flashMessagesService.show(err, {
        cssClass: 'alert-danger', 
        timeout: 3000 
      })
    });
    this.clear();
  }

  auth() :Promise<any>{
    let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('x-auth', token);
    return this.http.get('http://localhost:3000/auth/users/me', {
      headers: headers
    }).toPromise().then((res) => {
      this.authenticated.next(true);
      return res;
    });
  }

  clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authenticated.next(false);
  }
}
