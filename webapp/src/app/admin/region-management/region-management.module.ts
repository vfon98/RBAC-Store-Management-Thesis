import { RegionUpdateComponent } from './region-update/region-update.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionManagementComponent } from './region-management.component';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionFormComponent } from './region-form/region-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegionAddComponent,
    RegionFormComponent,
    RegionUpdateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: RegionManagementComponent },
      { path: 'new', component: RegionAddComponent },
    ]),
  ],
  exports: [RegionFormComponent]
})
export class RegionManagementModule {}
