import { Component } from '@angular/core';
import { AuthFormFields, AuthMethod } from '../auth.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public constructor(private readonly auth: AuthService) {}

  public readonly AuthMethod = AuthMethod;

  public signIn(signInInfo: AuthFormFields): void {
    this.auth.signIn(signInInfo);
  }
}
