import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { STData } from '@co/cbc';
import { STComponent } from '@co/cbc';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { LocationDetailComponent } from '../../location/location-detail/location-detail.component';
import { BindLocationComponent } from '../bind-location/bind-location.component';
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
  loading = false;
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private contactService: CRMContactService,
    private locationService: CRMLocationService,
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
      render: 'isMaster',
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
      render: 'role',
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
      className: 'no-line-through',
      buttons: [
        {
          text: 'Edit',
          iif: (item) => !item.isDeleted,
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
          className: (record: STData) => {
            return `st__btn--red`;
          },
          iif: (item) => !item.isDeleted,
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
          iif: (item) => item.isDeleted,
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
        isAdd: title,
        editionRoleId:this.customerInfo.editionRoleId
      },
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res.isSucccess) {
        // this.st.load();
        this.getContacts(this.customerInfo.id);
      }
    });
  }

  getContacts(id) {
    this.loading = true;
    this.contactService.getByCustomerOrPartner({ customerId: id, maxResultCount: 999 }).subscribe(
      (res) => {
        this.contacts = res.items;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  delete(item?) {
    this.contactService.delete({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Void successfully!'));
      // this.st.load();
      this.getContacts(this.customerInfo.id);
    });
  }

  deleteLocation(item?) {
    this.locationService.delete({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Void successfully!'));
      // this.st.load();
      this.getContacts(this.customerInfo.id);
    });
  }

  enableAsync(item?) {
    this.contactService.enableAsync({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Enable successfully!'));
      // this.st.load();
      this.getContacts(this.customerInfo.id);
    });
  }

  bingLocation(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: BindLocationComponent,
      nzComponentParams: {
        customerInfo: this.customerInfo,
        contactIds: [item.id],
      },
      nzClassName: 'crm-bingContact',
      nzStyle: { width: '50%',height:'500px' },
      nzFooter: null,
    });
    modal.componentInstance.onBindSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.getContacts(this.customerInfo.id);
      }
    });
  }

  /**
   * 获取行样式
   *
   * @param record
   * @param index
   */
  getRowClassName = (record: STData, index: number) => {
    if (record.isDeleted) {
      return `st-row-line-through`;
    } else {
      return ``;
    }
  };
}
