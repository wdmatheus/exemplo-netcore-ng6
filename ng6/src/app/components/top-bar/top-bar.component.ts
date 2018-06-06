import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {  
    this.user$ = this.authService.userEmmitter.asObservable();
  }

 
  user$: Observable<User>;

  logoff(){
    this.authService.removeToken();
    this.authService.removeUser();
    this.router.navigate(['/login']);
  }

}
