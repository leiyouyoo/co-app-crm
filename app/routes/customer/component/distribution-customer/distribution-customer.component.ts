import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { CRMCustomerService, CRMEsQueryService } from '../../../../../../fam/app/services/crm';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'crm-distribution-customer',
  templateUrl: './distribution-customer.component.html',
  styleUrls: ['./distribution-customer.component.less'],
})
export class DistributionCustomerComponent extends CoPageBase implements OnInit {
  @Input() customerIds;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  loading = false;
  listOfCustomer = [];
  listOfSelectedValue;

  constructor(private crmCustomerService: CRMCustomerService,
              injector: Injector, private modal: NzModalRef) {
    super(injector);
  }

  ngOnInit(): void {
  }

  cancel() {
    this.modal.destroy();
  }
  confirm(){

  }
}
