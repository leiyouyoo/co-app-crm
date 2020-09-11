import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BusinessType } from '../../../../shared/types/booking/business-type';
import { ActivatedRoute } from '@angular/router';
import { bookingStatus } from '../../../../shared/types/booking/bookingStatus';
import { BookingBase } from '../../../../shared/compoents/booking/class/BookingBase.class';
import { FreightMethodType } from '../../../../shared/types/booking/FreightMethodType';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { bookingCancel } from '../../../../shared/compoents/booking/class/bookingCancel';
import { QuoteEnquiry } from '../../../../shared/compoents/booking/class/quoteEntity';
import { bookingCreatequotesComponent } from '../createquotes/bookingcreatequotes.component';
import { QuoteRecorddetailComponent } from '../quote-recorddetail/quote-recorddetail.component';
import { UpdatequotesComponent } from '../updatequotes/updatequotes.component';
import { PackingListComponent } from '../packing-list/packing-list.component';
import { TranslateService } from '@ngx-translate/core';
import { CSPBookingService, CSPBookingDto, CSPBookingOldData, CSPPubService } from '../../../../services/csp';
import { PUBPlaceService } from '@co/cds';
import { CRMLocationExternalService, CRMQuoteEnquiryService } from '../../../../services/crm';
import { QuoteSimpleInfoComponent } from '../../../quotes/component/quote-simple-info/quote-simple-info.component';
import { OriginalOrTelex } from 'apps/crm/app/shared/compoents/booking/class';

@Component({
  selector: 'booking-bookingdetail',
  templateUrl: './bookingdetail.component.html',
  styleUrls: ['./bookingdetail.component.less'],
})
export class BookingdetailComponent extends BookingBase implements OnInit {
  BusinessType: number = BusinessType.Booking;
  BusinessId: string;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  public bookingId: string = this.activeRoute.snapshot.params.id;
  bookingObj: any = {};
  isQuoteStatus: boolean = false;
  isUpdateQuoteStatus: boolean = false;
  isQuoteRecordStatus: boolean = false;
  readonly fbaFreightMethodIdMap = {
    oceanTruck: 292,
    oceanExpress: 293,
    airExpress: 294,
    express: 295,
  };
  readonly OriginalOrTelex = OriginalOrTelex;
  quoteinfo: QuoteEnquiry = {
    originAddressId: '',
    originAddress: null,
    originPort: null,
    destinationPort: null,
    destinationPortId: '',
    destinationIsRequireTruck: false,
    destinationAddressId: '',
    destinationAddress: null,
    originPortId: '',
    containerType: '',
    quantity: 0,
    quantityUnitId: '',
    quantityUnitCode: '',
    weight: 0,
    weightUnitId: '',
    weightUnitCode: '',
    volumeUnitCode: '',
    volume: 0,
    volumeUnitId: '',
    shipmentType: 0,
    freightMethodType: 0,
    name: '',
    id: this.emptyGuid,
    cargoReadyDate: new Date(),
    originIsRequireTruck: false,
    isDeclaration: false,
    isInsurance: false,
    deliveryDate: '',
    isClearance: false,
    tradeType: 1,
    unitConvertType: 1, //单位类型
    isContainsSpecialGoods: false,
    containsSpecialGoodsTypes: '',
    description: '',
    specialInstructions: '',
    status: 0, //预订状态(枚举)
    isTaxIncluded: false,
    freightType: 1,
    ownerCustomerId: '',
    ownerUserId: 0,
    quoteReplys: [],
    bookngId: '',
  };
  bookingCancel: typeof bookingCancel = bookingCancel;
  bookingCancelList: any[];
  disabledIm = false;
  selIndex: number = 0;
  @ViewChild('imlayout') ImLayout: any;
  isEdit: string = 'false';
  //packlist验证是否通过
  verificationPassed: boolean;
  isShowPacklist: boolean = false;
  isDisabledPack: boolean = false;
  cusClearanceInvoicesGroup: any;
  isCreate: boolean = false;
  constructor(
    private pubPlaceService: PUBPlaceService,
    public location: Location,
    private message: NzMessageService,
    private crmLocationExternalService: CRMLocationExternalService,
    private bookingService: CSPBookingService,
    public activeRoute: ActivatedRoute,
    public modalService: NzModalService,
    private translate: TranslateService,
    private crmQuoteEnquiryService: CRMQuoteEnquiryService,
    private cspPubService: CSPPubService,
  ) {
    super();
  }

