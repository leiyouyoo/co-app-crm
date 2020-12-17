import { Component, OnInit, ViewChild, Renderer2, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService, CRMCreateOrUpdateCustomerInput } from 'apps/crm/app/services/crm';
import { ApplyCusCodeComponent } from '../../../../shared/compoents/customer/apply-cus-code/apply-cus-code.component';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { CreateCustomerComponent } from 'apps/crm/app/shared/compoents/customer/create-customer/create-customer.component';
import { Validators } from '@angular/forms';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.less'],
})
export class CustomerDetailsComponent implements OnInit {
  public customerId: any = this.activeRoute.snapshot.params.id;
  showSave = true;
  customerInfo: any;
  customerType = '';
  cargoCanvassingType = '';
  forwardingType = '';

  click: Subscription;
  contactOrlocation = 0;
  buttonName = this.translate.instant('New');
  //地点添加
  isVisiblelcation = false;

  //判断是否合作伙伴详情页
  isPartnerDetails = false;
  //合作伙伴id
  partnerId: any;

  // 创建客户模块
  cusLoading = false;
  showCustomer = false;
  applicationLoading = false;

  @ViewChild(ApplyCusCodeComponent, { static: true })
  applyCusCodeComponent: ApplyCusCodeComponent;

  com: any;
  @ViewChild('createCustomer', { static: true, read: ViewContainerRef })
  createCustomer: ViewContainerRef;

  width = 600;
  requestAnimationFrameId: number;

  constructor(
    private activeRoute: ActivatedRoute,
    public msessage: NzMessageService,
    public renderer2: Renderer2,
    public router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    public crmCustomerService: CRMCustomerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.getCustomerById();
    // this.createCustomer.initData();
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  // 获取客户详情
  getCustomerById() {
    this.crmCustomerService
      .get({
        id: this.customerId,
      })
      .subscribe((res: any) => {
        this.customerInfo = res;
      });
  }

  // 切换合作伙伴列表与详情
  runParent(id?: any) {
    if (id) {
      this.partnerId = id;
    }

    this.isPartnerDetails = !this.isPartnerDetails;
  }

  // 返回上一级
  onBack() {
    history.go(-1);
  }

  tabSetchange() {
    this.isPartnerDetails = false;
  }

  editCustomer(bottom = false) {
    this.showCustomer = true;
    this.createCustomer.clear();
    this.com = this.createCustomer.createComponent(this.componentFactoryResolver.resolveComponentFactory(CreateCustomerComponent));
    this.com.instance.initData(this.customerInfo);
    setTimeout(() => {
      this.com.instance.ngScroll();
      if (bottom) {
        this.checkValid();
        this.com.instance.ngScrollBottom();

        setTimeout(() => {
          this.com.instance.i = 4;
        }, 0);
      }
    }, 0);
  }

  createCancel() {
    this.showSave = true;
    this.createCustomer.clear();
    this.showCustomer = false;
  }

  cusItemData: any = {};
  ShowApplyModal() {
    this.crmCustomerService
      .getAll({
        maxResultCount: 20,
        skipCount: 0,
        searchText: null,
        includeTaxes: true,
        includeShareOwner: true,
        customerId: this.customerId,
        isOwn: false,
      })
      .subscribe((res: any) => {
        this.cusItemData = res.items ? res.items[0] : {};
        this.applyCusCodeComponent.showModal();
      });
  }

  refreshData() {
    this.getCustomerById();
  }

  // 校验认证
  checkValid() {
    this.com.instance.validateForm.controls.customerTaxes.controls.forEach((e) => {
      e.controls.taxNo.setValidators([Validators.required]);
      e.controls.taxType.setValidators([Validators.required]);
    });
    this.com.instance.submitForm();
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
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.com.instance.submitForm()) {
      return;
    }
    let value = this.com.instance.validateForm.value;
    let tel = value.tel.map((res) => res.tel);

    if (!value.email && !value.fax) {
      this.msessage.warning(this.translate.instant('Please enter email or fax'));
      return;
    }

    if (application) {
      this.applicationLoading = true;
    } else {
      this.cusLoading = true;
    }

    let entity: CRMCreateOrUpdateCustomerInput = {
      id: this.customerInfo.id,
      name: value.name,
      nameLocalization: value.nameLocalization,
      shortName: value.shortName,
      shortNameLocalization: value.shortNameLocalization,
      address: value.address,
      addressLocalization: value.addressLocalization,
      tel: tel.toString(),
      fax: value.fax,
      keyWord: value.keyWord,
      email: value.email,
      customerType: value.customerType,
      isSalesCustomer: value.isSalesCustomer,
      countryId: value.countryId,
      provinceId: value.provinceId,
      cityId: value.cityId,
      incoterms: value.incoterms,
      industry: value.industry,
      description: value.description,
      customerTaxes: value.customerTaxes[0]?.taxType != null ? value.customerTaxes : null,
    };

    if (application) {
      entity.isAudit = true;
    }

    this.crmCustomerService.update(entity).subscribe(
      (res) => {
        this.msessage.success(this.translate.instant('Edited successfully!'));
        this.showCustomer = false;
        this.cusLoading = false;
        this.applicationLoading = false;
        this.getCustomerById();
      },
      (err) => {
        this.cusLoading = false;
        this.applicationLoading = false;
      },
    );
  }

  showAuth() {
    this.showSave = false;
    this.editCustomer(true);
  }

  closeDrawer() {
    this.createCancel();
  }
}
