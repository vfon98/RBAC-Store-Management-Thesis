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
  NzDropDownModule,
  NzBadgeModule,
  NzTabsModule,
  NzAffixModule,
  NzModalModule,
} from 'ng-zorro-antd';
import { TableOverviewComponent } from './components/table-overview/table-overview.component';
import { BackButtonAdminComponent } from './components/back-button-admin/back-button-admin.component';
import { FormAddWrapperAdminComponent } from './components/form-add-wrapper-admin/form-add-wrapper-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalWrapperAdminComponent } from './components/modal-wrapper-admin/modal-wrapper-admin.component';
import { ActionButtonsAdminComponent } from './components/action-buttons-admin/action-buttons-admin.component';
import { CustomAgmMapComponent } from './components/custom-agm-map/custom-agm-map.component';
import { CustomAgmSearchboxComponent } from './components/custom-agm-searchbox/custom-agm-searchbox.component';
import { ImageFallbackDirective } from './directives/image-fallback.directive';

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
    ImageFallbackDirective,
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
    NzDropDownModule,
    NzBadgeModule,
    NzTagModule,
    NzTabsModule,
    NzAffixModule,
    NzModalModule,
    // END NgZorro Module
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
    NzDropDownModule,
    NzBadgeModule,
    NzTagModule,
    NzTabsModule,
    NzAffixModule,
    NzModalModule,
    // Shared Components
    TableOverviewComponent,
    BackButtonAdminComponent,
    ModalWrapperAdminComponent,
    FormAddWrapperAdminComponent,
    ActionButtonsAdminComponent,
    // Google Maps
    CustomAgmMapComponent,
    CustomAgmSearchboxComponent,
    ImageFallbackDirective
  ],
})
export class SharedModule {}
