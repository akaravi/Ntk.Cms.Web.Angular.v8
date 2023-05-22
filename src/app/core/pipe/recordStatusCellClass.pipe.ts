import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EnumRecordStatus } from 'ntk-cms-api';

@Pipe({
  name: 'statusCellClass'
})
export class RecordStatusCellClassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: EnumRecordStatus): SafeHtml {

    return 'cms-EnumRecordStatus-cell-' + value;
  }

}
