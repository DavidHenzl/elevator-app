import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const dateParts = value.split('-');
    const day = dateParts[2].replace(/^0/, '');
    const month = dateParts[1].replace(/^0/, '');
    return `${day}. ${month}. ${dateParts[0]}`;
  }
}
