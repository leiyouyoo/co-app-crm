import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CustomerMergeComponent } from '../../component/customer-merge/customer-merge.component';

@Component({
  selector: 'app-shared-customers',
  templateUrl: './shared-customers.component.html',
  styleUrls: ['./shared-customers.component.less'],
})
export class SharedCustomersComponent implements OnInit {
  @ViewChild(CustomerMergeComponent, { static: true }) customerMerge: CustomerMergeComponent;
  constructor(
    private customerService: CustomerService,
    private msg: NzMessageService,
    private translate: TranslateService,
    public router: Router,
  ) {}
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

  customerInfo:any=null;

  ngOnInit(): void {
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
    this.customerService.getShares({ SearchText: name, MaxResultCount: 100 }).subscribe((res: any) => {
      this.customList = res.items;
    });
  }

  //获取共享客户列表
  getSharesList() {
    let num = this.skipCount - 1;
    this.loading = true;
    this.customerService
      .getShares({
        IsCooperation: false, //是否成交合作的客户
        IsTenantUser: false, //是否是开通租户的联系人
        MaxResultCount: this.maxResultCount,
        SkipCount: num * this.maxResultCount,
        SearchText: this.searchData,
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
      MaxResultCount: this.tableMaxResultCount,
      SkipCount: num * this.tableMaxResultCount, //跳过指定条数
    };

    if (this.shareInputName) {
      data.CustomerId = this.shareInputName;
    }
    this.tableLoading = true;
    this.customerService.getShareSources(data).subscribe(
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
    this.customerService.followCustomer({ customerId: data.id }).subscribe(
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
    this.router.navigate(['/crm/home/customer/shareddetial', data.id]);
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
      this.msg.warning(
        this.translate.instant('The merged customers cannot be merged again. Please check the selected data!'),
      );
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
    this.customerService.getCustomerById(id).subscribe((res: any) => {
      this.customerInfo = res;
    });
  }

}
