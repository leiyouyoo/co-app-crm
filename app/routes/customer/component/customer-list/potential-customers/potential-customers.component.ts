import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';

@Component({
  selector: 'crm-potential-customers',
  templateUrl: './potential-customers.component.html',
  styleUrls: ['./potential-customers.component.less'],
})
export class PotentialCustomersComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() set customerType(v) {
    this.searchParams.type = v;
  }
  get customerType() {
    return this.searchParams.type;
  }
  @Output() customerDetail = new EventEmitter<any>();
  searchParams = {
    pageNo: 1,
    pageSize: 10,
    Sorting: null,
    type: 0,
    searchText: '',
    isCooperation: false,
    customerOwnerIds: [],
    includeTaxes: false,
    includeContacts: false,
    includeShareOwner: false,
    loadUser: false,
    isUserContact: false,
    isOwn: false,
    customerId: '',
    isPassedAudit: false,
    customerStatus: 0,
    sorting: '',
    maxResultCount: 10,
    skipCount: 0,
  };
  customerInfo: any;
  constructor(injector: Injector, private cRMCustomerService: CRMCustomerService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cRMCustomerService.getAll(this.searchParams).subscribe((res) => {
      debugger;
      this.customerInfo = res;
    });
  }
  columns: STColumn[] = [
    {
      title: 'NO',
      index: '',
      type: 'no',
      width: 100,
    },
    {
      title: '代码',
      index: 'code',
      width: 100,
    },
    {
      title: '姓名(英文)',
      index: 'code',
      width: 100,
    },
    {
      title: '姓名(中文)',
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
      title: 'Full name(english)',
      index: 'approvelStatus',
      width: 100,
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

  //table操作方法
  onTableChange(e) {
    debugger;
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
