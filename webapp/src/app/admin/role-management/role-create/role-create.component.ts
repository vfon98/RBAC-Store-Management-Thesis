import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IRoleBody } from '../role-management.component';
import { RoleService } from '../../../core/http/role-management.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  constructor(
    private location: Location,
    private roleService: RoleService,
    private notiSerive: NotificationService
  ) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  handleSubmit(body: IRoleBody): void {
    this.roleService.createAdminRole(body).subscribe((role) => {
      this.notiSerive.showSuccess('Role created successfully!');
      this.back();
    });
  }
}
