import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'packageWeight',
  standalone: true
})
export class PackageWeightPipe implements PipeTransform {

  transform(pWeight: number): string {
    return (pWeight * 1000) + "g";
  }

}
