import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CoPageBase } from '@co/core';
import { PlatformOrganizationUnitService } from '@co/cds';
import { NgForm } from '@angular/forms';
import { CRMCustomerService } from '../../../../services/crm';
import { Observable } from 'rxjs';

@Component({
  selector: 'crm-distribution-customer',
  templateUrl: './distribution-customer.component.html',
  styleUrls: ['./distribution-customer.component.less'],
})
export class DistributionCustomerComponent extends CoPageBase implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: NgForm;
  @Input() customerIds;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  loading = false;
  assignLoading = false;
  listOfCustomer = [];
  userId;

  constructor(private crmCustomerService: CRMCustomerService,
              injector: Injector, private modal: NzModalRef, private platformOrganizationUnitService: PlatformOrganizationUnitService) {
    super(injector);
  }

  ngOnInit(): void {
    const user = JSON.parse(window.localStorage.getItem('co.session'));
    this.platformOrganizationUnitService
      .getUsersByOrganizationUnitId({
        maxResultCount: 999,
        organizationUnitId: user.session.user.positions[0].organizationUnitId,
      })
      .subscribe((res: any) => {
        this.listOfCustomer = res.items;
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
      this.$message.warning(this.$L('请选择业务员'));
      return;
    }
    this.assignLoading = true;
    this.crmCustomerService.transferCustomer({ customerIds: this.customerIds, userId: this.userId }).subscribe(r => {
      this.$message.success(this.$L('Allocation is successful!'));
      this.onSubmitted.emit(true);
      this.cancel();
      this.assignLoading = false;
    }, e => this.assignLoading = false);
  }
}
