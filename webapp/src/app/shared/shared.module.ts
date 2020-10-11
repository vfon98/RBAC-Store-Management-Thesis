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

@NgModule({
  declarations: [UsdPipe, TableOverviewComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzTableModule,
    NzAvatarModule
  ],
  exports: [
    UsdPipe,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    TableOverviewComponent,
    NzTagModule,
    NzTableModule,
    NzAvatarModule
  ],
})
export class SharedModule {}
