import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
@Injectable()
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(val: string, keyword: string): any {
    const Reg = new RegExp(`(${keyword})`, 'i');
    if (val) {
      const res = val.replace(Reg, '<span style=\'color: #1890ff;\'>$1</span>');
      return this.sanitizer.bypassSecurityTrustHtml(res);
    }
  }
}
