import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@angular/fire/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs';
import { AuthFormFields } from '../auth/auth.component';
import { User } from '../utils/user.model';
import { ToastService } from './toast.service';

enum AuthErrorCodes {
  EMAIL_EXISTS = 'auth/email-already-in-use',
  INVALID_CREDENTIALS = 'auth/invalid-login-credentials',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {
    /* Saving user data in localstorage when logged in and remove it when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  public get currentUser(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public readonly currentUser$ = this.afAuth.authState;

  public readonly isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  public signIn(signInInfo: AuthFormFields): void {
    const { email, password } = signInInfo;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error: FirebaseError) => {
        if (error.code === AuthErrorCodes.INVALID_CREDENTIALS) {
          this.toastService.show('Invalid Email or Password', {
            success: false,
          });
        }
      });
  }

  public signUp(signUpInfo: AuthFormFields): void {
    const { email, password } = signUpInfo;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (userCred.user) {
          this.SetUserData(userCred.user);
        }
        this.router.navigate(['/']);
      })
      .catch((error: FirebaseError) => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          this.toastService.show('Email is Already Registered ', {
            success: false,
          });
        }
      });
  }

  public logOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/signin']);
    });
  }

  private SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
}
