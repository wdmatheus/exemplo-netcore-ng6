import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements Resolve<boolean> {

  constructor(private router: Router, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    let user = this.authService.getUser();

    if (user) return true;

    this.router.navigate(['/login']);

    return false;
  }
}
