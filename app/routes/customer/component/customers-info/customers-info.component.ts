import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { CoPageBase } from '@co/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { LocationListComponent } from '../location/location-list/location-list.component';
import { FollowUpRecordListComponent } from '../follow-up-record-list/follow-up-record-list.component';
import { CustomerType } from '../../models/enum';
import { differenceInCalendarDays } from 'date-fns';
import { FollowUpRecordComponent } from '../follow-up-record/follow-up-record.component';

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
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCustomerDetail(this.customerId);
    this.getBusinessStatistics();
  }

  //获取详情
  getCustomerDetail(id) {
    this.isLoading = true;
    this.crmCustomerService.getDetail({ id: id }).subscribe(
      (res) => {
        this.isLoading = false;
        this.customerInfo = res;
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
    }
  }

  /**
   * 转移客户到公海池
   */
  bulkTurnCustomerSea() {
    this.isLoading = true;
    this.crmCustomerService.bulkTurnCustomerSea({ ids: [this.customerInfo.id] }).subscribe((r) => {
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
    component.onSubmitted.subscribe((res) => {
      if (res) {
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
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
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
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
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
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.onSubmitted.subscribe((res) => {
      if (res) {
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
   * 作废
   */
  setVoid() {
    this.crmCustomerService.delete({ id: this.customerInfo.id }).subscribe((res) => {
      this.$message.success(this.$L('Void successfully!'));
    });
  }

  /**
   * 启用
   */
  recoverDelete() {
    this.crmCustomerService.recoverDelete({ id: this.customerInfo.id }).subscribe((res) => {
      this.$message.success(this.$L('Enable successfully!'));
    });
  }

  //选项卡切换更新table
  onSelectChange(e) {
    if (e.index == 0) {
      this.contactList.getContacts(this.customerId);
    } else if (e.index == 1) {
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
    e && this.recordList.getCustomerOperationEvent();
  }

  onExpand(e) {
    this.recordExpand = e;
  }

  /**
   * 获取统计信息
   */
  getBusinessStatistics() {
    const year = this.date.getFullYear() + '';
    this.crmCustomerService.getBusinessStatistics({ customerId: this.customerId, year: year }).subscribe((res) => {
      this.statisticsInfo = res;
    });
  }

  /**
   * 发布日程回调
   */
  onScheduleSuccess(e) {
    e && this.recordList.scheduleList.getAllScheduleForCrm();
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  /**
   * 跳转询价
   */
  onLinkQuote() {
    //处理时间
    // let requestTime = [];
    // requestTime.push(new Date(this.date.getFullYear() + '-01-01'), new Date(this.date.getFullYear() + '-12-31'));
    const year = this.date.getFullYear();
    this.$navigate(['/crm/quotes'], {
      queryParams: { custometId: this.customerId, year: year, _title: this.$L('Quotes') },
    });
  }

  /**
   * 跳转订单
   */
  onLinkBooking() {
    //处理时间
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
   * 跳转我的审批
   */
  onLinkWorkFlow(){
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
}
