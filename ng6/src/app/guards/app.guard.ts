import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements Resolve<boolean> {

  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    this.authService.getUser();    
    return true;
  }
}
