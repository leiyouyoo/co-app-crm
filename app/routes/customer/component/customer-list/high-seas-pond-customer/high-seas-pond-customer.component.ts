import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CooperationState, CustomerStatus, CustomerType } from '../../../models/enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DistributionCustomerComponent } from '../../distribution-customer/distribution-customer.component';
import { ACLService } from '@co/acl';

@Component({
  selector: 'crm-high-seas-pond-customer',
  templateUrl: './high-seas-pond-customer.component.html',
  styleUrls: ['./high-seas-pond-customer.component.less'],
})
export class HighSeasPondCustomerComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  selected = [];
  loading = false;
  isManager: boolean;

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

  constructor(injector: Injector, private crmCustomerService: CRMCustomerService, private modal: NzModalService, private aclService: ACLService) {
    super(injector);
  }

  setColumns(type) {
    if (type == 'assign') {
      this.columns = [
        {
          title: '',
          index: '',
          type: 'no',
          width: 50,
        },
        {
          title: 'Full name(english)',
          index: 'name',
          width: 100,
        },
        {
          title: 'Country/Province',
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
          title: 'First shipment time',
          index: 'firstTradeTime',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          width: 100,
        },
        {
          title: 'Change hands',
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
          render: 'customerType',
          width: 100,
        },
        {
          type: 'action',
          fixed: 'right',
          width: 80,
        },
      ];
    } else {
      this.columns = [
        {
          title: '',
          index: '',
          type: 'no',
          width: 50,
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
          title: 'Country/Province',
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
          title: 'First shipment time',
          index: 'firstTradeTime',
          type: 'date',
          dateFormat: 'yyyy-MM-dd',
          width: 100,
        },
        {
          title: 'Change hands',
          index: 'turnoverCount',
          width: 100,
        },
        {
          title: 'Number of returned',
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
        {
          type: 'action',
          fixed: 'right',
          width: 80,
        },
      ];
    }
  }

  ngOnInit(): void {
    this.setColumns('assign');
    this.getAll();
    if (this.aclService.can(['j:经理'])) {
      this.isManager = true;
    }
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
    this.selected = [];
    this.loading = true;
    this.crmCustomerService.queryHighSeasPondCustomers(this.searchParams).subscribe((res) => {
      this.customerInfo = res;
      this.loading = false;
    }, e => this.loading = false);
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

  /**
   * 认领
   */
  claim() {
    const list = this.selected.filter(e => !e.isRecycleCustomer).map(e => e.id);
    if (!list.length) {
      this.$message.warning('所选客户包含被回收的客户');
      return;
    }
    this.loading = true;
    this.crmCustomerService.bulkClaimCustomer({ ids: list }).subscribe(r => {
      this.$message.success('认领成功');
      this.getAll();
    }, e => this.loading = false);
  }

  /**
   * 分配
   */
  customerDistribution() {
    const list = this.selected.filter(e => !e.isRecycleCustomer).map(e => e.id);
    if (!list.length) {
      this.$message.warning('所选客户包含被回收的客户');
      return;
    }
    const modal = this.modal.create({
      nzTitle: this.$L('Assign Customer'),
      nzContent: DistributionCustomerComponent,
      nzClosable: false,
      nzWidth: 820,
      nzComponentParams: { customerIds: list },
      nzFooter: null,
    });
    const instance = modal.getContentComponent();
    instance.onSubmitted.subscribe((r) => {
      r && this.st.load();
    });
  }
}
