import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

export enum AuthMethod {
  SignIn = 'signIn',
  Sigunp = 'signUp',
}

export interface AuthFormFields {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth[method]',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public constructor(private readonly fb: NonNullableFormBuilder) {}

  public readonly AuthMethodEnum = AuthMethod;

  public readonly authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public formTitle: string = '';

  public authMethod!: AuthMethod;

  @Input() public set method(value: AuthMethod) {
    this.authMethod = value;

    if (value === AuthMethod.SignIn) {
      this.formTitle = 'Sign In';
    } else {
      this.formTitle = 'Sign Up';
    }
  }

  @Output() public onSubmit: EventEmitter<AuthFormFields> =
    new EventEmitter<AuthFormFields>();

  public submit(): void {
    if (this.authForm.value.email && this.authForm.value.password) {
      this.onSubmit.emit({
        email: this.authForm.value.email,
        password: this.authForm.value.password,
      });
    }
  }
}
