import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HoverBorderDirective } from '../../directives/hover-border.directive';
import { AuthService } from '../../services/auth.service';
import { UsernamePipe } from '../../pipes/username.pipe';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatBadgeModule,
    HoverBorderDirective,
    UsernamePipe,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() cartTotal: number = 0;
  @Input() showCartSummary: boolean = false;
  
  constructor(public cartService: CartService, public authService: AuthService) {}
  

}
