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
import { PotentialCustomersComponent } from './potential-customers/potential-customers.component';
import { TransactedCustomersComponent } from './transacted-customers/transacted-customers.component';

@Component({
  selector: 'crm-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.less'],
})
export class CustomerListComponent extends CoPageBase {
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  @ViewChild(TransactedCustomersComponent, { static: false }) transactedCustomersList!: TransactedCustomersComponent;
  @ViewChild(PotentialCustomersComponent, { static: false }) potentialCustomersComponent!: PotentialCustomersComponent;

  customerType = 0;
  highseaPondType = 1;
  searchParams = {
    searchText: '',
  };
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

  init() {}

  //#endregion

  onSearch() {
    if (this.selectIndex == 0) {
      this.transactedCustomersList.searchParams.searchText = this.searchParams.searchText;
      this.transactedCustomersList.st.load();
    } else if (this.selectIndex == 1) {
      this.potentialCustomersComponent.searchParams.searchText = this.searchParams.searchText;
      this.potentialCustomersComponent.st.load();
    }
  }

  onRefresh() {}

  onReset() {
    this.searchParams.searchText = '';
    this.onSearch();
  }

  selectedIndexChange(e) {
    this.selectIndex = e;
    this.onSearch();
  }

  updateCustomerName() {}

  applyName(data) {}

  /**
   * 创建客户
   */
  createCustomer() {}

  onShowCustomerDetail(item) {
    this.$navigate(['/crm/customers/customerdetails', item.id], { queryParams: { _title: `${item?.name}` } });
  }

  onShowpotentialCustomerDetail(item) {
    this.$navigate(['/crm/customers/customerdetails', item.id], { queryParams: { _title: `${item?.name}` } });
  }
  /**
   * 获取不同类型下的客户数据
   */
  onchangeCustomer(e) {
    debugger;
    if (this.selectIndex == 0) {
      this.transactedCustomersList.searchParams.type = e;
      this.transactedCustomersList.st.load();
    } else {
    }
  }
  /**
   * 申请代码
   */
  applyCode() {}

  /**
   * 合并客户
   */
  mergeCustomer() {}

  //客户table操作
  //获取选中的客户数据
  getCheckDetail(e: any[]) {}

  /**
   * 申请改名
   */
  approveName(customerInfo) {}

  //打开新增联系人弹框
  onAdd() {
    const modal = this.modal.create({
      nzTitle: this.$L('add Contact'),
      nzContent: ContactDetailComponent,
      nzComponentParams: {},
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '35%' },
      nzFooter: null,
    });
  }
}
