import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRouteGuard {
  public constructor(
    public afAuth: AngularFireAuth,
    private readonly router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user = await firstValueFrom(this.afAuth.authState);

    if (user && user.uid) {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}
