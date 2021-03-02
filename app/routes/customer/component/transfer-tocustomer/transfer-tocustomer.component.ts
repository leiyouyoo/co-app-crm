import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PlatformOrganizationUnitService } from '@co/cds';
import { CRMCustomerService } from '../../../../services/crm';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CoPageBase, debounce } from '@co/core';

@Component({
  selector: 'crm-transfer-tocustomer',
  templateUrl: './transfer-tocustomer.component.html',
  styleUrls: ['./transfer-tocustomer.component.less'],
})
export class TransferTocustomerComponent extends CoPageBase implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: NgForm;
  @Input() customerIds;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  loading = false;
  assignLoading = false;
  listOfCustomer = [];
  user;

  constructor(private crmCustomerService: CRMCustomerService,
              injector: Injector, private modal: NzModalRef, private platformOrganizationUnitService: PlatformOrganizationUnitService) {
    super(injector);
  }

  ngOnInit(): void {
    this.onSearchUser();
  }

  @debounce(200)
  onSearchUser(text = null) {
    const param = {
      searchText: text,
      includeOrganization: true,
      isOwnDepartment: false,
    };
    if (!text) {
      param.isOwnDepartment = true;
    }
    if (text === '') {
      return;
    }

    this.platformOrganizationUnitService
      .getSaleUsers(param)
      .subscribe((res: any) => {
        this.listOfCustomer = res.items.map(e => {
          const organization = e.organizationUnits[0].organizationUnitFullName;
          const organizationName = organization.split('/')[0];
          const department = organization.split('/')[1];
          return Object.assign(e, { organizationName, department });
        });
      });
  }

  validForm(formData: any): Observable<any> {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
    }
    return formData.valid;
  }

  cancel() {
    this.modal.destroy();
  }

  confirm() {
    if (!this.validForm(this.userForm)) {
      this.$message.warning(this.$L('转让对象不能为空'));
      return;
    }
    const user = JSON.parse(window.localStorage.getItem('co.session'));
    if (this.user.id == user.session?.user?.id) {
      this.$message.warning(this.$L('不能转让给自己'));
      return;
    }
    this.assignLoading = true;
    this.crmCustomerService.transferCustomer({ customerIds: this.customerIds, userId: this.user.id }).subscribe(r => {
      this.$message.success(this.$L('转让成功,共转移给' + this.customerIds.length + '个客户给' + (this.user.nameLocalization || this.user.userName)));
      this.onSubmitted.emit(true);
      this.cancel();
      this.assignLoading = false;
    }, e => this.assignLoading = false);
  }
}
