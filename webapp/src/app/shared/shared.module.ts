import { UsdPipe } from './pipes/usd.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule, NzIconModule, NzUploadModule} from "ng-zorro-antd";

@NgModule({
  declarations: [UsdPipe],
  imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule],
  exports: [UsdPipe, NzUploadModule, NzButtonModule, NzIconModule],
})
export class SharedModule {}
