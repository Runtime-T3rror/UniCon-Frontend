import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IAuthGuard implements CanActivate {
  constructor(private user: UserAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.user.is_authenticated()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
