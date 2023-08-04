import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RecordStatusEnum } from 'ntk-cms-api';

@Pipe({
  name: 'statusCellClass'
})
export class RecordStatusCellClassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: RecordStatusEnum): SafeHtml {

    return 'cms-RecordStatusEnum-cell-' + value;
  }

}
