import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';

@Component({
  selector: 'crm-customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.less'],
})
export class CustomersInfoComponent implements OnInit {
  customerInfo: any;
  isLoading = false;
  customerId = this.activeRoute.snapshot.params.id;
  constructor(private crmCustomerService: CRMCustomerService, public activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    debugger;
    this.getCustomerDetail(this.customerId);
  }

  //获取详情
  getCustomerDetail(id) {
    this.isLoading = true;
    this.crmCustomerService.getDetail({ id: id }).subscribe(
      (res) => {
        this.isLoading = false;
        this.customerInfo = res;
      },

      (error) => {
        this.isLoading = false;
      },
    );
  }

  //编辑完之后重新获取详情
  getDetail(e) {
    if (e) {
      this.getCustomerDetail(this.customerId);
    }
  }
}
