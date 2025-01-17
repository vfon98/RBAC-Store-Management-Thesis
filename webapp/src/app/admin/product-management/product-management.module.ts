import { ReactiveFormsModule } from '@angular/forms';
import { ProductManagementComponent } from './product-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFormComponent } from './product-form/product-form.component';
import {SharedModule} from "../../shared/shared.module";
import {QuillModule} from "ngx-quill";
import {quillConfig} from "../../config/quill.config";

@NgModule({
  declarations: [ProductAddComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ProductManagementComponent},
      {path: 'new', component: ProductAddComponent},
    ]),
    QuillModule.forRoot({
      modules: quillConfig
    }),
  ],
  exports: [ProductAddComponent, ProductFormComponent],
})
export class ProductManagementModule {}
