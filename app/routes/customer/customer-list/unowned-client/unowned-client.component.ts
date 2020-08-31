import { Component, OnInit, HostListener, Input, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CoPageBase } from '@co/core';
import { STColumn } from '@co/cbc';

@Component({
  selector: 'app-unowned-client',
  templateUrl: './unowned-client.component.html',
  styleUrls: ['./unowned-client.component.less'],
})
export class UnownedClientComponent extends CoPageBase {
  constructor(
    private msg: NzMessageService,
    public router: Router,
    public translate: TranslateService,
    private crmCustomerService: CRMCustomerService,
    injector: Injector,
  ) {
    super(injector);
  }

  listOfData: any;
  skipCount = 1;
  maxResultCount = 20;

  CustomerId = '';
  isSuper: boolean;
  loading = false;
  searchData: any = null;

  columns: STColumn[] = [
    {
      width: '250px',
      title: 'CustomerTableName',
      index: 'name',
      render: 'CustomerTableName',
    },
    {
      width: '150px',
      title: 'Country, province',
      index: 'country',
      format: (item, _col) => `${item.country + '-' + item.province}`,
    },
    { width: '150px', title: 'Contact', index: 'contactName' },
    { width: '150px', title: 'Phone', index: 'contactTel' },
    { width: '150px', title: 'First shipment time', index: 'firsttimeShipDate', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm' },
    {
      width: '150px',
      title: 'CustomerType',
      index: 'customerType',
      type: 'enum',
      enum: {
        1: this.translate.instant('Carrier'),
        2: this.translate.instant('AirLine'),
        3: this.translate.instant('Forwarding'),
        4: this.translate.instant('DirectClient'),
        5: this.translate.instant('Trucker'),
        6: this.translate.instant('CustomsBroker'),
        7: this.translate.instant('WareHouse'),
        8: this.translate.instant('Storage'),
        9: this.translate.instant('RailWay'),
        10: this.translate.instant('Express'),
        11: this.translate.instant('Terminal'),
        12: this.translate.instant('Other'),
      },
    },
    { width: '150px', title: 'Status', index: 'Status', render: 'Status' },
    { width: '150px', title: 'Claimant', index: 'owner' },
    { width: '150px', title: 'Assign', index: 'pushName' },
    {
      title: 'Action',
      type: 'action',
      width: 150,
      fixed: 'right',
      className: 'no-line-through',
      render: 'action',
    },
  ];

  coOnInit(): void {
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
    this.$navigate(['crm/customers/unowndetial', data.id], {
      queryParams: {
        _title: `${data.name}`,
      },
    });
  }

  checkChange(e) {
    e.type === 'dblClick' && this.showDetial(e.dblClick.item);
  }
}
