import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SortTypeEnum } from 'ntk-cms-api';

@Pipe({
  name: 'sortTypeIconClass'
})
export class SortTypeIconClassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: SortTypeEnum, editable = false): SafeHtml {
    let ret = '';
    switch (value) {
      case 0://Descending
        ret = 'fa fa-sort-amount-desc';
        break;
      case 1://Ascending
        ret = 'fa fa-sort-amount-asc';
        break;
      case 2://Random
        ret = 'fa fa-random';
        break;
      default:
        ret = 'fa fa-sort-amount-desc';
    }
    return ret;
  }

}
