import { UserService } from 'src/app/core/auth/user.service';
import { NotificationService } from './../../../layouts/notification/notification.service';
import { ConfirmModalService } from './../../../service/confirm-modal.service';
import { RoleModalService } from './../../../service/role-modal.service';
import { IRole } from './../../../admin/role-management/role-management.component';
import { RoleService } from '../../../core/http/role-management.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-store-roles',
  templateUrl: './store-roles.component.html',
  styleUrls: ['./store-roles.component.css'],
})
export class StoreRolesComponent implements OnInit {
  roles: IRole[] = [];
  currentUser: IUser;

  constructor(
    private roleService: RoleService,
    private roleModalService: RoleModalService,
    private confirmService: ConfirmModalService,
    private notiService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.roleService.roleAddObservable$.subscribe((role) => {
      if (role) {
        this.roles.unshift(role);
      }
    });

    this.roleService.updateObservable$.subscribe((role: IRole) => {
      const index = this.roles.findIndex((r) => r.id === role.id);
      this.roles[index] = { ...this.roles[index], ...role };
    });

    this.currentUser = this.userService.getCurrentUser();
  }

  fetchRoles(): void {
    this.roleService.findAllRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  newRole(): void {
    this.roleModalService.showAddModal();
  }

  showUpdateModal(role: IRole): void {
    this.roleService.findManagerRoleById(role.id).subscribe((role) => {
      this.roleModalService.showUpdateModal(role);
    });
  }

  deleteRole(id: number): void {
    this.confirmService.show().onYes(() => {
      this.roleService.deleteRoleById(id).subscribe(
        () => {
          this.roles = this.roles.filter((r) => r.id !== id);
        },
        () => this.notiService.showError()
      );
    });
  }
}
