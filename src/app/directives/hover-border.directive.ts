import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverBorder]'
})
export class HoverBorderDirective {
  private BORDER_STYLE = '3px solid #3f51b5';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.borderBottom = this.BORDER_STYLE;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.borderBottom = '';
  }
}