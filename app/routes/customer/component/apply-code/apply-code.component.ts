import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { CoPageBase } from '@co/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CRMCustomerExamineService } from '../../../../services/crm';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'crm-apply-code',
  templateUrl: './apply-code.component.html',
  styleUrls: ['./apply-code.component.less'],
})
export class ApplyCodeComponent extends CoPageBase implements OnInit {
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  @Input() customerInfo;
  registrationTypes = [
    {
      name: this.$L('Employer Identification Number'),
      value: 0,
      checked: false,
    },
    {
      name: this.$L('Social Security Number'),
      value: 1,
      checked: false,
    },
    {
      name: this.$L('Individual Taxpayer Identification Number'),
      value: 2,
      checked: false,
    },
    {
      name: this.$L('Adopted Tax Payer Identification Number'),
      value: 3,
      checked: false,
    },
  ];
  customerTaxes = [];
  validateForm = this.fb.group({
    customerTaxes: new FormArray([]),
    phone: new FormArray([]),
  });
  addRegistrationButton = true;
  loading: boolean;
  isSpinning: boolean;

  constructor(injector: Injector, private fb: FormBuilder,
              private modal: NzModalRef,
              private crmCustomerExamineService: CRMCustomerExamineService) {
    super(injector);
  }

  ngOnInit(): void {
    this.initData();
  }

  addRegistration(registration?: any) {
    let data: any;

    if (registration) {
      data = this.fb.group({
        taxNo: [registration.taxNo, [Validators.required]],
        taxType: [registration.taxType, [Validators.required]],
      });

      this.registrationTypes.forEach((e) => {
        if (e.value === registration.taxType) {
          e.checked = true;
        }
      });
    } else {
      data = this.fb.group({
        taxNo: [null, [Validators.required]],
        taxType: [null, [Validators.required]],
      });
    }

    if ((this.validateForm.controls.customerTaxes as FormArray).length < this.registrationTypes.length) {
      (this.validateForm.controls.customerTaxes as FormArray).push(data);
      if ((this.validateForm.controls.customerTaxes as FormArray).length === this.registrationTypes.length) {
        this.addRegistrationButton = false;
      }
    } else {
      this.addRegistrationButton = false;
    }
  }

  onChangeRegistrationType(id) {
    let choosed = this.validateForm.get('customerTaxes').value;
    this.registrationTypes.forEach((e) => {
      e.checked = false;
      choosed.forEach((c) => {
        if (c.taxType === e.value) {
          e.checked = true;
        }
      });
    });

    if (this.registrationTypes.every((e) => e.checked === true) && choosed.length === this.registrationTypes.length) {
      this.addRegistrationButton = false;
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

  /**
   * 删除
   */
  delete(name, index) {
    (this.validateForm.controls[name] as FormArray).removeAt(index);
  }

  addPhone(tel?: any) {
    let data: any;

    if (tel) {
      let arr = tel.split(',');
      arr.forEach((e, index) => {
        // tslint:disable-next-line: no-shadowed-variable
        if (index >= 1) {
          data = this.fb.group({
            tel: [e, [Validators.required, this.mobileValidator()]],
          });
        } else {
          data = this.fb.group({
            tel: [e, { validators: [Validators.required, this.mobileValidator()] }],
          });
        }
        (this.validateForm.controls.phone as FormArray).push(data);
      });
      return;
    } else {
      if ((this.validateForm.controls.phone as FormArray).length >= 1) {
        data = this.fb.group({
          tel: [null, { validators: [Validators.required, this.mobileValidator()] }],
        });
      } else {
        data = this.fb.group({
          tel: [null, { validators: [Validators.required, this.mobileValidator()] }],
        });
      }
      (this.validateForm.controls.phone as FormArray).push(data);
    }
  }

  initData() {
    this.addPhone(this.customerInfo?.tel);
    this.isSpinning = true;
    this.crmCustomerExamineService.getExamineDetail({ id: this.customerInfo?.id }).subscribe(r => {
      console.log(r);
      this.isSpinning = false;
      this.customerTaxes = r;
      if (this.customerTaxes?.length > 0) {
        this.customerTaxes.forEach((item) => {
          this.addRegistration(item);
        });
      } else {
        this.addRegistration(null);
      }
    }, e => this.isSpinning = false);
  }

  private validForm(form: FormGroup | FormArray) {
    for (const key in form.controls) {
      const control = form.controls[key] as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity(); // updateValueAndValidity方法会触发控件的valueChanges
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validForm(control);
      }
    }
    return form.valid;
  }

  cancel() {
    this.modal.destroy();
  }

  submit(resolve?) {
    if (!this.validForm(this.validateForm)) {
      resolve && resolve(false);
      return;
    }
    this.loading = true;
    console.log(this.validateForm.value);
    this.crmCustomerExamineService.postCodeAsync({
      customerTaxes: this.validateForm.value.customerTaxes,
      phone: this.validateForm.value.phone.map(e => e.tel).join(','),
      id: this.customerInfo?.id,
    }).subscribe(r => {
      this.loading = false;
      this.onSubmitted.emit(true);
      this.$message.success(this.$L('Operates successfully'));
      this.cancel();
    }, e => this.loading = false);
  }
}
