import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { STComponent, STData } from '@co/cbc';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ContactDetailComponent } from '../../contact/contact-detail/contact-detail.component';
import { BindContactsComponent } from '../bind-contacts/bind-contacts.component';
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
  loading = false;

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
      render:'name',
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
      title: 'Associate contacts',
      index: 'contacts',
      render: 'contacts',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      className: 'no-line-through',
      width: 100,
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
          iif: (item) => !item.isDeleted,
          className: (record: STData) => {
            return `st__btn--red`;
          },
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

  onAdd(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: LocationDetailComponent,
      nzMaskClosable:false,
      nzComponentParams: {
        id: item?.id,
        customerId: this.customerInfo.id,
      },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.getLocation(this.customerInfo.id);
      }
    });
  }

  delete(item?) {
    this.locationService.delete({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Void successfully!'));
      // this.st.load();
      this.getLocation(this.customerInfo.id);
    });
  }

  deleteContact(item?, data?) {
    this.locationService.unbindUserLocation({ locationId: data.id, contactId: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Void successfully!'));
      // this.st.load();
      this.getLocation(this.customerInfo.id);
    });
  }

  enableAsync(item?) {
    this.locationService.enableAsync({ id: item.id }).subscribe((res) => {
      this.msg.info(this.$L('Enable successfully!'));
      // this.st.load();
      this.getLocation(this.customerInfo.id);
    });
  }

  getLocation(id) {
    this.loading = true;
    this.locationService.getAll({ customerId: id, maxResultCount: 999, isAll: true }).subscribe(
      (res) => {
        this.locations = res.items;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  bingContact(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: BindContactsComponent,
      nzMaskClosable:false,
      nzComponentParams: {
        locationId: item.id,
        customerInfo: this.customerInfo,
      },
      nzClassName: 'crm-bingContact',
      nzStyle: { width: '45%', height: '520px' },
      nzFooter: null,
    });
    modal.componentInstance.onBindSubmitted.subscribe((res) => {
      if (res) {
        // this.st.load();
        this.getLocation(this.customerInfo.id);
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
