import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { CreateLocationComponent } from '../create-location/create-location.component';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.less'],
})
export class LocationListComponent implements OnInit {
  @Input() customerId: any;
  @Input() partnerId: any;
  @Output() datas = new EventEmitter<any>();

  @Input() isOwner: any;
  @Output() refushData = new EventEmitter<any>();

  @ViewChild(CreateLocationComponent, { static: true })
  createLocations: CreateLocationComponent;

  sortName: string | null = null;
  sortValue: string | null = null;

  locations: any[];
  totalCount: number;

  //详情的location
  location: any;
  allContacts: any;

  i: any;

  //弹出框选择绑定联系人
  isVisible = false;
  SelectedContantsList: any;
  selectedContantsListIds: any;

  //弹框修改用户
  locationVisible = false;

  filterLocation: {
    CustomerId?: any;
    Sorting?: string;
    MaxResultCount?: number;
    SkipCount?: number;
    PartnerId?: any;
  } = {
    MaxResultCount: 8,
    SkipCount: 1,
  };

  tabLoading = false;

  constructor(
    private translate: TranslateService,
    private customerService: CustomerService,
    public message: NzMessageService,
  ) {}

  ngOnInit() {
    if (this.customerId) {
      this.filterLocation.CustomerId = this.customerId;
    }
    if (this.partnerId) {
      this.filterLocation.PartnerId = this.partnerId;
    }

    this.filterLocation.MaxResultCount = 8;
    this.filterLocation.SkipCount = 1;
    this.getLocationByPageList();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
  }

  search(): void {}

  getLocationByPageList() {
    let num = this.filterLocation.SkipCount - 1;

    let data: any = {
      MaxResultCount: this.filterLocation.MaxResultCount,
      SkipCount: num * this.filterLocation.MaxResultCount,
    };

    if (this.filterLocation.CustomerId) {
      data.CustomerId = this.filterLocation.CustomerId;
    }

    if (this.filterLocation.PartnerId) {
      data.PartnerId = this.filterLocation.PartnerId;
    }

    this.tabLoading = true;
    this.customerService.getLocationByPageList(data).subscribe(
      (res: any) => {
        this.tabLoading = false;
        this.locations = res.items;
        this.totalCount = res.totalCount;
      },
      (err) => {
        this.tabLoading = false;
      },
    );
  }

  pageIndexChange(pageIndex: number) {
    this.filterLocation.SkipCount = pageIndex;
    this.getLocationByPageList();
  }

  locationsDetails(id: any) {
    this.i = id;
    if (id) {
      this.getLocationInfo();
      this.bindContacts();
    }
  }

  bindContacts() {
    this.customerService
      .getAllByLocationOrPartner({
        CustomerId: this.customerId,
        PartnerId: this.partnerId ? this.partnerId : null,
      })
      .subscribe((response: any) => {
        this.allContacts = response.items;
        //获取绑定位置的联系人
        this.customerService
          .getContactByLocationId({
            locationId: this.i,
          })
          .subscribe((res: any) => {
            this.getLocationByPageList();
            this.SelectedContantsList = res.items;
            this.selectedContantsListIds = this.SelectedContantsList.map((item) => item.id);
          });
      });
  }

  getLocationInfo() {
    this.location = null;
    this.customerService.getLocationInfo(this.i).subscribe((res) => {
      this.location = res;
    });
  }

  onBindContants() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.customerService
      .assignUsersToLocation({
        locationId: this.i,
        contactIds: this.selectedContantsListIds,
      })
      .subscribe((res: any) => {
        this.getLocationByPageList();
        this.bindContacts();
      });
    this.isVisible = false;
  }

  onShowLocation() {
    this.createLocations.getInitCustomerOrPartner();
    this.createLocations.show();
    this.createLocations.edit = true;
    this.createLocations.validateForm.reset();
    this.createLocations.bindData(this.location);
  }

  onDeleteLocation() {
    this.customerService.deleteLocationById(this.i).subscribe((res: any) => {
      this.getLocationByPageList();
      this.refushData.emit();
      this.i = null;
    });
  }

  onAddOrUpdateLocation(datas) {
    this.createLocations.loading = true;
    datas.partnerId = this.partnerId;
    datas.customerId = this.customerId;

    if (this.createLocations.edit) {
      this.customerService.updateLocationById(datas).subscribe(
        (res: any) => {
          this.message.success(this.translate.instant('Modify success'));
          this.getLocationByPageList();
          if (this.i) {
            this.bindContacts();
          }

          this.getLocationInfo();
          this.createLocations.handleCancel();
        },
        (err) => {
          this.message.error(JSON.stringify(err.message));
        },
      );
      return;
    }

    // 判断是否是客户
    if (!this.partnerId) {
      this.customerService.createCustomerLocation(datas).subscribe(
        (res: any) => {
          this.createLocations.loading = false;
          this.message.success(this.translate.instant('New success'));
          this.getLocationByPageList();
          this.createLocations.handleCancel();
          if (this.i) {
            this.bindContacts();
            this.getLocationInfo();
          }
          this.refushData.emit('');
        },
        (err) => {
          this.createLocations.loading = false;
        },
      );
      return;
    } else {
      // 处理合作伙伴
      if (!this.createLocations.edit) {
        this.customerService.createPartnerLocation(datas).subscribe(
          (res: any) => {
            this.createLocations.loading = false;
            this.message.success(this.translate.instant('New success'));
            this.getLocationByPageList();
            this.createLocations.handleCancel();
            if (this.i) {
              this.bindContacts();
              this.getLocationInfo();
            }
            this.refushData.emit('');
          },
          (err) => {
            this.createLocations.loading = false;
          },
        );
        return;
      }
    }
  }

  onCreateLocation() {
    this.createLocations.getInitCustomerOrPartner();
    this.createLocations.validateForm.reset();
    this.createLocations.edit = false;
    this.createLocations.title = this.translate.instant('Add Location');
    this.createLocations.show();
  }

  refushDetialData() {
    this.bindContacts();
  }
}
