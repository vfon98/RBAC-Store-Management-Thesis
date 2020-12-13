import {
  Directive,
  ElementRef,
  Inject, Input, OnChanges,
  OnInit,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";

@Directive({
  selector: '[tableUtils]',
  host: { '[style.position]': '"relative"' }
})
export class TableUtilsDirective implements OnInit, OnChanges {

  @Input('tableUtils') data: any[];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    console.log(this.elementRef.nzData)
    console.log(this.data)
    const tableUtils = this.renderer.createElement('div');   // Create a <button> element
    tableUtils.className = 'ct-directive-wrapper';
    tableUtils.innerHTML =
      `<nz-button-group>
          <button nz-button class="btn btn-danger" nzType="primary" (click)="handleClick()"><i nz-icon nzType="left"></i> Export Excel</button>
        </nz-button-group>`;
    this.renderer.appendChild(this.elementRef.nativeElement, tableUtils);
  }

  ngOnChanges(): void {
    console.log("CHANE", this.data)
    if (this.data && this.data.length) {
      this.data = [...this.data];
    }
  }

  handleClick(): void {
    console.log("CLICK")
  }
}
