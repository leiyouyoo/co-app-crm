import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CustomerType } from '../../../../shared/types/customer/CustomerType';
import { ForwardingType } from '../../../../shared/types/customer/ForwardingType';
import { CargoCanvassingType } from '../../../../shared/types/customer/CargoCanvassingType';

@Component({
  selector: 'crm-customer-source',
  templateUrl: './customer-source.component.html',
  styleUrls: ['./customer-source.component.less'],
})
export class CustomerSourceComponent implements OnInit {
  @Input() customerInfo;
  cargoCanvassingType = '';
  customerType = '';
  forwardingType = '';
  constructor() {}
  ngOnInit() {
    this.bindData();
  }

  bindData() {
    if (this.customerInfo) {
      this.customerType = this.customerInfo.customerType ? CustomerType[this.customerInfo.customerType] : null;
      this.forwardingType = ForwardingType[this.customerInfo.forwardingType];
      this.cargoCanvassingType = CargoCanvassingType[this.customerInfo.cargoCanvassingType];
    }
  }

  /**
   *
   * @param changes
   */
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customerInfo && changes.customerInfo.currentValue) {
      this.customerInfo = changes.customerInfo && changes.customerInfo.currentValue;
      this.bindData();
    }
  }
}
