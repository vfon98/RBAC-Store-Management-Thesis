import { ConfirmModalService } from './../../service/confirm-modal.service';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { RoleUpdateModalComponent } from './../../modal/role-update-modal/role-update-modal.component';
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../core/http/role-management.service';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewRoleDetailsManagementComponent } from '../../modal/view-role-details-management/view-role-details-management.component';
import { UserService } from '../../core/auth/user.service';
import { IUser } from 'src/app/core/models/user.model';
import { ITableOverviewModel } from 'src/app/core/models/table-overview.model';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  roles: IRole[];
  currentUser: IUser;
  figures: ITableOverviewModel[] = [];

  constructor(
    private roleService: RoleService,
    private modalService: MDBModalService,
    private ngbService: NgbModal,
    private notiSerive: NotificationService,
    private confirmService: ConfirmModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.roleService.updateObservable$.subscribe((role: IRole) => {
      const index: number = this.roles.findIndex((r) => r.id === role.id);
      this.roles[index] = { ...this.roles[index], ...role };
    });
    this.currentUser = this.userService.getCurrentUser();
  }

  fetchRoles(): void {
    this.roleService.findAllAdminRoles().subscribe((roles) => {
      this.roles = roles;
      this.initializeTableOverview(roles);
    });
  }

  initializeTableOverview(roles: IRole[]): void {
    this.figures = [
      { title: 'Total roles', number: roles.length, extra: '+2 last week' },
      {
        title: 'Editable',
        number: roles.filter((u) => u.allowUpdate).length,
      },
      {
        title: 'Deletable',
        number: roles.filter((u) => u.allowDelete).length,
        extra: 'up to date',
      },
    ];
  }

  viewRoleDetails(role: IRole): void {
    this.roleService.findAdminRoleById(role.id).subscribe((role) => {
      this.modalService.show(ViewRoleDetailsManagementComponent, {
        containerClass: 'fade',
        class: 'modal-dialog-centered modal-xl',
        data: { role },
      });
    });
  }

  openUpdateModal(role: IRole): void {
    this.roleService.findAdminRoleById(role.id).subscribe((role) => {
      this.modalService.show(RoleUpdateModalComponent, {
        class: 'modal-xl',
        data: { role },
      });
    });
  }

  deleteRole(role: IRole): void {
    this.confirmService.show().onYes(() => {
      this.roleService.deleteAdminRoleById(role.id).subscribe(() => {
        // delete role in view
        const index = this.roles.indexOf(role);
        this.roles.splice(index, 1);
        document.getElementById(`role-${role.id}`).remove();

        // hide modal confirm
        this.notiSerive.showSuccess('Role deleted successfully!');
      });
    });
  }

  openModal(modalName): void {
    this.ngbService.open(modalName);
  }
}

export interface IResource {
  name: string;
  permissions: IPermission[] | IPermissionChoose[];
  isCheckAllPermissions: boolean;
  isCheckAllDisabled?: boolean;
}

export interface IRole {
  id: number;
  name: string;
  createdBy: number;
  permissions: IPermission[];
  allowUpdate: boolean;
  allowDelete: boolean;
}

export interface IRoleBody {
  name: string;
  permissions: number[];
}

export interface IPermission {
  id: number;
  name: string;
  resourceName: string;
  type: string;
  choose?: boolean;
}

export interface IPermissionChoose extends IPermission {
  choose: boolean;
}
