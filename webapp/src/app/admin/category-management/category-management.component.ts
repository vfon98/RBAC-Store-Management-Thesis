import { CategoryService } from '../../core/http/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModalService } from '../../service/category-modal.service';
import { NotificationService } from '../../layouts/notification/notification.service';
import { ConfirmModalService } from '../../service/confirm-modal.service';
import { ICategory } from 'src/app/core/models';
import { ITableOverviewModel } from 'src/app/core/models/table-overview.model';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  categories: ICategory[] = [];
  figures: ITableOverviewModel[] = [];

  constructor(
    private categoryService: CategoryService,
    private categoryModalService: CategoryModalService,
    private notiService: NotificationService,
    private confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.categoryService.updateObservable$.subscribe((category: ICategory) => {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index] = category;
    });
  }

  fetchCategories(): void {
    this.categoryService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
      this.initializeTableOverview(categories);
    });
  }

  initializeTableOverview(categories: ICategory[]): void {
    this.figures = [
      {
        title: 'Total categories',
        number: categories.length,
        extra: '+2 last week',
      },
      {
        title: 'In use',
        number: categories.length,
        extra: 'up to date',
      },
      {
        title: 'Orphan',
        number: categories.length,
        extra: 'up to date',
      },
    ];
  }

  showDetailsModal(id: number): void {
    this.categoryService.fetchCategoryById(id).subscribe((category) => {
      this.categoryModalService.showDetailsModal(category);
    });
  }

  showUpdateModal(id: number): void {
    this.categoryService.fetchCategoryById(id).subscribe((category) => {
      this.categoryModalService.showUpdateModal(category);
    });
  }

  deleteCategory(id: number): void {
    this.confirmService.show().onYes(() => {
      this.categoryService.deleteById(id).subscribe(
        () => {
          this.categories = this.categories.filter((c) => c.id !== id);
          this.notiService.showSuccess('Deleted successfully!');
        },
        () => {
          this.notiService.showError('Category is not empty!');
        }
      );
    });
  }
}
