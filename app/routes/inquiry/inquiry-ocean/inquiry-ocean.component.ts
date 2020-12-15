import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
// import { CustomerService } from '../../customer/service/customer.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { WeightUnitCode, VolumeUnitCode } from 'projects/cityocean/quote-library/src/public-api';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
// import { QuotesService } from '../../quotes/service/quotes.service';
import { InquiryDetialComponent } from '../inquiry-detial/inquiry-detial.component';
import { finalize } from 'rxjs/operators';
import {
  PlatformOrganizationUnitService,
  PUBContainerService,
  PUBTransportClauseService,
  PUBPlaceService,
  PUBShippingLineService,
  PUBCurrencyService,
  PUBChargingCodeService,
} from '@co/cds';

import { CRMCustomerService } from '../../../services/crm/customer.service';
import { RatesOceanBaseItemService } from '../../../services/rates/ocean-base-item-service.service';
import { RatesFavoriteRateService } from '../../../services/rates/favorite-rate-service.service';
import { RatesQuoteEnquiryService } from '../../../services/rates/quote-enquiry.service';
import { RatesOceanBaseItemExternalService } from '../../../services/rates/ocean-base-item-external-service.service';
import { debounce } from 'apps/crm/app/shared/utils';
import { STColumn, STData, STComponent, STRequestOptions, PageSideDrawerComponent } from '@co/cbc';
import { differenceInCalendarDays } from 'date-fns';
import { ACLService } from '@co/acl';
import { RatesEsQueryService, RatesRouteNoteService } from 'apps/crm/app/services/rates';
import { isEqual, merge, cloneDeep } from 'lodash';
import { FavoriteRouteComponent } from '../favorite-route/favorite-route.component';
// import { debounce } from '@shared/utils/debounce';
@Component({
  selector: 'app-inquiry-ocean',
  templateUrl: './inquiry-ocean.component.html',
  styleUrls: ['./inquiry-ocean.component.less'],
})
export class InquiryListOceanComponent implements OnInit {
  @ViewChild(PageSideDrawerComponent, { static: false }) sideDrawer!: PageSideDrawerComponent;
  searchForm: FormGroup;
  datas: any;
  isAll = false;
  basicPolPortList: any[];
  basicPodPortList: any[];
  deliveryList: any[];
  placeList: any;
  carriers: any;
  shippings: any;
  carrierCustomerList: any;
  showMoreSearch = false;
  customerUserList: any;
  modalVisible = false;
  loading = false;
  customerList: any;
  unitUsers: any;
  transportList: any;
  tablestitle: any;
  maxResultCount = 50;
  skipCount = 1;
  ratesList: any;
  detialVisible = false;
  init: boolean = true;
  inquiryId: string;
  selectedIndex = 0;
  drawerStyle: any = {
    width: '680px',
    paddingLeft: '0px',
  };
  maskStyle: any = {
    background: 'transparent',
    zindex: '-1',
  };

  dataOfList;
  listTotal;
  // @ViewChild('detial', { static: true })
  // detial: any;

  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;

  @ViewChild('detial', { static: false })
  public detailComponent: InquiryDetialComponent;

  @ViewChild('st', { static: false }) st: STComponent;

  id: any;

  // 分享
  shareModal = false;
  shareDisabled = true;
  validateShareForm: any;
  dataItem: any;
  shareCustomerList: any;
  shareuserList: any;
  shareCompnayList: any;
  shareCurrency: any;
  costItemList: any;
  showShareDtail: any;
  showShareDtailData: any;
  shareIds: any;
  shareLoading = false;
  cacheKey: any;
  shareFormLoading = false;
  loadingSave = false;
  notcertified = false;

