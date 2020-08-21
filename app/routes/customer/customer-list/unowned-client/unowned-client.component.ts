import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';

@Component({
  selector: 'app-unowned-client',
  templateUrl: './unowned-client.component.html',
  styleUrls: ['./unowned-client.component.less'],
})
export class UnownedClientComponent implements OnInit {
  constructor(
    private msg: NzMessageService,
    public router: Router,
    public translate: TranslateService,
    private crmCustomerService: CRMCustomerService,
  ) {}

  listOfData: any;
  skipCount = 1;
  maxResultCount = 20;

  CustomerId = '';
  isSuper: boolean;
  loading = false;
  searchData: any = null;
  user = JSON.parse(window.localStorage.getItem('co.session'));
  currentUserId = this.user.session.user.icpUserId;

  customerTypePipe: any = {
    1: this.translate.instant('Carrier'),

    // 航空公司
    2: this.translate.instant('AirLine'),

    // 货代
    3: this.translate.instant('Forwarding'),

    // 直客
    4: this.translate.instant('DirectClient'),

    // 拖车行
    5: this.translate.instant('Trucker'),

    // 报关行
    6: this.translate.instant('CustomsBroker'),

    // 仓储
    7: this.translate.instant('WareHouse'),

    // 堆场
    8: this.translate.instant('Storage'),

    // 铁路
    9: this.translate.instant('RailWay'),

    // 快递
    10: this.translate.instant('Express'),

    // 码头
    11: this.translate.instant('Terminal'),

    // 其他
    12: this.translate.instant('Other'),
  };

  ngOnInit(): void {
    this.getOwnerlessCustomerByPageList();
  }

  onSearch(e) {
    let keycode = window.event ? e.keyCode : e.which;

    if (keycode === 13) {
      this.nowSearch();
    }
  }

  nowSearch() {
    this.skipCount = 1;
    this.getOwnerlessCustomerByPageList();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  pageIndexChange(event: number): void {
    this.skipCount = event;
    this.getOwnerlessCustomerByPageList();
  }

  pageSizeChange(event: number): void {
    this.maxResultCount = event;
    this.getOwnerlessCustomerByPageList();
  }

  //获取客户数据
  getOwnerlessCustomerByPageList() {
    this.loading = true;
    let num = this.skipCount - 1;
    this.crmCustomerService
      .getOwnerlessCustomer({
        customerId: this.CustomerId,
        maxResultCount: this.maxResultCount,
        skipCount: this.maxResultCount * num,
        searchText: this.searchData,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res;
          this.isSuper = res.isSuperior;
        },
        (err) => {
          this.loading = false;
        },
      );
  }
  //认领
  claimCustomer(id) {
    this.crmCustomerService
      .claimCustomer({
        customerId: id,
      })
      .subscribe(
        (res: any) => {
          this.msg.success(this.translate.instant('Successful claim~ You can follow up under [Potential Customers].'));
          this.getOwnerlessCustomerByPageList();
        },
        (err) => {
          this.msg.error(err);
        },
      );
  }
  // 分配
  transferCustomer(customerId: any, id: any) {
    this.crmCustomerService.transferCustomer({ customerIds: [customerId], userId: id }).subscribe(
      (res) => {
        this.msg.success(this.translate.instant('Allocation is successful!'));
        this.getOwnerlessCustomerByPageList();
      },
      (err) => {
        this.msg.error(err);
      },
    );
  }

  showDetial(data) {
    this.router.navigate(['/crm/home/customer/unowndetial', data.id]);
  }
}
