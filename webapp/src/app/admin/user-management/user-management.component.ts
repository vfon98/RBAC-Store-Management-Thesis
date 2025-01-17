import { ConfirmModalService } from './../../service/confirm-modal.service';
import { Component, OnInit } from '@angular/core';
import { UserModalService } from '../../service/user-modal.service';
import { NotificationService } from '../../layouts/notification/notification.service';
import { IUser } from 'src/app/core/models/user.model';
import { StaffService } from 'src/app/core/http';
import { ITableOverviewModel } from 'src/app/core/models/table-overview.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: IUser[] = [];
  figures: ITableOverviewModel[] = [];

  constructor(
    private userService: StaffService,
    private userModalService: UserModalService,
    private notiService: NotificationService,
    private confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.userService.updateObservable$.subscribe((user: IUser) => {
      const index = this.users.findIndex((u) => u.id === user.id);
      this.users[index] = { ...this.users[index], ...user };
    });
  }

  fetchUsers(): void {
    this.userService.fetchAllFromAdmin().subscribe((users) => {
      // users.sort((a, b) => a?.storeName.localeCompare(b?.storeName));
      // users.reverse();
      this.users = users;
      this.initializeTableOverview(users);
    });
  }

  initializeTableOverview(users: IUser[]): void {
    this.figures = [
      { title: 'Total staffs', number: users.length, extra: '+2 last week' },
      {
        title: 'Editable',
        number: users.filter((u) => u.allowUpdate).length,
      },
      {
        title: 'Deletable',
        number: users.filter((u) => u.allowDelete).length,
        extra: 'up to date',
      },
    ];
  }

  printRoles(user: IUser): string {
    return user.roles.map((r) => r.name).join(', ');
  }

  deleteUser(id: number): void {
    this.confirmService.show().onYes(() => {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== id);
        this.notiService.showSuccess('Delete successfully!');
      });
    });
  }

  showDetailsModal(id: number): void {
    this.userService.fetchById(id).subscribe((user) => {
      this.userModalService.showDetailModel(user);
    });
  }

  showUpdateModal(id: number): void {
    this.userService.fetchById(id).subscribe((user) => {
      this.userModalService.showUpdateModal(user);
    });
  }
}
