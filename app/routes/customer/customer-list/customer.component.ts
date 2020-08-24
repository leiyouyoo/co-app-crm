import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { TransferTocustomerComponent } from '../component/transfer-tocustomer/transfer-tocustomer.component';
import { CustomerMergeComponent } from '../component/customer-merge/customer-merge.component';
import { Router } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less'],
})
export class CustomerComponent extends CoPageBase {
  totalCount: number;
  loading = false;

  maxResultCount = 20;
  skipCount = 1;

  isAllDisplayDataChecked = false;
  transDisabled = true;
  isVisibleTrans = false;
  tranLoading = false;
  choosedNum: any;
  searchData: any = null;
  listOfData: any;
  data: any;
  @ViewChild(TransferTocustomerComponent, { static: true }) tranCustomer: TransferTocustomerComponent;
  @ViewChild(CustomerMergeComponent, { static: true }) customerMerge: CustomerMergeComponent;
  constructor(
    injector: Injector,
    private msg: NzMessageService,
    public router: Router,
    private crmCustomerService: CRMCustomerService,
    private translate: TranslateService,
  ) {
    super(injector);
  }

  coOnInit(): void {
    this.initData();
    var tabs = window.localStorage.getItem('crmChangedTabs');
    if (tabs) {
      this.choosedNum = Number(tabs);
    }
  }

  initData() {
    this.getCustomerByPageList();
  }

  onSearch(e) {
    let keycode = window.event ? e.keyCode : e.which;

    if (keycode === 13) {
      this.nowSearch();
    }
  }

  nowSearch() {
    this.skipCount = 1;
    this.getCustomerByPageList();
  }

  //获取客户数据
  getCustomerByPageList() {
    this.loading = true;
    const num = this.skipCount - 1;

    this.crmCustomerService
      .getAll({
        isCooperation: true,
        maxResultCount: this.maxResultCount,
        skipCount: num * this.maxResultCount,
        searchText: this.searchData,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res;
          this.data = res.items;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  pageIndexChange(event: number): void {
    this.skipCount = event;
    this.getCustomerByPageList();
  }

  pageSizeChange(event: number): void {
    this.maxResultCount = event;
    this.getCustomerByPageList();
  }

  transModal() {
    if (this.data.some((c) => c.choosed === true)) {
      this.isVisibleTrans = true;
      this.tranCustomer.validateForm.reset();
    }
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.data.every((item) => item.choosed === true);
    this.transDisabled = !this.data.some((item) => item.choosed === true);
  }

  checkAll(data) {
    if (data) {
      this.data.forEach((e) => (e.choosed = true));
    } else {
      this.data.forEach((e) => (e.choosed = false));
    }
    this.refreshStatus();
  }

  cancelTrans() {
    this.isVisibleTrans = false;
  }

  createTrans() {
    if (!this.tranCustomer.formValid()) {
      return;
    }
    let list = [];
    this.data.forEach((data) => {
      if (data.choosed) {
        list.push(data.id);
      }
    });
    this.transferCustomer(list, this.tranCustomer.validateForm.get('userId').value);
  }

  transferCustomer(customerIds: any[], userId: any) {
    this.tranLoading = true;
    this.crmCustomerService
      .transferCustomer(
        // tslint:disable-next-line: object-literal-shorthand
        { customerIds: customerIds, userId: userId },
      )
      .subscribe(
        (res) => {
          this.tranLoading = false;
          this.isVisibleTrans = false;
          this.msg.success(this.translate.instant('转让成功'));
          this.getCustomerByPageList();
        },
        (err) => {
          this.tranLoading = false;
        },
      );
  }

  showDetial(data) {
    debugger;
    this.$navigate(['crm/home/customer/customerdetails', data.id], {
      queryParams: {
        _title: `${data.name}`,
      },
    });
  }

  showMerge() {
    this.customerMerge.dataSet = [];
    let isShow = true;
    this.listOfData.items.forEach((data) => {
      if (data.choosed) {
        if (data.isMerged) {
          isShow = false;
          return;
        } else {
          this.customerMerge.addLine(data);
        }
      }
    });
    if (isShow) {
      this.customerMerge.isVisible = true;
    } else {
      this.msg.warning(this.translate.instant('The merged customers cannot be merged again. Please check the selected data!'));
    }
  }

  selectedIndexChange(event) {
    window.localStorage.setItem('crmChangedTabs', event);
  }
}
