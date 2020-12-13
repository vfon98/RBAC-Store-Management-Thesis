import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginModalService } from './../service/login-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICategory, IStore } from 'src/app/core/models';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/auth/user.service';
import { Subscription } from 'rxjs';
import { IUser } from '../core/models/user.model';
import { VoiceSearchModalService } from "../service/voice-search-modal.service";
import { CategoryService } from "../core/http";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit {
  stores: IStore[] = [];
  listener: Subscription;
  categories: ICategory[] = [];
  selectedCate = 'all';

  searchKeyword: string;
  user: IUser;
  username: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private loginModal: LoginModalService,
    private authService: AuthService,
    private voiceSearchModalService: VoiceSearchModalService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sortBy: null,
        direction: null,
        priceFrom: null,
        priceTo: null,
        size: null,
        page: 1
      }
    });

    this.loadSearchQuery();
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
      this.username = user?.name;
    });
    this.kickoutMangerAndAdmin();
    this.listenVoiceSearchResponse();
    this.fetchCategoriesForSearch();
  }

  fetchCategoriesForSearch(): void {
    this.categoryService.fetchCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  kickoutMangerAndAdmin(): void {
    if (this.userService.isManager() || this.userService.isAdmin()) {
      this.authService.logoutUser().subscribe();
    }
  }

  listenVoiceSearchResponse(): void {
    this.voiceSearchModalService.confirm$.subscribe(text => {
      if (!text) return;

      this.searchKeyword = text;
      this.handleSearch();
    })
  }

  login(): void {
    if (this.userService.isLogin()) return;
    this.router.navigate(['/account/login']);
  }

  loadSearchQuery(): void {
    this.searchKeyword = this.route.snapshot.queryParams.search;
  }

  handleSearch(): void {
    this.router.navigate([`/shopping/store/-1/category/${this.selectedCate}`], {
      queryParams: { search: this.searchKeyword },
      queryParamsHandling: 'merge',
    });
    document.getElementById('product-list-div').scrollIntoView();
  }

  handleInput(): void {
    if (!this.searchKeyword) {
      this.handleSearch();
    }
  }

  openLoginModal(): void {
    if (this.isLogin()) return;
    this.loginModal.show();
  }

  isLogin(): boolean {
    return this.userService.isLogin();
  }

  isAdmin(): boolean {
    return this.user.type === 'ADMIN';
  }

  isManager(): boolean {
    return this.user.type === 'OTHER' && this.user.isManager;
  }

  isStaff(): boolean {
    return this.user.type === 'OTHER' && !this.user.isManager;
  }

  isRouterActive(): boolean {
    return location.pathname.startsWith('/shopping/store');
  }

  logout(): void {
    this.authService.logoutUser().subscribe(() => (this.username = null));
  }

  backToHome(): void {
    if (location.pathname.startsWith('/shopping/store')) return;
    this.router.navigate(['/shopping'], { queryParams: null });
  }

  showVoiceSearchModal(): void {
    this.voiceSearchModalService.show();
  }
}
