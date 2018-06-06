import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {  

  }

  private readonly apiUrl = environment.apiUrl;

  private readonly tokenName: string = 'app-token';

  private user: User;

  public userEmmitter: EventEmitter<User> = new EventEmitter<User>();

  getToken = () => localStorage.getItem(this.tokenName);

  storeToken = (token: string) => localStorage.setItem(this.tokenName, token);

  removeToken = () => localStorage.removeItem(this.tokenName);

  getUser(): User {
    
    if (this.user) return this.user;

    let token = this.getToken() || '';

    let payload = token.split('.');

    if (payload.length !== 3) return null;

    let data = decodeURIComponent(atob(payload[1]));

    if (!data) return null;

    let user = JSON.parse(data) as User;

    this.userEmmitter.next(user);

    return user;
  }

  storeUser = (user: User) => this.userEmmitter.next(user);

  removeUser = () => this.userEmmitter.next(null);

  authorize(email: string, password: string) {

    let body = `userName=${email}&password=${password}`;

    return this.http.post<any>(`${this.apiUrl}/auth`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(map(resp => resp));
  }

  checkAuthUserEmail = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/values`).pipe(map(resp => resp));

  checkAuthUserInfo = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/values/user-info`).pipe(map(resp => resp));
}
