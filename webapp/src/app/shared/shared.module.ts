import { UsdPipe } from './pipes/usd.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzAvatarModule,
  NzButtonModule,
  NzIconModule,
  NzTableModule,
  NzTagModule,
  NzUploadModule,
} from 'ng-zorro-antd';
import { TableOverviewComponent } from './components/table-overview/table-overview.component';
import { BackButtonAdminComponent } from './components/back-button-admin/back-button-admin.component';
import { FormAddWrapperAdminComponent } from './components/form-add-wrapper-admin/form-add-wrapper-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUpdateWrapperAdminComponent } from './components/modal-update-wrapper-admin/modal-update-wrapper-admin.component';

@NgModule({
  declarations: [
    UsdPipe,
    TableOverviewComponent,
    BackButtonAdminComponent,
    FormAddWrapperAdminComponent,
    ModalUpdateWrapperAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgZorro Modules
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzTableModule,
    NzAvatarModule,
  ],
  exports: [
    UsdPipe,
    FormsModule,
    ReactiveFormsModule,
    // NgZorro Modules
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzTableModule,
    NzAvatarModule,
    // Shared Components
    TableOverviewComponent,
    BackButtonAdminComponent,
    FormAddWrapperAdminComponent,
  ],
})
export class SharedModule {}
