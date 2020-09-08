import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { ISimpleStaff } from 'src/app/core/models';
import { StoreService, StaffService } from  'src/app/core/http';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { UserModalService } from 'src/app/service/user-modal.service';
import { ConfirmModalService } from 'src/app/service/confirm-modal.service';

@Component({
  selector: 'app-store-staffs',
  templateUrl: './store-staffs.component.html',
  styleUrls: ['./store-staffs.component.css'],
})
export class StoreStaffsComponent implements OnInit, OnDestroy {
  staffs: IUser[] = [];
  addedStaffs: IUser[] = [];

  storeId: number;
  selectStaffId = 0;

  listeners = new Subscription();

  constructor(
    private staffService: StaffService,
    private storeService: StoreService,
    private notiService: NotificationService,
    private route: ActivatedRoute,
    private userModalService: UserModalService,
    private confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.parent.snapshot.params.id;
    this.fetchStaffs();

    this.listeners.add(
      this.staffService.userAddObservable$.subscribe((user) => {
        if (user) {
          this.addedStaffs.unshift(user);
        }
      })
    );

    this.listeners.add(
      this.staffService.updateObservable$.subscribe((user: IUser) => {
        const index = this.addedStaffs.findIndex((u) => u.id === user.id);
        this.addedStaffs[index] = { ...this.addedStaffs[index], ...user };
      })
    );
  }

  ngOnDestroy(): void {
    this.listeners.unsubscribe();
  }

  fetchStaffs(): void {
    this.storeService
      .fetchAllStaffsInStore(this.storeId)
      .subscribe((staffs) => {
        this.addedStaffs = staffs;
      });

    // this.staffService.fetchAssignableStaffs().subscribe((staffs) => {
    //   this.staffs = staffs;
    //   this.resetSelected();
    // });
  }

  printStaffRoles(staff: ISimpleStaff): string {
    return staff.roles.map(r => r.name).join(', ');
  }

  addStaff(): void {
    const staff: IUser = this.staffs.find(
      (s) => s.id === this.selectStaffId
    );
    if (!staff) {
      return this.notiService.showWaring('Empty staff list');
    }

    this.storeService
      .addStaffToStore(null)
      .subscribe(
        () => {
          this.addedStaffs.push(staff);
          this.staffs = this.staffs.filter((s) => s.id !== this.selectStaffId);
          this.notiService.showSuccess();
          this.resetSelected();
        },
        (err) => console.log(err)
      );
  }

  editStaff(staff: ISimpleStaff): void {
    this.staffService.fetchById(staff.id).subscribe((user) => {
      console.log(user);
      user.idStore = this.storeId;
      this.userModalService.showUpdateModal(user);
    });
  }

  deleteStaff(staff: IUser): void {
    this.confirmService.show().onYes(() => {
      this.storeService.deleteStaffFromStore(this.storeId, staff.id).subscribe(
        () => {
          this.staffs.push(staff);
          this.addedStaffs = this.addedStaffs.filter((s) => s !== staff);
          this.notiService.showSuccess();
          this.resetSelected();
        },
        (err) => console.log(err)
      );
    });
  }

  resetSelected(): void {
    this.selectStaffId = this.staffs[0]?.id || 0;
  }

  newStaff(): void {
    this.userModalService.showAddModal({ storeId: +this.storeId });
  }
}
