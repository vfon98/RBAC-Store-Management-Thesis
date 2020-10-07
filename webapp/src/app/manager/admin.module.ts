import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { SharedModule } from "../shared/shared.module";
import { RegionManagementComponent } from './region-management/region-management.component';

@NgModule({
  declarations: [RegionManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
      },
    ]),
  ],
})
export class AdminModule {}
