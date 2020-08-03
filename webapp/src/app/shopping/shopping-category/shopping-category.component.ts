import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {CategoryService, ICategory} from "../../manager/category-management/category.service";

@Component({
  selector: 'app-shopping-category',
  templateUrl: './shopping-category.component.html',
  styleUrls: ['./shopping-category.component.css']
})
export class ShoppingCategoryComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.fetchCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

}
