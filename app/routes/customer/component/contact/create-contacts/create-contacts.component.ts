import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { PUBDataDictionaryService, SSORoleService, SsoListResultDto } from '@co/cds';
import { CRMContactService, CRMCreateOrUpdateContactInput } from 'apps/crm/app/services/crm';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'create-contacts',
  templateUrl: './create-contacts.component.html',
  styleUrls: ['./create-contacts.component.less'],
})
export class CreateContactsComponent implements OnInit {
  @Input() customerId: any;
  @Input() partnerId: any;

  @Output() resfush = new EventEmitter();
  @Output() datas = new EventEmitter();
  @Output() create = new EventEmitter();

  width = 600;
  requestAnimationFrameId: number;

  isVisible = false;
  validateForm: FormGroup;
  reg = /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8}$/;
  passwordB = 'success';
  roles: any[];
  name: any;

  loading = false;
  isCanDelete = false;
  data: any;

  rolesList: any;
  positionList: any;
  showCsp = false;
  title: any;
  showmodalServiceMsg = false;
  showmodalServiceData: any;
  mainContact = false;
  mailErrorMsg: any;

  editionRoleId: any;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private pubDataDictionaryService: PUBDataDictionaryService,
    private translate: TranslateService,
    private crmContactService: CRMContactService,
    private ssoRoleService: SSORoleService,
  ) {}

  chineseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return;
      }
      const phoneReg = /[^\u4E00-\u9FA50-9]/g;
      const valid = !phoneReg.test(control.value);
      return valid ? null : { existSameCode: true };
    };
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return;
      }
      const phoneReg = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
      const valid = phoneReg.test(control.value);
      return valid ? null : { existSameCode: true };
    };
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  ngOnInit() {
    this.pubDataDictionaryService.getAll({ typeId: 'EA4865B0-7B1F-4BCC-A23C-F0E247C3A914' }).subscribe((res: any) => {
      this.positionList = res.items;
    });

    this.ssoRoleService.getAll({}).subscribe((res: any) => {
      this.roles = res.items;
      this.initData();
    });
  }

  passwordChange(value) {
    if (this.reg.test(value)) {
      this.passwordB = 'success';
    } else {
      this.passwordB = 'error';
    }
  }

  initData(data: any = {}) {
    this.validateForm = this.fb.group({
      nameLocalization: [data.name || null],
      name: [data.nameLocalization || null, [Validators.required]],
      surname: [data.surname || null, [Validators.required]],
      surnameLocalization: [data.surnameLocalization || null],
      phone: [data.phone || null, [Validators.required, Validators.maxLength(20), this.mobileValidator()]],
      position: [data.position || null],
      mail: [
        data.email || null,
        [Validators.required, Validators.email],
        // Validators.composeAsync([this.mailValidator()]),
      ],
      fax: [data.fax || null],
      tel: [data.tel || null, [Validators.maxLength(20), this.mobileValidator()]],
      isMaster: [data.isMaster || null],
      isCspAccountOpen: [data.userInfo ? true : false || null],
      remark: [data.remark || null],
      openCsp: [data.userId ? true : false || false],
      customerId: [this.customerId],
      partnerId: [data.partnerId],
      username: [null, [Validators.required]],
      roles: [null, [Validators.required]],
    });
  }

  checkMainContact(id?: any) {
    this.crmContactService
      .checkHasMainContact({
        customerId: this.customerId,
        partnerId: this.partnerId,
      })
      .subscribe((res: any) => {
        if (!res.success || res.message === id) {
          // 可编辑
          this.mainContact = false;
        } else {
          // 不可编辑
          this.mainContact = true;
        }
      });
  }

  bindRoles(id?: any, isMainAccount?: any) {
    if (isMainAccount) {
      id = null;
    }
    this.ssoRoleService
      .getParentOrChildrens({
        type: 1,
        parentId: id,
      })
      .subscribe((res: any) => {
        this.rolesList = res.items;
      });
  }

  bindData(data: any = {}) {
    this.data = data;
    // 验证客户是否主联系人
    this.mainContact = false;

    if (data.id) {
      this.checkMainContact(data.id);
      this.title = this.translate.instant('Edit Contact');
    } else {
      this.title = this.translate.instant('New Contact');
    }

    this.showCsp = false;
    this.isCanDelete = this.data.isCanDelete;
    this.validateForm.reset();
    this.validateForm.patchValue({
      nameLocalization: data.nameLocalization,
      name: data.name,
      surname: data.surname,
      surnameLocalization: data.surnameLocalization,
      phone: data.phone,
      position: data.position,
      mail: data.email,
      fax: data.fax,
      tel: data.tel,
      isMaster: data.isMaster,
      isCspAccountOpen: data.userInfo ? true : false,
      remark: data.remark,
      openCsp: data.userId ? true : false,
      customerId: this.customerId,
      partnerId: data.partnerId,
      username: data.email ? data.email : null,
      roles: data.role || null,
    });
  }

  onSetUserName(text) {
    this.validateForm.patchValue({
      username: text,
    });
  }

  handleCancel() {
    this.loading = false;
    this.isVisible = false;
  }

  handleOk() {
    let checked = this.validateForm.get('isCspAccountOpen').value;
    if (!checked) {
      this.validateForm.controls.username.setValidators([]);
      this.validateForm.controls.roles.setValidators([]);
    } else {
      this.validateForm.controls.username.setValidators([Validators.required]);
      this.validateForm.controls.roles.setValidators([Validators.required]);
    }

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (this.validateForm.valid) {
      this.loading = true;

      if (this.data.id) {
        this.onSubmitData();
      } else {
        // 验证邮箱
        this.crmContactService
          .checkEmailRepeat({
            customerId: this.customerId,
            email: this.validateForm.get('mail').value,
            partnerId: this.partnerId,
            isSignUp: this.validateForm.get('isCspAccountOpen').value,
          })
          .subscribe(
            (res: any) => {
              this.loading = false;
              if (res.message) {
                this.message.warning(res.message);
                return;
              }
              if (!res.success) {
                this.isVisible = false;
                this.modalService.confirm({
                  nzTitle: this.translate.instant('Tips'),
                  nzContent: this.translate.instant('The mailbox already exists, whether to continue to use the existing account?'),
                  nzOkText: this.translate.instant('Yes'),
                  nzOnOk: () => this.onSubmitData(res.userId),
                  nzCancelText: this.translate.instant('No'),
                  nzOnCancel: () => (this.isVisible = true),
                });
              } else {
                this.loading = true;
                this.onSubmitData();
              }
            },
            (err) => {
              this.loading = false;
            },
          );
      }
    }
  }

  onSubmitData(userId?: number) {
    let value: any = this.validateForm.value;
    let entity = new CRMCreateOrUpdateContactInput();
    entity.customerId = this.customerId;
    entity.partnerId = this.partnerId;
    entity.email = value.mail;
    entity.name = value.name;
    entity.surname = value.surname;
    entity.surnameLocalization = value.surnameLocalization;
    entity.nameLocalization = value.nameLocalization;
    entity.phone = value.phone;
    entity.remark = value.remark;
    entity.position = value.position;
    entity.isMaster = value.isMaster == null ? false : value.isMaster;
    entity.isSignUp = value.isCspAccountOpen == null ? false : value.isCspAccountOpen;
    entity.fax = value.fax;
    entity.name = value.name;
    entity.tel = value.tel;
    entity.userId = userId;

    if (this.data) {
      entity.id = this.data.id;
      if (this.data.userInfo && value.username) {
        entity.userId = this.data.userInfo.id;
      }
    }

    let checked = this.validateForm.get('isCspAccountOpen').value;
    if (checked) {
      entity.userName = value.username;
      entity.role = value.roles;
    }
    this.datas.emit(entity);
  }

  show() {
    this.isVisible = true;
    this.loading = false;
  }

  onDelete() {
    if (!this.isCanDelete) {
      this.isVisible = false;
      this.modalService.confirm({
        nzTitle: this.translate.instant('Tips'),
        nzContent: this.translate.instant(
          "This customer has been cited as a 'partner' by another salesperson, please contact the system salesperson to remove the binding and delete it",
        ),
        nzOkText: this.translate.instant('Yes'),
        nzCancelText: null,
        nzOnOk: () => (this.isVisible = true),
        nzOnCancel: () => (this.isVisible = true),
      });
    } else {
      this.crmContactService.unbindOrDeleteUser(this.data.id).subscribe(
        (res) => {
          this.message.success(this.translate.instant('Logout successful'));
          this.validateForm.patchValue({
            isCspAccountOpen: false,
          });
          this.resfush.emit();
        },
        (err) => {
          this.message.success(this.translate.instant('Logout failed'));
        },
      );
    }
  }
}
