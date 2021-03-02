import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { CreatePotentialCustomerComponent } from './create-potential-customer/create-potential-customer.component';
import { ACLService } from '@co/acl';
import { TransferTocustomerComponent } from '../../transfer-tocustomer/transfer-tocustomer.component';
import { UpdateCustomerNameComponent } from '../../update-customer-name/update-customer-name.component';
import { MergeCustomerComponent } from '../../merge-customer/merge-customer.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplyCodeComponent } from '../../apply-code/apply-code.component';

@Component({
  selector: 'crm-potential-customers',
  templateUrl: './potential-customers.component.html',
  styleUrls: ['./potential-customers.component.less'],
})
export class PotentialCustomersComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  isManager: boolean;
  selected = [];
  loading: boolean;

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

  constructor(injector: Injector, private modal: NzModalService, private cRMCustomerService: CRMCustomerService, private aclService: ACLService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    if (this.aclService.can(['j:经理'])) {
      this.isManager = true;
    }
  }

  onSearch() {
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
    this.selected = [];
    this.loading = true;
    this.cRMCustomerService.getAll(this.searchParams).subscribe((res) => {
      this.customerInfo = res;
      this.loading = false;
    }, e => this.loading = false);
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
      index: 'isDeleted',
      render: 'isDeleted',
      width: 70,
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
      case 'checkbox': {
        this.selected = e.checkbox;
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

  /**
   * 申请改名
   */
  transferCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Transfer customer'),
      nzContent: TransferTocustomerComponent,
      nzComponentParams: {
        customerIds: this.selected.map(e => e.id),
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
        }, 1000);
      }
    });
  }

  /**
   * 申请改名
   */
  applyName() {
    const data = this.selected[0];
    const modal = this.modal.create({
      nzTitle: this.$L('Correct customer name'),
      nzContent: UpdateCustomerNameComponent,
      nzComponentParams: {
        customerId: data.id,
        nameObj: data.name,
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
        }, 1000);
      }
    });
  }

  /**
   * 合并客户
   */
  mergeCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Merge Customer'),
      nzContent: MergeCustomerComponent,
      nzClosable: false,
      nzWidth: 1024,
      nzClassName: 'crm-customer-modal',
      nzComponentParams: { customerSelected: this.selected },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
        }, 1000);
      }
    });
  }


  /**
   * 转移客户到公海池
   */
  bulkTurnCustomerSea() {
    this.loading = true;
    this.cRMCustomerService.bulkTurnCustomerSea({ ids: this.selected.map(e => e.id) }).subscribe(r => {
      this.$message.success(this.$L('Successful operation'));
      this.loading = false;
      this.getAll();
    }, e => this.loading = false);
  }

  /**
   * 申请代码
   */
  applyCode() {
    const modal = this.modal.create({
      nzTitle: this.$L('Apply Code'),
      nzContent: ApplyCodeComponent,
      nzClosable: false,
      nzWidth: 820,
      nzClassName: 'fam-customer-modal',
      nzComponentParams: { customerId: this.selected[0]?.id },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
        }, 1000);
      }
    });
  }

  /**
   * 作废
   */
  setVoid() {
    const id = this.selected.filter(e => !e.isDeleted)[0]?.id;
    if (!id) {
      this.$message.success(this.$L('选择的客户已经被作废，不能重复作废'));
      return;
    }
    this.cRMCustomerService.delete({ id }).subscribe((res) => {
      this.$message.success(this.$L('作废成功!'));
      setTimeout(() => {
        this.getAll();
      }, 1000);
    });
  }

  /**
   * 启用
   */
  recoverDelete() {
    const id = this.selected.filter(e => e.isDeleted)[0]?.id;
    if (!id) {
      this.$message.success(this.$L('选择的客户已经启用，不能重复启用'));
      return;
    }
    this.cRMCustomerService.recoverDelete({ id }).subscribe((res) => {
      this.$message.success(this.$L('启用成功!'));
      setTimeout(() => {
        this.getAll();
      }, 1000);
    });
  }
}
