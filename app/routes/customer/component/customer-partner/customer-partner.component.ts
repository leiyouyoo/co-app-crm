import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { PartnerBindCustomerComponent } from '../partner-bind-customer/partner-bind-customer.component';
import { NzMessageService } from 'ng-zorro-antd';
import { CrmService } from 'projects/crm/src/public-api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'customer-partner',
  templateUrl: './customer-partner.component.html',
  styleUrls: ['./customer-partner.component.less'],
})
export class CustomerPartnerComponent implements OnInit {
  @Input()
  customerId: any;
  @Input() isOwner: any;
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
  //合作伙伴查询
  isVisiblePartner = false;
  modalName: string;
  bindCustomerTitle = this.translate.instant('Bind customer');

  @ViewChild(PartnerBindCustomerComponent, { static: true }) partnerBindCustomer: PartnerBindCustomerComponent;

  //合作伙伴id和名称
  partnerId: any;
  partnerName: string;

  //
  @Output() private outerPartnerDetails = new EventEmitter<string>();

  constructor(
    private customerService: CustomerService,
    private message: NzMessageService,
    private translate: TranslateService,
    private crmService: CrmService,
  ) {}

  ngOnInit() {
    this.filterPartner.CustomerId = this.customerId;

    this.getPartnerByPageList(this.filterPartner);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {}

  bindCustomer(data) {
    this.partnerBindCustomer.listOfData = [];
    this.bindCustomerTitle = this.translate.instant('Bind customer');
    if (data.name) {
      this.modalName = data.name;
      this.bindCustomerTitle = '';
      this.partnerBindCustomer.hasValue = true;
      this.partnerBindCustomer.getCustomerByName(data.name, data.id);
    }
    this.isVisiblePartner = true;
  }

  unBindCustomer(id) {
    this.customerService
      .unBindCustomer({
        // tslint:disable-next-line: radix
        partnerId: id,
      })
      .subscribe((res) => {
        this.getPartnerByPageList(this.filterPartner);
        this.message.success(this.translate.instant('Unbound success'), {
          nzDuration: 3000,
        });
      });
  }

  createCancelPartner() {
    this.modalName = '';
    //this.partnerCustomer.cancelEdit();
    this.isVisiblePartner = false;
    this.partnerBindCustomer.hasValue = true;
    // this.ngOnInit();
  }

  createOkPartner() {
    this.isVisiblePartner = false;
  }

  transferToCustomer(id, name) {
    this.isVisiblePartner = true;
    this.partnerBindCustomer.showSearch = false;
    this.partnerBindCustomer.ngOnInit();
    this.partnerBindCustomer.validateForm.patchValue({
      name: name,
    });
    this.partnerBindCustomer.search(id);

    // return;
    // let entity = {
    //   partnerId: id,
    //   partnerName: name,
    // };

    // this.crmService.partnerTurnToCustomer(entity).subscribe(
    //   (res) => {
    //     this.message.success('绑定成功');
    //     this.getPartnerByPageList(this.filterPartner);
    //   },
    //   (err) => {
    //     this.message.error('绑定失败');
    //   },
    // );
  }

  //获联系人数据
  getPartnerByPageList(filterObj: { CustomerId?: any; Sorting?: string; MaxResultCount?: number; SkipCount?: number }) {
    if (filterObj.Sorting) {
      filterObj.Sorting = filterObj.Sorting + ' ' + this.sortValue;
    }
    let num = filterObj.SkipCount - 1;
    this.loading = true;
    this.customerService
      .getPartnerByPageList({
        CustomerId: filterObj.CustomerId,
        MaxResultCount: filterObj.MaxResultCount,
        SkipCount: num * filterObj.MaxResultCount,
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

  onShowNewCustomer() {
    this.isVisiblePartner = true;
    this.partnerBindCustomer.ngOnInit();
  }

  partnerOk(update) {
    this.isVisiblePartner = false;
    if (update.showMsg) {
      this.message.success(this.translate.instant('Set success'));
    }

    if (update.update) {
      this.ngOnInit();
    }
  }
}
