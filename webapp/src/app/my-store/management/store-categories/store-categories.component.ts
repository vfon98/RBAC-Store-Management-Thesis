import { StoreService } from  'src/app/core/http';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { ConfirmModalService } from './../../../service/confirm-modal.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryModalService } from './../../../service/category-modal.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/http/category.service';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.css'],
})
export class StoreCategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  storeId: number;

  constructor(
    private route: ActivatedRoute,
    private categoryModalService: CategoryModalService,
    private categoryService: CategoryService,
    private confirmModalService: ConfirmModalService,
    private notiService: NotificationService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.parent.params.id;
    this.fetchCategories();

    this.categoryService.addedObservable$.subscribe((category: ICategory) => {
      this.categories.unshift(category);
    });

    this.categoryService.updateObservable$.subscribe((category: ICategory) => {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index] = category;
    });
  }

  fetchCategories(): void {
    // this.categoryService.fetchCategories().subscribe((categories) => {
    //   this.categories = categories;
    // });
    this.storeService.fetchCategoriesByStoreId().subscribe((categories) => {
      this.categories = categories;
    });
  }

  showAddModal(): void {
    this.categoryModalService.showAddModal(this.storeId);
  }

  showUpdateModal(category: ICategory): void {
    this.categoryModalService.showUpdateModal(category);
  }

  deleteCategory(category: ICategory): void {
    this.confirmModalService.show().onYes(() => {
      this.categoryService.deleteById(category.id).subscribe(() => {
        this.categories = this.categories.filter((c) => c.id !== category.id);
        this.notiService.showSuccess('Deleted category!');
      });
    });
  }
}
