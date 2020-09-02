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
import { RatesOceanBaseItemServiceService } from '../../../services/rates/ocean-base-item-service.service';
import { RatesFavoriteRateServiceService } from '../../../services/rates/favorite-rate-service.service';
import { RatesQuoteEnquiryService } from '../../../services/rates/quote-enquiry.service';
import { RatesOceanBaseItemExternalServiceService } from '../../../services/rates/ocean-base-item-external-service.service';
import { debounce } from 'apps/crm/app/shared/utils';
import { STColumn, STData, STComponent } from '@co/cbc';
import { Observable } from 'rxjs';
import { differenceInCalendarDays } from 'date-fns';

// import { debounce } from '@shared/utils/debounce';
@Component({
  selector: 'app-inquiry-ocean',
  templateUrl: './inquiry-ocean.component.html',
  styleUrls: ['./inquiry-ocean.component.less'],
})
export class InquiryListOceanComponent implements OnInit {
  validateForm: FormGroup;
  searchForm: FormGroup;
  datas: any;
  isAll = false;
  basicPortList: any[];
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
  maxResultCount = 1000;
  skipCount = 1;
  ratesList: any;
  detialVisible = false;
  init: boolean = true;

  drawerStyle: any = {
    width: '680px',
    paddingLeft: '0px',
  };
  maskStyle: any = {
    background: 'transparent',
    zindex: '-1',
  };

  isFllow = false;
  // @ViewChild('detial', { static: true })
  // detial: any;

  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;

  @ViewChild('detial', { static: false })
  public detailComponent: InquiryDetialComponent;

  @ViewChild('scrollComponent')
  private _scrollViewport: CdkVirtualScrollViewport;

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

  //通知 类型
  notifationType = 0;
  disabledShareDate = (endValue: Date): boolean => {
    return endValue.getTime() <= new Date().getTime() - 1000 * 60 * 60 * 24;
  };

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

  columns: STColumn[] = [
    { title: "Attention", index: '', type: 'action', fixed: 'left', render: "Attention", width: 40 },

    {
      title: "index", index: '', type: 'action', fixed: 'left', width: 40, format: (item, col, index) => {
        return `${index + 1}`
      }
    },
    { title: 'Carrier', index: 'shipCompany', width: 80 },
    { title: 'POL/From', index: 'pol', width: 120 },
    { title: 'Delivery/To', index: 'delivery', width: 120 },
    { title: 'POD', index: 'pod', width: 120 },

    {
      title: 'Duration(From)', index: 'from', type: 'date', dateFormat: "yyyy-MM-dd", width: 120, sort: {
        compare: (a, b) => {
          if (a.from > b.from) {
            return 1
          } else if (a.from < b.from) {
            return -1
          } else {
            return 0
          }
        }
      },
    },
    {
      title: 'Duration(To)', index: 'to', type: 'date', dateFormat: "yyyy-MM-dd", width: 120, sort: {
        compare: (a, b) => {
          if (a.to > b.to) {
            return 1
          } else if (a.to < b.to) {
            return -1
          } else {
            return 0
          }
        },
      },
    },
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
    { title: 'Commodity', index: 'commodity', width: 120 },
    { title: 'Term', index: 'term', width: 120 },
    { title: 'SurCharge', index: 'surCharge', width: 120 },
    { title: 'CLS', index: 'cls', width: 120 },
    { title: 'T/T', index: 'tt', width: 120 },
    { title: 'Description', index: 'remarkBusiness', width: 120 },
    { title: 'Update by', index: 'updateBy', width: 120 },
    { title: 'Reject reason', index: 'rejectRemark', width: 120 },
    {
      title: 'Action',
      type: 'action',
      width: 80,
      render: 'action',
      fixed: 'right',
      buttons: [
      ],
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
    private OceanBaseItemService: RatesOceanBaseItemServiceService,
    private ratesFavoriteRateServiceService: RatesFavoriteRateServiceService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    private ratesOceanBaseItemExternalServiceService: RatesOceanBaseItemExternalServiceService,
    private pubCurrency: PUBCurrencyService,
    private pubChargingCode: PUBChargingCodeService,
  ) { }

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
  }

