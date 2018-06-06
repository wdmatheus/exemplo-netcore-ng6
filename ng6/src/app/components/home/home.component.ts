import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  msg$: Observable<any>;

  claims$: Observable<any>

  checkUserEmail(){
    this.msg$ = this.authService.checkAuthUserEmail().pipe(map(resp => resp.msg))
  }

  checkUserInfo(){
    this.claims$ = this.authService.checkAuthUserInfo();
  }
}
