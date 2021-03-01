import { Component, Injector, OnInit } from '@angular/core';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd';
import { LocationDetailComponent } from '../../location/location-detail/location-detail.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'crm-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less'],
})
export class ContactListComponent extends CoPageBase {
  constructor(injector: Injector, private translate: TranslateService, private modal: NzModalService) {
    super(injector);
  }

  contactInfo: any;
  ngOnInit(): void {}

  columns: STColumn[] = [
    {
      title: '姓名',
      index: 'name',
      width: 100,
    },
    {
      title: '姓名(本地语言)',
      index: 'name',
      width: 100,
    },
    {
      title: '邮箱',
      index: 'name',
      width: 100,
    },
    {
      title: '主联系人',
      index: 'name',
      width: 100,
    },
    {
      title: 'CSP账户情况',
      index: 'name',
      width: 100,
    },
    {
      title: '开通时间',
      index: 'name',
      width: 100,
    },
    {
      title: '角色',
      index: 'name',
      width: 100,
    },
    {
      title: '账号状态',
      index: 'name',
      width: 100,
    },
    {
      title: '关联位置',
      index: 'name',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 100,
      buttons: [
        {
          text: '编辑',
          click: (item) => {},
        },
        {
          text: '作废',
          click: (item) => {},
        },
        {
          text: '启用',
          click: (item) => {},
        },
        {
          text: '删除',
          iif: (item) => item.isDangerFlag,
          pop: {
            title: ((data, index) => {
              return this.translate.instant('Are you sure?');
            }) as any,
            okType: 'danger',
            icon: 'star',
          },
          click: (e) => {
            // this.msg.info('暂未做');
          },
        },
      ],
    },
  ];
  onTableChange(e) {}

  打开新增联系人弹框;
  onAdd() {
    const modal = this.modal.create({
      nzTitle: this.$L('Correct customer name'),
      nzContent: ContactDetailComponent,
      nzComponentParams: {},
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
  }
}
