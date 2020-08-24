import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService } from '../../../../services/crm/customer.service';
@Component({
  selector: 'cus-code-item',
  templateUrl: './cus-code-item.component.html',
  styleUrls: ['./cus-code-item.component.less'],
})
export class CusCodeItemComponent implements OnInit {
  @Input() datas: any = {};
  @Output() closeModal = new EventEmitter();

  dataSet: any = [];
  data: any;
  hasTaxes: boolean = false;
  formCheck: boolean = false;
  canEdit: boolean = false;

  constructor(private crmCustomerService: CRMCustomerService, private message: NzMessageService, public translate: TranslateService) {}

  ngOnChanges() {
    this.data = this.datas;
    this.canEdit = this.datas.state >= 2 ? true : false;
    this.formCheck = false;
    this.datas.customerTaxes &&
      this.datas.customerTaxes.forEach((e) => {
        e.taxType = String(e.taxType);
      });
    this.hasTaxes = this.data.customerTaxes && this.data.customerTaxes.length > 0 ? true : false;
    this.initBasicTable();
  }

  ngOnInit(): void {}

  initBasicTable() {
    this.dataSet = [
      {
        owner: this.data.status != 2 ? this.data.owner : null,
        sharedUsers: this.data.status == 2 ? this.data.sharedUsers : null,
        country: this.data.country ? this.data.country : null,
        code: this.data.code ? this.data.code : null,
        shortName: this.data.shortName ? this.data.shortName : null,
        localizationShortName: this.data.localizationShortName ? this.data.localizationShortName : null,
        tel: this.data.tel ? this.data.tel : null,
      },
    ];
  }

  addSW() {
    if (this.data.customerTaxes.length < 4) {
      for (var i = 0; i <= 3; i++) {
        if (this.data.customerTaxes.length == 0) {
          this.data.customerTaxes.push({
            taxType: '1',
            taxNo: null,
          });
          break;
        } else {
          if (
            !this.data.customerTaxes.some((e) => {
              return e.taxType == [i];
            })
          ) {
            this.data.customerTaxes.push({
              taxType: i.toString(),
              taxNo: null,
            });
            break;
          }
        }
      }
    }
  }

  //申请
  applyCus() {
    if (this.judgecustomerTaxes()) {
      return;
    }

    let parame = {
      customerId: this.data.id,
      customerTaxes: this.data.customerTaxes[0]?.taxType ? this.data.customerTaxes : null,
    };

    this.crmCustomerService.auditCustomer(parame).subscribe((res) => {
      this.message.success(this.translate.instant('Save successfully'));
      this.closeModal.emit();
    });
  }

  // 跟进
  followCus() {
    if (
      this.data.customerTaxes.length > 0 &&
      this.data.customerTaxes.some((e) => {
        return e.taxNo == null || e.taxNo == '';
      })
    ) {
      this.formCheck = true;
      return;
    }

    let parame = {
      customerId: this.data.id,
      customerTaxes: this.data.customerTaxes[0]?.taxType ? this.data.customerTaxes : null,
    };
    this.crmCustomerService.followCustomer(parame).subscribe((res) => {
      this.message.success(this.translate.instant("Follow up successfully, please check the customer at 'Shared customer'"));
      this.closeModal.emit();
    });
  }

  //跟进并申请
  followAndApply() {
    if (this.judgecustomerTaxes()) {
      return;
    }

    let parame = {
      customerId: this.data.id,
      applyForAudit: true,
      customerTaxes: this.data.customerTaxes[0]?.taxType ? this.data.customerTaxes : null,
    };
    this.crmCustomerService.followCustomer(parame).subscribe((res) => {
      this.message.success(this.translate.instant('Save successfully'));
      this.closeModal.emit();
    });
  }

  //认领
  claimCus() {
    if (
      this.data.customerTaxes.length > 0 &&
      this.data.customerTaxes.some((e) => {
        return e.taxNo == null || e.taxNo == '';
      })
    ) {
      this.formCheck = true;
      return;
    }

    let parame = {
      customerId: this.data.id,
      customerTaxes: this.data.customerTaxes[0]?.taxType ? this.data.customerTaxes : null,
    };
    this.crmCustomerService.claimCustomer(parame).subscribe((res) => {
      this.message.success(this.translate.instant("Claim successfully, please check the customer at 'potential customer'"));
      this.closeModal.emit();
    });
  }

  // 认领并申请
  claimAndApplyCus() {
    if (this.judgecustomerTaxes()) {
      return;
    }

    let parame = {
      customerId: this.data.id,
      applyForAudit: true,
      customerTaxes: this.data.customerTaxes[0]?.taxType ? this.data.customerTaxes : null,
    };
    this.crmCustomerService.claimCustomer(parame).subscribe((res) => {
      this.message.success(this.translate.instant('Save successfully'));
      this.closeModal.emit();
    });
  }

  deleteSW(idx) {
    this.data.customerTaxes.splice(idx, 1);
  }

  judgecustomerTaxes() {
    if (this.hasTaxes == false) {
      return true;
    } // 税务登记的开关要打开
    this.formCheck = true; // 开启表单验证

    // 税务登记数据不能为空
    if (this.data.customerTaxes.length == 0 || !this.data.customerTaxes) {
      this.message.warning(this.translate.instant('please enter the Tax registration number'));
      this.hasTaxes = true;
      this.data.customerTaxes.length == 0 && this.addSW();
      return true;
    }

    // 税务登记号为空拦截，显示验证信息
    if (
      this.data.customerTaxes.some((e) => {
        return e.taxNo == null || e.taxNo == '';
      })
    ) {
      return true;
    }
  }

  isRepeat(arr) {
    let result = [];
    if (arr && arr.length > 0) {
      arr.forEach((e) => {
        result.push(e.taxType);
      });

      for (var i = 0; i < result.length; i++) {
        if (result.indexOf(result[i]) != i) {
          return true;
        }
      }
    }
  }

  optionCanSelect(value) {
    let result: boolean = false;
    this.data.customerTaxes.forEach((e) => {
      if (e.taxType == value) {
        result = true;
      }
    });
    return result;
  }

  showApplyBtn: boolean = false;
  certificationAgain() {
    this.canEdit = false;
    this.showApplyBtn = true;
  }
}
