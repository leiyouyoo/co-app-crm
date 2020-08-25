import { ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { NzOptionComponent } from 'ng-zorro-antd';

@Directive({
  selector: 'nz-option[groupValue]',
})
export class OptionsGroupValueDirective {
  @Input() groupValue;

  @ContentChildren(NzOptionComponent) optionsList: QueryList<NzOptionComponent>;

  constructor() {}
}
