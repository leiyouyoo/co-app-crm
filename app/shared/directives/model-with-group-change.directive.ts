import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  QueryList,
} from '@angular/core';
import { isArray } from 'util';
import { OptionsGroupValueDirective } from './options-group-value.directive';

interface SelectChange {
  optionValue;
  groupValue;
}

@Directive({
  selector: 'nz-select[modelWithGroupChange]',
})
export class ModelWithGroupChangeDirective {
  @Output() modelWithGroupChange = new EventEmitter<SelectChange>();
  @ContentChildren(OptionsGroupValueDirective) optionsGroup: QueryList<OptionsGroupValueDirective>;

  constructor() {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(optionValue) {
    let selectedGroup;
    if (isArray(optionValue)) {
      let groupValue = [];
      optionValue.forEach((c) => {
        selectedGroup = this.optionsGroup.find((groupComponent, index, arr) => {
          return !!groupComponent.optionsList.find((nzOptionComponent) => {
            return nzOptionComponent.nzValue === c;
          });
        });
        const Value = selectedGroup ? selectedGroup.groupValue : null;
        groupValue.push(Value);
      });
      this.modelWithGroupChange.emit({ optionValue, groupValue });
    } else {
      selectedGroup = this.optionsGroup.find((groupComponent, index, arr) => {
        return !!groupComponent.optionsList.find((nzOptionComponent) => {
          return nzOptionComponent.nzValue === optionValue;
        });
      });
      const groupValue = selectedGroup ? selectedGroup.groupValue : null;
      this.modelWithGroupChange.emit({ optionValue, groupValue });
    }
  }
}
