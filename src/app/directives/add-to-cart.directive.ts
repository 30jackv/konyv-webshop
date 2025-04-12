import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAddToCartHighlight]'
})
export class AddToCartHighlightDirective {
  @Input() highlightColor = 'rgba(76, 175, 80, 0.3)';

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.style.transition = 'background-color 0.5s';
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    setTimeout(() => {
      this.el.nativeElement.style.backgroundColor = '';
    }, 500);
  }
}