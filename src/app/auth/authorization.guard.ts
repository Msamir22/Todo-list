import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  public constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = await firstValueFrom(this.afAuth.user);

    if (!user) {
      this.router.navigate(['/auth/signin']);
      return false;
    }
    return true;
  }
}
