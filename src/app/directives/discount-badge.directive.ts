import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDiscountBadge]',
  standalone: true
})
export class DiscountBadgeDirective implements OnInit {
  @Input() appDiscountBadge: number | null = null; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.appDiscountBadge && this.appDiscountBadge > 0) {
      const badge = this.renderer.createElement('span');
      const text = this.renderer.createText(`-${this.appDiscountBadge}%`);
      
      this.renderer.addClass(badge, 'discount-badge');
      this.renderer.setStyle(badge, 'position', 'absolute');
      this.renderer.setStyle(badge, 'top', '8px');
      this.renderer.setStyle(badge, 'right', '8px');
      this.renderer.setStyle(badge, 'background-color', '#f44336');
      this.renderer.setStyle(badge, 'color', 'white');
      this.renderer.setStyle(badge, 'padding', '4px 8px');
      this.renderer.setStyle(badge, 'border-radius', '12px');
      this.renderer.setStyle(badge, 'font-size', '12px');
      this.renderer.setStyle(badge, 'font-weight', 'bold');
      
      this.renderer.appendChild(badge, text);
      this.renderer.appendChild(this.el.nativeElement, badge);
      
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
  }
}