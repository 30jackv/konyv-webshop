import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverScale]',
  standalone: true
})
export class HoverScaleDirective {
  @Input() scaleFactor = 1.05;
  @Input() transitionDuration = '0.3s';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.transitionDuration} ease`);
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.scale(this.scaleFactor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.scale(1);
  }

  private scale(factor: number): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `scale(${factor})`
    );
  }
}