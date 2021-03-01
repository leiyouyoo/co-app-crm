import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';

@Component({
  selector: 'crm-transacted-customers',
  templateUrl: './transacted-customers.component.html',
  styleUrls: ['./transacted-customers.component.less'],
})
export class TransactedCustomersComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  // @Input() set customerType(v) {
  //   this.searchParams.type = v;
  // }
  // get customerType() {
  //   return this.searchParams.type;
  // }
  customerType;
  @Output() customerDetail = new EventEmitter<any>();
  searchParams = {
    pageNo: 1,
    pageSize: 10,
    Sorting: null,
    type: 0,
    searchText: '',
    isCooperation: false,
    customerOwnerIds: null,
    includeTaxes: null,
    includeContacts: null,
    includeShareOwner: null,
    loadUser: null,
    isUserContact: null,
    isOwn: null,
    customerId: '',
    isPassedAudit: null,
    customerStatus: null,
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
  onSearch() {
    this.searchParams.searchText = this.searchParams.searchText;
    this.st.load();
  }

  onRefresh() {}

  onReset() {
    this.searchParams.searchText = '';
    this.onSearch();
  }

  getAll() {
    this.cRMCustomerService.getAll(this.searchParams).subscribe((res) => {
      debugger;
      this.customerInfo = res;
    });
  }

  /**
   * 获取不同类型下的客户数据
   */
  onchangeCustomer(e) {
    debugger;
    this.searchParams.type = e;
    this.st.load();
  }
  columns: STColumn[] = [
    {
      title: '代码',
      index: 'code',
      width: 100,
    },
    {
      title: '审批状态',
      index: 'state',
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
      title: 'Abbreviation(local language)',
      index: 'localizationShortName',
      width: 120,
    },
    {
      title: 'Abbreviation(english)',
      index: 'shortName',
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
      index: 'country',
      width: 80,
    },
    {
      title: 'Applicant',
      index: 'auditor',
      width: 90,
    },
    {
      title: 'Date of Application',
      index: 'auditedDate',
      width: 100,
    },
    {
      title: 'Owner',
      index: 'owner',
      width: 80,
    },
    {
      title: 'CreateUser',
      index: 'creator',
      width: 80,
    },
    {
      title: 'Customer Type',
      index: 'customerType',
      width: 80,
    },
    {
      title: 'Creation Time',
      index: 'creationTime',
      width: 100,
    },
    {
      title: 'Update Time',
      index: 'lastModificationTime',
      width: 100,
    },
    {
      title: 'Approval date',
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
      width: 80,
    },
    {
      title: 'Data Status',
      index: 'claimStatus',
      width: 80,
    },
    {
      title: '首次出货时间',
      index: 'firstTradeTime',
      width: 80,
    },
    {
      title: 'Is the CSP account open',
      index: 'isRegistered',
      width: 100,
    },
  ];

  pendingcolumns: STColumn[] = [
    {
      title: '业务类型',
      index: 'code',
      width: 100,
    },
    {
      title: '代码',
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
      index: 'localizationShortName',
      width: 100,
    },
    {
      title: 'Abbreviation(local language)',
      index: 'name',
      width: 120,
    },
    {
      title: 'Abbreviation(english)',
      index: 'shortName',
      width: 100,
    },
    {
      title: 'Country',
      index: 'country',
      width: 80,
    },
    {
      title: 'Applicant',
      index: 'contactName',
      width: 90,
    },
    {
      title: 'Date of Application',
      index: 'approvelStatus',
      width: 100,
    },
    {
      title: 'Owner',
      index: 'owner',
      width: 80,
    },
    {
      title: 'CreateUser',
      index: 'creator',
      width: 80,
    },
    {
      title: 'Creation Time',
      index: 'creationTime',
      width: 100,
    },
    {
      title: 'Approval date',
      index: 'auditedDate',
      width: 100,
    },
    {
      title: 'Approver',
      index: 'auditor',
      width: 80,
    },
    {
      title: 'Reason for rejection',
      index: 'refuseReason',
      width: 70,
      sort: 'refuseReason',
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
