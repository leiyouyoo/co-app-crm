import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { TranslateService } from '@ngx-translate/core';
import { TransferTocustomerComponent } from '../../component/transfer-tocustomer/transfer-tocustomer.component';
// import { CreateCustomerComponent } from '../../component/create-customer/create-customer.component';
import { Router } from '@angular/router';
import { CustomerMergeComponent } from '../../component/customer-merge/customer-merge.component';
import { Validators } from '@angular/forms';
import { CRMCustomerService, CRMCreateOrUpdateCustomerInput } from 'apps/crm/app/services/crm';
import { CreateCustomerComponent } from '../../../../shared/compoents/customer/create-customer/create-customer.component';
@Component({
  selector: 'app-no-deal-customer',
  templateUrl: './no-deal-customer.component.html',
  styleUrls: ['./no-deal-customer.component.less'],
})
export class NoDealCustomerComponent implements OnInit {
  @ViewChild(TransferTocustomerComponent, { static: true }) tranCustomer: TransferTocustomerComponent;
  com: any;
  @ViewChild('createCustomer', { static: true, read: ViewContainerRef }) createCustomer: ViewContainerRef;
  @ViewChild(CustomerMergeComponent, { static: true }) customerMerge: CustomerMergeComponent;
  listOfData: any;
  loading = false;

  sortValue: string | null = 'desc';
  //创建客户
  isVisibleCreate: boolean;

  //是否删除
  isDelete: boolean;
  unDelete: boolean;
  modalTwoText: string;
  modalTwoContent: string;
  modalOneText: string;
  modalOneContent: string;
  customerId: any;
  cusLoading = false;

  isAllDisplayDataChecked = false;
  transDisabled = true;
  isVisibleTrans = false;
  tranLoading = false;

  searchData: any = null;
  applicationLoading = false;
  maxResultCount = 20;
  skipCount = 1;

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private router: Router,
    private crmCustomerService: CRMCustomerService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit(): void {
    this.getCustomerByPageList();
  }

  onSearch(e) {
    let keycode = window.event ? e.keyCode : e.which;

    if (keycode === 13) {
      this.nowSearch();
    }
  }

  nowSearch() {
    this.skipCount = 1;
    this.getCustomerByPageList();
  }

  createModal() {
    this.isVisibleCreate = true;
    this.createCustomer.clear();
    this.com = this.createCustomer.createComponent(this.componentFactoryResolver.resolveComponentFactory(CreateCustomerComponent));

    this.com.instance.initData();
    setTimeout(() => {
      this.com.instance.ngScroll();
    }, 500);
  }

  showDetial(data) {
    this.router.navigate(['/crm/home/customer/customerdetails', data.id]);
  }

  create(application?: boolean): void {
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
      this.msg.warning(this.translate.instant('Please check the content'));
      return;
    }
    let value = this.com.instance.validateForm.value;
    let tel = value.tel.map((res) => res.tel);
    if (!value.email && !value.fax) {
      this.msg.warning('Please enter email or fax');
      return;
    }

    // if (value.customerType === 3 && value.forwardingType === null) {
    //   this.msg.warning('Please fill in the freight forwarding type');
    //   return;
    // }

    // if (this.com.instance.userList && JSON.stringify(this.com.instance.userList) !== '{}') {
    //   if (this.com.instance.userList.items.length > 0) {
    //     this.msg.warning('Duplicate customers already exist');
    //     return;
    //   }
    // }

    if (application) {
      this.applicationLoading = true;
    } else {
      this.cusLoading = true;
    }

    let entity: CRMCreateOrUpdateCustomerInput = {
      name: value.name,
      nameLocalization: value.nameLocalization,
      shortName: value.shortName,
      shortNameLocalization: value.shortNameLocalization,
      address: value.address,
      addressLocalization: value.address,
      tel: tel.toString(),
      fax: value.fax,
      keyWord: value.keyWord,
      email: value.email,
      customerType: value.customerType,
      isSalesCustomer: value.isSalesCustomer == null ? false : value.isSalesCustomer,
      countryId: value.countryId,
      provinceId: value.provinceId,
      cityId: value.cityId,
      industry: value.industry,
      description: value.description,
      incoterms: value.incoterms,
      customerTaxes: value.customerTaxes[0]?.taxType ? value.customerTaxes : null,
    };

    if (application) {
      entity.isAudit = true;
    }

