import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText'
})
export class ReplaceTextPipe implements PipeTransform {
  transform(value: string, arg1: string, arg2: string): any {
    if (!value)
      return '';
    if (!arg1)
      return value;
    if (!arg2)
      arg2 = '';
    return value.replace(arg1, arg2);
  }
}
