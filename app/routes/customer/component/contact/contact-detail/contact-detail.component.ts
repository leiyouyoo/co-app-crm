import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PlatformPositionService } from '@co/cds';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMCustomerService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { RoleService } from '../../../../../services/role';
import { LocationDetailComponent } from '../../location/location-detail/location-detail.component';

@Component({
  selector: 'crm-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.less'],
})
export class ContactDetailComponent extends CoPageBase implements OnInit {
  @Input() isbingContact = false;
  @Input() customerId;
  @Input() locationId;
  @Input() id;
  @Output() readonly onSubmitted = new EventEmitter<any>();
  @Output() readonly bingLocation = new EventEmitter<boolean>();
  validateForm: FormGroup;
  isShow = false;
  roleList = [];
  positionList = [];
  loading = false;
  isSuccess = true; //邮箱是否被注册过
  isSubmitted = false;
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
    private crmLocationService: CRMLocationService,
    private modal: NzModalService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.getPosition();
    this.fetchRemoteData();
  }

  initForm(data?) {
    this.validateForm = this.fb.group({
      id: [data ? data.id : null],
      surname: [null, [Validators.required, Validators.pattern(/^[a-zA-Z'\s]+$/)]],
      surnameLocalization: [null],
      name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z'\s]+$/)]],
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
      role: [null],
      remark: [null, [Validators.maxLength(200)]],
    });

    this.validateForm.get('surname').valueChanges.subscribe((data) => {
      if (this.$i18n._default == 'en-US') {
        const name =
          (this.validateForm.get('surname').value ? this.validateForm.get('surname').value : '') +
          (this.validateForm.get('name').value ? this.validateForm.get('name').value : '');
        this.validateForm.get('nameLocalization').setValue(name);
      }
    });
    this.validateForm.get('name').valueChanges.subscribe((data) => {
      if (this.$i18n._default == 'en-US') {
        const name =
          (this.validateForm.get('surname').value ? this.validateForm.get('surname').value : '') +
          (this.validateForm.get('name').value ? this.validateForm.get('name').value : '');
        this.validateForm.get('nameLocalization').setValue(name);
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
      this.positionList = res.items;
    });
  }

  emailChange() {
    this.isSuccess = true;
  }

  isSignUpChange(e) {
    if (e) {
      this.validateForm.removeControl('role');
      this.validateForm.addControl('role', new FormControl(null, [Validators.required]));
      //验证邮箱是否注册过
      this.checkEmailRepeat();
    } else {
      this.validateForm.removeControl('role');
      this.validateForm.addControl('role', new FormControl(null, []));
      this.isSuccess = true;
    }
  }

  checkEmailRepeat() {
    this.crmContactService
      .checkEmailRepeat({
        id: this.validateForm.value.id,
        customerId: this.customerId,
        email: this.validateForm.value.email,
        isSignUp: this.validateForm.value.isSignUp,
      })
      .subscribe((res) => {
        this.isSuccess = res.success;
      });
  }

  save() {
    this.loading = true;
    if (!this.validForm(this.validateForm) || !this.isSuccess) {
      this.msg.warning(this.translate.instant('Please check the content'));
      this.loading = false;
      this.isSubmitted = true;
      return;
    }
    if (!this.validateForm.value.id) {
      this.crmContactService.createForCustomer(this.validateForm.value).subscribe(
        (res) => {
          this.loading = false;
          if (this.isbingContact) {
            //从绑定入口进
            this.onBind(res.id);
          } else {
            this.msg.info(this.$L('Added successfully!'));
            this.onSubmitted.emit({ isSucccess: true, id: res.id });
            this.cancel();
          }
          this.isbingContact = false; //false 直接关闭窗口
        },
        (error) => {
          this.loading = false;
        },
      );
    } else {
      this.crmContactService.update(this.validateForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.onSubmitted.emit({ isSucccess: true, id: res.id });
          this.msg.info(this.$L('Edited successfully!'));
          this.isbingContact = false; //false 直接关闭窗口
          this.cancel();
        },
        (error) => {
          this.loading = false;
        },
      );
    }
  }

  //绑定
  onBind(contactId) {
    this.crmLocationService.assignUsersToLocation({ locationId: this.locationId, contactIds: [contactId] }).subscribe(
      (res) => {
        this.onSubmitted.emit({ isSucccess: true });
        this.cancel();
      },
      (error) => {
        this.onSubmitted.emit({ isSucccess: false });
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
    if (this.isbingContact) {
      this.bingLocation.emit(true);
    } else {
      this.modalRef.destroy();
    }
  }
}