  ngOnInit() {
    this.GetCityoceanAll(true);
    this.GetAmazonAll(false); //获取国外仓库
    this.bookingCancelList = Object.keys(this.bookingCancel).filter((f) => !isNaN(Number(f)));
    if (this.bookingId) {
      this.bookingId = this.bookingId;
      this.BusinessId = this.bookingId;
      this.GetForCRM(this.bookingId);
    }
  }
  //获取详情方法
  status: number; //状态
  statusStep: number;
  bookingDetailInfo: CSPBookingDto = { tradeType: 1, freightMethodType: 1 };
  containList: any[] = [];
  specialgoodsList: any[] = [];
  lastData: CSPBookingOldData = {};
  lastcontainList: any[] = [];
  lastcontainString: string;
  _BusinessType = BusinessType;
  GetForCRM(id: string) {
    this.bookingService.getForCRM({ id: id }).subscribe((res) => {
      this.bookingDetailInfo = res;
      this.bookingDetailInfo.flightNo &&
        this.cspPubService.getAllForUiPicker({ ids: [this.bookingDetailInfo.flightNo] }).subscribe((c: any) => {
          this.bookingDetailInfo.flightNo = c.items[0].no;
        });
      this.bookingDetailInfo.velAndVoy &&
        this.cspPubService.getAllForUiPicker({ ids: [this.bookingDetailInfo.velAndVoy] }).subscribe((c: any) => {
          this.bookingDetailInfo.velAndVoy = c.items[0].no;
        });
      this.status = res.status;
      if (res.lastData) this.lastData = res.lastData;
      switch (this.status) {
        case bookingStatus.WaitingForCancelling:
          this.statusStep = 0;
          break;
        case bookingStatus.BookingSubmitted:
          this.statusStep = 1;
          break;
        case bookingStatus.ShippingDone:
          if (this.bookingDetailInfo.isQuoteConfirmed) {
            this.statusStep = 3;
          } else {
            this.statusStep = 5;
          }
          this.disabledIm = true;
          break;
        case bookingStatus.WaitingForPricing:
          if (this.bookingDetailInfo.tradeType != 1) {
            this.statusStep = -1;
          } else {
            this.statusStep = 0;
          }
          break;
        case bookingStatus.WaitingForBuyer:
          this.statusStep = 1;
          break;
        case bookingStatus.WaitingForSellerr:
          this.statusStep = 1;
          break;
        case bookingStatus.BookingCancelled:
          this.statusStep = -1;
          this.disabledIm = true;
          break;
        case bookingStatus.ShippingCancelled:
          this.statusStep = -1;
          this.disabledIm = true;
          break;
        case bookingStatus.PriceConfirmedByCustomer:
          if (this.bookingDetailInfo.isQuoteConfirmed) {
            this.statusStep = 0;
          } else {
            this.statusStep = 2;
          }
          break;
        case bookingStatus.ShippingSubmittedToCarrier:
          if (this.bookingDetailInfo.isQuoteConfirmed) this.statusStep = 1;
          else this.statusStep = 3;
          break;
        case bookingStatus.SoNumberNotifiedToCustomer:
          if (this.bookingDetailInfo.isQuoteConfirmed) this.statusStep = 2;
          else this.statusStep = 4;
          break;
        default:
          break;
      }
      //处理旧数据得箱型
      if (this.lastData.containerType) {
        this.lastcontainList = JSON.parse(this.lastData.containerType);
        this.lastcontainList = this.lastcontainList.filter((c) => c.value > 0);
        this.lastcontainList.forEach((element) => {
          this.lastcontainString = element.value + ' ' + element.name + ' ';
        });
      }
      //处理箱型
      if (this.bookingDetailInfo.containerType) {
        this.containList = JSON.parse(this.bookingDetailInfo.containerType);
        this.containList = this.containList.filter((c) => c.value > 0);
      }
      if (this.bookingDetailInfo.containsSpecialGoodsTypes)
        this.specialgoodsList = JSON.parse(this.bookingDetailInfo.containsSpecialGoodsTypes);
      this.GetRelatedQuoteForCRM({
        originPortId: this.bookingDetailInfo.originPortId,
        originAddressId: this.bookingDetailInfo.originAddressId,
        destinationPortId: this.bookingDetailInfo.destinationPortId,
        destinationAddressId: this.bookingDetailInfo.destinationAddressId,
        incotermsString: this.bookingDetailInfo.incotermsString,
        shipperCustomerId: this.bookingDetailInfo.shipperCustomerId,
        consigneeCustomerId: this.bookingDetailInfo.consigneeCustomerId,
      });
      if (res.quoteEnquiryId && this.QuoteSimpleInfoComponent)
        // this.QuoteSimpleInfoComponent.updateQuotesDetail(res.quoteEnquiryId);
        this.QuoteSimpleInfoComponent.initData();
    });
  }

