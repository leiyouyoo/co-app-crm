import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { PUBRegionService, SSOUserService } from '@co/cds';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { CustomersInfoComponent } from '../customers-info/customers-info.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';
import { PotentialCustomersComponent } from './potential-customers/potential-customers.component';
import { TransactedCustomersComponent } from './transacted-customers/transacted-customers.component';
import { CreatePotentialCustomerComponent } from './potential-customers/create-potential-customer/create-potential-customer.component';
import { HighSeasPondCustomerComponent } from './high-seas-pond-customer/high-seas-pond-customer.component';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less'],
})
export class CustomerListComponent extends CoPageBase {
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  @ViewChild(TransactedCustomersComponent, { static: false }) transactedCustomersList!: TransactedCustomersComponent;
  @ViewChild(PotentialCustomersComponent, { static: false }) potentialCustomersComponent!: PotentialCustomersComponent;
  @ViewChild(HighSeasPondCustomerComponent, { static: false }) highSeasPondCustomers!: HighSeasPondCustomerComponent;
  highseaPondType = 1;
  title = '客户详情';
  selectIndex = 0;

  constructor(
    injector: Injector,
    private msg: NzMessageService,
    public router: Router,
    private translate: TranslateService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private pubRegion: PUBRegionService,
    private sSOUserService: SSOUserService,
  ) {
    super(injector);
  }

  coOnInit(): void {
    this.init();
  }

  coOnActived() {
    this.selectedIndexChange();
  }

  init() {}

  //#endregion

  selectedIndexChange(e = null) {
    if (e !== null) {
      this.selectIndex = e;
    }
    if (this.selectIndex == 0) {
      this.transactedCustomersList.st.load();
    } else if (this.selectIndex == 1) {
      this.potentialCustomersComponent.st.load();
    } else if (this.selectIndex == 2) {
      this.highSeasPondCustomers.st.load();
    }
  }

  onShowCustomerDetail(item) {
    this.$navigate(['/crm/customers/customerdetails', item.id], { queryParams: { _title: `${item?.name}` } });
  }

  onShowpotentialCustomerDetail(item) {
    this.$navigate(['/crm/customers/potentailcustomerdetails', item.id], { queryParams: { _title: `${item?.name}` } });
  }

  /**
   * 创建客户
   */
  createCustomer() {
    const contentParams = {
      sideDrawer: this.sideDrawer,
    };
    this.title = 'Add Customer';
    this.sideDrawer.open(CreatePotentialCustomerComponent, contentParams);
    const component = this.sideDrawer.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e && e.update) {
        setTimeout(() => {
          this.sideDrawer.destroy();
          this.potentialCustomersComponent.onReset();
        }, 1000);
      }
    });
  }

  //打开新增位置弹框
  onAdd() {
    const modal = this.modal.create({
      nzTitle: this.$L('Correct customer name'),
      nzContent: LocationDetailComponent,
      nzComponentParams: {},
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
  }
}
