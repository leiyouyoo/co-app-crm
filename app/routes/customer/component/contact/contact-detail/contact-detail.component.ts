import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  @Input() id;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  validateForm: FormGroup;
  isShow = false;
  roleList = [];
  positionList = [];
  loading = false;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
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
    this.fetchRemoteData();
  }

  initForm(data?) {
    debugger;
    this.validateForm = this.fb.group({
      id: [data ? data.id : this.emptyGuid],
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
      role: [null, []],
      remark: [null],
    });

    this.validateForm.get('isSignUp').valueChanges.subscribe((data) => {
      if (data) {
        this.validateForm.removeControl('role');
        this.validateForm.addControl('role', new FormControl(null, [Validators.required]));
      } else {
        this.validateForm.removeControl('role');
        this.validateForm.addControl('role', new FormControl(null, []));
      }
    });
  }

  private fetchRemoteData() {
    if (this.id) {
      this.crmContactService.get({ id: this.id }).subscribe((res) => {
        this.validateForm.reset({
          id: res.id,
          surname: res.surname,
          surnameLocalization: res.surnameLocalization,
          name: res.name,
          nameLocalization: res.nameLocalization,
          phone: res.phone,
          email: res.email,
          fax: res.fax,
          tel: res.tel,
          position: res.position,
          isMaster: res.isMaster,
          customerId: res.customerId,
          partnerId: res.partnerId,
          userId: res.userId,
          txId: res.txId,
          isSignUp: res.isSignUp,
          userName: res.userName,
          password: res.password,
          isSendEmail: res.isSendEmail,
          role: res.role,
          remark: res.remark,
        });
      });
    }
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

  checkEmailRepeat() {
    this.crmContactService
      .checkEmailRepeat({ customerId: this.customerId, email: this.validateForm.value.email, isSignUp: this.validateForm.value.isSignUp })
      .subscribe((res) => {
        debugger
      });
  }

  save() {
    this.loading = true;
    if (!this.validForm(this.validateForm)) {
      this.msg.warning(this.translate.instant('Please check the content'));
      this.loading = false;
      return;
    }
    if (this.validateForm.value.id == this.emptyGuid) {
      this.crmContactService.createForCustomer(this.validateForm.value).subscribe(
        (res) => {
          debugger;
          this.loading = false;
          this.onSubmitted.emit(true);
          this.msg.info('新增成功');
          this.cancel();
        },
        (error) => {
          this.loading = false;
        },
      );
    } else {
      this.crmContactService.update(this.validateForm.value).subscribe(
        (res) => {
          debugger;
          this.loading = false;
          this.onSubmitted.emit(true);
          this.msg.info('编辑成功');
          this.cancel();
        },
        (error) => {
          this.loading = false;
        },
      );
    }
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