  //确认取消
  confirmCancellation(id: string) {
    this.bookingService
      .salesConfirmCancelForCRM({
        id: id,
      })
      .subscribe((res) => {
        this.bookingDetailInfo.status = 7;
        this.status = 7;
      });
  }

  //返回上一页
  back() {
    this.location.back();
  }

  openRoute() {
    this.isShowRoute = true;
    this.getAllCompanyContact(this.bookingDetailInfo.shipperCustomerId);
    this.bookingObj.originPortId = this.bookingDetailInfo.originPortId;
    this.bookingObj.destinationPortId = this.bookingDetailInfo.destinationPortId;
    this.bookingObj.deliveryWarehouseId = this.bookingDetailInfo.deliveryWarehouseId;
    this.bookingObj.destinationAddressId = this.bookingDetailInfo.destinationAddressId;
    if (this.bookingObj.originPortId) this.getByPlacesIds([this.bookingObj.originPortId], 'origin');
    if (this.bookingObj.destinationPortId) this.getByPlacesIds([this.bookingObj.destinationPortId], 'desination');
  }

  getByPlacesIds(ids: any[], type: string) {
    if (type == 'origin') {
      this.pubPlaceService.getByPlacesIds(ids).subscribe((res) => {
        this.OriginPortList = res.items;
      });
    } else {
      this.pubPlaceService.getByPlacesIds(ids).subscribe((res) => {
        this.DesinationPortList = res.items;
      });
    }
  }

  isShowRoute: boolean = false;
  //路线保存
  isSubmitted: boolean = false;
  routeOk() {
    if (!this.bookingObj.destinationAddressId || !this.bookingObj.deliveryWarehouseId || !this.isSamePort) {
      this.isSubmitted = true;
      return false;
    }
    this.bookingObj.id = this.bookingId;
    this.bookingService.updateRoutesForCRM(this.bookingObj).subscribe((res) => {
      this.isShowRoute = false;
      this.GetForCRM(this.bookingId);
    });
  }

  //Delivery warehouse
  cityoceanList: Array<any> = new Array<any>();
  GetCityoceanAll(isCityocean: boolean) {
    this.crmLocationExternalService
      .getFBALocations({
        isCityocean: isCityocean,
      })
      .subscribe((c) => {
        this.cityoceanList = c.items;
      });
  }

  //获取FBA地址
  amazonList: Array<any> = new Array<any>();
  GetAmazonAll(isCityocean: boolean) {
    this.crmLocationExternalService
      .getFBALocations({
        isCityocean: isCityocean,
      })
      .subscribe((c) => {
        this.amazonList = c.items;
      });
  }

