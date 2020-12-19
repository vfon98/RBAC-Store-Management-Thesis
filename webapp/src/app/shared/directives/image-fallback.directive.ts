import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img.product-img',
  host: {
    '(error)': 'setDefaultImage()',
    '[src]': 'src'
  }
})
export class ImageFallbackDirective {
  @Input() src: string;

  @HostBinding('attr.data-aos')
  dataAOS = 'zoom-in';

  constructor() { }

  setDefaultImage(): void {
    this.src = 'assets/img/no-product.jpg';
  }

}
