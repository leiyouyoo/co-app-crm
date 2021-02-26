import { Component, Injector, OnInit } from '@angular/core';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'crm-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.less'],
})
export class LocationListComponent extends CoPageBase {
  constructor(injector: Injector, private translate: TranslateService) {
    super(injector);
  }

  contactInfo: any;
  ngOnInit(): void {}

  columns: STColumn[] = [
    {
      title: '位置名称',
      index: 'name',
      width: 100,
    },
    {
      title: '国家-省/州-城市',
      index: 'name',
      width: 100,
    },
    {
      title: '详细地址',
      index: 'name',
      width: 100,
    },
    {
      title: '邮编地址',
      index: 'name',
      width: 100,
    },
    {
      title: '创建人',
      index: 'name',
      width: 100,
    },
    {
      title: '修改人',
      index: 'name',
      width: 100,
    },
    {
      title: '关联联系人',
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
}
