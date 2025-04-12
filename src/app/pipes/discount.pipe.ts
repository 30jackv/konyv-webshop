import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage: number | undefined): number {
    if (!discountPercentage || discountPercentage <= 0 || discountPercentage >= 100) {
      return price;
    }
    return price * (1 - discountPercentage / 100);
  }
}
