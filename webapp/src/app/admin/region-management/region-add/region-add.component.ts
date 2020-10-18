import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { RegionService } from "../../../core/http";
import { Location } from "@angular/common";

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  constructor(
    private regionService: RegionService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(regionForm: FormGroup): void {
    console.log(regionForm)
    this.regionService.createRegion(regionForm.value).subscribe(region => {
      this.location.back();
    })
  }
}
