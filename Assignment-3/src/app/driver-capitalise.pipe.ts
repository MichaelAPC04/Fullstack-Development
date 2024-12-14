import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driverCapitalise',
  standalone: true
})
export class DriverCapitalisePipe implements PipeTransform {

  transform(dName: string): string {
    return dName.toUpperCase();
  }

}
