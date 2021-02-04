import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { CreateContactsComponent } from '../create-contacts/create-contacts.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  CRMLocationService,
  CRMContactService,
  CRMLocationExternalService,
  CRMCreateOrUpdateContactInput,
} from '../../../../../services/crm';
import { SSORoleService } from '@co/cds';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.less'],
})
export class ContactsListComponent implements OnInit {
  @Input() customerId: any;
  @Input() partnerId: any;
  @Input() state: any;
  @Input() editionRoleId: any;
  @Input() isOwner: any;
  @Output() refushData = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() showAuth = new EventEmitter<any>();
  @Output() showMainAccount = new EventEmitter<any>();
  @ViewChild(CreateContactsComponent, { static: true })
  createContacts: CreateContactsComponent;
  i: any;
  //单条联系人数据
  contact: any;
  isMasterText: string;
  passwordVisible = false;
  cspLoading = false;
  password: string;
  newPasswordAgain: string;
  isDeleteShow: boolean;
  tipText: string;
  sortName: string | null = null;
  sortValue: string | null = null;

  users: any[];
  userPassData: any;
  isPasswordVisible = false;
  rolesList: any;
  // 位置
  isVisible = false;
  allLocations: any;
  selectedLocations: any;
  selectedLocationsListIds: any;
  isCanDelete = false;
  //弹框修改用户
  userVisible = false;
  newPassword: string;

  totalCount: number;

