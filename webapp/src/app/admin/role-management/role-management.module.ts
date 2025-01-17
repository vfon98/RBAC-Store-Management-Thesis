import { RoleManagementComponent } from './role-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleTableComponent } from './role-table/role-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RoleCreateComponent, RoleTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: RoleManagementComponent},
      {path: 'create', component: RoleCreateComponent}
    ]),
  ],
  exports: [RoleTableComponent]
})
export class RoleManagementModule {}
