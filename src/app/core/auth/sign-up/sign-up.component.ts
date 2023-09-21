import { Component } from '@angular/core';
import { AuthFormFields, AuthMethod } from '../auth.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  public constructor(private readonly auth: AuthService) {}

  public readonly AuthMethod = AuthMethod;

  public signUp(signUpInfo: AuthFormFields): void {
    this.auth.signUp(signUpInfo);
  }
}
