import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'crm-bind-location',
  templateUrl: './bind-location.component.html',
  styleUrls: ['./bind-location.component.less'],
})
export class BindLocationComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() contactIds = [];
  @Input() set customerInfo(v: any) {
    this.customerDetail = v;
  }

  get customerInfo() {
    return this.customerDetail;
  }

  @Output() readonly onBindSubmitted = new EventEmitter<boolean>();
  customerDetail: any;
  locations = [];
  searchParams = {
    searchText: '',
  };
  isAdd = false; //是否显示新增按钮
  selected = [];
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private modal: NzModalService,
    private contactService: CRMContactService,
    private locationService: CRMLocationService,
    private msg: NzMessageService,
    private modalRef: NzModalRef,
  ) {
    super(injector);
  }

  contactInfo: any;
  ngOnInit(): void {
    if (this.customerInfo.id && this.contactIds.length > 0) {
      this.getLocation(this.customerInfo.id);
    }
  }

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
    // {
    //   title: 'Action',
    //   type: 'action',
    //   width: 100,
    //   buttons: [
    //     {
    //       text: '绑定',
    //       click: (item) => {},
    //     },
    //   ],
    // },
  ];

  onTableChange(e) {
    switch (e.type) {
      case 'checkbox': {
        this.selected = e.checkbox;
        break;
      }
    }
  }

  reloadContactList(e) {
    if (e) {
      this.onBindSubmitted.emit(true);
    }
  }

  getLocation(id) {
    this.locationService.getAll({ customerId: id, bindContactId: this.contactIds[0], maxResultCount: 999 }).subscribe((res) => {
      this.locations = res.items;
    });
  }

  //取消隐藏新增弹框
  bingLocationCancel() {
    this.getLocation(this.customerInfo.id);
    this.isAdd = false;
  }

  //绑定
  onBind() {
    const locationIds = this.selected.map((c) => c.id);
    const contactId = this.contactIds[0];
    this.locationService.assignLocationsToUser({ contactId: contactId, locationIds: locationIds }).subscribe(
      (res) => {
        this.msg.info(this.$L('绑定成功'));
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
}
