import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { STComponent } from '@co/cbc';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { LocationDetailComponent } from '../location-detail/location-detail.component';

@Component({
  selector: 'crm-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.less'],
})
export class LocationListComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() set customerInfo(v: any) {
    this.customerDetail = v;
    this.getLocation(v?.id);
  }

  get customerInfo() {
    return this.customerDetail;
  }
  customerDetail: any;
  locations = [];
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private modal: NzModalService,
    private contactService: CRMContactService,
    private locationService: CRMLocationService,
    private msg: NzMessageService,
  ) {
    super(injector);
  }

  contactInfo: any;
  ngOnInit(): void {}

  columns: STColumn[] = [
    {
      title: 'Location name',
      index: 'name',
      width: 100,
    },
    {
      title: 'Country/Province/State',
      render: 'cpc',
      width: 100,
    },
    {
      title: 'Address detail',
      index: 'streetAddress',
      width: 100,
    },
    {
      title: 'Zip code',
      index: 'zip',
      width: 100,
    },
    {
      title: 'CreateUser',
      index: 'creator',
      width: 100,
    },
    {
      title: 'Modified by',
      index: 'lastModifier',
      width: 100,
    },
    {
      title: 'Contact',
      index: 'contacts',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 100,
      buttons: [
        {
          text: 'Edit',
          click: (item) => {
            this.onAdd('Edit', item);
          },
        },
        {
          text: 'Void',
          click: (item) => {
            this.delete(item);
          },
        },
        {
          text: 'Enable',
          click: (item) => {
            this.enableAsync(item);
          },
        },
        // {
        //   text: '删除',
        //   iif: (item) => item.isDangerFlag,
        //   pop: {
        //     title: ((data, index) => {
        //       return this.translate.instant('Are you sure?');
        //     }) as any,
        //     okType: 'danger',
        //     icon: 'star',
        //   },
        //   click: (e) => {
        //     // this.msg.info('暂未做');
        //   },
        // },
      ],
    },
  ];
  onTableChange(e) {}

  onAdd(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: LocationDetailComponent,
      nzComponentParams: {
        id: item?.id,
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
  }

  delete(item?) {
    this.locationService.delete({ id: item.id }).subscribe((res) => {
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
  getLocation(id) {
    this.locationService.getAll({ customerId: id, maxResultCount: 999 }).subscribe((res) => {
      this.locations = res.items;
    });
  }
}
