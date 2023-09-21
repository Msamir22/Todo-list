import { Component } from '@angular/core';
import { AuthFormFields, AuthMethod } from '../auth.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public constructor(private readonly auth: AuthService) {}

  public readonly AuthMethod = AuthMethod;

  public signIn(signInInfo: AuthFormFields): void {
    this.auth.signIn(signInInfo);
  }
}
