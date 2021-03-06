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
import { differenceInCalendarDays } from 'date-fns';
import { FollowUpRecordComponent } from '../follow-up-record/follow-up-record.component';
import { GlobalEventDispatcher } from '@co/cms';

@Component({
  selector: 'crm-potentailcustomer-info',
  templateUrl: './potentailcustomer-info.component.html',
  styleUrls: ['./potentailcustomer-info.component.less'],
})
export class PotentailcustomerInfoComponent extends CoPageBase implements OnInit {
  @ViewChild(FollowUpRecordListComponent, { static: false }) recordList: FollowUpRecordListComponent;
  @ViewChild(PotentailcustomerDetailComponent, { static: false }) customerDetail!: PotentailcustomerDetailComponent;
  index = 0;
  selectIndex = 0;
  customerInfo: CRMCustomerDetailDto;
  isLoading = false;
  stepLoading = false;
  customerId = this.activeRoute.snapshot.params.id;
  recordExpand = true;
  readonly CustomerType = CustomerType;
  today = new Date();
  date = new Date();
  statisticsInfo: any;

  constructor(
    private crmCustomerService: CRMCustomerService,
    private modal: NzModalService,
    injector: Injector,
    public activeRoute: ActivatedRoute,
    public globalEventDispatcher: GlobalEventDispatcher,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCustomerDetail(this.customerId);
    this.getBusinessStatistics();
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

    /**
   * ????????????
   */
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

     /**
   * ?????????????????????????????????
   */
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
   * ????????????????????????
   */
  bulkTurnCustomerSea() {
    this.isLoading = true;
    this.crmCustomerService.bulkTurnCustomerSea({ ids: [this.customerId] }).subscribe((r) => {
      this.$message.success(this.$L('Successful operation'));
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      this.$close();
    });
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
      nzComponentParams: { customerInfo: this.customerInfo },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * ????????????
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
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * ????????????
   */
  transferCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Transfer customer'),
      nzContent: TransferTocustomerComponent,
      nzComponentParams: {
        customerIds: [this.customerId],
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
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
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((r) => {
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
      this.getCustomerDetail(this.customerId);
    });
  }

  /**
   * ??????
   */
  setVoid() {
    this.isLoading = true;
    this.crmCustomerService.delete({ id: this.customerId }).subscribe(
      (res) => {
        this.isLoading = false;
        this.getCustomerDetail(this.customerId);
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.$message.success(this.$L('Void successfully!'));
      },
      (e) => (this.isLoading = false),
    );
  }

  /**
   * ??????
   */
  recoverDelete() {
    this.isLoading = true;
    this.crmCustomerService.recoverDelete({ id: this.customerId }).subscribe(
      (res) => {
        this.isLoading = false;
        this.getCustomerDetail(this.customerId);
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.$message.success(this.$L('Enable successfully!'));
      },
      (e) => (this.isLoading = false),
    );
  }

  /**
   * ????????????
   */
  addFollowUpRecord() {
    const modal = this.modal.create({
      nzTitle: this.$L('Add'),
      nzContent: FollowUpRecordComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSuccess.subscribe((res) => {
      this.onRecordSuccess(res);
      modal.destroy();
    });
    modal.componentInstance.onExpand.subscribe((res) => {
      modal.destroy();
    });
  }

  /**
   * ???????????????
   */
  addContact() {
    const modal = this.modal.create({
      nzTitle: this.$L('Add'),
      nzContent: ContactDetailComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-contact-detail',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res.isSucccess) {
        // this.st.load();
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.getCustomerDetail(this.customerId);
      }
    });
  }

  /**
   * ????????????
   */
  addLocation() {
    const modal = this.modal.create({
      nzTitle: this.$L('Add'),
      nzContent: LocationDetailComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.getCustomerDetail(this.customerId);
      }
    });
  }

  /**
   * ????????????????????????
   */
  onRecordSuccess(e) {
    e && this.recordList.getCustomerOperationEvent();
  }

  /**
   * ??????tabs?????????????????????
   */
  selectedIndexChange(e) {
    this.selectIndex = e;
  }

  onExpand(e) {
    this.recordExpand = e;
  }

  onDateChange(e) {
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  /**
   * ??????????????????
   */
     onScheduleSuccess(e) {
      e && this.recordList.scheduleList.getAllScheduleForCrm();
    }
  /**
   * ??????????????????
   */
  getBusinessStatistics() {
    const year = this.date.getFullYear();
    this.crmCustomerService.getBusinessStatistics({ customerId: this.customerId, year: year }).subscribe((res) => {
      this.statisticsInfo = res;
    });
  }

  /**
   * ????????????
   */
  onLinkQuote() {
    //????????????
    const year = this.date.getFullYear()+ '';
    // let requestTime = [];
    // requestTime.push(new Date(this.date.getFullYear + '-01-01'), new Date(this.date.getFullYear + '-12-31'));
    this.$navigate(['/crm/quotes'], {
      queryParams: { custometId: this.customerId, year: year, _title: this.$L('Quotes') },
    });
  }

  /**
   * ????????????
   */
  toFCMBooking() {
    //????????????
    let requestTime = [];
    requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    this.$navigate([`fcm/crm-booking`], {
      queryParams: {
        customerId: this.customerId,
        customerName: this.customerInfo.localizationName,
        requestTime: requestTime,
      },
    });
  }

 /**
   * ??????????????????
   */
  onLinkWorkFlow(){
    // //????????????
    // let requestTime = [];
    // requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    this.$navigate([`wf/application`], {
      queryParams: {
        customerId: this.customerId,
        requestTime: this.date.getFullYear(),
      },
    });
}
}
