import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'crm-high-seas-pond-customer',
  templateUrl: './high-seas-pond-customer.component.html',
  styleUrls: ['./high-seas-pond-customer.component.less'],
})
export class HighSeasPondCustomerComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;

  @Input() set customerType(v) {
    this.searchParams.searchType = v;
  }

  get customerType() {
    return this.searchParams.searchType;
  }

  @Output() customerDetail = new EventEmitter<any>();
  searchParams = {
    pageNo: 1,
    pageSize: 10,
    Sorting: null,
    searchkeywork: null,
    searchType: 0,
    sorting: null,
    maxResultCount: 10,
    skipCount: 0,
  };
  title = 'Add Customer';
  customerInfo: any;
  columns: STColumn[] = [];

  constructor(injector: Injector, private cRMCustomerService: CRMCustomerService) {
    super(injector);
  }

  setColumns(type) {
    if (type == 'assign') {
      this.columns = [
        {
          title: 'NO',
          index: '',
          type: 'no',
          width: 100,
        },
        {
          title: 'Full name(english)',
          index: 'fullName',
          width: 100,
        },
        {
          title: '国家-省',
          index: 'country',
          render: 'country',
          width: 100,
        },
        {
          title: '首次出货时间',
          index: 'firstShipmentTime',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          width: 100,
        },
        {
          title: '转手次数',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'Creation Time',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: '客户类型',
          index: 'approvelStatus',
          width: 100,
        },
      ];
    } else {
      this.columns = [
        {
          title: 'NO',
          index: '',
          type: 'no',
          width: 100,
        },
        {
          title: 'Full name(english)',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: '国家-省',
          index: 'code',
          width: 100,
        },
        {
          title: '成交状态',
          index: 'code',
          width: 100,
        },
        {
          title: '潜在客户状态',
          index: 'code',
          width: 100,
        },
        {
          title: '审批状态',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'Full name (local language)',
          index: 'approvelStatus',
          width: 120,
        },
        {
          title: 'Abbreviation(local language)',
          index: 'approvelStatus',
          width: 120,
        },
        {
          title: 'Abbreviation(english)',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'TEL',
          index: 'tel',
          width: 80,
          sort: 'tel',
        },
        {
          title: 'FAX',
          index: 'fax',
          width: 80,
          sort: 'fax',
        },
        {
          title: 'Country',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Owner',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'CreateUser',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Customer Type',
          index: 'CustomerType',
          width: 80,
        },
        {
          title: 'Creation Time',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'Update Time',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'Approval date',
          index: 'approvelStatus',
          width: 100,
        },
        {
          title: 'Approver',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Dangerous customer',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Data Status',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Customer Status',
          index: 'approvelStatus',
          width: 80,
        },
        {
          title: 'Is the CSP account open',
          index: 'approvelStatus',
          width: 100,
        },
      ];
    }
  }

  ngOnInit(): void {
    this.setColumns('assign');
    this.getAll();
  }

  onSearch() {
    this.st.load();
  }

  onRefresh() {
  }

  onReset() {
    this.searchParams.searchkeywork = '';
    this.onSearch();
  }

  getAll() {
    this.cRMCustomerService.queryHighSeasPondCustomers(this.searchParams).subscribe((res) => {
      this.customerInfo = res;
    });
  }

  /**
   * 获取不同类型下的客户数据
   */
  onchangeCustomer(e) {
    if (e == 0 || e == 1) {
      this.setColumns('assign');
    } else {
      this.setColumns('all');
    }
    this.searchParams.searchType = e;
    this.st.load();
  }

  //table操作方法
  onTableChange(e) {
    switch (e.type) {
      case 'pi': {
        this.searchParams.pageNo = e.pi;
        this.searchParams.maxResultCount = this.searchParams.pageSize;
        this.searchParams.skipCount = (this.searchParams.pageNo - 1) * this.searchParams.pageSize;
        this.getAll();
        break;
      }
      case 'ps': {
        this.searchParams.pageSize = e.ps;
        this.searchParams.maxResultCount = this.searchParams.pageSize;
        this.searchParams.skipCount = (this.searchParams.pageNo - 1) * this.searchParams.pageSize;
        this.getAll();
        break;
      }
      case 'click': {
        this.onShowCustomerDetail(e.click.item);
      }
    }
  }

  //展开客户详情
  onShowCustomerDetail(data) {
    this.customerDetail.emit(data);
  }
}
