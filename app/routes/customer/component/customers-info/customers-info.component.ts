import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMContactService, CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { CoPageBase } from '@co/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { LocationDetailComponent } from '../location/location-detail/location-detail.component';

@Component({
  selector: 'crm-customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.less'],
})
export class CustomersInfoComponent extends CoPageBase implements OnInit {
  customerInfo: any;
  isLoading = false;
  customerId = this.activeRoute.snapshot.params.id;

  constructor(
    private crmCustomerService: CRMCustomerService,
    private modal: NzModalService,
    injector: Injector,
    public activeRoute: ActivatedRoute,
    private contactService: CRMContactService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getCustomerDetail(this.customerId);
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
  }

  cspAccountConfig() {
    const modal = this.modal.create({
      nzTitle: this.$L('CSP账号配置'),
      nzContent: CspAccountConfigComponent,
      nzComponentParams: {
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-customer-modal',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
  }

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
      this.$message.success(this.$L('作废成功!'));
    });
  }

  /**
   * 启用
   */
  recoverDelete() {
    this.crmCustomerService.recoverDelete({ id: this.customerInfo.id }).subscribe((res) => {
      this.$message.success(this.$L('启用成功!'));
    });
  }
}
