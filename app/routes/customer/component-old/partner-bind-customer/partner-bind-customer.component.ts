import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService, CRMPartnerService, CRMCreateOrUpdatePartnerDto } from 'apps/crm/app/services/crm';
import { CreateCustomerComponent } from 'apps/crm/app/shared/compoents/customer/create-customer/create-customer.component';

@Component({
  selector: 'partner-bind-customer',
  templateUrl: './partner-bind-customer.component.html',
  styleUrls: ['./partner-bind-customer.component.less'],
})
export class PartnerBindCustomerComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  listOfData: any = {};
  loading = false;
  showSearch = true;
  cusLoading = false;
  com: any;
  @Input() modalName: string;
  @Input() customerId: any;
  @Output() outData = new EventEmitter<any>();
  isVisiblePartner = false;
  parentId: any;
  tableMaxResultCount = 7; //页大小
  tableSkipCount = 1; //跳过指定条数

  a = this.translate.instant('Cooperating customers');
  b = this.translate.instant('Potential customers');
  c = this.translate.instant('Unowned customers');
  d = this.translate.instant('Share customers');

  @ViewChild('createCustomer', { static: true, read: ViewContainerRef }) createCustomer: ViewContainerRef;
  hasValue = true;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private crmCustomerService: CRMCustomerService,
    private crmPartnerService: CRMPartnerService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.createCustomer.clear();
    this.hasValue = true;
    this.tableMaxResultCount = 7; //页大小
    this.tableSkipCount = 1; //跳过指定条数
    this.listOfData = {};
    this.validateForm = this.fb.group({
      name: [null],
    });
  }
  ngOnDestroy() {
    this.createCustomer.clear();
  }

  show() {
    this.isVisiblePartner = true;
    this.validateForm.reset();
  }

  search(parentId?: any) {
    if (parentId) {
      this.parentId = parentId;
    } else {
      this.parentId = null;
    }

    let name = this.validateForm.value.name;
    this.getCustomerByName(name);
  }

  createCancelPartner() {
    this.modalName = '';
    this.cancelEdit();
    this.hasValue = true;
  }

  getCustomerByName(name: string, parentId?: any) {
    if (parentId) {
      this.parentId = parentId;
    }
    let num = this.tableSkipCount - 1;
    this.loading = true;
    this.crmCustomerService
      .getCustomerByName({
        customerId: this.customerId,
        // tslint:disable-next-line: object-literal-shorthand
        name: name,
        skipCount: num * this.tableMaxResultCount,
        maxResultCount: this.tableMaxResultCount,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res;
          this.hasValue = res.items.length > 0;
          if (!this.hasValue) {
            this.onShowCreate();
          } else {
            this.createCustomer.clear();
          }
          this.listOfData.items = res.items.filter((item) => item.id !== this.customerId);
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  tablePageIndexChange(event) {
    this.tableSkipCount = event;
    this.search();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  onShowCreate() {
    this.hasValue = false;
    this.createCustomer.clear();
    this.com = this.createCustomer.createComponent(this.componentFactoryResolver.resolveComponentFactory(CreateCustomerComponent));

    this.com.instance.initData();
    this.com.instance.bindData(this.validateForm.value.name);
    setTimeout(() => {
      this.com.instance.ngScroll();
    }, 500);
  }

  bindCustomer(type: number, id: any, isGetCustomer: boolean) {
    this.crmPartnerService
      .bindCustomer({
        partnerId: this.parentId,
        customerId: this.customerId,
        bindCustomerId: id,
        // tslint:disable-next-line: object-literal-shorthand
        isGetCustomer: isGetCustomer,
        // tslint:disable-next-line: deprecation
      })
      .subscribe((res) => {
        this.parentId = null;
        let message = '';
        if (isGetCustomer) {
          message = this.translate.instant('Bind and claim success');
        } else {
          message = this.translate.instant('New success');
        }
        this.cancelEdit(true, true);
      });
  }

  createOkCustomer(application) {
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
      this.message.warning(this.translate.instant('Please check the content'));
      return;
    }
    let value = this.com.instance.validateForm.value;
    let tel = value.tel.map((res) => res.tel);

    if (!value.email && !value.fax) {
      this.message.warning(this.translate.instant('Fill in at least one email and fax'));
      return;
    }

    // if (value.customerType === 3 && value.forwardingType === null) {
    //   this.message.warning(this.translate.instant('Please fill in the freight forwarding type'));
    //   return;
    // }

    // if (this.com.instance.userList && JSON.stringify(this.com.instance.userList) !== '{}') {
    //   if (this.com.instance.userList.items.length > 0) {
    //     this.message.warning(this.translate.instant('Duplicate customers already exist'));
    //     return;
    //   }
    // }
    if (value.isSalesCustomer === null) {
      value.isSalesCustomer = false;
    }
    let entity: CRMCreateOrUpdatePartnerDto = {
      partnerName: value.name,
      customerId: this.customerId,
      partnerId: this.parentId ? this.parentId : null,
      partnerCustomer: {
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
        industry: value.industry,
        description: value.description,
        customerTaxes: value.customerTaxes[0]?.taxType != null ? value.customerTaxes : null,
      },
    };

    if (application) {
      entity.partnerCustomer.isAudit = true;
    }

    this.cusLoading = true;
    this.crmPartnerService.create(entity).subscribe(
      (res: any) => {
        this.cusLoading = false;
        this.showSearch = true;
        this.cancelEdit(true, true);
      },
      (err) => {
        this.cusLoading = false;
        this.showSearch = true;
      },
    );
  }

  cancelEdit(update?: boolean, showMsg?: boolean) {
    this.hasValue = true;
    this.showSearch = true;
    this.createCustomer.clear();
    this.outData.emit({
      update: update,
      showMsg: showMsg,
    });
  }
}
