import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.afAuth.authState.pipe(
      take(1), // Ensure that only the first emitted value is considered
      map(user => !!user), // Check if the user is logged in (if authState is truthy)
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Access denied - Redirecting to login');
          this.router.navigate(['/login']); // Redirect to login if not authenticated
        }
      })
    );
  }
}
