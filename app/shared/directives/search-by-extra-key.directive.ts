import { Directive, Input, OnInit } from '@angular/core';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd';

@Directive({
  selector: 'nz-select[appSearchByExtraKey]',
})
export class SearchByExtraKeyDirective implements OnInit {
  @Input() appSearchByExtraKey: string[] = [];

  constructor(private host: NzSelectComponent) {}

  ngOnInit(): void {
    this.host.nzFilterOption = (input: string, option: NzOptionComponent): boolean => {
      return this.appSearchByExtraKey.some((key) => {
        const optionValue = (option.template as any)._appExtra[key];
        if (optionValue && optionValue.toString) {
          return optionValue
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase());
        }
        return false;
      });
    };
  }
}
