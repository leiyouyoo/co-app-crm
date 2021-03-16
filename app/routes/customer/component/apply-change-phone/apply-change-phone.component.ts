import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CoPageBase } from '@co/core';
import { CRMCustomerService } from '../../../../services/crm';

@Component({
  selector: 'crm-apply-change-phone',
  templateUrl: './apply-change-phone.component.html',
  styleUrls: ['./apply-change-phone.component.less'],
})
export class ApplyChangePhoneComponent extends CoPageBase implements OnInit {
  @Input() customerInfo;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  validateForm = this.fb.group({
    phone: new FormArray([]),
  });
  loading: boolean;
  isSpinning: boolean;

  constructor(injector: Injector, private modal: NzModalRef, private fb: FormBuilder, private cRMCustomerService: CRMCustomerService) {
    super(injector);
  }

  ngOnInit(): void {
    this.addPhone(this.customerInfo?.tel);
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
    this.cRMCustomerService.applyChangePhone({
      phone: this.validateForm.value.phone.map(e => e.tel).join(','),
      customerId: this.customerInfo?.id,
    }).subscribe(r => {
      this.loading = false;
      this.onSubmitted.emit(true);
      this.$message.success(this.$L('Operates successfully'));
      this.cancel();
    }, e => this.loading = false);
  }
}
