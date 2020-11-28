import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { StoreStaffsComponent } from './store-staffs/store-staffs.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import { StoreStatisticsComponent } from './store-statistics/store-statistics.component';
import { StoreRolesComponent } from './store-roles/store-roles.component';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreInvoicesComponent } from './store-invoices/store-invoices.component';
import { SharedTableStatisticComponent } from './shared-table-statistic/shared-table-statistic.component';
import { OrderStatusDropdownComponent } from './store-orders/order-status-dropdown/order-status-dropdown.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NzImportModalComponent } from "../../modal/nz-import-modal/nz-import-modal.component";

@NgModule({
  declarations: [
    StoreProductComponent,
    StoreStaffsComponent,
    StoreOrdersComponent,
    StoreStatisticsComponent,
    StoreRolesComponent,
    StoreCategoriesComponent,
    StoreInvoicesComponent,
    SharedTableStatisticComponent,
    OrderStatusDropdownComponent,
    NzImportModalComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagementComponent,
                children: [
                    // { path: '', pathMatch: 'full', redirectTo: 'products' },
                    { path: 'products', component: StoreProductComponent },
                    { path: 'categories', component: StoreCategoriesComponent },
                    { path: 'staffs', component: StoreStaffsComponent },
                    { path: 'roles', component: StoreRolesComponent },
                    { path: 'orders', component: StoreOrdersComponent },
                    { path: 'invoices', component: StoreInvoicesComponent },
                    { path: 'statistics', component: StoreStatisticsComponent },
                ],
            },
        ]),
        NgxChartsModule,
    ],
  exports: [
    StoreProductComponent,
    StoreStaffsComponent,
    StoreOrdersComponent,
    StoreStatisticsComponent,
    StoreRolesComponent,
    StoreCategoriesComponent,
    NzImportModalComponent
  ],
})
export class ManagementModule {}