  showShareBtn: boolean = false;
  showInquiryBtn: boolean = false;
  searchParams = {
    pageNo: 1,
    maxResultCount: 30,
    totalCount: 0,
  };
  //通知 类型
  notifationType = 0;
  disabledShareDate = (endValue: Date): boolean => {
    return endValue.getTime() <= new Date().getTime() - 1000 * 60 * 60 * 24;
  };

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
  };
  clearSearchParams: boolean;

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
    ValidStart: null,
    ValidEnd: null,
  };

  routeList = []; //收藏路线集合
  columns: STColumn[] = [
    { title: 'Attention', index: '', render: 'Attention', width: 40 },
    {
      title: 'index',
      index: '',
      width: 40,
      format: (item, col, index) => {
        return `${index + 1}`;
      },
    },
    { title: 'Carrier', index: 'shipCompany', width: 80 },
    { title: 'POL/From', index: 'pol', width: 120 },
    { title: 'Delivery/To', index: 'delivery', width: 120 },
    { title: 'POD', index: 'pod', width: 120 },
    { title: 'Commodity', index: 'commodity', width: 120 },

    {
      title: 'Duration(From)',
      index: 'from',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 120,
      sort: {
        compare: (a, b) => {
          if (a.from > b.from) {
            return 1;
          } else if (a.from < b.from) {
            return -1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      title: 'Duration(To)',
      index: 'to',
      type: 'date',
      dateFormat: 'yyyy-MM-dd',
      width: 120,
      sort: {
        compare: (a, b) => {
          if (a.to > b.to) {
            return 1;
          } else if (a.to < b.to) {
            return -1;
          } else {
            return 0;
          }
        },
      },
    },

    { title: 'Term', index: 'term', width: 120 },
    { title: 'SurCharge', index: 'surCharge', width: 120 },
    { title: 'CLS', index: 'cls', width: 120 },
    { title: 'D/D', index: 'dd', width: 120 },
    { title: 'Description', index: 'remarkBusiness', width: 120 },
    { title: 'ItemCode', index: 'itemCode', width: 120 },
    { title: 'NameAccount', index: 'account', width: 120 },
    {
      title: 'business type',
      index: 'businessType',
      width: 120,
      format: (item, _col) => {
        if (item.businessType == 0) {
          return this.translate.instant('Contract price');
        } else if (item.businessType == 1) {
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
    { title: 'Reject reason', index: 'rejectRemark', width: 120 },
    { title: 'Business man', index: 'updateBy', width: 120 },

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
    // public quotesService: QuotesService,
    private router: Router,
    private OrganizationUnit: PlatformOrganizationUnitService,
    private pubContainer: PUBContainerService,
    private pubTransportClause: PUBTransportClauseService,
    private crmCustomer: CRMCustomerService,
    private pubPlace: PUBPlaceService,
    private ShippingLine: PUBShippingLineService,
    private OceanBaseItemService: RatesOceanBaseItemService,
    private ratesEsQueryService: RatesEsQueryService,
    private ratesFavoriteRateServiceService: RatesFavoriteRateService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    private ratesOceanBaseItemExternalServiceService: RatesOceanBaseItemExternalService,
    private pubCurrency: PUBCurrencyService,
    private pubChargingCode: PUBChargingCodeService,
    private aCLService: ACLService,
    private ratesRouteNoteService: RatesRouteNoteService,
  ) {}

  ngOnInit() {
    this.id = null;
    this.initData();
    this.activeRoute.queryParams.subscribe((params) => {
      this.id = params?.id;
      this.bindData();
      // setTimeout(() => {
      //   if (params?.type) {
      //     // this.notifationType = params?.type;
      //     if (this.dataOfList && this.listOfData.length > 0) this.showDetial(this.listOfData[0], 0);
      //   }
      // }, 100);
    });
    // console.log(this.aCLService.can('j:商务员'), '0000000000');
    if (this.aCLService.can(['j:销售代表', 'j:海外拓展', 'j:拓展员', 'j: 电商顾问'])) {
      this.showInquiryBtn = true;
      this.showShareBtn = true;
    }
  }
  keyValue: any;
  orderByName: any;
  sort: any;
  checkChange(e) {
    // console.log(e);
    e.type === 'click' && this.showDetial(e.click.item, e.click.index);
    if (e.type === 'checkbox') {
      this.listOfData.forEach((e) => {
        e.choosed = false;
      });
      if (e?.checkbox?.length > 0) {
        e.checkbox.forEach((item) => {
          this.listOfData.forEach((i) => {
            i.id == item.id && (i.choosed = true);
          });
        });
      }
    } else if (e.type === 'sort') {
      // const value = e.sort.column.indexKey.toLowerCase();
      // this.keyValue = 'containerPrice.' + e.sort.column.indexKey;
      // this.orderByName = e.sort.value;
      this.sort = 'sort';
      this.clearSearchParams = false;
      // this.onGetAll('containerPrice.' + e.sort.column.indexKey, e.sort.value, 'sort');
    }
    this.refreshStatus();
  }

  GetNextMonthDay(date) {
    return new Date(date.setDate(date.getDate() + 15));
  }

  onEdit(data, e) {
    this.modalVisible = true;
    this.inquiryId = data.id;
    e.stopPropagation();
  }

  initData() {
    this.searchForm = this.fb.group({
      pols: [null],
      pods: [null],
      shipCompanys: [null],
      deliverys: [null],
      isFollow: [true],
      dynamicQuery: this.fb.group({
        commodity: [null],
        shippingLineId: [null],
        timeranges: [[new Date(), this.GetNextMonthDay(new Date())]],
        no: [null],
      }),
      // shipline: [null],
      // commodity: [null],
      // fromDate: [[new Date(), this.GetNextMonthDay(new Date())]],
      // no: [null],
    });
  }

  bindData() {
    this.getCRMCarrierList({ name: '', customerType: 1, sorting: 'code' });
    this.getAllShipLine();
    this.getCustomerList();
    this.getAllRoute();
    this.searchForm.controls.isFollow.setValue(true);
  }

  dataProcess(data: STData[]) {
    return data.map((i: STData, index: number) => {
      if (i.businessType == 0 || (i.status == 0 && i.businessType == 1)) {
        i.disabled = false;
      } else {
        i.disabled = true;
      }
      return i;
    });
  }

  refreshStatus(): void {
    this.isAll = this.listOfData.every((item) => item.choosed === true);
    this.shareDisabled = !this.listOfData.some((item) => item.choosed === true);
  }

  checkAll(data) {
    if (data) {
      this.listOfData.forEach((e) => {
        if (e.businessType === 0 || (e.status === 0 && e.businessType === 1)) {
          e.choosed = true;
        }
      });
    } else {
      this.listOfData.forEach((e) => (e.choosed = false));
    }
    this.refreshStatus();
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

  @debounce(200)
  getBasicPortList(value = '') {
    if (/[\u4e00-\u9fa5]{2}/gi.test(value) || value.length > 2) {
      this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
        this.basicPolPortList = res.items;
        this.basicPodPortList = res.items;
        this.deliveryList = res.items;
      });
      // this.customerService.getAllPlace({ Name: value, IsOcean: true }).subscribe((res: any) => {
      //   this.deliveryList = res.items;
      // });
    }
  }

  // GET Carrier
  getCRMCarrierList(data) {
    this.crmCustomer.getCustomerByType(data).subscribe((res: any) => {
      // tslint:disable-next-line: no-string-literal
      this.carriers = res.items;
    });
  }

  getAllShipLine() {
    this.ShippingLine.getAll({}).subscribe((res: any) => {
      this.shippings = res.items;
    });
  }

  onSearch() {
    // if (!this.searchForm.value.pols && !this.searchForm.value.pods && !this.searchForm.value.deliverys) {
    //   this.msg.info(this.translate.instant('Please select pol'), {
    //     nzDuration: 1000,
    //   });
    //   return false;
    // } else if (!this.searchForm.value.pods && !this.searchForm.value.deliverys) {
    //   this.msg.info(this.translate.instant('Please select pod or delivery'), {
    //     nzDuration: 1000,
    //   });
    //   return false;
    // }
    this.shareDisabled = true;
    this.searchForm.controls.isFollow.setValue(false);
    this.clearSearchParams = false;
    this.id = null;
    this.onGetAll();
  }

  listOfData = [];
  totalCount: any;
  onClose(e) {
    if (e === 'creat') {
      this.searchForm.controls.isFollow.setValue(true);
      this.searchForm.reset();
    }
    this.clearSearchParams = true;
    this.st.clearSort();
    e && this.onGetAll();
  }
  onGetAll(keyValue?, orderByName?, sort?) {
    return this.st.load();
    // let datas = cloneDeep(this.searchForm.value);
    // let num = this.skipCount - 1;
    // let data: any = {
    //   MaxResultCount: this.maxResultCount,
    //   SkipCount: this.maxResultCount * num,
    //   orderBy: { 'containerPrice.40GP': 'asc' },
    // };
    // //处理数据
    // data.isFollow = this.isFollow;
    // // 通知带入ID
    // if (this.id) {
    //   data.id = this.id;
    // }
    // //处理数据
    // const params = { ...datas, ...data };
    // !params.dynamicQuery?.commodity && delete params.dynamicQuery.commodity;
    // !params.dynamicQuery?.no && delete params.dynamicQuery.no;
    // !params?.dynamicQuery?.shippingLineId && delete params.dynamicQuery.shippingLineId;
    // params?.shipCompanys?.length <= 0 && delete params.shipCompanys;
    // params?.dynamicQuery?.timeranges?.length <= 0 && delete params.dynamicQuery.timeranges;
    // Object.keys(params?.dynamicQuery).length === 0 && delete params.dynamicQuery;
    // const map = {
    //   descend: 'desc',
    //   ascend: 'asc',
    // };
    // if (keyValue && orderByName) {
    //   params.orderBy = { [keyValue]: map[orderByName] };
    // }
    // this.loading = true;
    // this.ratesEsQueryService
    //   .getAllForES(params)
    //   .pipe(
    //     finalize(() => {
    //       if (this.id && this.listOfData && this.listOfData.length > 0) this.showDetial(this.listOfData[0], 0);
    //       data.id = null;
    //       this.id = null;
    //     }),
    //   )
    //   .subscribe(
    //     (res) => {
    //       this.loading = false;
    //       // this.dataOfList = res;
    //       let tablestitle = [];

    //       this.listOfData = res.items;
    //       this.totalCount = res.totalCount;

    //       this.listOfData.forEach((e) => {
    //         if (e.to) {
    //           if (differenceInCalendarDays(new Date(e.to), new Date()) < 0) {
    //             e.isValid = false;
    //           } else {
    //             e.isValid = true;
    //           }
    //         } else {
    //           e.isValid = true;
    //         }
    //         // e.containerPriceKey = Object.keys(e.containerPrice);
    //         // e.ratePriceOutputs.forEach((c) => {
    //         //   tablestitle.push(c.unit);
    //         // });
    //         e.containerPriceList = this.objToArray(e.containerPrice);
    //         tablestitle = e.unitCodes.split(',');
    //       });

    //       this.tablestitle = Array.from(new Set(tablestitle));
    //       this.tablestitle = this.tablestitle.sort((a: any, b: any) => {
    //         const aMatch = a.match(/(\d+)([A-Z]+)/);
    //         const bMatch = b.match(/(\d+)([A-Z]+)/);
    //         if (!aMatch) {
    //           return 1;
    //         }
    //         if (!bMatch) {
    //           return -1;
    //         }
    //         const aNumber = aMatch[1];
    //         const bNumber = bMatch[1];
    //         const aUnit = aMatch[2];
    //         const bUnit = bMatch[2];
    //         switch (true) {
    //           case aUnit < bUnit:
    //             return -1;
    //           case aUnit > bUnit:
    //             return 1;
    //           default:
    //         }
    //         switch (true) {
    //           case aNumber < bNumber:
    //             return -1;
    //           case aNumber > bNumber:
    //             return 1;
    //           default:
    //             return 0;
    //         }
    //       });

    //       // this.websort('40GP', 'ascend');
    //       if (sort != 'sort') {
    //         let titleItem = [];
    //         this.initColumn();
    //         this.tablestitle.forEach((e) => {
    //           titleItem.push({
    //             title: e,
    //             index: e,
    //             render: e,
    //             width: 90,
    //             sort: e,
    //           });
    //         });

    //         titleItem.unshift(6, 0);
    //         Array.prototype.splice.apply(this.columns, titleItem);

    //         if (!this.listOfData[0]?.isSuperPermission) {
    //           this.columns.forEach((e, idx) => {
    //             if (e.title == 'NameAccount') {
    //               this.columns.splice(idx, 1);
    //             }
    //           });
    //         }
    //       }

    //       setTimeout(() => {
    //         if (sort != 'sort') this.st.resetColumns();
    //       }, 0);
    //     },
    //     (err) => {
    //       this.loading = false;
    //     },
    //   );
  }

  esParams: any;
  paramsProcess = (requestOptions: STRequestOptions) => {
    let datas = cloneDeep(this.searchForm.value);

    let data: any = {
      // orderBy: { 'containerPrice.40GP': 'asc' },
    };
    //clearSearchParams 查询的时候是false ,抽屉弹窗关闭设置为true
    if (Object.keys(requestOptions.body.orderBy).length <= 0 && !this.clearSearchParams) {
      requestOptions.body.orderBy = { 'containerPrice.40GP': 'asc' };
    } else if (Object.keys(requestOptions.body.orderBy).length > 0) {
      //不做任何操作
    } else {
      requestOptions.body.orderBy = { lastmodificationtime: 'desc' };
    }
    //处理数据

    // 通知带入ID
    if (this.id) {
      data.id = this.id;
    }
    //处理数据
    this.esParams = { ...datas, ...data };
    !this.esParams.dynamicQuery?.commodity && delete this.esParams.dynamicQuery.commodity;
    !this.esParams.dynamicQuery?.no && delete this.esParams.dynamicQuery.no;
    !this.esParams?.dynamicQuery?.shippingLineId && delete this.esParams.dynamicQuery.shippingLineId;
    this.esParams?.shipCompanys?.length <= 0 && delete this.esParams.shipCompanys;
    this.esParams?.dynamicQuery?.timeranges?.length <= 0 && delete this.esParams.dynamicQuery.timeranges;
    Object.keys(this.esParams?.dynamicQuery).length === 0 && delete this.esParams.dynamicQuery;
    // const map = {
    //   descend: 'desc',
    //   ascend: 'asc',
    // };
    // if (this.keyValue && this.orderByName) {
    //   this.esParams.orderBy = { [this.keyValue]: map[this.orderByName] };
    // }
    requestOptions.body.dynamicQuery = this.esParams.dynamicQuery;
    // requestOptions.body.orderBy = this.esParams.orderBy;
    requestOptions.body.deliverys = this.esParams.deliverys;
    requestOptions.body.pods = this.esParams.pods;
    requestOptions.body.pols = this.esParams.pols;
    requestOptions.body.shipCompanys = this.esParams.shipCompanys;
    requestOptions.body.isFollow = this.esParams.isFollow;

    return requestOptions;
  };

  stResProcess = (result: STData[], rawData) => {
    if (result.length <= 0) return result;
    const sort = this.sort;
    this.sort = null;
    this.listOfData = result;
    this.totalCount = rawData.totalCount;
    if (this.id && result && result.length > 0) this.showDetial(result[0], 0);
    this.id = null;
    this.loading = false;
    let tablestitle = [];
    result.forEach((e) => {
      if (e.to) {
        if (differenceInCalendarDays(new Date(e.to), new Date()) < 0) {
          e.isValid = false;
        } else {
          e.isValid = true;
        }
      } else {
        e.isValid = true;
      }
      e.containerPriceList = this.objToArray(e.containerPrice);
      if (e.unitCodes) tablestitle = e.unitCodes.split(',');
    });

    this.tablestitle = Array.from(new Set(tablestitle));
    this.tablestitle = this.tablestitle.sort((a: any, b: any) => {
      const aMatch = a.match(/(\d+)([A-Z]+)/);
      const bMatch = b.match(/(\d+)([A-Z]+)/);
      if (!aMatch) {
        return 1;
      }
      if (!bMatch) {
        return -1;
      }
      const aNumber = aMatch[1];
      const bNumber = bMatch[1];
      const aUnit = aMatch[2];
      const bUnit = bMatch[2];
      switch (true) {
        case aUnit < bUnit:
          return -1;
        case aUnit > bUnit:
          return 1;
        default:
      }
      switch (true) {
        case aNumber < bNumber:
          return -1;
        case aNumber > bNumber:
          return 1;
        default:
          return 0;
      }
    });

    // this.websort('40GP', 'ascend');
    if (sort != 'sort') {
      let titleItem = [];
      this.initColumn();
      this.tablestitle.forEach((e) => {
        titleItem.push({
          title: e,
          index: e,
          render: e,
          width: 90,
          sort: 'containerPrice.' + e,
        });
      });

      titleItem.unshift(6, 0);
      Array.prototype.splice.apply(this.columns, titleItem);

      if (!result[0]?.isSuperPermission) {
        this.columns.forEach((e, idx) => {
          if (e.title == 'NameAccount') {
            this.columns.splice(idx, 1);
          }
        });
      }
    }

    setTimeout(() => {
      if (sort != 'sort') this.st.resetColumns({ emitReload: false });
    }, 0);
    return result;
  };

  //对象转数组
  objToArray(list: any) {
    let array = Array<any>();
    for (let key in list) {
      array.push({
        unit: key,
        rate: list[key],
      });
    }
    return array;
  }

  onClear() {
    this.searchForm.reset();
  }

  onShowModal() {
    this.sideDrawer.close();
    this.modalVisible = true;
  }

  onFollowChange(data) {
    this.loading = true;
    data.isFavorite = !data.isFavorite;
    this.ratesFavoriteRateServiceService
      .bindFollow({
        id: data.id,
        type: data.businessType,
      })
      .subscribe(
        (res) => {
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  onPageIndexChanged($event) {
    this.skipCount = $event;
    this.onGetAll();
  }

  busType: any = {};
  showDetial(data, index) {
    this.sideDrawer.close();
    this.busType = data;
    this.detialVisible = true;

    this.listOfData.forEach((element) => {
      element.selected = false;
    });
    if (this.listOfData && this.listOfData.length > 0) data.selected = true;
    this.detailComponent.showDetial(data);
  }

  onShowMoreSearch() {
    this.showMoreSearch = !this.showMoreSearch;
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
    // console.log(1);
    this.canMove = false;
  }

  onShowShareModal() {
    let item = this.listOfData.filter((data) => data.choosed === true);

    if (item.every((r) => r.isTerms) || item.every((r) => !r.isTerms)) {
      this.shareModal = true;
      this.bindShareData();
    } else {
      this.msg.warning(this.translate.instant('Please select data for the same route'));
    }
  }

  async getCrmFreightAndQuoteRates(json) {
    return this.ratesOceanBaseItemExternalServiceService.getCrmFreightAndQuoteRates(json).toPromise();
  }

  async getCustomer(text) {
    this.shareCustomerList = await this.crmCustomer
      .getAll({
        skipCount: 0,
        maxResultCount: 20,
        searchText: text,
        includeContacts: true,
        isUserContact: true,
      })
      .toPromise();
  }

  getCurrency() {
    this.pubCurrency
      .getAll({
        skipCount: 0,
        maxResultCount: 100,
      })
      .subscribe((res: any) => {
        this.shareCurrency = res.items;
      });
  }

  initColumn() {
    this.columns = [
      { title: 'Attention', index: '', render: 'Attention', width: 40 },
      {
        title: 'index',
        index: '',
        width: 40,
        format: (item, col, index) => {
          return `${index + 1}`;
        },
      },
      { title: 'Carrier', index: 'shipCompany', render: 'shipCompany', width: 80 },
      { title: 'POL/From', index: 'pol', render: 'pol', width: 120 },
      { title: 'Delivery/To', index: 'delivery', render: 'delivery', width: 120 },
      { title: 'POD', index: 'pod', render: 'pod', width: 120 },
      { title: 'Commodity', index: 'commodity', width: 120 },

      {
        title: 'Duration(From)',
        index: 'from',
        type: 'date',
        dateFormat: 'yyyy-MM-dd',
        width: 120,
        sort: {
          compare: (a, b) => {
            if (a.from > b.from) {
              return 1;
            } else if (a.from < b.from) {
              return -1;
            } else {
              return 0;
            }
          },
        },
      },
      {
        title: 'Duration(To)',
        index: 'to',
        type: 'date',
        dateFormat: 'yyyy-MM-dd',
        width: 120,
        sort: {
          compare: (a, b) => {
            if (a.to > b.to) {
              return 1;
            } else if (a.to < b.to) {
              return -1;
            } else {
              return 0;
            }
          },
        },
      },

      { title: 'Term', index: 'term', width: 120 },
      { title: 'SurCharge', index: 'surCharge', width: 120 },
      { title: 'CLS', index: 'cls', width: 120 },
      { title: 'D/D', index: 'dd', width: 120 },
      { title: 'Description', index: 'remarkBusiness', width: 120 },
      { title: 'ItemCode', index: 'itemCode', width: 120 },
      { title: 'NO', index: 'no', width: 120 },
      { title: 'NameAccount', index: 'account', width: 120 },
      {
        title: 'business type',
        index: 'businessType',
        width: 120,
        format: (item, _col) => {
          if (item.businessType == 0) {
            return this.translate.instant('Contract price');
          } else if (item.businessType == 1) {
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
      { title: 'Reject reason', index: 'rejectRemark', width: 120 },
      { title: 'Business man', index: 'updateBy', render: 'updateBy', width: 120 },

      {
        title: 'Action',
        type: 'action',
        width: 80,
        render: 'action',
        fixed: 'right',
        buttons: [],
      },
    ];
  }

  //获取费用代码信息

  getCostAll(text: string = '') {
    this.pubChargingCode
      .getAll({
        text: text,
      })
      .subscribe((res: any) => {
        this.costItemList = res.items;
      });
  }

  // to do  检查一下
  async getShareCompnay(text) {
    this.shareCompnayList = await this.crmCustomer
      .getCustomerByType({
        skipCount: 0,
        maxResultCount: 20,
        // SearchText: text,
        name: text,
        customerType: 1,
      })
      .toPromise();
  }

  setShareUser(data) {
    if (!data) {
      return;
    }
    let mdata = this.shareCustomerList?.items.filter((a) => a.id === data);
    if (mdata) {
      this.shareuserList = mdata[0].contacts;
      if (mdata[0].state !== 3) {
        this.notcertified = true;
      } else {
        this.notcertified = false;
      }
    }

    this.initShareData(data);
  }

  async bindShareData() {
    this.showShareDtail = false;
    this.showShareDtailData = null;

    this.validateShareForm = this.fb.group({
      rates: new FormArray([]),
      customer: [null, [Validators.required]],
      people: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });

    // this.initShareData();
    //获取客户列表
    await this.getCustomer('');
    await this.getShareCompnay('');
    await this.getCurrency();
    await this.getCostAll();
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  async initShareData(customerId) {
    this.shareFormLoading = true;
    let item = this.listOfData.filter((data) => data.choosed === true);
    let ids = item.map((e) => e.id);
    this.shareIds = ids;

    this.dataItem = await this.getCrmFreightAndQuoteRates({ CustomerId: customerId, Ids: ids });

    this.clearFormArray(this.validateShareForm.controls.rates);
    this.validateShareForm.patchValue({
      people: null,
    });
    this.dataItem.forEach((e: any, index) => {
      // 定义运价表格
      let group = this.fb.group({
        company: [e.carrierId, [Validators.required]],
        pol: [e.pol],
        polId: [e.polId],
        pod: [e.pod],
        podId: [e.podId],
        id: [e.id],
        delivery: [e.delivery],
        deliveryId: [e.deliveryId],
        tt: [e.tt],
        term: [e.term],
        durationFrom: [e.durationFrom ? new Date(e.durationFrom) : null, [Validators.required]],
        durationTo: [e.durationTo ? new Date(e.durationTo) : null, [Validators.required]],
        Commodity: [e.commodity],
        remark: [e.remark],
        polshow: [true],
        podshow: [true],
        originPort: new FormArray([]),
        destinationPort: new FormArray([]),
      });

      // 加入运价箱型
      e.units.forEach((g) => {
        group.addControl(g.unit, this.fb.control(g.rate, [Validators.required]));
      });

      e.originLocalRates.forEach((zzz) => {
        //处理起始地
        let data = this.costItemList.find((e: any) => e.id === zzz.chargingCodeId);
        if (data) {
          data['checked' + index] = true;
        }

        let originPort = this.fb.group({
          freeCode: [zzz.chargingCodeId, [Validators.required]],
          Currency: [zzz.currencyId, [Validators.required]],
          Unit: [zzz.chargeUnitType, [Validators.required]],
          Price: [zzz.totalPrice],
          Remark: [zzz.remark],
        });

        e.originLocalRatesTitle.forEach((aaa) => {
          let hasValue = null;

          for (let zindex = 0; zindex < zzz.units.length; zindex++) {
            if (zzz.units[zindex].unit === aaa) {
              hasValue = zzz.units[zindex].rate;
              break;
            }
          }

          if (zzz.chargeUnitType === 1) {
            originPort.addControl(aaa, this.fb.control(hasValue, [Validators.required]));
          } else {
            originPort.addControl(aaa, this.fb.control(hasValue, []));
          }
        });

        (group.controls.originPort as FormArray).push(originPort);
      });

      e.destinationLocalRates.forEach((zzz) => {
        let data = this.costItemList.find((e: any) => e.id === zzz.chargingCodeId);
        if (data) {
          data['dchecked' + index] = true;
        }

        //处理目的地
        let destinationPort = this.fb.group({
          freeCode: [zzz.chargingCodeId, [Validators.required]],
          Currency: [zzz.currencyId, [Validators.required]],
          Unit: [zzz.chargeUnitType, [Validators.required]],
          Price: [zzz.totalPrice],
          Remark: [zzz.remark],
        });
        e.destinationLocalRatesTitle.forEach((aaa) => {
          let hasValue = null;

          for (let zindex = 0; zindex < zzz.units.length; zindex++) {
            if (zzz.units[zindex].unit === aaa) {
              hasValue = zzz.units[zindex].rate;
              break;
            }
          }

          if (zzz.chargeUnitType === 1) {
            destinationPort.addControl(aaa, this.fb.control(hasValue, [Validators.required]));
          } else {
            destinationPort.addControl(aaa, this.fb.control(hasValue, []));
          }
        });

        (group.controls.destinationPort as FormArray).push(destinationPort);
      });

      this.dataItem[index] = e;
      // 加入总列表
      (this.validateShareForm.controls.rates as FormArray).push(group);
    });

    this.shareFormLoading = false;
  }

  addPort(index, name, title) {
    let group = this.fb.group({
      freeCode: [null, [Validators.required]],
      Currency: [null, [Validators.required]],
      Unit: [1, [Validators.required]],
      Price: [null],
      Remark: [null],
    });

    // 加入箱型
    title.forEach((z) => {
      group.addControl(z, this.fb.control(0, [Validators.required]));
    });
    (this.validateShareForm.controls.rates.controls[index].controls[name] as FormArray).push(group);
  }

  deletePort(index, z, name) {
    const freeCodeId = this.validateShareForm.controls.rates.controls[index].controls[name].value[z].freeCode;
    let data = this.costItemList.find((e: any) => e.id === freeCodeId);
    if (data) {
      data.checked = false;
      data.dchecked = false;
    }
    this.validateShareForm.controls.rates.controls[index].controls[name].removeAt(z);
  }

  deleteRatePort(index) {
    this.validateShareForm.controls.rates.removeAt(index);
  }

  onSaveShareModal() {
    if (!this.validateShare()) {
      this.msg.warning(this.translate.instant('Please check whether the data is complete'));
      return;
    }
    this.showShareDtail = false;
    this.showShareDtailData = null;

    let value = this.validateShareForm.value;
    let data: any = {};
    data.customerId = value.customer;
    data.enquiryId = value.people;
    data.dateStart = value.time[0];
    data.dateEnd = value.time[1];

    data.freightRates = [];
    value.rates.forEach((item, index) => {
      let dataItem: any = {};
      dataItem.Id = this.shareIds[index];
      dataItem.carrierId = item.company;
      if (item.company) {
        this.shareCompnayList?.items.forEach((dd) => {
          if (dd.id === item.company) {
            dataItem.carrier = dd.name;
          }
        });
      }

      dataItem.pol = item.pol;
      dataItem.polId = item.polId;
      dataItem.pod = item.pod;
      dataItem.podId = item.podId;
      dataItem.id = item.id;
      dataItem.delivery = item.delivery;
      dataItem.deliveryId = item.deliveryId;
      dataItem.tt = item.tt;
      dataItem.term = item.term;
      dataItem.durationFrom = new Date(item.durationFrom).toISOString();
      dataItem.durationTo = new Date(item.durationTo).toISOString();
      dataItem.commodity = item.Commodity;
      dataItem.remark = item.remark;
      dataItem.units = [];
      // 赋值运价
      this.dataItem[index]?.units.forEach((e) => {
        dataItem.units.push({
          unit: e.unit,
          rate: item[e.unit],
        });
      });
      // 赋值起始费用
      dataItem.originLocalRates = [];
      item.originPort?.forEach((e) => {
        let unit = [];
        this.dataItem[index].originLocalRatesTitle.forEach((z) => {
          unit.push({
            unit: z,
            rate: e[z],
          });
        });

        dataItem.originLocalRates.push({
          chargingCodeId: e.freeCode,
          currencyId: e.Currency,
          chargeUnitType: e.Unit,
          totalPrice: e.Price,
          remark: e.Remark,
          units: unit,
        });
      });
      //赋值目的地费用
      dataItem.destinationLocalRates = [];
      item.destinationPort?.forEach((e) => {
        let unit = [];
        this.dataItem[index].originLocalRatesTitle.forEach((z) => {
          unit.push({
            unit: z,
            rate: e[z],
          });
        });

        dataItem.destinationLocalRates.push({
          chargingCodeId: e.freeCode,
          currencyId: e.Currency,
          chargeUnitType: e.Unit,
          totalPrice: e.Price,
          remark: e.Remark,
          units: unit,
        });
      });

      data.freightRates.push(dataItem);
    });

    //
    // 设置提交数据
    this.shareLoading = true;
    this.ratesOceanBaseItemExternalServiceService.saveFreightAndQuoteRates(data).subscribe(
      (res) => {
        this.cacheKey = res;
        // this.cacheKey =
        //   'CO.Rates.Application.OceanBaseItemService.CrmDto.GetCrmFreightRateAndQuoteDto&626d6d41-9638-48a6-926f-b118abeddec1&f81a71d8-737b-4b71-41f8-08d7f2320c50&2304&12706';
        this.ratesOceanBaseItemExternalServiceService
          .getCrmCacheFreightAndQuoteRates({
            cacheKey: this.cacheKey,
          })
          .subscribe(
            (ress) => {
              this.shareLoading = false;
              this.showShareDtail = true;
              this.showShareDtailData = ress;
            },
            (err) => {
              this.shareLoading = false;
            },
          );
      },
      (err) => {
        this.shareLoading = false;
      },
    );
  }

  validateShare() {
    // tslint:disable-next-line: forin
    for (const i in this.validateShareForm.controls) {
      if (i === 'rates') {
        const controls = (this.validateShareForm.controls[i] as FormArray).controls;
        for (const z in controls) {
          const formGroup = controls[z] as FormGroup;
          // tslint:disable-next-line: forin
          for (const q in formGroup.controls) {
            if (q === 'destinationPort' || q === 'originPort') {
              const mControls = (formGroup.controls[q] as FormArray).controls;
              // tslint:disable-next-line: forin
              for (const l in mControls) {
                const lControls = (mControls[l] as FormArray).controls;
                // tslint:disable-next-line: forin
                for (const b in lControls) {
                  lControls[b].markAsDirty();
                  lControls[b].updateValueAndValidity();
                }
              }
            } else {
              formGroup.controls[q].markAsDirty();
              formGroup.controls[q].updateValueAndValidity();
            }
          }
        }
      } else {
        this.validateShareForm.controls[i].markAsDirty();
        this.validateShareForm.controls[i].updateValueAndValidity();
      }
    }
    return this.validateShareForm.valid;
  }

  onSetUnitValid(type, index, index2, name) {
    let typeNameTitle = 'originLocalRatesTitle';
    if (name === 'destinationPort') {
      typeNameTitle = 'destinationLocalRatesTitle';
    }

    if (type === 1) {
      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.setValue('');

      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.setValidators([]);

      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.updateValueAndValidity();

      this.dataItem[index][typeNameTitle].forEach((e) => {
        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].setValue('');

        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].setValidators([
          Validators.required,
        ]);

        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].updateValueAndValidity();
      });
    }

    if (type === 2) {
      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.setValue('');

      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.setValidators([
        Validators.required,
      ]);

      this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls.Price.updateValueAndValidity();

      this.dataItem[index][typeNameTitle].forEach((e) => {
        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].setValue('');

        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].setValidators([]);

        this.validateShareForm.controls.rates.controls[index].controls[name].controls[index2].controls[e].updateValueAndValidity();
      });
    }
  }

  setShareValid(value, index, name) {
    if (name === 'pol') {
      if (!value) {
        this.validateShareForm.controls.rates.controls[index].originPort = new FormArray([]);
      } else {
        this.validateShareForm.controls.rates.controls[index].addControl('originPort', this.fb.array([]));
      }
    }

    if (name === 'pod') {
      if (!value) {
        this.validateShareForm.controls.rates.controls[index].destinationPort = new FormArray([]);
      } else {
        this.validateShareForm.controls.rates.controls[index].addControl('destinationPort', this.fb.array([]));
      }
    }
  }

  onSaveAndSendShare() {
    this.loadingSave = true;
    this.ratesOceanBaseItemExternalServiceService
      .saveSendCustomer({
        cacheKey: this.cacheKey,
      })
      .subscribe(
        (res) => {
          this.loadingSave = false;
          this.msg.success(this.translate.instant('send Success'));
          this.shareModal = false;
        },
        (err) => {
          this.loadingSave = false;
        },
      );
  }

  freeCodeChange(index) {
    let values = this.validateShareForm.controls.rates.controls[index].value;

    this.costItemList.forEach((e) => {
      e['checked' + index] = false;
      values.originPort.forEach((res) => {
        if (res.freeCode === e.id) {
          e['checked' + index] = true;
        }
      });
    });
  }

  dfreeCodeChange(index) {
    let values = this.validateShareForm.controls.rates.controls[index].value;
    this.costItemList.forEach((e) => {
      e['dchecked' + index] = false;
      values.destinationPort.forEach((res) => {
        if (res.freeCode === e.id) {
          e['dchecked' + index] = true;
        }
      });
    });
  }

  closeDrawerModal() {
    this.detialVisible = false;
    this.detailComponent.chargeItem = 'pol';
  }

  cancelShareModal() {
    this.shareModal = false;
    this.validateShareForm.reset();
  }
  // onSort(sortName: string, value: string): void {
  //   this.sortName = sortName;
  //   this.sortValue = value;
  //   for (const key in this.mapOfSort) {
  //     this.mapOfSort[key] = key === sortName ? value : null;
  //   }
  //   if (this.sortValue) {
  //     if (this.sortValue.startsWith('desc')) {
  //       this.sortValue = 'desc';
  //     }
  //     if (this.sortValue.startsWith('asc')) {
  //       this.sortValue = 'asc';
  //     }
  //     this.sorting = this.sortName + ' ' + this.sortValue;
  //     this.onGetAll();
  //   }
  // }

  // /**
  //  * 前端排序
  //  */
  // websort(sortName: string, value: string): void {
  //   const data = [...this.listOfData];
  //   if (sortName && value) {
  //     // tslint:disable-next-line: max-line-length
  //     this.listOfData = data.sort((a, b) => {
  //       const adata = a.containerPriceList.find((c) => c.unit == sortName);
  //       const bdata = b.containerPriceList.find((c) => c.unit == sortName);
  //       const avalue = adata ? adata.rate : 0;
  //       const bvalue = bdata ? bdata.rate : 0;
  //       return value === 'ascend' ? (avalue > bvalue ? 1 : -1) : bvalue > avalue ? 1 : -1;
  //     });
  //   } else {
  //     this.listOfData = data;
  //   }
  // }

  onAddLine(title, routeItem, sideDrawer) {
    let contentParams;
    contentParams = {
      title,
      routeItem,
      sideDrawer,
    };
    this.sideDrawer.open(FavoriteRouteComponent, contentParams);
    const component = this.sideDrawer.getContentComponent();
    component?.onSubmitted.subscribe((res) => {
      if (res) {
        this.getAllRoute();
      }
    });
  }
  getAllRoute() {
    this.ratesRouteNoteService.getAllAsync({}).subscribe((res) => {
      this.routeList = res.items;
    });
  }
  editRoute(title, routeItem, sideDrawer, e) {
    let contentParams;
    contentParams = {
      title,
      routeItem,
      sideDrawer,
    };
    this.sideDrawer.open(FavoriteRouteComponent, contentParams);
    const component = this.sideDrawer.getContentComponent();
    component?.onSubmitted.subscribe((res) => {
      if (res) {
        this.getAllRoute();
      }
    });
    e.stopPropagation();
  }
  nzSelectedIndexChange(e) {
    if (e == 0) {
      this.searchForm.reset();
      (this.searchForm.controls.dynamicQuery as FormGroup).controls.timeranges.setValue([new Date(), this.GetNextMonthDay(new Date())]);
    } else {
      let data = this.routeList[e - 1];
      //查询数据
      this.searchForm.controls.pols.setValue(data.polId);
      this.searchForm.controls.pods.setValue(data.podId);
      this.searchForm.controls.deliverys.setValue(data.placeOfDeliveryId);
      (this.searchForm.controls.dynamicQuery as FormGroup).controls.shippingLineId.setValue(data.shippingLineId);
      // 处理下拉选项
      this.bindEditData(data);
    }
    this.selectedIndex = e;
    this.onSearch();
  }

  bindEditData(data) {
    this.getPortByIds('pol', data.polId);
    this.getPortByIds('pod', data.podId);
    this.getPortByIds('delivery', data.placeOfDeliveryId);
  }
  //根据id集合获取港口数据
  getPortByIds(type, ids: any[]) {
    switch (type) {
      case 'pol':
        this.pubPlace.getByPlacesIds(ids).subscribe((res) => {
          this.basicPolPortList = res.items;
        });
        break;
      case 'pod':
        this.pubPlace.getByPlacesIds(ids).subscribe((res) => {
          this.basicPodPortList = res.items;
        });
        break;
      case 'delivery':
        this.pubPlace.getByPlacesIds(ids).subscribe((res) => {
          this.deliveryList = res.items;
        });
        break;
      default:
        break;
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
