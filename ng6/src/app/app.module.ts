import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AppHttpInterceptor } from './app-http.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AdminPageComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    
    RouterModule.forRoot(AppRoutes, { useHash: false })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
