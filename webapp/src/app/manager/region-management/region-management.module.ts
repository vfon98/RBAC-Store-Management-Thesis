import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionManagementComponent } from './region-management.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RegionManagementComponent}
    ])
  ]
})
export class RegionManagementModule { }
