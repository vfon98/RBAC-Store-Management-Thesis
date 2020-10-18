import { Component, OnInit } from '@angular/core';
import { IRegion } from 'src/app/core/models';
import { RegionModalService } from 'src/app/service/region-modal.service';

@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css']
})
export class RegionDetailsComponent implements OnInit {
  region: IRegion;

  constructor(private regionModalService: RegionModalService) { }

  ngOnInit(): void {
  }

  hideModal(): void {
    this.regionModalService.hideDetailModal();
  }
}
