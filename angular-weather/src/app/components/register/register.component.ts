import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  emailRegex;
  
  constructor() { 
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
    this.user = new User("", "", "", "");
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
      ]),
      'passwordVerif': new FormControl(this.user.passwordVerif,[
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordVerif() { return this.registerForm.get('passwordVerif'); }

}
