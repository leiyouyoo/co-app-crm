import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PUBCurrencyService } from '@co/cds';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerTitleDto, CRMCustomerTitleService } from 'apps/crm/app/services/crm';
import { CSPInvoiceService } from 'apps/crm/app/services/csp';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'crm-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.less'],
})
export class InvoiceDetailComponent implements OnInit {
  @Input() id;
  @Input() customerId;
  @Input() isAdd: string;
  @Output() readonly onSubmitted = new EventEmitter<any>();
  validateForm!: FormGroup;
  bankList: any[] = [{ i: '1' }];
  // @Input() set invoiceTitleDto(val: CRMCustomerTitleDto) {
  //   if (val) {
  //     if (val.bankAccount1 || val.currency1 || val.bankAccount2 || val.currency2) {
  //       this.onAddLine('edit', val.currency1, val.bankAccount1);
  //     }
  //     if (val.bankAccount2 || val.currency2) {
  //       this.onAddLine('edit', val.currency2, val.bankAccount2);
  //     }

  //     this.validateForm.patchValue(val);
  //   }
  // }

  // get invoiceTitleDto(): CRMCustomerTitleDto {
  //   return this.invoiceTitleDto;
  // }
  currencyList: any[] = [];
  isLoading = false;
  isSubmit = false;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private invoiceTitleService: CRMCustomerTitleService,
    private invoiceService: CSPInvoiceService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
  ) {}

  ngOnInit(): void {
    this.getAllCurrency();
    this.buildForm();
    this.fetchRemoteData();
  }

  private buildForm() {
    this.validateForm = this.fb.group({
      customerId: [this.customerId],
      name: ['', [Validators.required]],
      tfn: ['', [Validators.required]],
      address: ['', [Validators.required]],
      tel: ['', [Validators.required, this.mobileValidator()]],
      isDefault: [false],
      isValid: [true],
      bank: ['', [Validators.required]],
      type: [1],
      id: [],
    });
  }

  private fetchRemoteData() {
    if (this.id) {
      this.invoiceTitleService.get({ id: this.id }).subscribe((val) => {
        if (val) {
          if (val.bankAccount1 || val.currency1 || val.bankAccount2 || val.currency2) {
            this.onAddLine('edit', val.currency1, val.bankAccount1);
          }
          if (val.bankAccount2 || val.currency2) {
            this.onAddLine('edit', val.currency2, val.bankAccount2);
          }

          this.validateForm.patchValue(val);
        }
      });
    }
  }

  //获取币别
  getAllCurrency() {
    this.invoiceService.getCurrencyAsync({}).subscribe((c) => {
      this.currencyList = c;
      !this.validateForm.value.id && this.onAddLine('add');
    });
  }

  onSave() {
    this.isLoading = true;
    if (!this.validForm(this.validateForm) || (!this.validateForm.value.bankAccount1 && !this.validateForm.value.bankAccount2)) {
      this.message.warning(this.translate.instant('Please check the content'));
      this.isLoading = false;
      this.isSubmit = true;
      return false;
    }
    if (
      this.validateForm.value.bankAccount1 &&
      this.validateForm.value.bankAccount2 &&
      this.validateForm.value.bankAccount1 === this.validateForm.value.bankAccount2
    ) {
      this.message.info(this.translate.instant('Bank account cannot be repeated'));
      this.isLoading = false;
      this.isSubmit = true;
      return false;
    }
    this.invoiceTitleService.createOrUpdate(this.validateForm.value).subscribe(
      (res) => {
        this.onSubmitted.emit(true);
        this.isLoading = false;
        this.message.info(this.translate.instant('Save successfully'));
        this.cancel();
      },
      (error) => {
        this.onSubmitted.emit(false);
        this.isLoading = false;
      },
    );
  }

  cancel() {
    this.modalRef.destroy();
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

  accountListControl: Array<{ id: number; accountControlInstance: string; currencyControlInstance: string }> = [];
  onAddLine(type = 'add', currency?: string, bankAccount = null) {
    const addline = () => {
      let cyid = currency || this.currencyList.find((c) => c.code == 'CNY')?.id;
      const id = this.accountListControl.length + 1;
      const control = {
        id,
        accountControlInstance: `bankAccount${id}`,
        currencyControlInstance: `currency${id}`,
      };
      const index = this.accountListControl.push(control);
      console.log(this.accountListControl[this.accountListControl.length - 1]);
      this.validateForm.addControl(
        this.accountListControl[index - 1].accountControlInstance,
        new FormControl(bankAccount, [Validators.maxLength(25)]),
      );
      this.validateForm.addControl(this.accountListControl[index - 1].currencyControlInstance, new FormControl(cyid));
    };
    if (this.currencyList.length > 0) {
      addline();
    } else {
      this.invoiceService.getCurrencyAsync({}).subscribe((c) => {
        this.currencyList = c;
        addline();
      });
    }
  }

  removeField(i: { id: number; accountControlInstance: string; currencyControlInstance: string }): void {
    if (this.accountListControl.length > 1) {
      const index = this.accountListControl.indexOf(i);
      this.accountListControl.splice(index, 1);
      console.log(this.accountListControl);
      this.validateForm.removeControl(i.accountControlInstance);
      this.validateForm.removeControl(i.currencyControlInstance);
    }
  }

  public validForm(form: FormGroup | FormArray) {
    for (const key in form.controls) {
      const control = form.controls[key];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validForm(control);
      }
    }
    return form.valid;
  }

  trackByIndex(index: number) {
    return index;
  }
}
