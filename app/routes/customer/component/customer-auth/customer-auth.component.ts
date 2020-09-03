import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { isThisISOWeek } from 'date-fns';
import { SSORoleService, PlatformEditionService } from '@co/cds';
import { CRMContactService, CRMCustomerService } from 'apps/crm/app/services/crm';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'customer-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.less'],
})
export class CustomerAuthComponent implements OnInit {
  @Input() isBind: any;
  @Input() customerId: any;
  @Input() partnerId: any;
  @Input() isPartner: boolean;
  @Input() isCanBind: boolean;
  @Input() customerState: any;
  // 判断同一业务员
  @Input() isOwner: false;
  @Input() partnerIsOwner: false;
  @Output() refushData = new EventEmitter<any>();

  clientMsg: any;
  validateForm: FormGroup;
  editionlist: any[] = [];
  contactList = [];
  maxPrice = 99.99;
  minPrice = 50;
  isSubmit = false;
  isVisible = false;
  loading = false;
  rolesList: any;

  width = 600;
  requestAnimationFrameId: number;

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
  constructor(
    private ssoRoleService: SSORoleService,
    private crmContactService: CRMContactService,
    private platformEditionService: PlatformEditionService,
    private crmCustomerService: CRMCustomerService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initData();
    this.getEditionAll();
    this.onRolesList();
    this.onContactList();
    this.getDetial();
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  initData() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      editionRoleId: [null, [Validators.required]],
      contactId: [null],
      customerLevel: [null, [Validators.required, Validators.maxLength(20)]],
      oceanAttachFee: [null, [Validators.required, this.checkKeyWordData()]],
    });
  }
  getDetial() {
    if (this.isPartner) {
      if (this.partnerId) {
        this.GetCustomerConfigure(this.partnerId);
      }
    } else {
      this.GetCustomerConfigure(this.customerId);
    }
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

  onContactList() {
    this.crmContactService
      .getAllByCustomer({
        customerId: this.customerId,
        isRegistered: false,
      })
      .subscribe((res: any) => {
        this.contactList = res.items;
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

  //获取网站配置版本
  getEditionAll() {
    this.platformEditionService.getAll({ skipCount: 0, maxResultCount: 100 }).subscribe((c) => {
      this.editionlist = c.items;
    });
  }

  GetCustomerConfigure(id: any) {
    this.crmCustomerService
      .getCustomerConfigure({
        customerId: id,
      })
      .subscribe((c) => {
        this.clientMsg = c;
      });
  }

  noRZModal: boolean = false;
  onCertification() {
    this.validateForm.reset();
    if (this.customerState != 3) {
      this.noRZModal = true;
      return;
    }
    this.isVisible = true;
  }

  noRXModalhandleOk() {
    this.noRZModal = false;
  }

  noRXModalhandleCancel() {
    this.noRZModal = false;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validateForm.valid) {
      return;
    }

    let id;
    if (this.isPartner) {
      if (this.partnerId) {
        id = this.partnerId;
      }
    } else {
      id = this.customerId;
    }

    if (this.validateForm.valid) {
      this.loading = true;
    }

    if (!this.isBind) {
      this.crmCustomerService
        .customerConfigure({
          customerId: id,
          userName: this.validateForm.get('userName').value,
          editionRoleId: this.validateForm.get('editionRoleId').value,
          contactId: this.validateForm.get('contactId').value,
          customerConfigure: {
            customerLevel: this.validateForm.get('customerLevel').value,
            oceanAttachFee: this.validateForm.get('oceanAttachFee').value,
          },
        })
        .subscribe(
          (c) => {
            this.loading = false;
            this.isVisible = false;
            this.getDetial();
            this.refushData.emit('');
          },
          (error) => {
            this.loading = false;
          },
        );
      return;
    }

    this.crmCustomerService
      .updateCustomerConfigure({
        customerId: id,
        userName: this.validateForm.get('userName').value,
        editionRoleId: this.validateForm.get('editionRoleId').value,
        contactId: this.validateForm.get('contactId').value,
        customerConfigure: {
          customerLevel: this.validateForm.get('customerLevel').value,
          oceanAttachFee: this.validateForm.get('oceanAttachFee').value,
        },
      })
      .subscribe(
        (c) => {
          this.loading = false;
          this.isVisible = false;
          this.getDetial();
          this.refushData.emit('');
        },
        (error) => {
          this.loading = false;
        },
      );
  }

  onCreate() {
    this.isVisible = true;
    this.validateForm.reset();
    if (this.clientMsg && this.clientMsg.contactId) {
      this.contactList.push({
        name: this.clientMsg.contactFullName,
        id: this.clientMsg.contactId,
      });
    }
    this.validateForm.patchValue({
      userName: this.clientMsg.userName,
      editionRoleId: this.clientMsg.editionRoleId,
      contactId: this.clientMsg.contactId,
      customerLevel: this.clientMsg.customerConfigure.customerLevel,
      oceanAttachFee: this.clientMsg.customerConfigure.oceanAttachFee,
    });
  }

  getCusDetailById() {}
}
