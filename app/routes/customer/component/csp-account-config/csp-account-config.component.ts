import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SSORoleService } from '@co/cds';
import { CRMCustomerService } from '../../../../services/crm';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'crm-csp-account-config',
  templateUrl: './csp-account-config.component.html',
  styleUrls: ['./csp-account-config.component.less'],
})
export class CspAccountConfigComponent extends CoPageBase implements OnInit {
  @Input() customerId: any;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  validateForm: FormGroup;
  maxPrice = 99.99;
  minPrice = 50;
  rolesList = [];
  loading: boolean;

  checkKeyWordData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.validateForm) {
        let value = this.validateForm.get('oceanAttachFee').value;
        if (this.minPrice == null && this.maxPrice == null) {
          return;
        }
        if (this.minPrice > value || (this.maxPrice ? value > this.maxPrice : false)) {
          return { existSameCode: true };
        }
      }
    };
  }

  constructor(injector: Injector, private fb: FormBuilder,
              private modal: NzModalRef,
              private ssoRoleService: SSORoleService, private crmCustomerService: CRMCustomerService) {
    super(injector);
  }

  ngOnInit(): void {
  }

  initData() {
    this.validateForm = this.fb.group({
      editionRoleId: [null, [Validators.required]],
      customerLevel: [null, [Validators.required, Validators.maxLength(20)]],
      oceanAttachFee: [null, [Validators.required, this.checkKeyWordData()]],
    });
  }

  onRolesList() {
    this.ssoRoleService
      .getParentRoles({
        type: 1,
      })
      .subscribe((res: any) => {
        this.rolesList = res.items;
      });
  }

  changeCustomerLevel(event: any) {
    switch (event) {
      case 1:
        this.maxPrice = 99.99;
        this.minPrice = 50;
        this.validateForm.patchValue({
          oceanAttachFee: 50,
        });
        break;
      case 2:
        this.maxPrice = 199.99;
        this.minPrice = 100;
        this.validateForm.patchValue({
          oceanAttachFee: 100,
        });

        break;
      case 3:
        this.maxPrice = 299.99;
        this.minPrice = 200;
        this.validateForm.patchValue({
          oceanAttachFee: 200,
        });

        break;
      case 4:
        this.maxPrice = 499.99;
        this.minPrice = 300;
        this.validateForm.patchValue({
          oceanAttachFee: 300,
        });

        break;
      case 5:
        this.maxPrice = null;
        this.minPrice = 500;
        this.validateForm.patchValue({
          oceanAttachFee: 500,
        });

        break;
      case 0:
        this.maxPrice = null;
        this.minPrice = null;
        this.validateForm.patchValue({
          oceanAttachFee: null,
        });

        break;
      default:
        break;
    }
  }

  submit() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    this.loading = true;
    const value = this.validateForm.value;
    const param = {
      customerId: this.customerId,
      editionRoleId: value.editionRoleId,
      customerConfigure: {
        customerLevel: value.customerLevel,
        oceanAttachFee: value.oceanAttachFee,
      },
    };
    this.crmCustomerService.customerAccountConfigure(param).subscribe(r => {
      this.$message.success(this.$L('Successful operation'));
      this.loading = false;
      this.onSubmitted.emit(true);
      this.cancel();
    }, e => this.loading = false);
  }

  cancel() {
    this.modal.destroy();
  }
}
