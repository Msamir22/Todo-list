import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public constructor(private readonly auth: AuthService) {}

  public readonly userDisplayName = this.auth.currentUser.email;

  public logOut(): void {
    this.auth.logOut();
  }
}
