import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { ACLService } from '@co/acl';
import { TransferTocustomerComponent } from '../../transfer-tocustomer/transfer-tocustomer.component';
import { UpdateCustomerNameComponent } from '../../update-customer-name/update-customer-name.component';
import { MergeCustomerComponent } from '../../merge-customer/merge-customer.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApplyCodeComponent } from '../../apply-code/apply-code.component';
import { customerType } from '../../../models/enum';
import { ApplyChangePhoneComponent } from '../../apply-change-phone/apply-change-phone.component';
import { GlobalEventDispatcher } from '@co/cms';
const addlabel = (obj) => {
  const result = {};
  for (const objKey in obj) {
    result[objKey] = obj[objKey];
  }
  return result;
};
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
  @Output() onCreateCustomer = new EventEmitter<any>();
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

  constructor(
    injector: Injector,
    private modal: NzModalService,
    private cRMCustomerService: CRMCustomerService,
    private aclService: ACLService,
    private globalEventDispatcher: GlobalEventDispatcher,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    if (this.aclService.can(['j:??????'])) {
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
    this.cRMCustomerService.getAllList(this.searchParams).subscribe(
      (res) => {
        this.customerInfo = res;
        this.loading = false;
      },
      (e) => (this.loading = false),
    );
  }

  /**
   * ????????????????????????????????????
   */
  onchangeCustomer(e) {
    this.searchParams.type = e;
    this.st.load();
  }

  columns: STColumn[] = [
    // {
    //   title: 'NO',
    //   index: '',
    //   type: 'no',
    //   width: 100,
    // },
    {
      title: 'Code',
      index: 'code',
      width: 100,
    },
    {
      title: 'Name(English)',
      index: 'contactName',
      width: 100,
      sort: 'Name',
    },
    {
      title: 'Name(Chinese)',
      index: 'localizationContactName',
      width: 100,
    },
    {
      title: 'Prospect status',
      index: 'leadTrackingPhase',
      render: 'leadTrackingPhase',
      sort: 'LeadTrackingPhase',
      width: 100,
    },
    {
      title: 'Approval Status',
      index: 'examineState',
      render: 'examineState',
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
    },
    {
      title: 'FAX',
      index: 'fax',
      width: 80,
    },
    {
      title: 'Country',
      index: 'country',
      width: 80,
      sort: 'country',
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
      type: 'enum',
      enum: addlabel(customerType) as any,
      width: 80,
    },
    {
      title: 'Creation Time',
      index: 'creationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
      sort: 'creationTime',
    },
    {
      title: 'Update Time',
      index: 'lastModificationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
      sort: 'LastModificationTime',
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
    {
      title: 'Reason for rejection',
      index: 'refuseReason',
      width: 70,
      sort: 'refuseReason',
    },
    // {
    //   title: 'Customer Status',
    //   index: 'approvelStatus',
    //   width: 80,
    // },
    {
      title: 'Is the CSP account open',
      index: 'isRegistered',
      render: 'isRegistered',
      width: 100,
    },
    {
      type: 'action',
      fixed: 'right',
      width: 100,
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
      title: 'Country',
      index: 'country',
      width: 80,
      sort: 'Country',
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
      sort: 'creationTime',
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

  //table????????????
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
        break;
      }
      case 'sort': {
        const map = {
          descend: 'desc',
          ascend: 'asc',
        };
        const sortValue = map[e.sort.value];
        this.searchParams.Sorting = e.sort.column.indexKey + ' ' + sortValue;
        this.getAll();
        break;
      }
    }
  }

  //??????????????????
  onShowCustomerDetail(data) {
    this.customerDetail.emit(data);
  }

  /**
   * ????????????
   */
  createCustomer() {
    this.onCreateCustomer.emit();
  }

  /**
   * ????????????
   */
  transferCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Transfer customer'),
      nzContent: TransferTocustomerComponent,
      nzComponentParams: {
        customerIds: this.selected.map((e) => e.id),
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        }, 1000);
      }
    });
  }

  /**
   * ????????????
   */
  applyName() {
    const data = this.selected[0];
    const modal = this.modal.create({
      nzTitle: this.$L('Correct customer name'),
      nzContent: UpdateCustomerNameComponent,
      nzComponentParams: {
        customerId: data.id,
        nameObj: data,
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        }, 1000);
      }
    });
  }

  /**
   * ???????????????
   */
  applyPhone() {
    const data = this.selected[0];
    const modal = this.modal.create({
      nzTitle: this.$L('Apply Change Phone'),
      nzContent: ApplyChangePhoneComponent,
      nzComponentParams: {
        customerInfo: data,
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        }, 1000);
      }
    });
  }

  /**
   * ????????????
   */
  mergeCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Merge Customer'),
      nzContent: MergeCustomerComponent,
      nzClosable: false,
      nzWidth: 1024,
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzComponentParams: { customerSelected: this.selected },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        }, 1000);
      }
    });
  }

  /**
   * ????????????????????????
   */
  bulkTurnCustomerSea() {
    this.loading = true;
    this.cRMCustomerService.bulkTurnCustomerSea({ ids: this.selected.map((e) => e.id) }).subscribe(
      (r) => {
        this.$message.success(this.$L('Successful operation'));
        this.loading = false;
        this.getAll();
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      },
      (e) => (this.loading = false),
    );
  }

  /**
   * ????????????
   */
  applyCode() {
    const modal = this.modal.create({
      nzTitle: this.$L('Apply Code'),
      nzContent: ApplyCodeComponent,
      nzClosable: false,
      nzWidth: 820,
      nzClassName: 'fam-customer-modal',
      nzMaskClosable:false,
      nzComponentParams: { customerInfo: this.selected[0] },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((e) => {
      if (e) {
        setTimeout(() => {
          this.getAll();
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        }, 1000);
      }
    });
  }

  /**
   * ??????
   */
  setVoid() {
    const id = this.selected.filter((e) => !e.isDeleted)[0]?.id;
    if (!id) {
      this.$message.success(this.$L('???????????????????????????????????????????????????'));
      return;
    }
    this.cRMCustomerService.delete({ id }).subscribe((res) => {
      this.$message.success(this.$L('Void successfully!'));
      setTimeout(() => {
        this.getAll();
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      }, 1000);
    });
  }

  /**
   * ??????
   */
  recoverDelete() {
    const id = this.selected.filter((e) => e.isDeleted)[0]?.id;
    if (!id) {
      this.$message.success(this.$L('????????????????????????????????????????????????'));
      return;
    }
    this.cRMCustomerService.recoverDelete({ id }).subscribe((res) => {
      this.$message.success(this.$L('Enable successfully!'));
      setTimeout(() => {
        this.getAll();
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      }, 1000);
    });
  }
}
