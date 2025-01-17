import { selectUser } from './../../store/selectors/user.selector';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { UserService } from 'src/app/core/auth/user.service';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { LoginModalComponent } from '../../modal/login-modal/login-modal.component';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  modalLoginRef: MDBModalRef;
  name: string;
  isHidden = true;

  listener: Subscription;

  constructor(
    private modalService: MDBModalService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
    this.userService.currentUser$.subscribe(
      (value) => (this.name = value?.name)
    );
    this.listener = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const pathname = location.pathname;
        this.isHidden = pathname.startsWith('/shopping') || pathname.startsWith('/account/login');
      });
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  fetchUserInfo(): void {
    this.userService.fetchUserInfo().subscribe(
      (value) => (this.name = value?.name),
      (err) => console.log(err)
    );
    this.store$.pipe(select(selectUser)).subscribe(data => {
      console.log('FromNg', data)
    })
  }

  isLogin(): boolean {
    return this.userService.isLogin();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  isManager(): boolean {
    return this.userService.isManager();
  }

  logout(): void {
    this.authService.logoutUser().subscribe(() => {
      this.name = null;
    });
  }

  openModalLogin(): void {
    this.modalLoginRef = this.modalService.show(LoginModalComponent, {
      containerClass: 'fade left',
    });
  }
}
