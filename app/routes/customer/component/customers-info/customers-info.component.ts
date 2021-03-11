import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMContactService, CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { CoConfigManager, CoPageBase } from '@co/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { LocationListComponent } from '../location/location-list/location-list.component';
import { CRMCustomerOperationEventService, CRMTraceLogService } from '../../../../services/crm';
import { NzUploadFile } from 'ng-zorro-antd/upload/interface';

@Component({
  selector: 'crm-customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.less'],
})
export class CustomersInfoComponent extends CoPageBase implements OnInit {
  @ViewChild(ContactListComponent, { static: false }) contactList: ContactListComponent;
  @ViewChild(LocationListComponent, { static: false }) locationList: LocationListComponent;
  customerInfo: any;
  isLoading = false;
  customerId = this.activeRoute.snapshot.params.id;
  traceLogList = [];
  param = {
    customerId: this.customerId,
    searchKey: null,
    businessType: 0,
    maxResultCount: 10,
    skipCount: 0,
    totalCount: 0,
  };
  downLoadUrl = CoConfigManager.getValue('downloadUrl');
  previewImage: string | undefined = '';
  previewVisible = false;
  logLoading = false;
  refreshLogLoading = false;

  constructor(
    private crmCustomerService: CRMCustomerService,
    private modal: NzModalService,
    injector: Injector,
    public activeRoute: ActivatedRoute,
    private crmCustomerOperationEventService: CRMCustomerOperationEventService,
    private crmTraceLogService: CRMTraceLogService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCustomerDetail(this.customerId);
    this.getCustomerOperationEvent();
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
      nzComponentParams: { customerId: this.customerInfo.id },
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
   * 发布跟进记录回调
   */
  onRecordSuccess(e) {
    e && this.getCustomerOperationEvent();
  }

  /**
   * 获取跟进记录详情
   */
  getLogDetail(item) {
    item.isShow = !item.isShow;
    if (item.detail) {
      return;
    }
    item.loading = true;
    this.crmTraceLogService.get({ id: item.businessId }).subscribe(r => {
      item.loading = false;
      item.detail = r;
    }, e => item.loading = false);
  }

  /**
   * 获取跟进记录
   */
  getCustomerOperationEvent(isNext = false) {
    this.crmCustomerOperationEventService.getAll(this.param).subscribe(r => {
      if (isNext) {
        this.traceLogList = this.traceLogList.concat(r.items);
      } else {
        this.traceLogList = r.items;
      }
      this.logLoading = false;
      this.refreshLogLoading = false;
      this.param.totalCount = r.totalCount;
      console.log(this.traceLogList);
    }, e => {
      this.logLoading = false;
      this.refreshLogLoading = false;
    });
  }

  getImgUrl(pic: any) {
    return this.downLoadUrl + `?FileId=${pic.fileId}&Handler=image`;
  }

  /**
   * 图片预览
   */
  handlePreview = async (item) => {
    this.previewImage = this.getImgUrl(item);
    this.previewVisible = true;
  };

  /**
   * 获取下一页事件
   */
  getNextLog() {
    this.param.skipCount++;
    this.logLoading = true;
    this.getCustomerOperationEvent(true);
  }

  /**
   * 搜索事件
   */
  searchLog() {
    this.param.skipCount = 0;
    this.param.totalCount = 0;
    this.traceLogList = [];
    this.getCustomerOperationEvent();
  }
}
