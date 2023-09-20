import { Component } from '@angular/core';
import { AuthFormFields, AuthMethod } from '../auth.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public constructor(private readonly auth: AuthService) {}

  public readonly AuthMethod = AuthMethod;

  public signUp(signUpInfo: AuthFormFields): void {
    this.auth.signUp(signUpInfo);
  }
}
