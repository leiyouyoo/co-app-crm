import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CooperationState, CustomerStatus, CustomerType } from '../../../models/enum';

@Component({
  selector: 'crm-high-seas-pond-customer',
  templateUrl: './high-seas-pond-customer.component.html',
  styleUrls: ['./high-seas-pond-customer.component.less'],
})
export class HighSeasPondCustomerComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  selected = [];

  @Input() set customerType(v) {
    this.searchParams.searchType = v;
  }

  get customerType() {
    return this.searchParams.searchType;
  }

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
  readonly CooperationState = CooperationState;
  readonly CustomerStatus = CustomerStatus;
  readonly CustomerType = CustomerType;

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
          index: 'name',
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
          index: 'firstTradeTime',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          width: 100,
        },
        {
          title: '转手次数',
          index: 'turnoverCount',
          width: 100,
        },
        {
          title: 'Creation Time',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          index: 'creationTime',
          width: 100,
        },
        {
          title: 'Customer Type',
          index: 'customerType',
          customerType: 'customerType',
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
          title: 'Code',
          index: 'code',
          width: 100,
        },
        {
          title: 'Full name (local language)',
          index: 'localizationName',
          width: 120,
        },
        {
          title: 'Full name(english)',
          index: 'name',
          width: 100,
        },
        {
          title: '国家-省',
          index: 'country',
          render: 'country',
          width: 100,
        },
        {
          title: 'Cooperation State',
          index: 'cooperationState',
          render: 'cooperationState',
          width: 100,
        },
        {
          title: '首次出货时间',
          index: 'firstTradeTime',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          width: 100,
        },
        {
          title: '转手次数',
          index: 'turnoverCount',
          width: 100,
        },
        {
          title: '被退回次数',
          index: 'returnCount',
          width: 100,
        },
        {
          title: 'Approval Status',
          index: 'examineState',
          render: 'examineState',
          width: 100,
        },
        {
          title: 'Abbreviation(local language)',
          index: 'shortName',
          width: 120,
        },
        {
          title: 'Abbreviation(english)',
          index: 'localizationShortName',
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
          title: 'CreateUser',
          index: 'creator',
          width: 80,
        },
        {
          title: 'Customer Type',
          index: 'customerType',
          render: 'customerType',
          width: 70,
        },
        {
          title: 'Creation Time',
          dateFormat: 'yyyy-MM-dd',
          index: 'creationTime',
          width: 100,
        },
        {
          title: 'Update Time',
          dateFormat: 'yyyy-MM-dd',
          index: 'lastModificationTime',
          width: 100,
        },
        {
          title: 'Approval date',
          dateFormat: 'yyyy-MM-dd',
          index: 'auditedDate',
          width: 100,
        },
        {
          title: 'Approver',
          index: 'auditor',
          width: 80,
        },
        {
          title: 'Dangerous customer',
          index: 'isDangerFlag',
          render: 'isDangerFlag',
          width: 70,
        },
        {
          title: 'Data Status',
          index: 'isDeleted',
          render: 'isDeleted',
          width: 70,
        },
        {
          title: 'Customer Status',
          index: 'ownerState',
          render: 'ownerState',
          width: 70,
        },
        {
          title: 'Is the CSP account open',
          index: 'isRegistered',
          render: 'isRegistered',
          width: 120,
        },
      ];
    }
  }

  ngOnInit(): void {
    this.setColumns('assign');
    this.getAll();
  }

  onSearch() {
    Object.assign(this.searchParams, {
      pageNo: 1,
      pageSize: 10,
      maxResultCount: 10,
      skipCount: 0,
    });
    this.getAll();
  }

  onRefresh() {
    this.getAll();
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
    Object.assign(this.searchParams, {
      pageNo: 1,
      pageSize: 10,
      maxResultCount: 10,
      skipCount: 0,
    });
    this.searchParams.searchkeywork = null;
    this.getAll();
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
        this.searchParams.pageNo = 1;
        this.searchParams.pageSize = e.ps;
        this.searchParams.maxResultCount = this.searchParams.pageSize;
        this.searchParams.skipCount = (this.searchParams.pageNo - 1) * this.searchParams.pageSize;
        this.getAll();
        break;
      }
      case 'checkbox': {
        this.selected = e.checkbox;
        break;
      }
    }
  }
}
