import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
})
export class RegionFormComponent implements OnInit {
  regionForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  emitSubmitEvent(): void {}

  onCancel(): void {}
}
