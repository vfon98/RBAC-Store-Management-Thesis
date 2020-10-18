import { UsdPipe } from './pipes/usd.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzAvatarModule,
  NzButtonModule,
  NzIconModule, NzPopconfirmModule,
  NzTableModule,
  NzTagModule,
  NzToolTipModule,
  NzUploadModule,
} from 'ng-zorro-antd';
import { TableOverviewComponent } from './components/table-overview/table-overview.component';
import { BackButtonAdminComponent } from './components/back-button-admin/back-button-admin.component';
import { FormAddWrapperAdminComponent } from './components/form-add-wrapper-admin/form-add-wrapper-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalWrapperAdminComponent } from './components/modal-wrapper-admin/modal-wrapper-admin.component';
import { ActionButtonsAdminComponent } from './components/action-buttons-admin/action-buttons-admin.component';

@NgModule({
  declarations: [
    UsdPipe,
    TableOverviewComponent,
    BackButtonAdminComponent,
    FormAddWrapperAdminComponent,
    ModalWrapperAdminComponent,
    ActionButtonsAdminComponent,
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
    NzToolTipModule,
    NzPopconfirmModule,
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
    NzToolTipModule,
    NzPopconfirmModule,
    // Shared Components
    TableOverviewComponent,
    BackButtonAdminComponent,
    ModalWrapperAdminComponent,
    FormAddWrapperAdminComponent,
    ActionButtonsAdminComponent,
  ],
})
export class SharedModule {}
