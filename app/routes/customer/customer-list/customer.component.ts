import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { TransferTocustomerComponent } from '../component/transfer-tocustomer/transfer-tocustomer.component';
import { CustomerMergeComponent } from '../component/customer-merge/customer-merge.component';
import { Router } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CoPageBase } from '@co/core';
import { STColumn } from '@co/cbc';

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

  isVisibleTrans = false;
  tranLoading = false;
  searchData: any = null;
  listOfData: any;

  choosedData: any = [];

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
    { width: '150px', title: 'Owner', index: 'owner' },
    { width: '250px', title: 'First shipment time', index: 'firsttimeShipDate' },
    {
      title: 'Action',
      type: 'action',
      width: 150,
      fixed: 'right',
      className: 'no-line-through',
      buttons: [
        {
          text: this.translate.instant('View'),
          type: 'none',
          click: (e) => {
            this.showDetial(e);
          },
        },
      ],
    },
  ];

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
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  checkChange(e): void {
    //
    e.type === 'pi' && this.pageIndexChange(e.pi);
    e.type === 'ps' && this.pageSizeChange(e.ps);
    e.type === 'dblClick' && this.showDetial(e.dblClick.item);
    if (e.type === 'checkbox') {
      this.choosedData = e.checkbox;
    }
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
    this.isVisibleTrans = true;
    this.tranCustomer.validateForm.reset();
  }

  cancelTrans() {
    this.isVisibleTrans = false;
  }

  createTrans() {
    if (!this.tranCustomer.formValid()) {
      return;
    }
    this.transferCustomer(
      this.choosedData.map((e) => e.id),
      this.tranCustomer.validateForm.get('userId').value,
    );
  }

  transferCustomer(customerIds: any[], userId: any) {
    debugger;

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
          this.msg.success(this.translate.instant('Successful transfer'));
          this.getCustomerByPageList();
        },
        (err) => {
          this.tranLoading = false;
        },
      );
  }

  showDetial(data) {
    this.$navigate(['crm/customers/customerdetails', data.id], {
      queryParams: {
        _title: `${data.name}`,
      },
    });
  }

  showMerge() {
    debugger;
    this.customerMerge.dataSet = [];
    let isShow = true;
    this.choosedData.forEach((data) => {
      if (data.isMerged) {
        isShow = false;
        return;
      } else {
        this.customerMerge.addLine(data);
      }
    });
    if (isShow) {
      this.customerMerge.isVisible = true;
    } else {
      this.msg.warning(this.translate.instant('The merged customers cannot be merged again. Please check the selected data!'));
    }
  }
}
