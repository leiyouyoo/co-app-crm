import { ContentChildren, Directive, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { NzOptionExtraDirective } from './nz-option-extra.directive';

@Directive({
  selector: 'nz-select[appNzOptionExtraChange]'
})
export class NzOptionExtraChangeDirective {
  @ContentChildren(NzOptionExtraDirective) extraList: QueryList<NzOptionExtraDirective>;
  @Output() appNzOptionExtraChange = new EventEmitter();
  @Input() nzMode: string;

  constructor() { }
  @HostListener('ngModelChange', ['$event'])
  onModelChange(optionValue) {
    if (!this.extraList) return;
    /* 多选 */
    if (['multiple', 'tags'].includes(this.nzMode)) {
      const valueList = (optionValue as any[]).map(o => {
        const hit = this.extraList.find(p => o === p.host.nzValue)
        return hit && hit.value;
      })
      this.appNzOptionExtraChange.emit(valueList);
    } else {
      /* 单选 */
      const hit = this.extraList.find(o => optionValue === o.host.nzValue)
      if (hit) {
        this.appNzOptionExtraChange.emit(hit.value);
      } else if (optionValue == null) {
        this.appNzOptionExtraChange.emit(optionValue);
      }
    }
  }
}
