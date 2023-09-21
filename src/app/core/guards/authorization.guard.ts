import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  public constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const isLoggedIn = await firstValueFrom(this.auth.isLoggedIn$);

    if (!isLoggedIn) {
      this.router.navigate(['/auth/signin']);
      return false;
    }
    return true;
  }
}
