import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PlatformPositionService } from '@co/cds';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMCustomerService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { RoleService } from '../../../../../services/role';

@Component({
  selector: 'crm-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.less'],
})
export class ContactDetailComponent implements OnInit {
  @Input() customerId;
  validateForm: FormGroup;
  isShow = false;
  roleList = [];
  positionList = [];
  loading = false;
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private positionService: PlatformPositionService,
    private modalRef: NzModalRef,
    private msg: NzMessageService,
    private translate: TranslateService,
    private crmCustomerService: CRMCustomerService,
    private crmContactService: CRMContactService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.getPosition();
  }

  initForm() {
    debugger;
    this.validateForm = this.fb.group({
      id: [null],
      surname: [null, [Validators.required]],
      surnameLocalization: [null],
      name: [null, [Validators.required]],
      nameLocalization: [null, [Validators.required]],
      phone: [null, [Validators.required, this.mobileValidator()]],
      email: [null, [Validators.required, Validators.email]],
      fax: [null, []],
      tel: [null, []],
      position: [null],
      isMaster: [null],
      customerId: [this.customerId],
      partnerId: [null],
      userId: [null],
      txId: [null],
      isSignUp: [false],
      userName: [null],
      password: [null],
      isSendEmail: [null],
      role: [null, [Validators.required]],
      remark: [null],
    });

    this.validateForm.get('isSignUp').valueChanges.subscribe((data) => {
      if (data) {
      }
    });
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneReg = /([0-9\s\-]{7,20})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
      if (!!control.value) {
        const valid = phoneReg.test(control.value);
        return valid ? null : { existSameCode: true };
      }
    };
  }
  getRoles() {
    this.roleService.getAll({}).subscribe((res) => {
      this.roleList = res.items;
    });
  }

  getPosition() {
    this.positionService.getAll({}).subscribe((res) => {
      debugger;
      this.positionList = res.items;
    });
  }

  save() {
    this.loading = true;
    if (!this.validForm(this.validateForm)) {
      this.msg.warning(this.translate.instant('Please check the content'));
      this.loading = false;
      return;
    }
    this.crmContactService.createForCustomer(this.validateForm.value).subscribe(
      (res) => {
        debugger;
        this.loading = false;
        this.msg.info('操作成功');
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  validForm(form) {
    for (const key in form.controls) {
      const control = form.controls[key] as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity(); // updateValueAndValidity方法会触发控件的valueChanges
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validForm(control);
      }
    }
    return this.validateForm.valid;
  }
  cancel() {
    this.modalRef.destroy();
  }
}
