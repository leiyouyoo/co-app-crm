import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { differenceInCalendarDays } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerType } from '../../models/enum';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { FollowUpRecordListComponent } from '../follow-up-record-list/follow-up-record-list.component';
import { FollowUpRecordComponent } from '../follow-up-record/follow-up-record.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';
import { LocationListComponent } from '../location/location-list/location-list.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { CustomerEmailComponent, InitData } from '../customer-email/customer-email.component';
import { GlobalEventDispatcher } from '@co/cms';

@Component({
  selector: 'crm-customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.less'],
})
export class CustomersInfoComponent extends CoPageBase implements OnInit {
  @ViewChild(ContactListComponent, { static: false }) contactList: ContactListComponent;
  @ViewChild(LocationListComponent, { static: false }) locationList: LocationListComponent;
  @ViewChild(FollowUpRecordListComponent, { static: false }) recordList: FollowUpRecordListComponent;

  customerInfo: any;
  isLoading = false;
  customerId = this.activeRoute.snapshot.params.id;
  recordExpand = true;
  readonly CustomerType = CustomerType;
  today = new Date();
  date = new Date();
  statisticsInfo: any;
  index = 0;

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

  // 获取详情
  getCustomerDetail(id) {
    this.isLoading = true;
    this.crmCustomerService.getDetail({ id }).subscribe(
      (res) => {
        this.isLoading = false;
        this.customerInfo = res;
      },

      () => {
        this.isLoading = false;
      },
    );
  }

  // 编辑完之后重新获取详情
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
    }
  }

  /**
   * 转移客户到公海池
   */
  bulkTurnCustomerSea() {
    this.isLoading = true;
    this.crmCustomerService.bulkTurnCustomerSea({ ids: [this.customerInfo.id] }).subscribe(() => {
      this.$message.success(this.$L('Successful operation'));
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
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
      nzMaskClosable:false,
      nzComponentParams: { customerInfo: this.customerInfo },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.getCustomerDetail(this.customerId);
      }
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
        customerId: this.customerInfo.id,
        nameObj: this.customerInfo,
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.getCustomerDetail(this.customerId);
      }
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
        customerIds: [this.customerInfo.id],
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.$close();
      }
    });
  }

  cspAccountConfig() {
    const modal = this.modal.create({
      nzTitle: this.$L('CSP account configuration'),
      nzContent: CspAccountConfigComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-customer-modal',
      nzMaskClosable:false,
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
        this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
        this.getCustomerDetail(this.customerId);
      }
    });
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
   * 跟进记录
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
    modal.componentInstance.onExpand.subscribe(() => {
      modal.destroy();
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
   * 作废
   */
  setVoid() {
    this.crmCustomerService.delete({ id: this.customerInfo.id }).subscribe(() => {
      this.$message.success(this.$L('Void successfully!'));
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
    });
  }

  /**
   * 启用
   */
  recoverDelete() {
    this.crmCustomerService.recoverDelete({ id: this.customerInfo.id }).subscribe(() => {
      this.$message.success(this.$L('Enable successfully!'));
      this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
    });
  }

  // 选项卡切换更新table
  onSelectChange(e) {
    if (e.index === 0) {
      this.contactList.getContacts(this.customerId);
    } else if (e.index === 1) {
      this.locationList.getLocation(this.customerId);
    }
  }

  /**
   * 右侧tabs选项卡切换事件
   */
  selectedIndexChange(e) {
    this.index = e;
  }

  /**
   * 发布跟进记录回调
   */
  onRecordSuccess(e) {
    // tslint:disable-next-line:no-unused-expression
    e && this.recordList.getCustomerOperationEvent();
  }

  onExpand(e) {
    this.recordExpand = e;
  }

  /**
   * 获取统计信息
   */
  getBusinessStatistics() {
    const year = this.date.getFullYear();
    this.crmCustomerService.getBusinessStatistics({ customerId: this.customerId, year }).subscribe((res) => {
      this.statisticsInfo = res;
    });
  }

  /**
   * 发布日程回调
   */
  onScheduleSuccess(e) {
    // tslint:disable-next-line:no-unused-expression
    e && this.recordList.scheduleList.getAllScheduleForCrm();
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  }

  /**
   * 跳转询价
   */
  onLinkQuote() {
    // 处理时间
    // let requestTime = [];
    // requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    const year = this.date.getFullYear();
    this.$navigate(['/crm/quotes'], {
      queryParams: { custometId: this.customerId, year, _title: this.$L('Quotes') },
    });
  }

  /**
   * 跳转订单
   */
  onLinkBooking() {
    // 处理时间
    const requestTime = [];
    requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    this.$navigate([`fcm/crm-booking`], {
      queryParams: {
        customerId: this.customerId,
        customerName: this.customerInfo.localizationName,
        requestTime,
      },
    });
  }

  /**
   * 跳转我的审批
   */
  onLinkWorkFlow() {
    // //处理时间
    // let requestTime = [];
    // requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    this.$navigate([`wf/application`], {
      queryParams: {
        customerId: this.customerId,
        requestTime: this.date.getFullYear(),
      },
    });
  }

  openEmailModal(): void{
    this.modal.create<CustomerEmailComponent, InitData | undefined | null>({
      nzTitle: '邮件',
      nzWidth: 800,
      nzFooter: null,
      nzContent: CustomerEmailComponent,
      nzComponentParams: {
        fullScreenMode: true,
        customerId: this.customerId
      },
    });
  }
}
