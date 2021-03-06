import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  emailRegex;
  
  constructor(
    private authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public router:Router
  ) { 
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
    this.user = new User("", "", "");
    this.registerForm = new FormGroup({
      'fullName': new FormControl(this.user.fullName,[
        Validators.required,
        Validators.minLength(2)
      ]),
      'email': new FormControl(this.user.email,[
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]),
      'password': new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(6),        
      ])
    });
  }

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  register() {
    this.authService.register(this.user).then((res) => {
      this.flashMessagesService.show(`${res.json().email} succesfully registered`,
        { 
          cssClass: 'alert-success', 
          timeout: 3000 
        });
      this.router.navigate(['/']);
    }).catch((err) => {
      if(err.status === 406){
        this.flashMessagesService.show('This email address is already registered',
          { 
            cssClass: 'alert-danger', 
            timeout: 5000 
          });
      } else {
        this.flashMessagesService.show(err, {
          cssClass: 'alert-danger',
          timeout: 7000
        });
      }
    });
  }
}
