import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Output,
  EventEmitter,
} from '@angular/core';
// import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CreateOrUpdateCustomerInput } from 'projects/crm/src/lib/entity/CreateOrUpdateCustomerInput';
import { CustomerService } from '../../service/customer.service';
import { CreateCustomerComponent } from '@shared/components/create-customer/create-customer.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'crm-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.less'],
})
export class LegalEntityComponent {
  @Input() customerInfo;
  @Output() outCustomerById = new EventEmitter();
  //组件
  isCustomer = false;
  com: any;
  @ViewChild('createCustomer', { static: true, read: ViewContainerRef })
  createCustomer: ViewContainerRef;
  cusLoading = false;
  applicationLoading = false;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private customerService: CustomerService,
    public msessage: NzMessageService,
    public translate: TranslateService,
  ) {}

  onShowLegalEdit() {
    this.isCustomer = true;
    this.createCustomer.clear();
    this.com = this.createCustomer.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(CreateCustomerComponent),
    );

    this.com.instance.initData(this.customerInfo);
    setTimeout(() => {
      this.com.instance.ngScroll();
    }, 500);
  }

  // 显示客户模块
  createCancelCustomer() {
    this.isCustomer = false;
  }

  // 创建客户
  updateCustomer(application?: boolean) {
    this.com.instance.validateForm.controls.customerTaxes.controls.forEach((e) => {
      if (application) {
        e.controls.taxNo.setValidators([Validators.required]);
        e.controls.taxType.setValidators([Validators.required]);
      } else {
        e.controls.taxNo.setValidators([]);
        e.controls.taxType.setValidators([]);
      }
    });
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({block: "end", mode: 'smooth' });
    }, 0);
    if (!this.com.instance.submitForm()) {
      this.msessage.warning(this.translate.instant('Please check the content'));
      return;
    }
    let value = this.com.instance.validateForm.value;
    let tel = value.tel.map((res) => res.tel);

    if (!value.email && !value.fax) {
      this.msessage.warning(this.translate.instant('Please enter email or fax'));
      return;
    }

    // if (value.customerType === 3 && value.forwardingType === null) {
    //   this.msessage.warning(this.translate.instant('Please fill in the freight forwarding type'));
    //   return;
    // }

    // if (this.com.instance.userList && JSON.stringify(this.com.instance.userList) !== '{}') {
    //   if (this.com.instance.userList.items.length > 0) {
    //     this.msessage.warning(this.translate.instant('Duplicate customers already exist'));
    //     return;
    //   }
    // }

    if (application) {
      this.applicationLoading = true;
    } else {
      this.cusLoading = true;
    }

    let entity: CreateOrUpdateCustomerInput = {
      id: this.customerInfo.id,
      name: value.name,
      nameLocalization: value.nameLocalization,
      shortName: value.shortName,
      shortNameLocalization: value.shortNameLocalization,
      address: value.address,
      addressLocalization: value.address,
      tel: tel.toString(),
      fax: value.fax,
      keyWord: value.keyWord,
      cargoCanvassingType: value.cargoCanvassingType,
      forwardingType: value.forwardingType,
      email: value.email,
      customerType: value.customerType,
      isSalesCustomer: value.isSalesCustomer,
      countryId: value.countryId,
      provinceId: value.provinceId,
      cityId: value.cityId,
      incoterms: value.incoterms,
      industry: value.industry,
      description: value.description,
      customerTaxes: value.customerTaxes[0]?.taxType ? value.customerTaxes : null,
    };

    if (application) {
      entity.IsAudit = true;
    }

    this.customerService.customerUpdate(entity).subscribe(
      (res) => {
        this.msessage.success(this.translate.instant('Edited successfully!'));
        this.isCustomer = false;
        this.cusLoading = false;
        this.applicationLoading = false;
        this.createCustomer.clear();
        // this.getCustomerById(this.customerId);
        this.outCustomerById.emit(this.customerInfo);
      },
      (err) => {
        this.cusLoading = false;
        this.applicationLoading = false;
      },
    );
  }
}
