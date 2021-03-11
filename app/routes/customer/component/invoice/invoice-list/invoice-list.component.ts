import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { CoPageBase } from '@co/core';
import { STColumn, STComponent, STData } from '@co/cbc';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CRMContactService, CRMCustomerTitleService, CRMLocationService } from 'apps/crm/app/services/crm';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
@Component({
  selector: 'crm-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.less'],
})
export class InvoiceListComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() set customerInfo(v: any) {
    this.customerDetail = v;
    this.getCustomerTitle(v?.id);
  }

  get customerInfo() {
    return this.customerDetail;
  }
  customerDetail: any;
  invoiceTitleList = [];
  loading = false;
  constructor(
    injector: Injector,
    private translate: TranslateService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private contactService: CRMContactService,
    private locationService: CRMLocationService,
    private crmCustomerTitleService: CRMCustomerTitleService,
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  columns: STColumn[] = [
    {
      title: 'Invoice type',
      index: 'type',
      render: 'type',
      width: 100,
    },
    {
      title: 'Status',
      index: 'isValid',
      render: 'isValid',
      width: 100,
    },
    {
      title: 'CRM.Name',
      index: 'name',
      width: 100,
    },
    {
      title: 'TFN',
      index: 'tfn',
      width: 100,
    },
    {
      title: 'Address',
      index: 'address',
      width: 100,
    },
    {
      title: 'TEL',
      index: 'tel',
      width: 100,
    },
    {
      title: 'Bank Information',
      index: 'bankAccount1',
      width: 100,
    },
    {
      title: 'Bank Information2',
      index: 'bankAccount2',
      width: 100,
    },
    {
      title: 'Created by',
      index: 'creator',
      width: 100,
    },
    {
      title: 'Create Date',
      index: 'creationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
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
          iif: (item) => item.isValid,
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
          iif: (item) => item.isValid,
          click: (item) => {
            this.enableAsync(item, 'Void');
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
          iif: (item) => !item.isValid,
          click: (item) => {
            this.enableAsync(item, 'Enable');
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
      nzContent: InvoiceDetailComponent,
      nzComponentParams: {
        id: item?.id,
        customerId: this.customerInfo.id,
        isAdd: title,
      },
      nzClassName: 'crm-invoice-detail',
      nzStyle: { width: '42%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res) {
        this.getCustomerTitle(this.customerInfo.id);
      }
    });
  }

  getCustomerTitle(id) {
    this.loading = true;
    this.crmCustomerTitleService.getAll({ customerId: id, maxResultCount: 999 }).subscribe(
      (res) => {
        this.invoiceTitleList = res.items;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  // delete(item?) {
  //   this.crmCustomerTitleService.delete({ id: item.id }).subscribe((res) => {
  //     this.msg.info(this.$L('Void successfully!'));
  //     // this.st.load();
  //     this.getCustomerTitle(this.customerInfo.id);
  //   });
  // }

  enableAsync(item?, type?) {
    this.crmCustomerTitleService.setValid({ id: item.id }).subscribe((res) => {
      if (type == 'Enable') {
        this.msg.info(this.$L('Enable successfully!'));
      } else {
        this.msg.info(this.$L('Void successfully!'));
      }
      // this.st.load();
      this.getCustomerTitle(this.customerInfo.id);
    });
  }

  /**
   * 获取行样式
   *
   * @param record
   * @param index
   */
  getRowClassName = (record: STData, index: number) => {
    if (!record.isValid) {
      return `st-row-line-through`;
    } else {
      return ``;
    }
  };
}
