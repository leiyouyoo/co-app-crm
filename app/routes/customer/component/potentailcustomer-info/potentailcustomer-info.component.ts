import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { CoPageBase } from '@co/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CRMCustomerDetailDto } from '../../../../services/crm';
import { PotentailcustomerDetailComponent } from './potentailcustomer-detail/potentailcustomer-detail.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { FollowUpRecordListComponent } from '../follow-up-record-list/follow-up-record-list.component';
import { CustomerType } from '../../models/enum';

@Component({
  selector: 'crm-potentailcustomer-info',
  templateUrl: './potentailcustomer-info.component.html',
  styleUrls: ['./potentailcustomer-info.component.less'],
})
export class PotentailcustomerInfoComponent extends CoPageBase implements OnInit {
  @ViewChild(FollowUpRecordListComponent, { static: false }) recordList: FollowUpRecordListComponent;
  @ViewChild(PotentailcustomerDetailComponent, { static: false }) customerDetail!: PotentailcustomerDetailComponent;
  index = 0;
  customerInfo: CRMCustomerDetailDto;
  isLoading = false;
  stepLoading = false;
  customerId = this.activeRoute.snapshot.params.id;
  recordExpand = true;
  readonly CustomerType = CustomerType;
  constructor(
    private crmCustomerService: CRMCustomerService,
    private modal: NzModalService,
    injector: Injector,
    public activeRoute: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCustomerDetail(this.customerId);
  }

  onIndexChange(e) {
    e == this.index && --e;
    this.stepLoading = true;
    this.crmCustomerService.upateLeadTrackingPhase({ leadTrackingPhase: e, id: this.customerId }).subscribe(
      (r) => {
        this.index = e;
        this.customerInfo.leadTrackingPhase = e;
        this.customerInfo = { ...this.customerInfo };
        this.stepLoading = false;
        this.customerDetail.cdr.detectChanges();
      },
      (e) => (this.stepLoading = false),
    );
  }

  //获取详情
  getCustomerDetail(id) {
    this.isLoading = true;
    this.crmCustomerService.getDetail({ id: id }).subscribe(
      (res) => {
        this.isLoading = false;
        this.customerInfo = res;
        this.index = this.customerInfo.leadTrackingPhase;
      },
      (error) => {
        this.isLoading = false;
      },
    );
  }

  //编辑完之后重新获取详情
  getDetail(e) {
    if (e) {
      this.getCustomerDetail(this.customerId);
    }
  }

  onActionChange(type) {
    switch (type) {
      case 'applyCode': {
        this.applyCode();
        break;
      }
      case 'applyName': {
        this.applyName();
        break;
      }
      case 'transferCustomer': {
        this.transferCustomer();
        break;
      }
      case 'bulkTurnCustomerSea': {
        this.bulkTurnCustomerSea();
        break;
      }
      case 'cspAccountConfig': {
        this.cspAccountConfig();
        break;
      }
      case 'setVoid': {
        this.setVoid();
        break;
      }
      case 'recoverDelete': {
        this.recoverDelete();
        break;
      }
    }
  }

  /**
   * 转移客户到公海池
   */
  bulkTurnCustomerSea() {
    this.isLoading = true;
    this.crmCustomerService.bulkTurnCustomerSea({ ids: [this.customerId] }).subscribe((r) => {
      this.$message.success(this.$L('Successful operation'));
      this.$close();
    });
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
      nzComponentParams: { customerInfo: this.customerInfo },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * 申请改名
   */
  applyName() {
    const modal = this.modal.create({
      nzTitle: this.$L('Correct customer name'),
      nzContent: UpdateCustomerNameComponent,
      nzComponentParams: {
        customerId: this.customerId,
        nameObj: this.customerInfo,
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * 转让客户
   */
  transferCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Transfer customer'),
      nzContent: TransferTocustomerComponent,
      nzComponentParams: {
        customerIds: [this.customerId],
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.$close();
    });
  }

  cspAccountConfig() {
    const modal = this.modal.create({
      nzTitle: this.$L('CSP account configuration'),
      nzContent: CspAccountConfigComponent,
      nzComponentParams: {
        customerId: this.customerId,
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * 作废
   */
  setVoid() {
    this.isLoading = true;
    this.crmCustomerService.delete({ id: this.customerId }).subscribe(
      (res) => {
        this.isLoading = false;
        this.getCustomerDetail(this.customerId);
        this.$message.success(this.$L('Void successfully!'));
      },
      (e) => (this.isLoading = false),
    );
  }

  /**
   * 启用
   */
  recoverDelete() {
    this.isLoading = true;
    this.crmCustomerService.recoverDelete({ id: this.customerId }).subscribe(
      (res) => {
        this.isLoading = false;
        this.getCustomerDetail(this.customerId);
        this.$message.success(this.$L('Enable successfully!'));
      },
      (e) => (this.isLoading = false),
    );
  }

  /**
   * 新增联系人
   */
  addContact() {
    const modal = this.modal.create({
      nzTitle: this.$L('Add'),
      nzContent: ContactDetailComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res.isSucccess) {
        // this.st.load();
        this.getCustomerDetail(this.customerId);
      }
    });
  }

  /**
   * 新增地址
   */
  addLocation() {
    const modal = this.modal.create({
      nzTitle: this.$L('Add'),
      nzContent: LocationDetailComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.getCustomerDetail(this.customerId);
      }
    });
  }

  /**
   * 发布跟进记录回调
   */
  onRecordSuccess(e) {
    e && this.recordList.getCustomerOperationEvent();
  }

  onExpand(e) {
    this.recordExpand = e;
  }
}