  //获取租户下所有公司信息
  companyContactlist: any[] = [];
  getAllCompanyContact(customerId: string) {
    this.crmLocationExternalService
      .getLocationByCustomerOwn({
        customerId: customerId,
      })
      .subscribe(
        (res) => {
          this.companyContactlist = res.items;
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
  }

  //港口数据(起始)
  OriginPortList: Array<any> = new Array<any>();
  //港口数据(目的)
  DesinationPortList: Array<any> = new Array<any>();
  //港口数据
  //获取起始port
  GetAllOrginalPort(name: string = '') {
    this.pubPlaceService
      .getAll({
        name: name,
        isAir: this.bookingDetailInfo.freightMethodType === this.freightMethodTypeValue.Air,
        isOcean: this.bookingDetailInfo.freightMethodType === this.freightMethodTypeValue.Ocean,
      })
      .subscribe(
        (res) => {
          this.OriginPortList = res.items;
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
  }

  //获取目的port
  GetAllDesitinaPort(name: string = '') {
    this.pubPlaceService
      .getAll({
        name: name,
        isAir: this.bookingDetailInfo.freightMethodType === this.freightMethodTypeValue.Air,
        isOcean: this.bookingDetailInfo.freightMethodType === this.freightMethodTypeValue.Ocean,
      })
      .subscribe(
        (res) => {
          this.DesinationPortList = res.items;
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
  }

  //搜索origin港口
  portOriginsearch(event: any) {
    if (event.length >= 2) this.GetAllOrginalPort(event);
  }

  //搜索origin港口
  portDesinationsearch(event: any) {
    if (event.length >= 2) this.GetAllDesitinaPort(event);
  }

  originChange(event: any) {
    if (!event) this.isSamePort = true;
  }

  desinationChange(event: any) {
    if (!event) this.isSamePort = true;
  }

  //比较港口
  isSamePort: boolean = true;
  comparePort(event: any, portId: number, type: string) {
    switch (type) {
      case 'origin':
        if (portId == this.bookingObj.destinationPortId) {
          event.stopPropagation;
          this.isSamePort = false;
        } else {
          this.isSamePort = true;
        }
        break;
      case 'destination':
        if (portId == this.bookingObj.originPortId) {
          event.stopPropagation;
          this.isSamePort = false;
        } else {
          this.isSamePort = true;
        }
        break;
      default:
        break;
    }
  }

  @ViewChild(bookingCreatequotesComponent)
  bookingCreatequotesComponent: bookingCreatequotesComponent;
  isShowcreatequotes: boolean = false;
  isClosed: boolean = false;
  addQuote() {
    this.isShowcreatequotes = true;
    this.isCreate = true;
    for (let item in this.quoteinfo) {
      if (this.bookingDetailInfo[item] != undefined) {
        this.quoteinfo[item] = this.bookingDetailInfo[item];
        this.quoteinfo.bookngId = this.bookingDetailInfo.id;
        if (this.bookingDetailInfo.tradeType != 1) {
          this.quoteinfo.isClearance = true;
          this.quoteinfo.isDeclaration = true;
          this.quoteinfo.isInsurance = false;
          this.quoteinfo.originAddressId = this.bookingDetailInfo.deliveryWarehouseId;
        }
        this.quoteinfo.id = this.emptyGuid;
      }
    }
  }

  isShowUpdateQuote: boolean = false;
  isShowUpdateTab: boolean = false;
  //更新报价
  updateQuoteOk() {
    this.isShowUpdateTab = false;
    this.isCreate = false;
    this.isShowcreatequotes = true;
    for (let item in this.quoteinfo) {
      if (this.bookingDetailInfo[item] != undefined) {
        this.quoteinfo[item] = this.bookingDetailInfo[item];
        this.quoteinfo.id = this.bookingDetailInfo.quoteEnquiryId;
        this.quoteinfo.bookngId = this.bookingDetailInfo.id;
      }
    }
  }

  @ViewChild(UpdatequotesComponent)
  UpdatequotesComponent: UpdatequotesComponent;
  updatequotesOk() {
    this.UpdatequotesComponent.ngSubmit();
  }

  @ViewChild(QuoteSimpleInfoComponent)
  QuoteSimpleInfoComponent: QuoteSimpleInfoComponent;
  createquotesCancel() {
    this.isShowcreatequotes = false;
    this.bookingCreatequotesComponent.clearDate();
  }

  createquotesOk() {
    this.bookingCreatequotesComponent.ngSubmit();
  }

  isSuccessfully(event: boolean) {
    if (event) {
      this.message.info('操作成功');
      if (this.isClosed) {
        this.isShowcreatequotes = false;
        this.isShowUpdateQuote = false;
        this.GetForCRM(this.bookingId);
      }
    } else {
      this.message.error('操作失败');
    }
  }

  //关联报价
  relateQuotelist: any[] = [];
  relateQuoteCount: number;
  GetRelatedQuoteForCRM(params: {
    originPortId?: string;
    originAddressId?: string;
    destinationPortId?: string;
    destinationAddressId?: string;
    incotermsString?: string;
    shipperCustomerId: string;
    consigneeCustomerId: string;
  }) {
    this.crmQuoteEnquiryService.getRelatedQuoteForCRM(params).subscribe((res) => {
      this.relateQuotelist = res.list;
      this.relateQuoteCount = res.count;
    });
  }

  isShowquotesRecord: boolean = false;
  isShowtab: boolean = false;
  closeQuored(event: any) {
    if (event) {
      this.isShowquotesRecord = false;
      this.GetForCRM(this.bookingId);
    }
  }

  //选择报价单
  selectQuote() {
    for (let item in this.quoteinfo) {
      if (this.bookingDetailInfo[item] != undefined) {
        this.quoteinfo[item] = this.bookingDetailInfo[item];
        // this.quoteinfo.bookngId = this.bookingDetailInfo.id;
        this.quoteinfo.id = this.emptyGuid;
        if (this.bookingDetailInfo.tradeType != 1) {
          this.quoteinfo.originAddress = this.bookingDetailInfo.originAddress;
          this.quoteinfo.destinationAddress = this.bookingDetailInfo.destinationAddress;
        }
      }
    }
    this.isShowquotesRecord = true;
    this.isShowtab = true;
  }

  quotesRecordCancel() {
    this.isShowquotesRecord = false;
  }

  @ViewChild(QuoteRecorddetailComponent)
  QuoteRecorddetailComponent: QuoteRecorddetailComponent;
  quotesRecordOk() {
    this.QuoteRecorddetailComponent.ngSubmit();
  }

  isRecorddetailSuccessfully(event: any) {
    if (event) {
      this.message.info('操作成功');
      if (this.isClosed) {
        this.isShowquotesRecord = false;
        this.GetForCRM(this.bookingId);
      }
    } else {
      this.message.error('操作失败');
    }
  }
  selIndexnum(event: number) {
    this.selIndex = event;
  }

  //编辑装箱单
  editPacklist() {
    this.isShowPacklist = true;
    this.isDisabledPack = false;
    this.isEdit = 'true';
  }
  @ViewChild(PackingListComponent) PackingListComponent: PackingListComponent;
  packlisthandleOk() {
    //提交保存
    //验证装箱单数据是否完整
    if (this.bookingDetailInfo.tradeType != 1) this.PackingListComponent.submitverificationForm();
    if (!this.verificationPassed && this.bookingDetailInfo.tradeType != 1) {
      this.isSubmitted = true;
      return;
    }
    //处理装箱单
    this.bookingDetailInfo.packingLists = [];
    this.cusClearanceInvoicesGroup.forEach((c) => {
      this.bookingDetailInfo.packingLists = this.bookingDetailInfo.packingLists.concat(c.pageList);
    });
    //cuhlishijianduan
    this.bookingService.updateForCRM(this.bookingDetailInfo).subscribe(
      (res) => {
        this.message.info(this.translate.instant('Successful operation'));
        this.isShowPacklist = false;
      },
      (error) => {
        this.modalService.confirm({
          nzTitle: '<i>There was a problem uploading  this request. Please check your internet connection and try again</i>',
          nzContent: '<b></b>',
          nzOkText: 'Retry',
          nzOnOk: () => {
            this.packlisthandleOk();
          }, //重新提交
        });
      },
    );
  }
  packlisthandleCancel() {
    this.isShowPacklist = false;
  }
  viewPacklist() {
    this.isShowPacklist = true;
    this.isDisabledPack = true;
    this.isEdit = 'true';
  }
}
