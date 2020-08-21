import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CustomerType } from '../../../../shared/types/customer/CustomerType';
@Component({
  selector: 'app-customer-merge',
  templateUrl: './customer-merge.component.html',
  styleUrls: ['./customer-merge.component.less'],
})
export class CustomerMergeComponent implements OnInit {
  @Output() getCustomerByPageList = new EventEmitter();
  customerId: null;
  isVisible = false;
  dataSet = [];
  customerList = [];
  customerIds = [];
  count = 0;
  selectIndex = null;
  commit = true;
  KeepCustomerId = null;
  searchObj = { searchText: null, SkipCount: 0, MaxResultCount: 20 };
  constructor(
    private msg: NzMessageService,
    private modalService: NzModalService,
    private crmCustomerService: CRMCustomerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {}
  // 查询
  onSearch(value: string): void {
    if (!value) {
      return;
    }
    this.searchObj.searchText = value;
    this.crmCustomerService.getAllForMerge(this.searchObj).subscribe((res: any) => {
      //  过滤数据
      this.customerList = res.items;
      if (this.customerList.length > 0) {
        this.customerList.forEach((items, index) => {
          if (this.customerIds.length > 0) {
            this.customerIds.forEach((element) => {
              if (items.id === element) {
                this.customerList.splice(index, 1);
              }
            });
          }
        });
      }
    });
  }

  // 删除
  deleteLine(index) {
    this.dataSet.splice(index, 1);
    this.dataSet = [...this.dataSet];
    this.customerIds.splice(index, 1);
    this.checkDataSet();
  }
  // 增加行
  addLine(event) {
    if (event) {
      if (typeof event.customerType === 'number') {
        event.customerType = CustomerType[event.customerType];
      }
      if (this.customerIds.length > 0) {
        this.customerIds.find((value) => {
          if (value === event.id) {
            return;
          }
        });
      }
      this.dataSet.push(event);
      this.customerIds.push(event.id);
      this.dataSet = [...this.dataSet];
    }
    this.checkDataSet();
  }
  clearData() {
    setTimeout(() => {
      this.customerId = null;
      this.customerList = [];
    }, 100);
  }
  checkDataSet() {
    if (this.dataSet.length >= 2) {
      this.count = 0;
      this.selectIndex = null;
      this.KeepCustomerId = null;
      this.dataSet.forEach((element, index) => {
        if (element.isRegistered) {
          this.count++;
          this.selectIndex = index;
        }
      });
      if (this.count === 1) {
        this.KeepCustomerId = this.dataSet[this.selectIndex].id;
      }
    }
  }

  choseData(item, index) {
    if (this.count === 1) return;
    this.KeepCustomerId = item.id;
  }
  // 点击合并
  mergeCommit() {
    this.showTips();
    let cname = null;
    let otherName = [];
    if (this.commit) {
      if (this.count === 1) {
        this.dataSet.forEach((element) => {
          if (element.id === this.KeepCustomerId) {
            cname = element.name;
          } else {
            otherName.push(element.name);
          }
        });
        let tipText =
          this.translate.instant('Customer') +
          cname +
          this.translate.instant('has opened a CSP account. If the merger continues,') +
          otherName.toString() +
          this.translate.instant('after') +
          this.translate.instant('logs in to the client,') +
          this.translate.instant('it will belong to customer') +
          this.translate.instant('Customer') +
          cname +
          this.translate.instant(
            '. And the business data of the selected customers will be consolidated.Do you want to continue the merger?',
          );
        this.modalService.confirm({
          nzTitle: this.translate.instant('Tips'),
          nzContent: tipText,
          nzOkText: this.translate.instant('OK'),
          nzOnOk: () => {
            this.saveData();
          },
          nzCancelText: this.translate.instant('Cancel'),
        });
      } else {
        this.saveData();
      }
    }
  }

  saveData() {
    this.crmCustomerService.mergeCustomer({ customerIds: this.customerIds, keepCustomerId: this.KeepCustomerId }).subscribe((res: any) => {
      this.msg.success(this.translate.instant('merge ') + this.translate.instant('success'));
      this.cancelFun();
      this.getCustomerByPageList.emit();
    });
  }

  cancelFun() {
    this.isVisible = false;
    this.customerId = null;
    this.dataSet = [];
    this.customerList = [];
    this.customerIds = [];
    this.count = 0;
    this.selectIndex = null;
    this.KeepCustomerId = null;
    this.searchObj = { searchText: null, SkipCount: 0, MaxResultCount: 20 };
    this.clearData();
  }
  showTips() {
    this.commit = true;
    if (this.dataSet.length <= 0) {
      this.msg.warning(this.translate.instant('Customer is needed'));
      this.commit = false;
    } else if (this.dataSet.length < 2) {
      this.msg.warning(this.translate.instant('Select at least two customers'));
      this.commit = false;
    } else if (this.KeepCustomerId === null) {
      this.msg.warning(this.translate.instant('Please select one customer to retain'));
      this.commit = false;
    } else if (this.count > 1) {
      this.msg.warning(this.translate.instant('Multiple customers have opened CSP accounts, and merger is prohibited'));
      this.commit = false;
    }
    //  else if (this.count === 0) {
    //   this.msg.warning(
    //     this.translate.instant('Customer consolidation can only be done to customers who have opened CSP accounts'),
    //   );
    //   this.commit = false;
    // }
  }
}
