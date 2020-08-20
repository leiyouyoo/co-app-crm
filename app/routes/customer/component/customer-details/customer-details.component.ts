import { Component, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Subscription } from 'rxjs';
import { CustomerLifeCycleStatus } from 'projects/crm/src/lib/entity/CustomerLifeCycleStatus';
import { ForwardingType } from 'projects/crm/src/lib/entity/ForwardingType';
import { NzMessageService } from 'ng-zorro-antd';

import { TranslateService } from '@ngx-translate/core';
import { LegalEntityComponent } from '../legal-entity/legal-entity.component';
import { ContactsListComponent } from '../contact/contacts-list/contacts-list.component';
import { ApplyCusCodeComponent } from '@shared/components/apply-cus-code/apply-cus-code.component';
import { CrmService } from 'projects/crm/src/public-api';

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

  CustomerLifeCycleStatus: typeof CustomerLifeCycleStatus = CustomerLifeCycleStatus;
  ForwardingType: typeof ForwardingType = ForwardingType;
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
    private customerService: CustomerService,
    public msessage: NzMessageService,
    public renderer2: Renderer2,
    public router: Router,
    public translate: TranslateService,
    private crmService: CrmService,
  ) {}

  ngOnInit() {
    this.getCustomerById();
  }

  // 获取客户详情
  getCustomerById() {
    this.customerService.getCustomerById(this.customerId).subscribe((res: any) => {
      this.customerInfo = res;
      debugger;
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
    this.crmService
      .getCustomerByPageList({
        MaxResultCount: 20,
        SkipCount: 0,
        SearchText: null,
        IncludeTaxes:true,
        IncludeShareOwner:true,
        CustomerId:this.customerId,
        IsOwn:false
      })
      .subscribe(
        (res: any) => {
          this.cusItemData = res.items ? res.items[0] : {};
          this.applyCusCodeComponent.showModal();
        },
        (err) => {},
      );
  }


  refreshData(){
    this.getCustomerById();
  }

}
