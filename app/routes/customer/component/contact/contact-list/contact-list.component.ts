import { Component, Injector, Input, OnInit } from '@angular/core';
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
      title: '姓名',
      render: 'xm',
      width: 100,
    },
    {
      title: '姓名(本地语言)',
      render: 'xml',
      width: 100,
    },
    {
      title: '邮箱',
      index: 'email',
      width: 100,
    },
    {
      title: '主联系人',
      index: 'isMaster',
      width: 100,
    },
    {
      title: 'CSP账户情况',
      index: 'userId',
      render: 'userId',
      width: 100,
    },
    {
      title: '开通时间',
      render: 'creationTime',
      width: 100,
    },
    {
      title: '角色',
      index: 'role',
      width: 100,
    },
    {
      title: '账号状态',
      render: 'isActive',
      width: 100,
    },
    {
      title: '关联位置',
      render: 'locations',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 180,
      buttons: [
        {
          text: '编辑',
          click: (item) => {
            this.onAdd('Edit', item);
          },
        },
        {
          text: '作废',
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
          text: '启用',
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
      nzTitle: this.$L('Correct customer name'),
      nzContent: ContactDetailComponent,
      nzComponentParams: {
        id: item.id,
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
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
      this.msg.info('作废成功');
    });
  }

  enableAsync(item?) {
    this.contactService.enableAsync({ id: item.id }).subscribe((res) => {
      this.msg.info('启用成功');
    });
  }
}
