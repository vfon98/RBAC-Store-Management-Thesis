import { IStore } from 'src/app/core/models';
import { NotificationService } from './../../layouts/notification/notification.service';
import { StoreService, CustomerService } from 'src/app/core/http';
import { map, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IPageableProduct, IProductFilter } from 'src/app/core/models';
import { IProduct } from 'src/app/core/models';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IFilter } from "../../core/models/customer.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  pageableProducts: IPageableProduct;
  products: IProduct[] = [];
  stores: IStore[] = [];
  isLoading = true;

  pageSize = 9;

  sorting = 'default';
  priceRange = [20, 1000];

  constructor(
    private customerService: CustomerService,
    private storeService: StoreService,
    private notiService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(
        map(
          (result) =>
            ({ params: result[0], query: result[1] } as IProductFilter)
        ),
        debounceTime(0)
      )
      .subscribe((filter: IProductFilter) => {
        const { params, query } = filter;
        if (params.storeId === undefined || !params.storeId) {
          this.fetchStores();
          return;
        }

        this.fetchProducts({ ...params, ...query });
      });
  }

  fetchProducts(filter: IFilter): void {
    if (String(filter.categoryId) === 'all') {
      filter.categoryId = -1;
    }

    this.customerService
      .fetchProductsByStoreAndCategory(filter)
      .subscribe((res) => {
        this.pageableProducts = res;
        this.products = res.products;
        this.isLoading = false;
      });
  }

  fetchStores(): void {
    this.storeService.fetchStores().subscribe((stores) => {
      if (!stores.length) {
        this.notiService.showError('No store has been created!');
        return;
      }

      this.stores = stores;
      this.router.navigate(
        ['/shopping/store', this.stores[0].id, 'category', 'all'],
        { queryParams: { page: 1 } }
      );
    });
  }

  isEmptyResult(): boolean {
    return !this.products.length;
  }

  handleSizeChanged(size: number): void {
    this.navigateWithQuery({ size });
  }

  handlePriceFilterChanged(value: number[] | number): void {
    console.log(value)
  }

  handleSubmitPriceFilter(): void {
    const [priceFrom, priceTo] = this.priceRange;
    this.navigateWithQuery({ priceFrom, priceTo })
  }

  handleSortChanged(value: string): void {
    let sorter = value.split('-');
    if (value === 'default') {
      sorter = [];
    }
    this.navigateWithQuery({ sortBy: sorter[0], direction: sorter[1] })
  }

  navigateWithQuery(query: Record<string, unknown>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query,
      queryParamsHandling: 'merge',
    })
  }

  resetPriceFilter(): void {
    this.navigateWithQuery({ priceFrom: null, priceTo: null });
  }
}
