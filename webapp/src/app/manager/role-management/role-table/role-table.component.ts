import { ConfirmModalService } from './../../../service/confirm-modal.service';
import { UserService } from 'src/app/core/auth/user.service';
import { Location } from '@angular/common';
import { RoleManagementService } from './../../../service/role-management.service';
import {
  IResource,
  IPermissionChoose,
  IRoleBody,
  IPermission,
  IRole,
} from './../role-management.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css'],
})
export class RoleTableComponent implements OnInit {
  @Input() type: string;
  @Input() role: IRole;
  @Output() onSubmit = new EventEmitter();

  // Just in use when updating
  permissionIds: number[];
  resources: IResource[];
  roleName: string = '';
  grantedPemissions: number[] = [];

  constructor(
    private location: Location,
    private roleManagementService: RoleManagementService,
    private notiSerive: NotificationService,
    private userService: UserService,
    private confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.fetchCurrentGrantedPemissons();
    this.findAllResources();
    this.passData();
  }

  passData(): void {
    if (this.role) {
      this.roleName = this.role.name;
      this.permissionIds = this.role.permissions.map((p) => p.id);
    }
  }

  fetchCurrentGrantedPemissons(): void {
    this.userService.fetchGrantedPemissions().subscribe(permissions => {
      this.grantedPemissions = permissions;
    })
  }

  canGrantPermission(permission: IPermission): boolean {
    return this.grantedPemissions.includes(permission.id);
  }

  isUpdateMode(): boolean {
    return this.type === 'update';
  }

  back(): void {
    this.location.back();
  }

  findAllResources(): void {
    this.roleManagementService.findAllResources().subscribe((resources) => {
      // Only activate on update
      this.resources = this.checkGrantedPermmisonsOnUpdate(resources);

      // Define status of CHECK ALL button
      this.resources = this.checkIfCanCheckAll(this.resources);
    });
  }

  checkIfCanCheckAll(resources: IResource[]): IResource[] {
    for (let i = 0; i < resources.length; i++) {
      // Define status of CHECK ALL button on each row
      resources[i].isCheckAllDisabled = this.hasAnyDisabledPermmissions(resources[i]);
    }
    return resources;
  }

  // TODO: Make it runs properly tomorrow
  checkGrantedPermmisonsOnUpdate(resources: IResource[]): IResource[] {
    // Exit on CREATE mode
    if (!this.role || !this.isUpdateMode()) return resources;
    // Check on granted permission and check on checkbox
    for (let i = 0; i < resources.length; i++) {
      for (let j = 0; j < resources[i].permissions.length; j++) {
        let currentPermisson = resources[i].permissions[j];
        if (this.permissionIds.includes(currentPermisson.id)) {
          currentPermisson.choose = true;
        }
      }
      resources[i].isCheckAllPermissions = this.isCheckAllPermissions(resources[i]);
      resources[i].isCheckAllDisabled = this.hasAnyDisabledPermmissions(resources[i]);
    }
    return resources;
  }

  hasAnyDisabledPermmissions(resource: IResource): boolean {
    // Check if each row has any permissons that are not grantable to others
    for (let p of resource.permissions) {
      if (!this.grantedPemissions.includes(p.id)) {
        return true;
      }
    }
    return false;
  }

  onChangeButtonCheckAllPermissions(resourceName: string): void {
    let resource: IResource = this.getResourceByName(resourceName);
    this.checkAllPermissions(
      resource.permissions,
      resource.isCheckAllPermissions
    );
  }

  onChangeButtonCheckPermission(
    permission: IPermissionChoose,
    resource: IResource
  ): void {
    switch (permission.type) {
      case 'UPDATE':
        if (permission.choose) {
          (resource.permissions[1] as IPermissionChoose).choose = true;
        }
        break;
      case 'READ':
        if (!permission.choose) {
          (resource.permissions[2] as IPermissionChoose).choose = false;
        }
    }

    resource.isCheckAllPermissions = this.isCheckAllPermissions(resource);
  }

  getResourceByName(name: string): IResource {
    for (let i = 0; i < this.resources.length; i++) {
      if (this.resources[i].name === name) {
        return this.resources[i];
      }
    }
    return null;
  }

  isCheckAllPermissions(resource: IResource): boolean {
    let temp = 0;
    resource.permissions.forEach((permission) => {
      if ((permission as IPermissionChoose).choose) {
        temp += 1;
      }
    });
    return temp === 4;
  }

  checkAllPermissions(permissions: IPermission[], checked: boolean): void {
    permissions.forEach(
      (permission) => ((permission as IPermissionChoose).choose = checked)
    );
  }

  removeAllChecked(): void {
    this.resources.forEach((resource) => {
      resource.isCheckAllPermissions = false;
      this.checkAllPermissions(resource.permissions, false);
    });
  }

  submitForm(): void {
    if (!this.roleName) {
      this.notiSerive.showWaring('Invalid role name. Please check again!');
      return;
    }

    const body: IRoleBody = {
      name: this.roleName,
      permissions: this.getPermissionsFromResource(this.resources),
    };

    this.confirmService.show().onYes(() => {
      this.onSubmit.emit(body);
    });
  }

  getPermissionsFromResource(resources: IResource[]): number[] {
    let selectedRoles: number[] = [];
    // Check if permission is selected then return ID
    this.resources.forEach((resource) => {
      resource.permissions.forEach((permission) => {
        if ((permission as IPermissionChoose).choose) {
          selectedRoles.push(permission.id);
        }
      });
    });
    return selectedRoles;
  }
}
