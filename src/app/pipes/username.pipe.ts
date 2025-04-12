import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'username' })
export class UsernamePipe implements PipeTransform {

  transform(user: User | null): string {
    return user?.username || 'Vendég';
  }

}
