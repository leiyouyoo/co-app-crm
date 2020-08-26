import { Component, Injector } from '@angular/core';
import { bookingStatus } from '../../../../shared/types/booking/bookingStatus';
import { Router } from '@angular/router';
import { BookingQueryEntity } from '../../../../shared/types/booking/bookingQuery-entity';
import { FreightMethodType } from '../../../../shared/types/booking/FreightMethodType';
import { CSPBookingService, CSPSureServiceCompanyInput } from '../../../../services/csp';
import { PlatformCompanyConfigureService } from '@co/cds';
import { CoPageBase } from '@co/core';

@Component({
  selector: 'booking-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
})
export class BookingComponent extends CoPageBase {
  //询价查询参数
  bookingInputParams: BookingQueryEntity = { IsDistributeServiceCompany: null };
  //报价状态枚举
  bookingState: typeof bookingStatus = bookingStatus;
  bookingStateList: any[];
  bookingList: any[] = [];
  pageinationParams = {
    nzPageSize: 10,
    pageIndex: 1,
    SkipCount: 0, //偏移量
  };
  bookingtotal: number;
  serviceCompanyId: number;
  isShowCompany: boolean = true;
  sortName: string | null = 'CreationTime';
  sortValue: string | null = 'desc';
  //排序
  mapOfSort: { [key: string]: any } = {
    CargoReadydate: null,
  };
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  loading = false;
  height = 500;

  user = JSON.parse(window.localStorage.getItem('co.session'));
  userId = this.user.session.user.icpUserId;

  constructor(
    injector: Injector,
    private companyConfigureService: PlatformCompanyConfigureService,
    private bookingService: CSPBookingService,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    setTimeout(() => {
      this.onDivHeight();
    }, 500);
    this.bookingStateList = Object.keys(this.bookingState).filter((f) => !isNaN(Number(f)));
    this.GetFilterDataSourceByCustomer({ isRequiredContact: true, isRequiredCustomer: true });
    this.GetFilterDataSource({ isRequiredBookingNo: true, isRequiredBookingName: true }); //
    this.GetAllListForCRM(this.bookingInputParams);
  }

  coOnActived() {
    super.coOnActived();
    this.GetAllListForCRM(this.bookingInputParams);
  }

  onDivHeight() {
    // 获取宽高
    const tableDom = document.getElementById('table');
    if (tableDom) {
      this.height = tableDom.clientHeight;
    }
  }

  //获取booking列表
  GetAllListForCRM(searchParam?: BookingQueryEntity) {
    this.loading = true;
    this.bookingService.getAllListForCRM(searchParam).subscribe(
      (res) => {
        this.bookingList = res.items;
        this.bookingtotal = res.totalCount;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  isDisabled: boolean = false;
  search() {
    this.GetAllListForCRM(this.bookingInputParams);
  }

  companylist: any[] = [];
  getServiceCompany(data: any) {
    let placeid = '';
    let locationid = '';
    if (data.originPortId) {
      placeid = data.originPortId;
    } else {
      locationid = data.deliveryWarehouseId;
    }
    this.companyConfigureService.getByPlaceOrLocation({ isActive: true, placeId: placeid, locationId: locationid }).subscribe((res) => {
      this.companylist = res.items;
    });
  }
  //确定分配出货口岸
  SureServiceCompany(data: any) {
    let params: CSPSureServiceCompanyInput = { serviceCompanyId: data.serviceCompanyId, id: data.id };
    this.bookingService.sureServiceCompany(params).subscribe((res) => {
      this.GetAllListForCRM(this.bookingInputParams);
    });
  }

  bookingNoList: any[] = [];
  //CRM条件过滤数据源
  GetFilterDataSource(params: {
    isRequiredBookingNo?: boolean;
    isRequiredBookingName?: boolean;
    isRequiredCustomer?: boolean;
    isRequiredContact?: boolean;
  }) {
    this.bookingService.getFilterDataSource(params).subscribe((res) => {
      this.bookingNoList = res.items;
    });
  }

  customerOrContactList: any[] = [];
  //CRM条件过滤数据源
  GetFilterDataSourceByCustomer(params: {
    isRequiredBookingNo?: boolean;
    isRequiredBookingName?: boolean;
    isRequiredCustomer?: boolean;
    isRequiredContact?: boolean;
  }) {
    this.bookingService.getFilterDataSource(params).subscribe((res) => {
      this.customerOrContactList = res.items;
    });
  }

  //分页
  pageIndexChange(event: number): void {
    if (event > 1) this.pageinationParams.SkipCount = this.pageinationParams.nzPageSize * (event - 1);
    else this.pageinationParams.SkipCount = 0;
    this.bookingInputParams.MaxResultCount = this.pageinationParams.nzPageSize;
    this.bookingInputParams.SkipCount = this.pageinationParams.SkipCount;
    this.GetAllListForCRM(this.bookingInputParams);
  }

  //改变页数大小
  currentPageSizeChange($event: any) {
    this.pageinationParams.nzPageSize = $event;
    this.bookingInputParams.MaxResultCount = this.pageinationParams.nzPageSize;
    this.bookingInputParams.SkipCount = 0;
    this.GetAllListForCRM(this.bookingInputParams);
  }
  //排序
  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    if (this.sortValue) {
      if (this.sortValue.startsWith('desc')) {
        this.sortValue = 'desc';
      }
      if (this.sortValue.startsWith('asc')) {
        this.sortValue = 'asc';
      }
      this.bookingInputParams.Sorting = this.sortName + ' ' + this.sortValue;
      this.GetAllListForCRM(this.bookingInputParams);
    }
  }

  //查看
  view(data: any) {
    this.$navigate(['/crm/booking/bookinglist/bookingDetail', data.id], {
      queryParams: { _title: this.$L('Booking detail') + `-${data.bookingNo}` }
    });
  }
  //新增booking
  addBooking() {
    this.$navigate(['/crm/booking/createBooking', Date.now()], {
      queryParams: { isEdit: false, CRM: true, _title: this.$L('Create booking') },
    }); //createType===1  代表从CRM进去的
  }
  //编辑
  editRouter(data: any, edit: string) {
    this.$navigate(['/crm/booking/createBooking', data.id], {
      queryParams: { isEdit: true, CRM: true, _title: this.$L('Create booking'), },
    });
  }
}
