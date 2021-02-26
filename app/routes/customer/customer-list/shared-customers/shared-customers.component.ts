import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CustomerMergeComponent } from '../../component-old/customer-merge/customer-merge.component';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CoPageBase } from '@co/core';
import { STColumn } from '@co/cbc';

@Component({
  selector: 'app-shared-customers',
  templateUrl: './shared-customers.component.html',
  styleUrls: ['./shared-customers.component.less'],
})
export class SharedCustomersComponent extends CoPageBase {
  @ViewChild(CustomerMergeComponent, { static: true }) customerMerge: CustomerMergeComponent;
  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    public router: Router,
    private crmCustomerService: CRMCustomerService,
    injector: Injector,
  ) {
    super(injector);
  }
  isVisible = false;
  listOfData: any;
  loading = false;
  localtionList = []; //区域
  locations: string;
  shareListSkipCount = 1;

  searchData: any = null;
  maxResultCount = 20; //页大小
  skipCount = 1; //跳过指定条数

  tableSkipCount = 1; //跳过指定条数
  tableMaxResultCount = 7; //页大小
  shareInputName: any;
  tableDatas: any = {};
  isAllDisplayDataChecked = false;
  customList = [];
  tableLoading = false;

  customerInfo: any = null;

  choosedData = [];
  columns: STColumn[] = [
    {
      width: '80px',
      title: 'NO_table',
      type: 'no',
    },
    {
      width: 250,
      title: 'CustomerTableName',
      index: 'name',
      render: 'CustomerTableName',
    },
    {
      width: 150,
      title: 'Country, province',
      index: 'country',
      format: (item, _col) => `${item.country + '-' + item.province}`,
    },
    { width: 100, title: 'Contact', index: 'contactName' },
    { width: 100, title: 'Phone', index: 'contactTel' },
    { width: 100, title: 'First shipment time', index: 'firsttimeShipDate', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm' },
    { width: 100, title: 'Sharer', render: 'sharer' },
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

  coOnInit(): void {
    this.getSharesList();
  }

  onSearch(e) {
    let keycode = window.event ? e.keyCode : e.which;

    if (keycode === 13) {
      this.nowSearch();
    }
  }

  nowSearch() {
    this.skipCount = 1;
    this.getSharesList();
  }

  searchCustomer(name: string = '') {
    this.crmCustomerService.getShares({ searchText: name, maxResultCount: 100 }).subscribe((res: any) => {
      this.customList = res.items;
    });
  }

  //获取共享客户列表
  getSharesList() {
    let num = this.skipCount - 1;
    this.loading = true;
    this.crmCustomerService
      .getShares({
        isCooperation: false, //是否成交合作的客户
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

  onShareModal() {
    this.isVisible = true;
    this.shareInputName = null;
    this.tableSkipCount = 1; //跳过指定条数
    this.tableMaxResultCount = 7; //页大小
    this.searchCustomer();
    this.getTableData();
  }

  getTableData() {
    let num = this.tableSkipCount - 1;
    let data: any = {
      maxResultCount: this.tableMaxResultCount,
      skipCount: num * this.tableMaxResultCount, //跳过指定条数
    };

    if (this.shareInputName) {
      data.CustomerId = this.shareInputName;
    }
    this.tableLoading = true;
    this.crmCustomerService.getShareSources(data).subscribe(
      (res) => {
        this.tableLoading = false;
        this.tableDatas = res;
      },
      (err) => {
        this.tableLoading = false;
      },
    );
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  pageIndexChange(event: number): void {
    this.skipCount = event;
    this.getSharesList();
  }

  pageSizeChange(event: number): void {
    this.maxResultCount = event;
    this.getSharesList();
  }

  onBindCustomer(data) {
    this.tableLoading = true;
    this.crmCustomerService.followCustomer({ customerId: data.id }).subscribe(
      (res: any) => {
        this.msg.success(this.translate.instant('Follow up success'));
        this.getSharesList();
        this.getTableData();
      },
      (err) => {
        this.msg.error(this.translate.instant('Follow up failed'));
      },
    );
  }

  tablePageIndexChange(event) {
    this.tableSkipCount = event;
    this.getTableData();
  }

  showDetial(data) {
    this.$navigate(['crm/customers/shareddetial', data.id], {
      queryParams: {
        _title: `${data.name}`,
      },
    });
  }

  showMerge() {
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

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfData.items.every((item) => item.choosed === true);
  }

  checkAll(data) {
    if (data) {
      this.listOfData.items.forEach((e) => (e.choosed = true));
    } else {
      this.listOfData.items.forEach((e) => (e.choosed = false));
    }
    this.refreshStatus();
  }

  // 获取客户详情
  getCustomerById(id) {
    this.crmCustomerService
      .get({
        id: id,
      })
      .subscribe((res: any) => {
        this.customerInfo = res;
      });
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
}
