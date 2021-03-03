import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCodeComponent } from '../apply-code/apply-code.component';
import { UpdateCustomerNameComponent } from '../update-customer-name/update-customer-name.component';
import { TransferTocustomerComponent } from '../transfer-tocustomer/transfer-tocustomer.component';
import { CspAccountConfigComponent } from '../csp-account-config/csp-account-config.component';
import { CoPageBase } from '@co/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'crm-potentailcustomer-info',
  templateUrl: './potentailcustomer-info.component.html',
  styleUrls: ['./potentailcustomer-info.component.less'],
})
export class PotentailcustomerInfoComponent extends CoPageBase implements OnInit {
  index = 0;
  customerInfo: any;
  isLoading = false;
  customerId = this.activeRoute.snapshot.params.id;

  constructor(
    private crmCustomerService: CRMCustomerService,
    private modal: NzModalService,
    injector: Injector,
    public activeRoute: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    debugger;
    this.getCustomerDetail(this.customerId);
  }

  onIndexChange(e) {
    this.index = e;
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
    }
  }

  /**
   * 转移客户到公海池
   */
  bulkTurnCustomerSea() {
    this.crmCustomerService.bulkTurnCustomerSea({ ids: [this.customerInfo.id] }).subscribe((r) => {
      this.$message.success(this.$L('Successful operation'));
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
