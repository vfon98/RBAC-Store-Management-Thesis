import { AgmCoreModule } from '@agm/core';
import { UsdPipe } from './pipes/usd.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzIconModule, NzPopconfirmModule,
  NzStatisticModule,
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
import { CustomAgmMapComponent } from './components/custom-agm-map/custom-agm-map.component';
import { CustomAgmSearchboxComponent } from './components/custom-agm-searchbox/custom-agm-searchbox.component';

@NgModule({
  declarations: [
    UsdPipe,
    TableOverviewComponent,
    BackButtonAdminComponent,
    FormAddWrapperAdminComponent,
    ModalWrapperAdminComponent,
    ActionButtonsAdminComponent,
    CustomAgmMapComponent,
    CustomAgmSearchboxComponent,
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
    NzStatisticModule,
    NzCardModule,
    AgmCoreModule
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
    NzStatisticModule,
    NzCardModule,
    // Shared Components
    TableOverviewComponent,
    BackButtonAdminComponent,
    ModalWrapperAdminComponent,
    FormAddWrapperAdminComponent,
    ActionButtonsAdminComponent,
    // Google Maps
    CustomAgmMapComponent,
    CustomAgmSearchboxComponent
  ],
})
export class SharedModule {}
