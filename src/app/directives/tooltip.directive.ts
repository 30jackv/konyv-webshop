import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appTooltip]',
  exportAs: 'appTooltip',
  providers: [MatTooltip]
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  @Input() tooltipPosition: 'above' | 'below' | 'left' | 'right' = 'below';
  @Input() showDelay: number = 0;
  @Input() hideDelay: number = 0;
  @Input() tooltipClass: string = 'custom-tooltip';

  constructor(
    private elementRef: ElementRef,
    private matTooltip: MatTooltip
  ) {}

  ngOnInit() {
    this.configureTooltip();
  }

  private configureTooltip() {
    this.matTooltip.message = this.appTooltip;
    this.matTooltip.position = this.tooltipPosition;
    this.matTooltip.showDelay = this.showDelay;
    this.matTooltip.hideDelay = this.hideDelay;
    this.matTooltip.tooltipClass = this.tooltipClass;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.matTooltip.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.matTooltip.hide();
  }
}