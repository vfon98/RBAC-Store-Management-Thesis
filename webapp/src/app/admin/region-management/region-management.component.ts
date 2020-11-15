import { RegionModalService } from '../../service/region-modal.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegionService } from "../../core/http";
import { IAgmMarker, IRegion } from "../../core/models";
import { NotificationService } from "../../layouts/notification/notification.service";
import { ITableOverviewModel } from 'src/app/core/models/table-overview.model';

@Component({
  selector: 'app-region-management',
  templateUrl: './region-management.component.html',
  styleUrls: ['./region-management.component.scss']
})
export class RegionManagementComponent implements OnInit {
  regions: IRegion[] = [];
  figures: ITableOverviewModel[];
  agmMarkers: IAgmMarker[] = [];
  currentActive = 0;

  centerLatitude: number = null;
  centerLongitude: number = null;

  constructor(
    private regionService: RegionService,
    private notiService: NotificationService,
    private regionModalService: RegionModalService
  ) {
  }

  ngOnInit(): void {
    this.fetchRegions();
    this.regionService.refreshListener.subscribe(() => {
      this.fetchRegions();
    })
  }

  fetchRegions(): void {
    this.regionService.fetchRegions().subscribe(regions => {
      this.regions = regions;
      this.initializeTableOverview(regions);
      this.initializeAgmMarkers();
    })
  }

  initializeAgmMarkers(): void {
    const storesOfRegion = this.regions[this.currentActive].stores.map(store => ({
      latitude: store.latitude,
      longitude: store.longitude,
      label: store.name
    }));
    this.agmMarkers = storesOfRegion;
    this.centerLatitude = storesOfRegion[0]?.latitude ?? null;
    this.centerLongitude = storesOfRegion[0]?.longitude ?? null;
  }

  initializeTableOverview(regions: IRegion[]): void {
    this.figures = [
      {
        title: 'Total regions',
        number: regions.length,
        extra: '+1 last month'
      },
      {
        title: 'Total stores',
        number: regions.reduce((total, r) => total + r.stores.length, 0)
      },
      {
        title: 'Total regions',
        number: regions.length,
        extra: '+1 last month'
      },
    ]
  }

  showDetailsModal(regionId: number): void {
    this.regionService.fetchRegionById(regionId).subscribe(region => {
      this.regionModalService.showDetailModal(region);
    })
  }

  showUpdateModal(regionId: number): void {
    this.regionService.fetchRegionById(regionId).subscribe(region => {
      this.regionModalService.showUpdateModal(region);
    })
  }

  deleteRegion(regionId: number): void {
    this.regionService.deleteRegion(regionId).subscribe(region => {
      this.regions = this.regions.filter(r => r.id !== region.id)
      this.notiService.showQuickSuccess("Deleted region");
    })
  }

  setActive(index: number): void {
    this.currentActive = index;
    this.initializeAgmMarkers();
  }
}
