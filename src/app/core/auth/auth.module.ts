import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginRouteGuard } from '../guards/login-route.guard';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignUpComponent,
    canActivate: [LoginRouteGuard],
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [LoginRouteGuard],
  },
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
})
export class AuthModule {}
