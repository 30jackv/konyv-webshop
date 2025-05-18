import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = "konyv-webshop";
  constructor(
    private router: Router,
    public cartService: CartService
  ) {}


}