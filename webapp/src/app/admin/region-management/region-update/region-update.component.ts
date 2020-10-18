import { IRegion, IRegionBody } from './../../../core/models/region.model';
import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/core/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-region-update',
  templateUrl: './region-update.component.html',
  styleUrls: ['./region-update.component.css']
})
export class RegionUpdateComponent implements OnInit {
  region: IRegion;

  constructor(private regionService: RegionService) { }

  ngOnInit(): void {
  }

  hideModal(): void {
  }

  handleSubmit(regionForm: FormGroup): void {
    this.regionService.updateRegion(this.region.id, regionForm.value).subscribe(region => {
      this.regionService.refreshSubject.next();
      this.hideModal();
    })
  }
}
