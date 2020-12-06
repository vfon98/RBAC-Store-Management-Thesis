import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { IProduct } from 'src/app/core/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/http/category.service';
import {NzUploadFile} from "ng-zorro-antd";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  categories: ICategory[] = [];
  fileList: NzUploadFile[] = [];

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(4)]],
    price: [1, [Validators.required, Validators.min(0)]],
    // quantity: [1, [Validators.min(0), Validators.max(1000)]],
    discount: [0, [Validators.min(0), Validators.max(99)]],
    categories: [[]],
    image: [null],
    description: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fillFormDataIfExisted();
  }

  fetchCategories(): void {
    this.categoryService.fetchCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  fillFormDataIfExisted(): void {
    if (!this.product) return;
    this.productForm.patchValue({
      ...this.product,
      categories: this.product.categories.map((c) => c.id),
    });
  }

  emitSubmitEvent(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.onSubmit.emit(formData);
      return;
    }
    this.notiService.showWaring('Invalid form. Please check again!');
  }

  beforeUpload = (image: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(image);
    this.productForm.patchValue({ image });
    return false;
  };
}
