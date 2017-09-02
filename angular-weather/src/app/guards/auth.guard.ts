import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }
 
    canActivate() {
        return this.authService.auth().then((res) => {
            return true;
        }).catch((err) => {
            this.router.navigate(['/signin']);
            return false;
        });
    }

}