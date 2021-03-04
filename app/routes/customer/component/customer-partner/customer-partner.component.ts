import { Component, OnInit, Input, ViewChild, EventEmitter, Output, Injector } from '@angular/core';
import { PartnerBindCustomerComponent } from '../partner-bind-customer/partner-bind-customer.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CRMPartnerService } from 'apps/crm/app/services/crm';
import { STColumn } from '@co/cbc';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'customer-partner',
  templateUrl: './customer-partner.component.html',
  styleUrls: ['./customer-partner.component.less'],
})
export class CustomerPartnerComponent extends CoPageBase implements OnInit {
  @Input() customerId: any;
  sortName: string | null = null;
  sortValue: string | null = null;
  loading = false;
  listOfData: any[];
  totalCount: number;

  filterPartner: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
  } = {
    MaxResultCount: 10,
    SkipCount: 1,
  };
  columns: STColumn[] = [
    {
      title: 'Partner name',
      index: 'name',
      width: 100,
    },
    {
      title: 'Owner',
      index: 'partnerCustomerOwner',
      width: 100,
    },
    {
      title: 'Account information',
      index: 'isRegistered',
      render: 'isRegistered',
      width: 100,
    },
    {
      title: 'Bind customer',
      index: 'partnerCustomer',
      width: 100,
    },
    {
      title: '客户创建人',
      index: 'creator',
      width: 100,
    },
    {
      title: 'Binding by',
      index: 'bindUserName',
      width: 100,
    },
    {
      title: 'Binding time',
      index: 'bindTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 100,
      buttons: [
        {
          text: '解绑',
          iif: (item) => item.bindUserName,
          pop: {
            title: ((data, index) => {
              return this.translate.instant('Are you sure?');
            }) as any,
            okType: 'danger',
            icon: 'star',
          },
          click: (e) => {
            this.unBindCustomer(e.id);
          },
        },
      ],
    },
  ];

  //合作伙伴查询
  modalName: string;

  // @ViewChild(PartnerBindCustomerComponent, { static: true }) partnerBindCustomer: PartnerBindCustomerComponent;

  //合作伙伴id和名称
  partnerId: any;
  partnerName: string;

  //
  @Output() private outerPartnerDetails = new EventEmitter<string>();

  constructor(
    private crmPartnerService: CRMPartnerService,
    injector: Injector,
    private modal: NzModalService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.filterPartner.CustomerId = this.customerId;
    this.getPartnerByPageList(this.filterPartner);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
  }

  onTableChange(e) {
  }

  onShowNewCustomer() {
    const modal = this.modal.create({
      nzTitle: this.$L('Bind customer'),
      nzContent: PartnerBindCustomerComponent,
      nzComponentParams: { customerId: this.customerId },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '80%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.outData.subscribe((r) => {
      this.partnerOk(r);
    });
  }

  bindCustomer(data) {
    const modal = this.modal.create({
      nzTitle: this.translate.instant('Bind customer'),
      nzContent: PartnerBindCustomerComponent,
      nzComponentParams: { modalName: data.name, customerId: this.customerId },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '80%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.outData.subscribe((r) => {
      this.partnerOk(r);
    });
  }

  unBindCustomer(id) {
    this.loading = true;
    this.crmPartnerService
      .unBindCustomer({
        // tslint:disable-next-line: radix
        partnerId: id,
      })
      .subscribe((res) => {
        this.loading = false;
        this.getPartnerByPageList(this.filterPartner);
        this.message.success(this.translate.instant('Unbound success'), {
          nzDuration: 3000,
        });
      }, e => this.loading = false);
  }

  transferToCustomer(id, name) {
    const modal = this.modal.create({
      nzTitle: this.translate.instant('Convert to customer'),
      nzContent: PartnerBindCustomerComponent,
      nzComponentParams: { customerId: this.customerId },
      nzClassName: 'crm-location-detail',
      nzStyle: { width: '80%' },
      nzFooter: null,
    });
    const component = modal.getContentComponent();
    component.outData.subscribe((r) => {
      this.partnerOk(r);
    });
    component.showSearch = false;
    component.validateForm.patchValue({
      name: name,
    });
    component.search(id);
  }

  //获联系人数据
  getPartnerByPageList(filterObj: { CustomerId?: any; Sorting?: string; MaxResultCount?: number; SkipCount?: number }) {
    if (filterObj.Sorting) {
      filterObj.Sorting = filterObj.Sorting + ' ' + this.sortValue;
    }
    let num = filterObj.SkipCount - 1;
    this.loading = true;
    this.crmPartnerService
      .getAll({
        customerId: filterObj.CustomerId,
        maxResultCount: filterObj.MaxResultCount,
        skipCount: num * filterObj.MaxResultCount,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.listOfData = res.items;
          this.totalCount = res.totalCount;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  details(id) {
    this.outerPartnerDetails.emit(id);
  }

  pageIndexChange(pageIndex: number) {
    this.filterPartner.SkipCount = pageIndex;
    this.getPartnerByPageList(this.filterPartner);
  }

  partnerOk(update) {
    if (update.showMsg) {
      this.message.success(this.translate.instant('Set success'));
    }

    if (update.update) {
      this.ngOnInit();
    }
  }
}
