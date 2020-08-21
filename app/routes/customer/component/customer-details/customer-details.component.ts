import { Component, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

import { TranslateService } from '@ngx-translate/core';
import { LegalEntityComponent } from '../legal-entity/legal-entity.component';
import { ContactsListComponent } from '../contact/contacts-list/contacts-list.component';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { ApplyCusCodeComponent } from '../../../../shared/compoents/customer/apply-cus-code/apply-cus-code.component';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.less'],
})
export class CustomerDetailsComponent implements OnInit {
  public customerId: any = this.activeRoute.snapshot.params.id;

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

  @ViewChild(LegalEntityComponent, { static: true })
  legalEntityComponent: LegalEntityComponent;

  @ViewChild(ContactsListComponent, { static: true })
  contactsListComponent: ContactsListComponent;

  @ViewChild(ApplyCusCodeComponent, { static: true })
  applyCusCodeComponent: ApplyCusCodeComponent;

  constructor(
    private activeRoute: ActivatedRoute,
    public msessage: NzMessageService,
    public renderer2: Renderer2,
    public router: Router,
    public crmCustomerService: CRMCustomerService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.getCustomerById();
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

  editCustomer() {
    this.legalEntityComponent.onShowLegalEdit();
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
}