  filterContact: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
    PartnerId?: any;
  } = {
    MaxResultCount: 8,
    SkipCount: 1,
  };

  //CSP账号开通模块
  CspModalVisible = false;
  validateForm: any;
  loading = false;
  passwordB = 'success';
  userId: any;
  reg = /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8}$/;

  tabLoading = false;

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private translate: TranslateService,
    private ssoRoleService: SSORoleService,
    private crmLocationService: CRMLocationService,
    private crmContactService: CRMContactService,
    private crmLocationExternalService: CRMLocationExternalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      roles: [null, [Validators.required]],
      isEeamil: [false],
    });

    if (this.customerId) {
      this.filterContact.CustomerId = this.customerId;
    }
    if (this.partnerId) {
      this.filterContact.PartnerId = this.partnerId;
    }

    this.filterContact.MaxResultCount = 8;
    this.filterContact.SkipCount = 1;
    this.isDeleteShow = false;
    this.getCustomerByPageList();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {}

  onBackList() {
    this.i = null;
    this.createContacts.isVisible = false;
    this.getCustomerByPageList();
  }

  onContactsDetails(id) {
    this.i = id;
    this.closeModal.emit();
    this.getContactInfo();
    this.bindLocation();
  }

  bindRoles(id?: any, isMainAccount?: any) {
    if (isMainAccount) {
      id = null;
    }
    this.ssoRoleService
      .getParentOrChildrens({
        type: 1,·
      })
      .subscribe((res: any) => {
        this.rolesList = res.items;
      });
  }

  bindLocation() {
    let data: any = {};
    if (this.customerId) {
      data.customerId = this.customerId;
    }
    if (this.partnerId) {
      data.partnerId = this.partnerId;
    }
    this.crmLocationService.getAllByCustomerOrPartner(data).subscribe((response: any) => {
      this.allLocations = response.items;
      this.crmLocationService
        .getByContactId({
          contactId: this.i,
        })
        .subscribe((res: any) => {
          this.selectedLocations = res.items;
          this.selectedLocationsListIds = this.selectedLocations.map((da) => da.id);
        });
    });
  }

  //获联系人数据
  getCustomerByPageList(id?: any) {
    if (id) {
      this.filterContact.CustomerId = id;
    }
    if (this.filterContact.Sorting) {
      this.filterContact.Sorting = this.filterContact.Sorting + ' ' + this.sortValue;
    }

    let num = this.filterContact.SkipCount - 1;
    let data: any = {
      maxResultCount: this.filterContact.MaxResultCount,
      skipCount: num * this.filterContact.MaxResultCount,
    };

    if (this.filterContact.CustomerId) {
      data.customerId = this.filterContact.CustomerId;
    }

    if (this.filterContact.PartnerId) {
      data.partnerId = this.filterContact.PartnerId;
    }

    this.tabLoading = true;
    this.crmContactService.getByCustomerOrPartner(data).subscribe(
      (res: any) => {
        this.tabLoading = false;
        this.users = res.items;
        this.totalCount = res.totalCount;
      },
      (err) => {
        this.tabLoading = false;
      },
    );
  }

  getContactInfo() {
    this.contact = null;
    this.crmContactService
      .get({
        id: this.i,
      })
      .subscribe((res) => {
        this.contact = res;
        this.isCanDelete = this.contact.isCanDelete;
        this.contact.isMaster === true ? (this.isMasterText = this.translate.instant('Main contact')) : (this.isMasterText = '');
      });
  }

  pageIndexChange(pageIndex: number) {
    this.filterContact.SkipCount = pageIndex;
    this.getCustomerByPageList();
  }

  onBindLocations() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.crmLocationExternalService
      .assignLocationsToUser({
        contactId: this.i,
        locationIds: this.selectedLocationsListIds,
      })
      .subscribe((res: any) => {
        this.getCustomerByPageList();
        this.bindLocation();
        this.refushData.emit();
      });
    this.isVisible = false;
  }

  onUpdateUser() {
    this.createContacts.show();
    this.createContacts.editionRoleId = this.editionRoleId;
    this.createContacts.bindRoles(this.editionRoleId, this.contact.isMainAccount);
    this.createContacts.bindData(this.contact);
  }

  userModalCancel() {
    this.userVisible = false;
  }

  userModalOk() {
    this.userVisible = false;
  }

  onAddOrUpdateContacts(entity: CRMCreateOrUpdateContactInput) {
    this.createContacts.loading = true;
    // 判断编辑或新增
    if (entity.id) {
      this.crmContactService.update(entity).subscribe(
        (res: any) => {
          this.loading = false;
          this.createContacts.loading = false;
          this.message.success(this.translate.instant('Modify success'));
          this.CspModalVisible = false;
          this.createContacts.handleCancel();
          this.getCustomerByPageList();
          this.bindLocation();
          if (this.i) {
            this.getContactInfo();
          }
          this.refushData.emit('');
        },
        (err) => {
          this.loading = false;
          this.createContacts.loading = false;
        },
      );
      return;
    }

    if (entity.partnerId) {
      this.crmContactService.createForPartner(entity).subscribe(
        (res: any) => {
          this.message.success(this.translate.instant('New success'));
          this.createContacts.handleCancel();
          this.getCustomerByPageList();
          this.refushData.emit('');
        },
        (err) => {
          this.createContacts.loading = false;
        },
      );
    } else {
      this.crmContactService.createForCustomer(entity).subscribe(
        (res: any) => {
          this.message.success(this.translate.instant('New success'));
          this.createContacts.handleCancel();
          this.getCustomerByPageList();
          this.refushData.emit('');
        },
        (err) => {
          this.createContacts.loading = false;
        },
      );
    }
  }

  onDeleteContacts() {
    let tipText;
    if (this.contact.userId) {
      tipText = this.translate.instant('The account will no longer log in, whether to continue operation?');
    } else {
      tipText = this.translate.instant('Delete contact?');
    }

    this.modalService.confirm({
      nzTitle: this.translate.instant('Tips'),
      nzContent: tipText,
      nzOkText: this.translate.instant('OK'),
      nzOnOk: () => {
        this.deleteConteacts();
      },
      nzCancelText: this.translate.instant('Cancel'),
    });
  }

  deleteConteacts() {
    this.crmContactService
      .delete({
        id: this.i,
      })
      .subscribe((res: any) => {
        this.refushData.emit();
        this.ngOnInit();
        this.i = null;
      });
  }

  onSetPassword(data) {
    this.isPasswordVisible = true;
    this.newPassword = null;
    this.newPasswordAgain = null;
    this.userPassData = data;
  }

  handlePassCancel() {
    this.isPasswordVisible = false;
  }

  handlePassOk() {
    if (!this.newPassword) {
      this.message.error(this.translate.instant('Please enter the password'));
      return;
    }

    if (this.newPassword !== this.newPasswordAgain) {
      this.message.warning(this.translate.instant('Enter the password twice'));
      return;
    }

    this.cspLoading = true;
    this.crmContactService
      .resetUserPassword({
        userId: this.userPassData.id,
        newPassword: this.newPassword,
      })
      .subscribe(
        (res) => {
          this.cspLoading = false;
          this.isPasswordVisible = false;
          this.message.success(this.translate.instant('Reset password successfully'));
        },
        (err) => {
          this.cspLoading = false;
        },
      );
  }

  onSetUserPassword(data) {
    this.crmContactService
      .resetUserPassword({
        userId: data.id,
        newPassword: data.password,
      })
      .subscribe((res) => {
        this.getContactInfo();
      });
  }

  onUserCancelBind(id) {
    if (!this.isCanDelete) {
      this.modalService.confirm({
        nzTitle: this.translate.instant('Tips'),
        nzContent: this.translate.instant(
          "This customer has been cited as a 'partner' by another salesperson, please contact the system salesperson to remove the binding and delete it",
        ),
        nzOkText: this.translate.instant('Yes'),
        nzCancelText: null,
      });
    } else {
      this.modalService.confirm({
        nzTitle: this.translate.instant('Tips'),
        nzContent: this.translate.instant('Are you sure you want to delete the account?'),
        nzOkText: this.translate.instant('Ok'),
        nzOnOk: () => {
          this.deleteCspUser(id);
          this.refushData.emit();
        },
        nzCancelText: this.translate.instant('Cancel'),
      });
    }
  }

  deleteCspUser(id: any) {
    this.crmContactService
      .unbindOrDeleteUser({
        id: id,
      })
      .subscribe((res) => {
        this.message.success(this.translate.instant('Delete success'));
        this.ngOnInit();
        this.getContactInfo();
      });
  }

  showCspModal() {
    let title = this.translate.instant('Not certified');
    let message = this.translate.instant('Please pass the authentication and review first, and open the main account');
    let text = this.translate.instant('Authentication now');
    if (this.state === 3) {
      title = this.translate.instant('Certification by');
      message = this.translate.instant('Please open the main account first');
      text = this.translate.instant('Open the main account');
    }

    if (this.state === 2) {
      title = this.translate.instant('In the authentication');
      message = this.translate.instant('Financial review, please wait patiently');
      text = this.translate.instant('Ok');
    }
    // 绑定角色
    if (!this.editionRoleId) {
      this.modalService.warning({
        nzTitle: title,
        nzContent: message,
        nzOkText: text,
        nzOnOk: () => {
          if (this.state === 3) {
            this.showMainAccount.emit(true);
          } else if (this.state === 2) {
          } else {
            this.showAuth.emit(true);
          }
        },
      });
      return;
    }

    this.bindRoles(this.editionRoleId, this.contact.isMainAccount);
    this.CspModalVisible = true;
    this.passwordB = 'success';
    this.validateForm.patchValue({
      username: this.contact.email,
    });
  }

  CspModalCancel() {
    this.CspModalVisible = false;
    this.validateForm.reset();
  }

  passwordChange(value) {
    if (this.reg.test(value)) {
      this.passwordB = 'success';
    } else {
      this.passwordB = 'error';
    }
  }

  CspModalOk() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      let value: any = this.validateForm.value;
      let entity = new CRMCreateOrUpdateContactInput();
      entity.customerId = this.customerId;
      entity.partnerId = this.partnerId;
      entity.email = this.contact.email;
      entity.surnameLocalization = this.contact.surnameLocalization;
      entity.nameLocalization = this.contact.nameLocalization;
      entity.phone = this.contact.phone;
      entity.remark = this.contact.remark;
      entity.position = this.contact.position;
      entity.isMaster = this.contact.isMaster == null ? false : this.contact.isMaster;
      entity.isSignUp = true;
      entity.fax = this.contact.fax;
      entity.name = this.contact.name;
      entity.tel = this.contact.tel;
      entity.userId = this.userId;
      entity.userName = value.username;
      entity.role = value.roles;
      entity.isSendEmail = value.isEeamil;

      if (this.contact) {
        entity.id = this.contact.id;
        if (this.contact.userInfo && value.username) {
          entity.userId = this.contact.userInfo.id;
        }
      }

      if (!this.reg.test(value.password)) {
        this.message.warning(
          this.translate.instant('The password must consist of letters and numbers, and the length must be equal to 8 digits'),
        );
        return;
      } else {
        entity.password = value.password;
      }

      this.loading = true;
      this.crmContactService
        .checkEmailRepeat({
          customerId: this.customerId,
          email: this.validateForm.get('username').value,
          partnerId: this.partnerId,
          id: this.contact.id,
        })
        .subscribe(
          (res: any) => {
            this.userId = null;
            if (res.message) {
              this.loading = false;
              this.message.error(res.message);
              return;
            }
            if (!res.success) {
              this.loading = false;
              this.modalService.confirm({
                nzTitle: this.translate.instant('Tips'),
                nzContent: this.translate.instant('The mailbox already exists, whether to continue to use the existing account?'),
                nzOkText: this.translate.instant('Yes'),
                nzOnOk: () => {
                  entity.userId = res.userId;
                  this.onAddOrUpdateContacts(entity);
                },
                nzOnCancel: () => {
                  this.CspModalCancel();
                  this.modalService.closeAll();
                },
                nzCancelText: this.translate.instant('No'),
              });
            } else {
              this.onAddOrUpdateContacts(entity);
            }
          },
          (err) => {
            this.loading = false;
          },
        );
    }
  }

  onCreateContact() {
    this.createContacts.show();
    this.createContacts.editionRoleId = this.editionRoleId;
    this.createContacts.bindRoles(this.editionRoleId, false);
    this.createContacts.bindData();
  }

  refushDetialData() {
    this.bindLocation();
  }
}
