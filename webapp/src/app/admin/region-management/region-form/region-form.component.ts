import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegion } from 'src/app/core/models';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
})
export class RegionFormComponent implements OnInit {
  @Input()
  region: IRegion;
  
  @Output()
  onSubmit = new EventEmitter<FormGroup>();

  regionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.region) {
      this.regionForm.patchValue({
        name: this.region.name,
        description: this.region.description
      })
    }
  }

}
