import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private authServcie: AuthService,
    private router: Router
  ) { }

  private cheAuthStatus(): Observable<boolean> | boolean {
    return this.authServcie.checkAuthentication()
      .pipe(
        tap(auth => console.log('IsAuthneticated', auth)),
        tap(auth => {
          if (!auth) {
            this.router.navigate(['./auth/login'])
          }
        }),
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    // console.log('canMatch');
    // console.log({ route, segments })
    // return false;
    return this.cheAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log('canActivate');
    // console.log({ route, state })
    // return true;
    return this.cheAuthStatus();

  }


}
