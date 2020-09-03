import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener, Input, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { TranslateService } from '@ngx-translate/core';
import { TransferTocustomerComponent } from '../../component/transfer-tocustomer/transfer-tocustomer.component';
// import { CreateCustomerComponent } from '../../component/create-customer/create-customer.component';
import { Router } from '@angular/router';
import { CustomerMergeComponent } from '../../component/customer-merge/customer-merge.component';
import { Validators } from '@angular/forms';
import { CRMCustomerService, CRMCreateOrUpdateCustomerInput } from 'apps/crm/app/services/crm';
import { CreateCustomerComponent } from '../../../../shared/compoents/customer/create-customer/create-customer.component';
import { CoPageBase } from '@co/core';
import { STColumn } from '@co/cbc';
import { NzResizableService, NzResizeEvent } from 'ng-zorro-antd/resizable';
@Component({
  selector: 'app-no-deal-customer',
  templateUrl: './no-deal-customer.component.html',
  styleUrls: ['./no-deal-customer.component.less'],
  providers: [NzResizableService],
})
export class NoDealCustomerComponent extends CoPageBase {
  @ViewChild(TransferTocustomerComponent, { static: true }) tranCustomer: TransferTocustomerComponent;
  @ViewChild(CreateCustomerComponent, { static: true }) createCustomer: CreateCustomerComponent;
  @ViewChild(CustomerMergeComponent, { static: true }) customerMerge: CustomerMergeComponent;
  listOfData: any;
  loading = false;
  width = 600;
  requestAnimationFrameId: number;
  sortValue: string | null = 'desc';
  //创建客户
  isVisibleCreate: boolean;

  //是否删除
  errLoading = false;
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

  choosedData = [];
  columns: STColumn[] = [
    {
      width: '250px',
      title: 'CustomerTableName',
      index: 'name',
      render: 'CustomerTableName',
    },
    {
      width: '150px',
      title: 'Country, province',
      index: 'country',
      format: (item, _col) => `${item.country + '-' + item.province}`,
    },
    { width: '150px', title: 'Contact', index: 'contactName' },
    { width: '150px', title: 'Phone', index: 'contactTel' },
    { width: '150px', title: 'Owner', index: 'owner' },
    {
      title: 'Action',
      type: 'action',
      width: 150,
      fixed: 'right',
      className: 'no-line-through',
      buttons: [
        {
          text: this.translate.instant('View'),
          type: 'none',
          click: (e) => {
            this.showDetial(e);
          },
        },
        {
          text: this.translate.instant('Delete'),
          type: 'none',
          className: 'st__btn--red',
          click: (e) => {
            this.deleteCustormer(e.id);
          },
        },
      ],
    },
  ];

  constructor(
    private msg: NzMessageService,
    private translate: TranslateService,
    private router: Router,
    private crmCustomerService: CRMCustomerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
  ) {
    super(injector);
  }

  coOnInit(): void {
    this.getCustomerByPageList();
    this.createModal();
  }

  checkChange(e): void {
    debugger;
    e.type === 'pi' && this.pageIndexChange(e.pi);
    e.type === 'ps' && this.pageSizeChange(e.ps);
    e.type === 'dblClick' && this.showDetial(e.dblClick.item);
    if (e.type === 'checkbox') {
      this.choosedData = e.checkbox;
    }
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

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  createModal() {
    this.createCustomer.initData();
    setTimeout(() => {
      this.createCustomer.ngScroll();
    }, 500);
  }

  showModal() {
    this.isVisibleCreate = true;
  }

  showDetial(data) {
    this.$navigate(['crm/customers/customerdetails', data.id], {
      queryParams: {
        _title: `${data.name}`,
      },
    });
  }

  create(application?: boolean): void {
    this.createCustomer.validateForm.controls.customerTaxes.controls.forEach((e) => {
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
    if (!this.createCustomer.submitForm()) {
      this.msg.warning(this.translate.instant('Please check the content'));
      return;
    }
    let value = this.createCustomer.validateForm.value;
    let tel = value.tel.map((res) => res.tel);
    if (!value.email && !value.fax) {
      this.msg.warning('Please enter email or fax');
      return;
    }

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
        this.createCustomer.validateForm.reset();
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
    if (this.choosedData.length > 0) {
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
    this.errLoading = true;
    this.crmCustomerService
      .delete({
        id: this.customerId,
      })
      .subscribe(
        (res: any) => {
          this.errLoading = false;
          this.msg.success(this.translate.instant('Delete success'));
          this.isDelete = false;
          this.getCustomerByPageList();
        },
        (err) => {
          this.errLoading = false;
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
    this.choosedData.forEach((data) => {
      if (data.isMerged) {
        isShow = false;
        return;
      } else {
        this.customerMerge.addLine(data);
      }
    });
    if (isShow) {
      this.customerMerge.isVisible = true;
    } else {
      this.msg.warning(this.translate.instant('The merged customers cannot be merged again. Please check the selected data!'));
    }
  }
}
