import { UsdPipe } from './pipes/usd.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule, NzIconModule, NzTagModule, NzUploadModule
} from "ng-zorro-antd";
import { TableOverviewComponent } from './components/table-overview/table-overview.component';

@NgModule({
  declarations: [UsdPipe, TableOverviewComponent],
  imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule, NzTagModule],
  exports: [UsdPipe, NzUploadModule, NzButtonModule, NzIconModule, TableOverviewComponent, NzTagModule],
})
export class SharedModule {}
