import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { STComponent } from '@co/cbc';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { LocationDetailComponent } from '../../location/location-detail/location-detail.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'crm-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less'],
})
export class ContactListComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() set customerInfo(v: any) {
    this.customerDetail = v;
    this.getContacts(v?.id);
  }

  get customerInfo() {
    return this.customerDetail;
  }
  customerDetail: any;
  contacts = [];
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private contactService: CRMContactService,
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
    {
      title: 'Associated location',
      render: 'locations',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 180,
      buttons: [
        {
          text: 'Edit',
          click: (item) => {
            this.onAdd('Edit', item);
          },
        },
        {
          text: 'Void',
          pop: {
            title: ((data, index) => {
              return this.translate.instant('Are you sure?');
            }) as any,
            okType: 'danger',
            icon: 'star',
          },
          iif: (item) => item.isDelete,
          click: (item) => {
            this.delete(item);
          },
        },
        {
          text: 'Enable',
          pop: {
            title: ((data, index) => {
              return this.translate.instant('Are you sure?');
            }) as any,
            okType: 'danger',
            icon: 'star',
          },
          iif: (item) => !item.isDelete,
          click: (item) => {
            this.enableAsync(item);
          },
        },
      ],
    },
  ];
  onTableChange(e) {}

  // 打开新增联系人弹框;
  onAdd(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: ContactDetailComponent,
      nzComponentParams: {
        id: item?.id,
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.getContacts(this.customerInfo.id);
      }
    });
  }

  getContacts(id) {
    this.contactService.getByCustomerOrPartner({ customerId: id, maxResultCount: 999 }).subscribe((res) => {
      this.contacts = res.items;
    });
  }

  delete(item?) {
    this.contactService.delete({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Void successfully!'));
      this.st.load();
    });
  }

  enableAsync(item?) {
    this.contactService.enableAsync({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Enable successfully!'));
      this.st.load();
    });
  }

  bingLocation(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: LocationDetailComponent,
      nzComponentParams: {
        contactIds: [item.id],
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
  }
}