  checkChange(e) {
    console.log(e);
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
    }
    this.refreshStatus();

  }

  GetNextMonthDay(date) {
    return new Date(date.setDate(date.getDate() + 15));
  }

  onEdit(data, e) {
    this.modalVisible = true;
    e.stopPropagation();
    this.getEnquiryDetial(data.id).subscribe((res: any) => {
      let codes;
      if (res.containerType) {
        const code = JSON.parse(res.containerType);
        codes = code.map((c) => c.name);
        res.containerType = codes;
      }
      console.log(res)
      this.validateForm.patchValue(res, { emitEvent: false });
      const ids = [res.originPortId, res.destinationPortId];
      this.getPortByIds(ids);
      this.getdeliveryList(res.deliveryAddressId);
    });
  }

  getEnquiryDetial(id) {
    return new Observable((ob) => {
      this.ratesQuoteEnquiryService.get({ id: id }).subscribe((res) => {
        ob.next(res);
        6;
        ob.complete();
      });
    });
  }

  getPortByIds(ids: any[]) {
    this.pubPlace.getByPlacesIds(ids).subscribe((res: any) => {
      this.basicPortList = res.items;
    });
  }

  getdeliveryList(value) {
    this.pubPlace.getAll({ id: value, isOcean: true }).subscribe((res: any) => {
      this.deliveryList = res.items;
    });
  }

  initData() {
    this.searchForm = this.fb.group({
      pol: [null],
      pod: [null],
      carrier: [null],
      delivery: [null],
      shipline: [null],
      commodity: [null],
      fromDate: [[new Date(), this.GetNextMonthDay(new Date())]],
      no: [null],
    });

    this.validateForm = this.fb.group({
      originPortId: [null, [Validators.required]],
      destinationPortId: [null, [Validators.required]],
      deliveryAddressId: [null],
      transportClauseId: [null, [Validators.required]],
      containerType: [null, [Validators.required]],
      commodity: [null, [Validators.required]],
      ownerCustomerId: [null],
      ownerContactId: [null],
      isShipper: ['false'],
      cargoReadyDate: [null],
      deliveryDate: [null],
      quantity: [null, [this.numValidator()]],
      quantityUnitCode: 'ctn',
      weight: [null, [this.numValidator()]],
      weightUnitId: [null],
      weightUnitCode: [WeightUnitCode.KGS],
      volume: [null, [this.numValidator()]],
      volumeUnitId: [null],
      volumeUnitCode: [VolumeUnitCode.CBM],
      description: [null],
      carrierCustomerId: [null],
      freightMethodType: [1],
      replyUserId: [null, [Validators.required]],
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
  }

  bindData() {
    this.getBasicPortList();
    this.getCRMCarrierList({ name: '', customerType: 1, sorting: 'code' });
    this.getAllShipLine();
    this.getCarrierCustomerList();
    this.getCustomerList();
    this.getTransportClause();
    this.getRates();
    this.getOrganizationUnitUsers();
    this.isFllow = true;
    this.onGetAll();
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

  getOrganizationUnitUsers() {
    this.OrganizationUnit.getOrganizationUnitUsers({
      organizationUnitName: '商务部',
    }).subscribe((res: any) => {
      this.unitUsers = res.items;
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

  // GET rates
  getRates() {
    this.pubContainer.getAll({ maxResultCount: 100, skipCount: 0 }).subscribe((res: any) => {
      this.ratesList = res.items;
      this.ratesList.sort((a: any, b: any) => {
        const aMatch = a.desc.match(/(\d+)([A-Z]+)/);
        const bMatch = b.desc.match(/(\d+)([A-Z]+)/);
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
    });
  }

  // TransportClause
  getTransportClause() {
    this.pubTransportClause.getAll({}).subscribe((res: any) => {
      this.transportList = res.items.filter((data) => {
        if (
          data.description === 'CY-CY' ||
          data.description === 'CY-CFS' ||
          data.description === 'CFS-CFS' ||
          data.description === 'CFS-CY' ||
          data.description === 'CFS-DOOR'
        ) {
          return res;
        }
      });
    });
  }

  getCarrierCustomerList() {
    this.crmCustomer.getCustomerByType({ customerType: 1 }).subscribe((res: any) => {
      this.carrierCustomerList = res.items;
      console.log(this.carrierCustomerList);
    });
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

  @debounce(1000)
  // getBasicPortList(value = '') {
  //   this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
  //     this.basicPortList = res.items;
  //   });
  //   this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
  //     this.deliveryList = res.items;
  //   });
  // }
  getBasicPortList(value = '') {
    if (/[\u4e00-\u9fa5]{2}/gi.test(value) || value.length > 2) {
      this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
        this.basicPortList = res.items;
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
    if (!this.searchForm.value.pol && !this.searchForm.value.pod && !this.searchForm.value.delivery) {
      this.msg.info(this.translate.instant('Please select pol'), {
        nzDuration: 1000,
      });
      return false;
    } else if (!this.searchForm.value.pod && !this.searchForm.value.delivery) {
      this.msg.info(this.translate.instant('Please select pod or delivery'), {
        nzDuration: 1000,
      });
      return false;
    }
    this.shareDisabled = true;
    this.isFllow = false;
    this.id = null;
    this.onGetAll();
  }

  listOfData: any;
  onGetAll() {
    let datas = this.searchForm.value;
    let num = this.skipCount - 1;
    let data: any = {
      MaxResultCount: this.maxResultCount,
      SkipCount: this.maxResultCount * num,
      Sorting: this.sorting,
    };

    data.IsFollow = this.isFllow;
    let time = datas.fromDate;

    if (time && time.length > 0) {
      datas.fromDate = time[0];
      datas.ToDate = time[1];
    }

    // 通知带入ID
    if (this.id) {
      data.id = this.id;
    }

    if (this.searchForm.value.fromDate?.length <= 0) {
      //处理日期问题
      this.searchForm.value.fromDate = null;
      this.searchForm.value.ToDate = null;
    }


    this.loading = true;
    this.OceanBaseItemService.getBusinessRateList({ ...datas, ...data })
      .pipe(
        finalize(() => {
          if (this.id && this.listOfData && this.listOfData.length > 0) this.showDetial(this.listOfData[0], 0);
          data.id = null;
          this.id = null;
        }),
      )
      .subscribe(
        (res) => {
          this.loading = false;
          // this.dataOfList = res;
          let tablestitle = [];

          this.listOfData = res.items;



          let arr = this.listOfData.map((item) => item.ratePriceOutputs);
          arr.forEach((e) => {
            e.forEach((c) => {
              tablestitle.push(c.unit);
            });
          });

          this.listOfData.forEach((res) => {
            if (res.to) {
              if (differenceInCalendarDays(new Date(res.to), new Date()) < 0) {
                res.isValid = false;
              } else {
                res.isValid = true;
              }
            } else {
              res.isValid = true;
            }
          });

          console.log(this.listOfData)

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

          if (this.init) {
            this.websort('40GP', 'ascend');
            this.init = false;
          }

          console.log(this.tablestitle);

          let titleItem = [];

          this.initColumn();


          this.tablestitle.forEach((e) => {
            titleItem.push({
              title: e, index: '', render: e, width: 70, sort: {
                compare: (a, b) => {
                  console.log(a)
                  console.log(b)
                  let aItem;
                  let bItem;
                  a?.ratePriceOutputs.forEach(item => {
                    if (item.unit == e) {
                      aItem = item.rate
                    }
                  })
                  b?.ratePriceOutputs.forEach(item => {
                    if (item.unit == e) {
                      bItem = item.rate
                    }
                  })
                  if (aItem > bItem) {
                    return 1
                  } else if (aItem < bItem) {
                    return -1
                  } else {
                    return 0
                  }
                },
              },
            });
          });
          console.log(titleItem);
          titleItem.unshift(5, 0);
          Array.prototype.splice.apply(this.columns, titleItem);
          this.st?.resetColumns();
        },
        (err) => {
          this.loading = false;
        },
      );
  }


  onClear() {
    this.searchForm.reset();
  }

  onShowModal() {
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

  // 商务报价提交
  handleOk() {
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validate()) return;
    let data = this.validateForm.value;
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

    this.ratesQuoteEnquiryService.create(data).subscribe(
      (res: any) => {
        this.msg.success('创建成功');
        this.loading = false;
        this.modalVisible = false;
        this.onGetAll();
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

  onClearCreate() {
    this.validateForm.reset();
  }

  // 海运表单验证
  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    return this.validateForm.valid;
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
          this.drawerStyle.width = boxWidth + (this.lastClientX - e.clientX) + 'px';
        }
      } else {
        this.drawerStyle.width = '680px';
      }
      this.lastClientX = e.clientX;
    }
  }

  up() {
    console.log(1);
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
      {
        title: "index", index: '', width: 40, format: (item, col, index) => {
          return `${index + 1}`
        }
      },
      { title: "Attention", index: '', render: "Attention", width: 40 },
      { title: 'POL/From', index: 'pol', width: 120 },
      { title: 'POD', index: 'pod', width: 120 },
      { title: 'Delivery/To', index: 'delivery', width: 120 },
      { title: 'Carrier', index: 'shipCompany', width: 80 },
      {
        title: 'Duration(From)', index: 'from', type: 'date', dateFormat: "yyyy-MM-dd", width: 120, sort: {
          compare: (a, b) => {
            if (a.from > b.from) {
              return 1
            } else if (a.from < b.from) {
              return -1
            } else {
              return 0
            }
          }
        },
      },
      {
        title: 'Duration(To)', index: 'to', type: 'date', dateFormat: "yyyy-MM-dd", width: 120, sort: {
          compare: (a, b) => {
            if (a.to > b.to) {
              return 1
            } else if (a.to < b.to) {
              return -1
            } else {
              return 0
            }
          },
        },
      },
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
      { title: 'Commodity', index: 'commodity', width: 120 },
      { title: 'Term', index: 'term', width: 120 },
      { title: 'SurCharge', index: 'surCharge', width: 120 },
      { title: 'CLS', index: 'cls', width: 120 },
      { title: 'T/T', index: 'tt', width: 120 },
      { title: 'Description', index: 'remarkBusiness', width: 120 },
      { title: 'Update by', index: 'updateBy', width: 120 },
      { title: 'RejectRemark', index: 'rejectRemark', width: 120 },
      {
        title: 'Action',
        type: 'action',
        render: 'action',
        width: 80,
        fixed: 'right',
        buttons: [
        ],
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

  /**
   * 前端排序
   */
  websort(sortName: string, value: string): void {
    const data = [...this.listOfData];
    if (sortName && value) {
      // tslint:disable-next-line: max-line-length
      this.listOfData = data.sort((a, b) => {
        const adata = a.ratePriceOutputs.find((c) => c.unit == sortName);
        const bdata = b.ratePriceOutputs.find((c) => c.unit == sortName);
        const avalue = adata ? adata.rate : 0;
        const bvalue = bdata ? bdata.rate : 0;
        return value === 'ascend' ? (avalue > bvalue ? 1 : -1) : bvalue > avalue ? 1 : -1;
      });
    } else {
      this.listOfData = data;
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