    this.crmCustomerService.create(entity).subscribe(
      (res) => {
        if (application) {
          this.msg.success(this.translate.instant('application success!'));
        } else {
          this.msg.success(this.translate.instant('Create success!'));
        }

        this.cusLoading = false;
        this.applicationLoading = false;
        this.isVisibleCreate = false;
        this.getCustomerByPageList();
        this.com.instance.validateForm.reset();
      },
      (err) => {
        this.cusLoading = false;
      },
    );
  }

  createCancel(): void {
    this.isVisibleCreate = false;
  }

  cancelDelete() {
    this.isDelete = false;
  }

  cancelDeleteCustomer() {
    this.unDelete = false;
  }

  transModal() {
    if (this.listOfData.items.some((c) => c.choosed === true)) {
      this.isVisibleTrans = true;
    }
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfData.items.every((item) => item.choosed === true);
    this.transDisabled = !this.listOfData.items.some((item) => item.choosed === true);
  }

  checkAll(data) {
    if (data) {
      this.listOfData.items.forEach((e) => (e.choosed = true));
    } else {
      this.listOfData.items.forEach((e) => (e.choosed = false));
    }
    this.refreshStatus();
  }

  cancelTrans() {
    this.isVisibleTrans = false;
  }

  createTrans() {
    let list = []; // list 一定要定义为局部变量
    this.listOfData.items.forEach((data) => {
      if (data.choosed) {
        list.push(data.id);
      }
    });
    this.transferCustomer(list, this.tranCustomer.validateForm.get('userId').value);
  }

  //获取客户数据
  getCustomerByPageList() {
    this.loading = true;
    const num = this.skipCount - 1;

    this.crmCustomerService
      .getAll({
        isCooperation: false,
        maxResultCount: this.maxResultCount,
        skipCount: num * this.maxResultCount,
        searchText: this.searchData,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  //客户转让
  transferCustomer(customerIds: any[], userId: any) {
    this.tranLoading = true;
    this.crmCustomerService.transferCustomer({ customerIds: customerIds, userId: userId }).subscribe(
      (res) => {
        this.tranLoading = false;
        this.isVisibleTrans = false;
        this.msg.success(this.translate.instant('Successful transfer'));
        this.getCustomerByPageList();
      },
      (err) => {
        this.tranLoading = false;
      },
    );
  }

  //删除校验
  deleteCustormer(id: any) {
    this.customerId = id;

    this.crmCustomerService
      .checkDelete({
        customerId: id,
      })
      .subscribe(
        (res: any) => {
          if (res) {
            switch (res.errorType) {
              case 0:
                this.modalOneText = this.translate.instant('Tips');
                this.modalOneContent = this.translate.instant("Can't be recovered after deletion,Whether to continue operation?");
                this.isDelete = true; //可删除，显示删除确认提示框
                break;
              case 1:
                this.modalOneText = this.translate.instant('Tip: The customer has opened an account') + res.accountCount;
                this.modalOneContent = this.translate.instant(
                  'If you confirm to delete the client, the CSP client account opened for the user will be automatically logged out. After logging out, the client cannot log in to the CSP client, please be careful!',
                );
                this.isDelete = true; //可删除，显示删除确认提示框
                break;
              case 2:
                this.modalTwoText = this.translate.instant('failed to delete:');
                this.modalTwoContent =
                  res.createAccountUsers +
                  '(Name of account salesperson) The CSP client account has already been opened for this customer and cannot be deleted directly, please contact first' +
                  res.createAccountUsers +
                  this.translate.instant("After deleting the client's csp login account, delete the client.");
                this.unDelete = true; //不可删除 给出提示
                break;
              case 3:
                this.modalTwoText = this.translate.instant('failed to delete:');
                this.modalTwoContent =
                  '该客户被指定为' +
                  res.customerNames +
                  '的合作伙伴，不能直接删除,请先联系' +
                  res.bindUserNames +
                  '业务员解除绑定关系，然后删除。';
                this.unDelete = true; //不可删除 给出提示
                break;
            }
          }
        },
        (err) => {
          this.msg.error = err;
        },
      );
  }

  //确认删除
  customerDelete() {
    this.crmCustomerService
      .delete({
        id: this.customerId,
      })
      .subscribe(
        (res: any) => {
          this.msg.success(this.translate.instant('Delete success'));
          this.isDelete = false;
          this.getCustomerByPageList();
        },
        (err) => {
          this.msg.error(err);
          this.isDelete = true;
        },
      );
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  pageIndexChange(event: number): void {
    this.skipCount = event;
    this.getCustomerByPageList();
  }

  pageSizeChange(event: number): void {
    this.maxResultCount = event;
    this.getCustomerByPageList();
  }
  showMerge() {
    this.customerMerge.dataSet = [];
    let isShow = true;
    this.listOfData.items.forEach((data) => {
      if (data.choosed) {
        if (data.isMerged) {
          isShow = false;
          return;
        } else {
          this.customerMerge.addLine(data);
        }
      }
    });
    if (isShow) {
      this.customerMerge.isVisible = true;
    } else {
      this.msg.warning(this.translate.instant('The merged customers cannot be merged again. Please check the selected data!'));
    }
  }
}
