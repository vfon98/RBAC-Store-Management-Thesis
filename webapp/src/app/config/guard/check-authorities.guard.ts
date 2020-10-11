import { MANAGER } from './../../core/constants/role.constants';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/auth/user.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/user.selector';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthoritiesGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private notiService: NotificationService,
    private store$: Store
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.userService.getCurrentUser();
    const requiredRole: string[] = next.data.role;

    if (!currentUser) return true;

    this.store$.pipe(select(selectUser)).subscribe(user => {
      console.log('user', user)
    })

    // Check current user type
    if (currentUser && requiredRole.includes(currentUser.type)) {
      return true;
    }

    // Check if manager
    if (currentUser && currentUser.type === MANAGER && currentUser.isManager) {
      return false;
    }

    this.notiService.showWaring('You can not access this route!');
    // this.router.navigate(['/accessdenied']);
    this.router.navigate(['']);
    return false;
  }
}
