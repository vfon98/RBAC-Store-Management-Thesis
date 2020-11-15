import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'img.product-img',
  host: {
    '(error)': 'setDefaultImage()',
    '[src]': 'src'
  }
})
export class ImageFallbackDirective {
  @Input() src: string;

  constructor() { }

  setDefaultImage(): void {
    this.src = 'assets/img/no-product.jpg';
  }

}
