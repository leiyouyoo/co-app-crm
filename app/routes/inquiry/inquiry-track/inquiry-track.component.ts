import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzMessageService, NzSelectComponent } from 'ng-zorro-antd';
// import { CustomerService } from '../../customer/service/customer.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
// import { WeightUnitCode, VolumeUnitCode } from 'projects/cityocean/quote-library/src/public-api';
import { InquiryDetialComponent } from '../inquiry-detial/inquiry-detial.component';
import { TrackDetialComponent } from '../track-detial/track-detial.component';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CRMCustomerService } from 'apps/crm/app/services/crm/customer.service';
import { PlatformOrganizationUnitService, PUBPlaceService } from '@co/cds';
import { RatesTruckServiceService } from '../../../services/rates/truck-service.service';
import { RatesFavoriteRateServiceService } from '../../../services/rates/favorite-rate-service.service';
import { RatesQuoteEnquiryService } from '../../../services/rates/quote-enquiry.service';
import { debounce } from 'apps/crm/app/shared/utils';
import { STColumn } from '@co/cbc';
import { Observable } from 'rxjs';
import { TruckingFromToComponent } from '../share/component/trucking-from-to/trucking-from-to.component';
import { ACLService } from '@co/acl';
// import { debounce } from '@shared/utils/debounce';

@Component({
  selector: 'app-inquiry-track',
  templateUrl: './inquiry-track.component.html',
  styleUrls: ['./inquiry-track.component.less'],
})
export class InquiryTrackComponent implements OnInit {
  validateForm: FormGroup;
  searchForm: FormGroup;
  datas: any;

  basicPortList: any;
  placeList: any;
  carriers: any;
  shippings: any;
  unitUsers: any;
  showMoreSearch = false;

  modalVisible = false;
  loading = false;

  placeAndCountyList: any;

  dataOfList: any;
  tablestitle: any;
  maxResultCount = 20;
  skipCount = 1;
  listTotal: any;

  detialVisible = false;
  // modalVisible = true;
  placeAndCountyToListType: any;
  placeAndCountyToList: any;
  carrierCustomerList: any;
  inquiryId: string;

  showInquiryBtn: boolean = false;

  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;

  // @ViewChild('detial', { static: true })
  // detial: any;

  @ViewChild('detial', { static: false })
  public detailComponent: TrackDetialComponent;

  customerUserList: any;
  customerList: any;

  drawerStyle: any = {
    width: '680px',
    paddingLeft: '0px',
  };
  maskStyle: any = {
    background: 'transparent',
    zindex: '-1',
  };

  isFllow = false;
  isAll: any;
  id: any;
  //通知 类型
  notifationType = 0;
  @ViewChild(TruckingFromToComponent)
  truckingFromToComponent: TruckingFromToComponent;
  onStartChange() {
    this.validateForm.patchValue({ deliveryDate: null });
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.get('cargoReadyDate').value) {
      return false;
    }

