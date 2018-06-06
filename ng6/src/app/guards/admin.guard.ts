import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements Resolve<boolean> {
  constructor(private router: Router, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (user.profile !== 'Admin') {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}
