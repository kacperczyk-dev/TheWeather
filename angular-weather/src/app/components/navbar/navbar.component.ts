import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  show:boolean;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.show = true;
    this.authService.auth().catch((err) => {});
    this.authService.authenticated.subscribe((auth: boolean) => {
      this.show = auth ? false : true;
    });
  }

  logout(){
    this.authService.logout();
  }
}
