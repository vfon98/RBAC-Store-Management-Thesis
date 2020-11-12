import { RegionService, StoreService } from 'src/app/core/http';
import { NotificationService } from './../../../layouts/notification/notification.service';
import { IRegion, IStore } from 'src/app/core/models';
import { Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/core/models/user.model';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent implements OnInit {
  @Input() store: IStore;
  @Input() isUpdateMode: boolean;

  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  statusList: string[] = [];
  managers: IUser[] = [];
  staffs: IUser[] = [];
  regions: IRegion[] = [];

  storeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.email]],
    address: [''],
    regionId: [null, [Validators.required]],
    latitude: [null],
    longitude: [null],
    phone: [
      '',
      [Validators.pattern(/(09|01)([0-9]{8,})\b/), Validators.maxLength(11)],
    ],
    status: ['Open'],
    selectStaffId: [null],
    idManagers: [[]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private notiService: NotificationService,
    private storeService: StoreService,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    this.fillDataToForm();
    this.fetchStoreStatus();
    // this.fetchManagerList();
    this.fetchRegions();
  }

  fetchStoreStatus(): void {
    this.storeService.fetchStatusList().subscribe((statusList) => {
      this.statusList = statusList;
    });
  }

  fetchRegions(): void {
    this.regionService.fetchRegions().subscribe(regions => {
      this.regions = regions;
    })
  }

  fetchManagerList(): void {
    if (!this.isUpdateMode) return;

    this.storeService
      .fetchIfManagersByStoreId(this.store.id, true)
      .subscribe((managers) => {
        this.managers = managers;
      });
    this.storeService
      .fetchIfManagersByStoreId(this.store.id, false)
      .subscribe((staffs) => {
        this.staffs = staffs;
        this.resetSelected();
      });
  }

  emitSubmitEvent(): void {
    if (this.storeForm.valid) {
      // Get manager ids from manager table in form
      this.storeForm.patchValue({
        idManagers: this.managers.map((m) => m.id),
      });
      return this.onSubmit.emit(this.storeForm.value);
    }
    console.log(this.storeForm);
    this.notiService.showWaring('Invalid form. Please check again!');
  }

  fillDataToForm(): void {
    if (!this.store) return;
    this.storeForm.patchValue(this.store);
  }

  addManager(): void {
    const staffId: number = +this.storeForm.value.selectStaffId;
    const selectStaff: IUser = this.staffs.find((s) => s.id === staffId);
    if (!selectStaff) return;

    this.staffs = this.staffs.filter((s) => s.id !== staffId);
    this.managers.push(selectStaff);
    this.resetSelected();
  }

  removeManager(manager: IUser): void {
    this.managers = this.managers.filter((m) => m !== manager);
    this.staffs.push(manager);
  }

  // Reset selected after remove it from staff list
  resetSelected(): void {
    this.storeForm.patchValue({
      selectStaffId: this.staffs[0]?.id,
    });
  }

  handleGeolocationChanged(places: PlaceResult[]): void {
    if (!places || !places.length) return;
    const place: PlaceResult = places[0];

    this.storeForm.patchValue({
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    })
  }
}
