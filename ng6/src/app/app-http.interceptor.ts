import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';


declare var toastr: any;

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                //Culture: this.localeService.getLocale(),
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

        }, error => {
            if (error instanceof HttpErrorResponse) {

                let response = <HttpErrorResponse>error;

                if (error.status == 401) {
                    this.authService.removeToken();
                    this.authService.removeUser();
                    this.router.navigate(['/login']);
                }                
                else if (error.status == 403) {
                    this.router.navigate(['/forbidden']);
                }
                else {
                    this.alertCommonError();
                }
            }
            else {
                this.alertCommonError();
            }
        }));
    }

    private alertCommonError = () => alert('An error ocurred!');
}