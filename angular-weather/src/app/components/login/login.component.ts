import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(
    private authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User("", "", "");
    this.loginForm = new FormGroup({
      'email': new FormControl(this.user.email,[
        Validators.required
      ]),
      'password': new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.authService.login(this.user).then((res) => {
      this.flashMessagesService.show(`Login succesful for ${res.json().fullName}`, {
        cssClass: 'alert-success',
        timeout: 2000
      });
      this.router.navigate(['/admin-panel']);
    }).catch((err) => {
      this.flashMessagesService.show('Username or password incorrect', {
        cssClass: 'alert-danger',
        timeout: 7000
      });
    });
  }
  
}