import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CreatePotentialCustomerComponent } from './create-potential-customer/create-potential-customer.component';

@Component({
  selector: 'crm-potential-customers',
  templateUrl: './potential-customers.component.html',
  styleUrls: ['./potential-customers.component.less'],
})
export class PotentialCustomersComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
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
  title = 'Add Customer';
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

  onRefresh() {
    this.st.load();
  }

  onReset() {
    this.searchParams.searchText = '';
    this.onSearch();
  }
  getAll() {
    this.cRMCustomerService.getAll(this.searchParams).subscribe((res) => {
      this.customerInfo = res;
    });
  }
  /**
   * 获取不同类型下的客户数据
   */
  onchangeCustomer(e) {
    this.searchParams.type = e;
    this.st.load();
  }
  columns: STColumn[] = [
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
      title: 'Name(English)',
      index: 'contactName',
      width: 100,
    },
    {
      title: 'Name(Chinese)',
      index: 'localizationContactName',
      width: 100,
    },
    {
      title: 'Prospect status',
      index: 'LeadTrackingPhase',
      render: 'LeadTrackingPhase',
      width: 100,
    },
    {
      title: 'Approval Status',
      index: 'state',
      render: 'state',
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
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
    },
    {
      title: 'Update Time',
      index: 'lastModificationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
    },
    {
      title: 'Approval date',
      index: 'auditedDate',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
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
      width: 80,
    },
    {
      title: 'Data Status',
      index: 'approvelStatus',
      width: 80,
    },
    // {
    //   title: 'Customer Status',
    //   index: 'approvelStatus',
    //   width: 80,
    // },
    {
      title: 'Is the CSP account open',
      index: 'isRegistered',
      width: 100,
    },
    {
      type: 'action',
      fixed: 'right',
      width: 230,
      buttons: [
        {
          text: 'View',
          click: (e) => {
            this.onShowCustomerDetail(e);
          },
        },
      ],
    },
  ];
  pendingcolumns: STColumn[] = [
    {
      title: 'business type',
      index: 'examineType',
      render: 'examineType',
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
      index: 'applyUserName',
      width: 90,
    },
    {
      title: 'Date of Application',
      index: 'applyDate',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
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
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
    },
    {
      title: 'Approval date',
      index: 'auditedDate',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
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
    {
      type: 'action',
      fixed: 'right',
      width: 230,
      buttons: [
        {
          text: 'View',
          click: (e) => {
            this.onShowCustomerDetail(e);
          },
        },
      ],
    },
  ];
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
  /**
   * 创建客户
   */
  createCustomer() {
    const contentParams = {
      sideDrawer: this.sideDrawer,
    };
    this.title = 'Add Customer';
    this.sideDrawer.open(CreatePotentialCustomerComponent, contentParams);
    const component = this.sideDrawer.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.sideDrawer.destroy();
        }, 1000);
      }
    });
  }
}