    return endValue.getTime() <= this.validateForm.get('cargoReadyDate').value.getTime();
  };

  onAStartChange() {
    this.validateForm.patchValue({ deliveryDate: null });
  }

  disabledAStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
  };

  disabledAEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.get('cargoReadyDate').value) {
      return false;
    }

    return endValue.getTime() <= this.validateForm.get('cargoReadyDate').value.getTime();
  };

  numValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return;
      }
      return control.value > 0 ? null : { existSameCode: true };
    };
  }

  sorting: string;
  sortName: string | null = 'CreationTime';
  sortValue: string | null = 'desc';
  //排序
  mapOfSort: { [key: string]: any } = {
    rate: null,
  };

  columns: STColumn[] = [
    { title: 'Attention', index: '', render: 'Attention', width: 40 },
    { title: 'From', index: '', render: 'From', width: 120 },
    { title: 'To', index: '', render: 'To', width: 120 },
    { title: 'Zip code', index: 'zipCode', width: 60 },
    {
      title: 'Rate',
      index: '',
      width: 80,
      render: 'Rate',
    },
    { title: 'Fuel', index: 'fuel', width: 70, format: (data) => `${data.fuel}%` },
    {
      title: 'Total',
      index: '',
      width: 70,
      render: 'Total',
    },
    { title: 'Currerncy', index: 'currency', width: 70 },
    {
      title: 'Status',
      index: 'account',
      width: 80,
      format: (item) => {
        if (item.status == '0') {
          return this.translate.instant('effective');
        } else if (item.status == 1) {
          return this.translate.instant('invalid');
        }
      },
    },
    { title: 'Duration', index: '', width: 80, render: 'Duration' },
    { title: 'Trucker', index: 'carrier', width: 120 },
    {
      title: 'business type',
      index: '',
      width: 120,
      format: (item, _col) => {
        if (item.businessType == 2) {
          return this.translate.instant('Contract price');
        } else if (item.businessType == 3) {
          if (item.status == null) {
            return this.translate.instant('Inquiry-to be quoted');
          } else if (item.status == 0) {
            return this.translate.instant('Inquiry-Quoted');
          } else if (item.status == 1) {
            return this.translate.instant('Inquiry-Invalid quote');
          }
        }
      },
    },
    { title: 'NO', index: 'no', width: 120 },
    { title: 'Update By', index: 'users', width: 120 },
    { title: 'Reject reason', index: 'rejectRemark', width: 120 },
    {
      title: 'Action',
      type: 'action',
      width: 80,
      render: 'action',
      fixed: 'right',
      buttons: [],
    },
  ];

  constructor(
    // private customerService: CustomerService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService,
    private crmCustomer: CRMCustomerService,
    private OrganizationUnit: PlatformOrganizationUnitService,
    private pubPlace: PUBPlaceService,
    private ratesTruckServiceService: RatesTruckServiceService,
    private ratesFavoriteRateServiceService: RatesFavoriteRateServiceService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    private aCLService: ACLService,
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      Type: [1],
      From: [null],
      To: [null],
      Carrier: [null],
      Status: [null],
      DurationStart: [null],
      DurationEnd: [null],
      No: [null],
      zipCode: [null],
    });

    this.validateForm = this.fb.group({
      truckType: [2, [Validators.required]],
      truckPortId: [null, [Validators.required]],
      truckAddressId: [null, [Validators.required]],
      ownerCustomerId: [null],
      ownerContactId: [null],
      isShipper: ['false'],
      cargoReadyDate: [null],
      deliveryDate: [null],
      quantity: [null, [this.numValidator()]],
      quantityUnitCode: 'ctn',
      weight: [null, [this.numValidator()]],
      weightUnitCode: [WeightUnitCode.KGS],
      volume: [null, [this.numValidator()]],
      volumeUnitCode: [VolumeUnitCode.CBM],
      zipCode: [null, [Validators.required]],
      description: [null],
      etod: [null],
      commodity: [null],
      carrierCustomerId: [null],
      replyUserId: [null, [Validators.required]],
      FreightMethodType: [3],
      id: [],
    });
    this.validateForm.controls.truckType.valueChanges.subscribe((res) => {
      this.ngModelChangeYruckType();
    });
    // 单位公制英制统一切换
    const weightUnitCode = this.validateForm.get('weightUnitCode');
    const volumeUnitCode = this.validateForm.get('volumeUnitCode');
    const hashObj = {
      [VolumeUnitCode.CBM]: WeightUnitCode.KGS,
      [VolumeUnitCode.CFT]: WeightUnitCode.LBS,
      [WeightUnitCode.KGS]: VolumeUnitCode.CBM,
      [WeightUnitCode.LBS]: VolumeUnitCode.CFT,
    };
    weightUnitCode.valueChanges.subscribe((value) => {
      volumeUnitCode.setValue(hashObj[value], { emitEvent: false });
    });
    volumeUnitCode.valueChanges.subscribe((value) => {
      weightUnitCode.setValue(hashObj[value], { emitEvent: false });
    });
    this.activeRoute.queryParams.subscribe((params) => {
      this.id = params?.id;
      if (params?.truckType) {
        this.searchForm.controls.Type.setValue(Number(params?.truckType));
      }
      this.bindData();
    });
    this.bindData();

    if (this.aCLService.can(['j:销售代表', 'j:海外拓展', 'j:拓展员', 'j: 电商顾问'])) {
      this.showInquiryBtn = true;
    }
  }

  getCustomerList() {
    this.crmCustomer
      .getCurrentCustomerAndPartner({
        includePartner: false,
      })
      .subscribe((res: any) => {
        this.customerList = res.items;
      });
  }

  bindData() {
    this.getCRMCarrierList('');
    this.getPlace();
    this.getBasicPortList();
    this.getCustomerList();
    this.getCarrierCustomerList();
    this.getPlaceAndCounty();
    this.getOrganizationUnitUsers();
    this.isFllow = true;
    this.onGetAll();
  }

  getOrganizationUnitUsers() {
    this.OrganizationUnit.getOrganizationUnitUsers({
      organizationUnitName: '商务部',
    }).subscribe((res: any) => {
      this.unitUsers = res.items;
    });
  }

  getPlaceAndCounty(name: string = null) {
    this.pubPlace.getPlaceAndCounty({ name: name }).subscribe((res: any) => {
      this.placeAndCountyList = res.items;
    });
  }

  // GET Carrier
  getCRMCarrierList(data) {
    this.crmCustomer.getCustomerByType(data).subscribe((res: any) => {
      // tslint:disable-next-line: no-string-literal
      this.carriers = res.items;
    });
  }

  //get Trucking Carrier

  @debounce(200)
  getPlace(name: string = null) {
    this.pubPlace.getAll({ name: name }).subscribe((res: any) => {
      this.placeList = res.items;
    });
  }

  @debounce(200)
  getBasicPortList(value = '') {
    this.pubPlace.getAll({ name: value, isAirOrOcean: true }).subscribe((res: any) => {
      this.basicPortList = res.items;
    });
  }

  checkChange(e) {
    e.type === 'click' && this.showDetial(e.click.item, e.click.index);
  }

  onCustomerListChange(id) {
    if (id) {
      this.customerUserList = null;
      this.validateForm.patchValue({
        ownerContactId: null,
      });

      this.customerList.forEach((e) => {
        if (e.id === id) {
          this.customerUserList = e.contacts;
        }
      });
    }
  }

  setPlaceAndCounty(data) {
    if (data.type === 1) {
      this.placeAndCountyToListType = 0;
    } else {
      this.placeAndCountyToListType = 1;
    }

    this.getToPlaceAndCounty();
  }

  getToPlaceAndCounty(name: string = null) {
    this.pubPlace.getPlaceAndCounty({ name: name, type: this.placeAndCountyToListType }).subscribe((res: any) => {
      this.placeAndCountyToList = res.items;
    });
  }

  getCarrierCustomerList() {
    this.crmCustomer.getCustomerByType({ customerType: 5 }).subscribe((res: any) => {
      this.carrierCustomerList = res.items;
    });
  }

  onGetAll() {
    let datas = this.searchForm.value;
    let num = this.skipCount - 1;
    let data: any = {
      MaxResultCount: this.maxResultCount,
      SkipCount: this.maxResultCount * num,
      Sorting: this.sorting,
    };

    data.IsFollow = this.isFllow;
    let time = datas.DurationStart;
    if (time) {
      datas.DurationStart = time[0];
      datas.DurationEnd = time[1];
    }

    // 通知带入ID
    if (this.id) {
      data.id = this.id;
    }
    this.loading = true;
    this.ratesTruckServiceService
      .getCrmGetAll({ ...data, ...datas })
      .pipe(
        finalize(() => {
          if (this.id && this.dataOfList && this.dataOfList.items.length > 0) this.showDetial(this.dataOfList?.items[0], 0);
          data.id = null;
          this.id = null;
        }),
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.dataOfList = res;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  onSearch() {
    this.isFllow = false;
    this.onGetAll();
  }

  onClear() {
    this.searchForm.reset();
    this.searchForm.controls.Type.setValue(1);
    // this.searchForm.patchValue({
    //   Type: 1,
    // });
  }

  onShowModal() {
    this.modalVisible = true;
    this.validateForm.patchValue({
      truckType: 2,
    });
  }

  onFollowChange(data) {
    this.loading = true;
    this.ratesFavoriteRateServiceService
      .bindFollow({
        id: data.id,
        type: data.businessType,
      })
      .subscribe(
        (res) => {
          this.loading = false;
          data.isFavorite = !data.isFavorite;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  // 商务报价提交
  handleOk() {
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validate()) return;
    let data = this.validateForm.value;
    //默认拖车为3
    data.freightMethodType = 3;
    // if (data.truckPortId.type === 0) {
    //   if (data.truckAddressId.type !== 1) {
    //     this.msg.warning('请输入正确From 和 To');
    //     return;
    //   }
    // }
    //
    // if (data.truckPortId.type === 1) {
    //   if (data.truckAddressId.type !== 0) {
    //     this.msg.warning('请输入正确From 和 To');
    //     return;
    //   }
    // }

    let truckAddressId = data.truckAddressId,
      truckPortId = data.truckPortId;

    // if (data.truckType == 1) {
    //   data.truckAddressId = truckAddressId;
    //   data.truckPortId = truckPortId;
    // }
    // if (data.truckType == 2) {
    //   data.truckPortId = truckAddressId;
    //   data.truckAddressId = truckPortId;
    // }
    // let truckType;
    // // tslint:disable-next-line: one-variable-per-declaration
    // let truckPortId, truckAddressId;
    // if (data.truckPortId.type === 0) {
    //   truckType = 2;
    //   truckPortId = data.truckPortId.id;
    // } else {
    //   truckType = 1;
    //   truckAddressId = data.truckPortId.id;
    // }

    // if (data.truckAddressId.type === 0) {
    //   truckType = 1;
    //   truckPortId = data.truckAddressId.id;
    // } else {
    //   truckType = 2;
    //   truckAddressId = data.truckAddressId.id;
    // }

    // data.truckPortId = truckPortId;
    // data.truckType = truckType;
    // data.truckAddressId = truckAddressId;

    this.loading = true;
    if (data.containerType) {
      data.containerType = JSON.stringify(
        data.containerType.map((res) => {
          return {
            name: res.code,
            value: 1,
          };
        }),
      );
    }

    if (!data.id) {
      this.ratesQuoteEnquiryService.create(data).subscribe(
        (res: any) => {
          this.msg.success('创建成功');
          this.validateForm.reset();
          this.loading = false;
          this.modalVisible = false;
          this.onSearch();
        },
        (err) => {
          this.loading = false;
        },
      );
    } else {
      this.ratesQuoteEnquiryService.updateForRejectAsync(data).subscribe(
        (res: any) => {
          this.msg.success('编辑成功');
          this.validateForm.reset();
          this.loading = false;
          this.modalVisible = false;
          this.onSearch();
        },
        (err) => {
          this.loading = false;
        },
      );
    }
  }

  onPageIndexChanged($event) {
    this.skipCount = $event;
    this.onGetAll();
  }

  busType: any = null;
  showDetial(data, index) {
    this.busType = data;
    this.detialVisible = true;
    this.dataOfList.items.forEach((e) => {
      e.selected = false;
    });
    data.selected = true;
    this.detailComponent.showDetial(data);
  }

  onShowMoreSearch() {
    this.showMoreSearch = !this.showMoreSearch;
  }

  ngModelChangeYruckType() {
    this.validateForm.patchValue({
      truckPortId: null,
      truckAddressId: null,
      zipCode: null,
    });
    if (this.truckingFromToComponent) this.truckingFromToComponent.reverse();
  }

  onSelectTrailerTabs(data) {
    this.searchForm.patchValue({
      From: null,
      To: null,
    });
  }

  // 海运表单验证
  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (i != 'truckType') {
        this.validateForm.controls[i].updateValueAndValidity();
      }
      if (this.validateForm.controls[i].invalid) {
        // console.log(i);
        // console.log(this.validateForm.controls[i]);
      }
    }
    return this.validateForm.valid;
  }

  onClearCreate() {
    this.validateForm.reset();
    this.validateForm.patchValue({
      truckType: 2,
      quantityUnitCode: 'ctn',
      weightUnitCode: WeightUnitCode.KGS,
      volumeUnitCode: VolumeUnitCode.CBM,
    });
  }

  // 抽屉拖拽
  canMove: boolean = false;
  lastClientX: number = 0;

  down(e) {
    this.lastClientX = e.clientX;
    this.canMove = true;
  }

  move(e) {
    if (this.canMove) {
      const boxWidth = Number(this.drawerStyle.width.slice(0, this.drawerStyle.width.length - 2));
      if (boxWidth + (this.lastClientX - e.clientX) >= 680) {
        if (boxWidth + (this.lastClientX - e.clientX) <= document.body.clientWidth) {
          let drawerPosition: any = document.body.clientWidth - (boxWidth + (this.lastClientX - e.clientX));
          if (drawerPosition - 10 < e.clientX && e.clientX < drawerPosition + 30) {
            this.drawerStyle.width = boxWidth + (this.lastClientX - e.clientX) + 'px';
          }
        }
      } else {
        this.drawerStyle.width = '680px';
      }
      this.lastClientX = e.clientX;
    }
  }

  up() {
    this.canMove = false;
  }

  closeDrawerModal() {
    this.detialVisible = false;
    // this.detailComponent.chargeItem = 'pol';
  }
  checkAll(data) {
    if (data) {
      this.dataOfList?.items.forEach((e) => {
        e.choosed = true;
      });
    } else {
      this.dataOfList?.items.forEach((e) => (e.choosed = false));
    }
    this.refreshStatus();
  }
  refreshStatus(): void {
    this.isAll = this.dataOfList?.items.every((item) => item.choosed === true);
  }

  onSort(sortName: string, value: string): void {
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
      this.sorting = this.sortName + ' ' + this.sortValue;
      this.onGetAll();
    }
  }

  countryLists = [];
  portList = [];

  // 获取from/To列表--首页查询
  getAddress(searchText = null, type = null) {
    if (/[\u4e00-\u9fa5]{2}/gi.test(searchText) || searchText.length > 2) {
      this.ratesTruckServiceService.getAddressForTruckingFee({ searchText: searchText, type: type }).subscribe((res: any) => {
        if (type) {
          if (type === 0) {
            this.countryLists = res.items;
          } else {
            this.portList = res.items;
          }
        } else {
          // console.log(res);
          this.portList = res.items;
          this.countryLists = res.items;
        }
      });
    }
  }
  // /**
  //  * 前端排序
  //  */
  // webSort(sortName: string, value: string): void {
  //   const data = [...this.dataOfList?.items];
  //   if (sortName && value) {
  //     // tslint:disable-next-line: max-line-length
  //     this.dataOfList.items = data.sort((a, b) => {
  //       const avalue = ((a.rate * a.fuel) / 100 + a.rate).toFixed(2);
  //       const bvalue = ((b.rate * b.fuel) / 100 + b.rate).toFixed(2);
  //       return value === 'ascend' ? (avalue > bvalue ? 1 : -1) : bvalue > avalue ? 1 : -1;
  //     });
  //   } else {
  //     this.dataOfList.items = data;
  //   }
  // }
  onEdit(data, e) {
    this.modalVisible = true;
    this.inquiryId = data.id;
    e.stopPropagation();
  }

  getEnquiryDetial(id) {
    return new Observable((ob) => {
      this.ratesQuoteEnquiryService.get({ id: id }).subscribe((res) => {
        ob.next(res);
        ob.complete();
      });
    });
  }

  getValue(obj, key, select: NzSelectComponent) {
    const keye = key + 'Id';
    if (select.listOfTopItem?.length > 0) {
      if (this.validateForm.value[keye] === null) {
        obj[key] = null;
      } else {
        obj[key] = select.listOfTopItem[0].nzLabel;
      }
    }
  }
}

export enum VolumeUnitCode {
  CBM = 'TJDWCBM',
  CFT = 'TJDWCFT',
}
export enum WeightUnitCode {
  KGS = 'ZLDWKGS',
  LBS = 'ZLDWLBS',
  MT = 'ZLDWMT',
}
