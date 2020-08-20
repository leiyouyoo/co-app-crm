import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'inquiry-basic-information',
  templateUrl: './inquiry-basic-information.component.html',
  styleUrls: ['./inquiry-basic-information.component.less'],
})
export class InquiryBasicInfomationComponent {
  constructor() {}
  @Input() item: any;

  /**
   *
   * @param changes
   */
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && changes.item.currentValue) {
      this.item = changes.item && changes.item.currentValue;
    }
  }
}
