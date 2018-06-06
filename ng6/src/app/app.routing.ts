import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AppGuard } from './guards/app.guard';

import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';


export const AppRoutes: Routes = [
    
    { path: 'login', component: LoginComponent, resolve: [AppGuard] },
    { path: 'forbidden', component: ForbiddenComponent, resolve: [AppGuard] },
    { path: 'not-found', component: NotFoundComponent, resolve: [AppGuard] },    
    

    { path: '', component: HomeComponent, resolve: [AuthGuard] },
    { path: 'admin-page', component: AdminPageComponent, resolve: [AdminGuard] },

    { path: '**', redirectTo: 'not-found' }
];



