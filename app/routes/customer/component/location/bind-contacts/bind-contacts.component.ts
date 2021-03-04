import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ContactDetailComponent } from '../../contact/contact-detail/contact-detail.component';

@Component({
  selector: 'crm-bind-contacts',
  templateUrl: './bind-contacts.component.html',
  styleUrls: ['./bind-contacts.component.less'],
})
export class BindContactsComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @Output() readonly onBindSubmitted = new EventEmitter<boolean>();
  @Input() set customerInfo(v: any) {
    this.customerDetail = v;
    this.getContacts(v?.id);
  }

  get customerInfo() {
    return this.customerDetail;
  }
  customerDetail: any;
  @Input() locationId: string;
  isAdd = false; //是否显示新增按钮
  contacts = [];
  selected = [];
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private contactService: CRMContactService,
    private locationService: CRMLocationService,
    private modalRef: NzModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  columns: STColumn[] = [
    {
      title: 'Name',
      render: 'xm',
      width: 100,
    },
    {
      title: 'Name(LocationName)',
      render: 'xml',
      width: 100,
    },
    {
      title: 'Email',
      index: 'email',
      width: 100,
    },
    {
      title: 'Main contact',
      index: 'isMaster',
      width: 100,
    },
    {
      title: 'CSP Credentials',
      index: 'userId',
      render: 'userId',
      width: 100,
    },
    {
      title: 'Opening time',
      render: 'creationTime',
      width: 100,
    },
    {
      title: 'Role',
      index: 'role',
      width: 100,
    },
    {
      title: 'Account status',
      render: 'isActive',
      width: 100,
    },
  ];
  onTableChange(e) {
    switch (e.type) {
      case 'checkbox': {
        this.selected = e.checkbox;
        break;
      }
    }
  }

  bingContactCancel() {
    this.getContacts(this.customerInfo.id);
    this.isAdd = false;
  }

  reloadLocationList(e) {
    if (e.isSucccess) {
      this.locationId = e.id;
      this.onBindSubmitted.emit(true);
    }
  }

  //绑定
  onBind() {
    const contactIds = this.selected.map((c) => c.id);
    this.locationService.assignUsersToLocation({ locationId: this.locationId, contactIds: contactIds }).subscribe(
      (res) => {
        this.msg.info(this.$L('Bind success'));
        this.onBindSubmitted.emit(true);
        this.cancel();
      },
      (error) => {
        this.onBindSubmitted.emit(false);
      },
    );
  }
  cancel() {
    this.modalRef.close();
  }

  getContacts(id) {
    this.contactService.getByCustomerOrPartner({ customerId: id, maxResultCount: 999 }).subscribe((res) => {
      this.contacts = res.items;
    });
  }
}
